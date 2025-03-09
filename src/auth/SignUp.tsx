import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Upload, Camera, Book, Star, Award, Lightbulb, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

const EDUCATION_LEVELS = [
  { en: 'Primary School', ta: 'தொடக்கப்பள்ளி' },
  { en: 'Middle School', ta: 'நடுநிலைப் பள்ளி' },
  { en: 'High School', ta: 'உயர்நிலைப் பள்ளி' },
  { en: 'Higher Secondary', ta: 'மேல்நிலைப் பள்ளி' },
  { en: 'Other', ta: 'மற்றவை' }
];

const TAMIL_PROFICIENCY_LEVELS = [
  { en: 'Beginner', ta: 'தொடக்கநிலை' },
  { en: 'Intermediate', ta: 'இடைநிலை' },
  { en: 'Advanced', ta: 'மேம்பட்ட நிலை' },
  { en: 'Native Speaker', ta: 'தாய்மொழி பேசுபவர்' }
];

const SUBJECTS = [
  { en: 'Mathematics', ta: 'கணிதம்', icon: <Star className="h-5 w-5 text-yellow-500" /> },
  { en: 'Science', ta: 'அறிவியல்', icon: <Lightbulb className="h-5 w-5 text-blue-500" /> },
  { en: 'Social Studies', ta: 'சமூக அறிவியல்', icon: <Users className="h-5 w-5 text-green-500" /> },
  { en: 'Language Arts', ta: 'மொழி கலைகள்', icon: <Book className="h-5 w-5 text-purple-500" /> },
  { en: 'Computer Skills', ta: 'கணினி திறன்கள்', icon: <Award className="h-5 w-5 text-indigo-500" /> },
  { en: 'Vocational Training', ta: 'தொழிற்கல்வி', icon: <Award className="h-5 w-5 text-red-500" /> }
];

export default function SignUp() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    age: '',
    educationLevel: '',
    tamilProficiency: '',
    preferredSubjects: [] as string[]
  });

  // Hide welcome animation after 2 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      preferredSubjects: prev.preferredSubjects.includes(subject)
        ? prev.preferredSubjects.filter(s => s !== subject)
        : [...prev.preferredSubjects, subject]
    }));
  };

  const uploadProfilePicture = async (userId: string) => {
    if (!profileImage) return null;
  
    try {
      const fileExt = profileImage.name.split('.').pop();
      const fileName = `${userId}/profile.${fileExt}`;
      const filePath = `profiles/${fileName}`;
  
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, profileImage, {
          cacheControl: '3600',
          upsert: true,
        });
  
      if (uploadError || !uploadData) {
        throw uploadError || new Error('Failed to upload file');
      }
  
      const { data: publicUrlData } = supabase.storage.from('profiles').getPublicUrl(filePath);
  
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Storage Upload Error:', error);
      return null;
    }
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });
  
      if (authError) throw authError;
  
      if (authData?.user) {
        const profilePictureUrl = await uploadProfilePicture(authData.user.id);
  
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              full_name: formData.fullName,
              age: parseInt(formData.age),
              education_level: formData.educationLevel,
              tamil_proficiency: formData.tamilProficiency,
              preferred_subjects: formData.preferredSubjects,
              profile_picture_url: profilePictureUrl
            }
          ]);
  
        if (profileError) throw profileError;
  
        navigate('/assessment');
      }
    } catch (err: any) {
      console.error('SignUp Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(current => current + 1);
  };

  const prevStep = () => {
    setCurrentStep(current => current - 1);
  };

  if (showWelcomeAnimation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-rose-400 to-purple-500 flex items-center justify-center">
        <div className="text-center animate-bounce">
          <BookOpen className="h-24 w-24 text-white mx-auto" />
          <h1 className="mt-6 text-5xl font-bold text-white">தமிழ் கல்வி</h1>
          <p className="mt-3 text-xl text-white">உங்கள் கற்றல் பயணம் இங்கே தொடங்குகிறது</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-rose-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-orange-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400 rounded-full opacity-20"></div>
        
        <div className="text-center mb-8 relative">
          <BookOpen className="h-16 w-16 text-orange-600 mx-auto animate-pulse" />
          <h2 className="mt-4 text-4xl font-bold text-gray-900">தமிழ் கல்வி</h2>
          <p className="mt-2 text-xl text-gray-600">உங்கள் கற்றல் பயணம் இங்கே தொடங்குகிறது</p>
          
          {/* Progress indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            <div className={`h-3 w-16 rounded-full ${currentStep >= 1 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
            <div className={`h-3 w-16 rounded-full ${currentStep >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
            <div className={`h-3 w-16 rounded-full ${currentStep >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded animate-bounce">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-8">
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div 
                    className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-orange-100 to-purple-100 border-4 border-orange-300 group-hover:border-orange-400 transition-all duration-300 cursor-pointer transform hover:scale-105"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {profilePreview ? (
                      <img src={profilePreview} alt="Profile preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="w-12 h-12 text-orange-400" />
                      </div>
                    )}
                  </div>
                  <div 
                    className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-2.5 cursor-pointer hover:bg-orange-600 transition-colors shadow-lg transform hover:scale-110"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 italic">உங்கள் புகைப்படத்தைப் பதிவேற்றவும்</p>
              </div>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  முழு பெயர்
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="உங்கள் பெயரை உள்ளிடவும்"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  வயது
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="உங்கள் வயதை உள்ளிடவும்"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  மின்னஞ்சல்
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="உங்கள் மின்னஞ்சலை உள்ளிடவும்"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  கடவுச்சொல்
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="பாதுகாப்பான கடவுச்சொல்லை உள்ளிடவும்"
                />
              </div>

              <div>
                <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700">
                  கல்வி நிலை
                </label>
                <select
                  id="educationLevel"
                  name="educationLevel"
                  required
                  value={formData.educationLevel}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                >
                  <option value="">தேர்வு செய்க</option>
                  {EDUCATION_LEVELS.map(level => (
                    <option key={level.en} value={level.en}>{level.ta}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tamilProficiency" className="block text-sm font-medium text-gray-700">
                  தமிழ் மொழித் திறன்
                </label>
                <select
                  id="tamilProficiency"
                  name="tamilProficiency"
                  required
                  value={formData.tamilProficiency}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                >
                  <option value="">தேர்வு செய்க</option>
                  {TAMIL_PROFICIENCY_LEVELS.map(level => (
                    <option key={level.en} value={level.en}>{level.ta}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-4">
                  விருப்பமான பாடங்கள்
                </label>
                <p className="text-sm text-gray-500 mb-4">உங்களுக்கு ஆர்வமுள்ள பாடங்களைத் தேர்ந்தெடுக்கவும்</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SUBJECTS.map(subject => (
                    <div 
                      key={subject.en} 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                        formData.preferredSubjects.includes(subject.en) 
                          ? 'bg-orange-100 border-orange-500 shadow-md' 
                          : 'bg-white border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => handleSubjectChange(subject.en)}
                    >
                      <div className="flex items-center">
                        <div className="mr-3">
                          {subject.icon}
                        </div>
                        <div>
                          <span className="text-gray-700 font-medium">{subject.ta}</span>
                        </div>
                        <div className="ml-auto">
                          <input
                            type="checkbox"
                            checked={formData.preferredSubjects.includes(subject.en)}
                            onChange={() => {}}
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h3 className="text-sm font-medium text-orange-800">இந்த பாடங்களில் தனிப்பயனாக்கப்பட்ட பாடங்களைப் பெறுவீர்கள்</h3>
                <p className="text-xs text-orange-600 mt-1">எப்போது வேண்டுமானாலும் உங்கள் விருப்பங்களை மாற்றலாம்</p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="py-2 px-4 border border-orange-300 rounded-md shadow-sm text-sm font-medium text-orange-600 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
              >
                முந்தைய
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
              >
                அடுத்து
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="py-3 px-8 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? 'கணக்கு உருவாக்கப்படுகிறது...' : 'கணக்கை உருவாக்கு'}
              </button>
            )}
          </div>
        </form>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-center text-sm text-gray-600 mb-4 sm:mb-0">
              ஏற்கனவே கணக்கு உள்ளதா?{' '}
              <Link to="/signin" className="font-medium text-orange-600 hover:text-orange-500 underline">
                உள்நுழைக
              </Link>
            </p>
            
            <div className="flex space-x-4">
              <Link to="/about" className="text-sm text-gray-500 hover:text-gray-700">எங்களைப் பற்றி</Link>
              <Link to="/help" className="text-sm text-gray-500 hover:text-gray-700">உதவி</Link>
            </div>
          </div>
        </div>

        {/* Motivational section */}
        <div className="mt-8 bg-gradient-to-r from-orange-100 to-rose-100 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="mr-4">
              <Award className="h-10 w-10 text-orange-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">தனிப்பயனாக்கப்பட்ட கற்றல் அனுபவம்</h3>
              <p className="text-sm text-gray-600">AI உங்கள் திறன்களுக்கு ஏற்ப தனிப்பயனாக்கப்பட்ட பாடங்களை வழங்கும்</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}