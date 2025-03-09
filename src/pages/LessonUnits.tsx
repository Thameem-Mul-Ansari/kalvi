import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface Unit {
  id: string;
  title: string;
  description: string;
  image: string;
  standard: string;
  content: string;
}

function LessonUnits() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  useEffect(() => {
    const fetchUnits = () => {
      switch (lessonId) {
        case 'social':
          setUnits([
            {
              id: 'unit1',
              title: 'பிரெஞ்சு புரட்சி',
              description: '1789-ல் பிரான்சில் ஆரம்பித்து ஐரோப்பாவில் permanent மாறுபாடுகளை ஏற்படுத்திய முக்கியமான سیاسی மற்றும் சமூக மாற்றங்களை ஆராயுங்கள்.',
              image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'பிரெஞ்சு புரட்சி (1789-1799) என்பது பிரெஞ்சு மற்றும் ஐரோப்பிய வரலாற்றில் அடிப்படையான சமூக மற்றும் முன்னணி அரசியல் மாற்றங்களை ஏற்படுத்தும் காலம் ஆகும்.'
            },
            // ... other social units
          ]);
          break;

        case 'science':
          setUnits([
            {
              id: 'unit1',
              title: 'அணு மற்றும் மூலக்கூறுகள்',
              description: 'பொருள்களின் அடிப்படை கட்டமைப்பு, அணுக்கள் மற்றும் மூலக்கூறுகளின் இயல்புகள் பற்றி ஆராய்தல்.',
              image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'அணு என்பது ஒரு பொருளின் மிகச் சிறிய துகள் ஆகும். இது தனித்தனியாக இருக்கும் போது அந்த பொருளின் பண்புகளை பெற்றிருக்கும்.'
            },
            {
              id: 'unit2',
              title: 'இயக்கம் மற்றும் விசை',
              description: 'நியூட்டனின் இயக்க விதிகள், விசை மற்றும் முடுக்கம் பற்றிய அடிப்படை கோட்பாடுகள்.',
              image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'ஒரு பொருளின் இயக்கம் என்பது அதன் நிலை மாற்றம் ஆகும். விசை என்பது ஒரு பொருளின் இயக்க நிலையை மாற்றக்கூடிய காரணி ஆகும்.'
            },
            {
              id: 'unit3',
              title: 'உயிரினங்களின் உலகம்',
              description: 'தாவரங்கள் மற்றும் விலங்குகளின் வகைப்பாடு, அவற்றின் வாழ்க்கை முறைகள்.',
              image: 'https://images.unsplash.com/photo-1500932334442-8761ee4810a7?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'உயிரினங்கள் பல்வேறு வகைகளாக வகைப்படுத்தப்படுகின்றன. ஒவ்வொரு வகையும் தனித்துவமான பண்புகளைக் கொண்டுள்ளது.'
            }
          ]);
          break;

        case 'maths':
          setUnits([
            {
              id: 'unit1',
              title: 'இயற்கணிதம்',
              description: 'காரணிகள், அடுக்குகள், மற்றும் பல்லுறுப்புக் கோவைகள் பற்றிய அடிப்படை கருத்துக்கள்.',
              image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'இயற்கணிதம் என்பது எண்களின் அமைப்பு மற்றும் அவற்றின் தொடர்புகளை ஆராயும் கணித பிரிவு ஆகும்.'
            },
            {
              id: 'unit2',
              title: 'வடிவியல்',
              description: 'கோணங்கள், முக்கோணங்கள், வட்டங்கள் மற்றும் அவற்றின் பண்புகள்.',
              image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'வடிவியல் என்பது வடிவங்களின் அமைப்பு, அளவுகள் மற்றும் அவற்றின் பண்புகளை ஆராயும் கணித பிரிவு ஆகும்.'
            },
            {
              id: 'unit3',
              title: 'புள்ளியியல்',
              description: 'தரவு சேகரிப்பு, பகுப்பாய்வு மற்றும் விளக்கப்படங்கள்.',
              image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'புள்ளியியல் என்பது தரவுகளை சேகரித்து, பகுப்பாய்வு செய்து, முடிவுகளை எடுக்கும் கணித பிரிவு ஆகும்.'
            }
          ]);
          break;

        case 'english':
          setUnits([
            {
              id: 'unit1',
              title: 'Prose and Poetry',
              description: 'Study of various literary works including short stories, poems, and essays.',
              image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'This unit covers various forms of literature including prose and poetry, helping students understand different writing styles and literary devices.'
            },
            {
              id: 'unit2',
              title: 'Grammar and Composition',
              description: 'Understanding parts of speech, sentence structures, and writing techniques.',
              image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'Learn about different aspects of English grammar including parts of speech, tenses, and sentence formation.'
            },
            {
              id: 'unit3',
              title: 'Communication Skills',
              description: 'Developing speaking, listening, reading, and writing skills.',
              image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'This unit focuses on developing essential communication skills in English through various practical exercises and activities.'
            }
          ]);
          break;

        case 'tamil':
          setUnits([
            {
              id: 'unit1',
              title: 'இலக்கியம்',
              description: 'சங்க இலக்கியம், பக்தி இலக்கியம் மற்றும் காப்பியங்கள் பற்றிய ஆய்வு.',
              image: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'தமிழ் இலக்கியத்தின் பல்வேறு காலகட்டங்களை ஆராய்ந்து, அவற்றின் சிறப்பம்சங்களை கற்றுக்கொள்ளுதல்.'
            },
            {
              id: 'unit2',
              title: 'இலக்கணம்',
              description: 'சொல், தொடர், வாக்கியம் மற்றும் யாப்பு பற்றிய விதிகள்.',
              image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'தமிழ் மொழியின் இலக்கண விதிகளை விரிவாக ஆராய்தல் மற்றும் பயிற்சி செய்தல்.'
            },
            {
              id: 'unit3',
              title: 'மொழித்திறன்',
              description: 'படித்தல், எழுதுதல், பேசுதல் மற்றும் கேட்டல் திறன்களை மேம்படுத்துதல்.',
              image: 'https://images.unsplash.com/photo-1456081445129-830eb8d4bfc6?auto=format&fit=crop&w=600&h=400&q=80',
              standard: '9',
              content: 'தமிழ் மொழியில் அடிப்படை திறன்களை மேம்படுத்தி, சிறந்த தகவல் பரிமாற்றத்திற்கு வழிவகுத்தல்.'
            }
          ]);
          break;
      }
    };

    fetchUnits();
  }, [lessonId]);

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const getSubjectTitle = () => {
    switch (lessonId) {
      case 'social':
        return '9ம் வகுப்பு சமூக அறிவியல்';
      case 'science':
        return '9ம் வகுப்பு அறிவியல்';
      case 'maths':
        return '9ம் வகுப்பு கணிதம்';
      case 'english':
        return 'Grade 9 English';
      case 'tamil':
        return '9ம் வகுப்பு தமிழ்';
      default:
        return '';
    }
  };

  const getSubjectDescription = () => {
    switch (lessonId) {
      case 'social':
        return '9ம் வகுப்பு மாணவர்களுக்கு வடிவமைக்கப்பட்டுள்ள இந்த இடைக்கால பாடங்களை மூலம் வரலாறு, அரசியல், புவியியல் மற்றும் பொருளாதாரம் போன்ற வகையங்களை கண்டறியுங்கள்.';
      case 'science':
        return 'இயற்பியல், வேதியியல் மற்றும் உயிரியல் ஆகிய துறைகளில் அடிப்படை கருத்துக்களை ஆராய்ந்து புரிந்துகொள்ளுங்கள்.';
      case 'maths':
        return 'எண்கணிதம், இயற்கணிதம், வடிவியல் மற்றும் புள்ளியியல் போன்ற பிரிவுகளில் கணித கருத்துக்களை ஆழமாக கற்றுக்கொள்ளுங்கள்.';
      case 'english':
        return 'Explore English language through literature, grammar, and communication skills to enhance your proficiency in reading, writing, speaking, and listening.';
      case 'tamil':
        return 'இலக்கியம், இலக்கணம் மற்றும் மொழித்திறன்கள் மூலம் தமிழ் மொழியின் செழுமையை கண்டறியுங்கள்.';
      default:
        return '';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">
            {getSubjectTitle()}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {getSubjectDescription()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit) => (
            <div
              key={unit.id}
              onClick={() => handleUnitClick(unit)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img src={unit.image} alt={unit.title} className="w-full h-56 object-cover" />
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg">
                  நிலை {unit.standard}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{unit.title}</h3>
                <p className="text-gray-600 mb-4">{unit.description}</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  பாடத்தை ஆராய்க
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedUnit && (
          <div className="mt-16 bg-white p-8 rounded-xl shadow-lg animate-fadeIn">
            <div className="flex items-center mb-6">
              <div className="w-2 h-12 bg-indigo-600 mr-4"></div>
              <h3 className="text-2xl font-bold text-gray-800">{selectedUnit.title}</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <img
                  src={selectedUnit.image}
                  alt={selectedUnit.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-700 mb-2">கற்கும் குறிக்கோள்கள்</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>முக்கிய வரலாற்றுப் நிகழ்வுகளை மற்றும் அவற்றின் தாக்கத்தைப் புரிந்துகொள்</li>
                    <li>முதன்மை மற்றும் இரரின வரலாற்று ஆதாரங்களைப் பகுப்பாய்வு செய்</li>
                    <li>வரலாற்று வளர்ச்சிகளை contemporary பிரச்சினைகளுக்கு இணைக்கின்றது</li>
                    <li>வரலாற்றுப் பரிசோதனையின் மூலம் விமர்சன சிந்தனை திறன்களை மேம்படுத்துங்கள்</li>
                  </ul>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {selectedUnit.content}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="bg-green-600 text-white p-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors">
                    <span className="mr-2">தணிக்கையை தொடங்கவும்</span>
                  </button>
                  <button className="bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <span className="mr-2">அயர்வுகள் பதிவேற்றவும்</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonUnits;