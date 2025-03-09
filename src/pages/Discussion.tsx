import { useState, useEffect, useRef } from "react";
import { Send, Mic, Sparkles } from "lucide-react";

function Discussion() {
  const [newMessage, setNewMessage] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("வணக்கம்! உங்கள் கேள்வியை கேளுங்கள்.");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const silenceStartTimeRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio player
  useEffect(() => {
    audioPlayerRef.current = new Audio();
    audioPlayerRef.current.onended = () => setIsSpeaking(false);
    audioPlayerRef.current.onerror = () => {
      console.error("Audio playback error");
      setIsSpeaking(false);
    };
    
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
    };
  }, []);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const detectSilence = (stream: MediaStream, silenceThreshold = 15, silenceDuration = 1500) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    
    const audioContext = audioContextRef.current;
    const analyser = audioContext.createAnalyser();
    analyserRef.current = analyser;
    
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);
    
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const checkSilence = () => {
      if (!isRecording) return;
      
      analyser.getByteFrequencyData(dataArray);
      
      // Calculate average volume
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      
      // Check if below threshold (silence)
      if (average < silenceThreshold) {
        if (silenceStartTimeRef.current === null) {
          silenceStartTimeRef.current = Date.now();
        } else if (Date.now() - silenceStartTimeRef.current > silenceDuration) {
          // If silence duration exceeded, stop recording
          stopRecording();
          return;
        }
      } else {
        silenceStartTimeRef.current = null;
      }
      
      silenceTimeoutRef.current = setTimeout(checkSilence, 100);
    };
    
    checkSilence();
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const messageToSend = newMessage.trim();

    // Clear input immediately for better UX
    setNewMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChatbotResponse(data.response);
      
      // Set speaking state to true when response is received
      setIsSpeaking(true);
      
      // Play audio if available
      if (data.audio_url) {
        console.log("Playing audio from:", data.audio_url);
        
        // Use the full URL with correct hostname
        const audioUrl = `http://127.0.0.1:5000${data.audio_url}`;
        
        if (audioPlayerRef.current) {
          audioPlayerRef.current.pause();
          audioPlayerRef.current.src = audioUrl;
          
          // Add a timestamp parameter to prevent caching
          audioPlayerRef.current.src = `${audioUrl}?t=${new Date().getTime()}`;
          
          const playPromise = audioPlayerRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Audio playback failed:", error);
              setIsSpeaking(false);
            });
          }
        }
      } else {
        // If no audio, reset speaking state after a delay
        setTimeout(() => setIsSpeaking(false), 2000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsSpeaking(false);
    }
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      audioChunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      recorder.onstop = async () => {
        setIsRecording(false);
        
        // Create audio blob for transcription
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/m4a" });
        const formData = new FormData();
        formData.append("file", audioBlob, "audio.m4a");
        
        try {
          const response = await fetch("http://127.0.0.1:5000/transcribe", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data.transcription) {
            // Set the transcribed text in the input field
            setNewMessage(data.transcription);
            
            // Send the transcribed message to the chatbot
            setTimeout(() => {
              sendMessage();
            }, 300);
          }
        } catch (error) {
          console.error("Error transcribing audio:", error);
        }
        
        // Stop all tracks in the stream
        stream.getTracks().forEach(track => track.stop());
        
        // Close audio context if it exists
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
      };

      recorder.start();
      detectSilence(stream);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
    
    silenceStartTimeRef.current = null;
    setIsRecording(false);
  };

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-indigo-800 flex items-center justify-center text-center w-full">
          <span className="bg-indigo-100 p-2 rounded-full mr-3">📖</span>
          கல்வி ஆலோசகர்
          <span className="ml-2 text-yellow-500 animate-pulse">✨</span>
        </h2>
      </div>

      <div className="flex flex-grow gap-6">
        <div className="w-1/2 bg-white rounded-2xl overflow-hidden shadow-lg border border-indigo-100 flex flex-col">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 font-medium">
            AI பயிற்சி உதவியாளர்
          </div>
          <div className="flex-grow flex items-center justify-center p-4">
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner bg-indigo-50">
              <img 
                src={isSpeaking ? "/speak.gif" : "/abu.gif"} 
                alt="பேச்சு அனிமேஷன்" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-lg opacity-80 flex items-center">
                <Sparkles className="h-4 w-4 mr-1" /> 
                {isSpeaking ? "உயிரோட்டமான" : "அலசல்"}
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 font-medium">
            உரையாடல்
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img 
                  src="bot.jpg" 
                  alt="கல்வி உதவியாளர்"
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-200 p-1"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-indigo-800">🤖 கல்வி உதவியாளர்</h3>
                <div className="text-xs text-gray-500">தற்போது ஆன்லைனில் உள்ளார்</div>
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl text-gray-700 shadow-inner" 
                 dangerouslySetInnerHTML={{ __html: chatbotResponse }} />
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-lg p-4 border border-indigo-100">
        <div className="flex items-center gap-3">
          <button 
            onClick={isRecording ? stopRecording : startRecording}
            className={`${
              isRecording 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            } p-4 rounded-lg transition-colors shadow-md relative`}>
            <Mic className="h-5 w-5 text-white" />
            {isRecording && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </button>
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="உங்கள் செய்தியை இங்கே தட்டச்சு செய்யவும்..."
            className="flex-grow p-4 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-indigo-50"
          />
          <button 
            onClick={sendMessage}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-md">
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Discussion;