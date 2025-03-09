import { Play, Clock, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Lessons() {
  const navigate = useNavigate();

  const lessons = [
    {
      id: 'tamil',
      title: 'தமிழ் மொழி அறிமுகம்',
      description: 'Introduction to Tamil Language',
      duration: '30 mins',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'maths',
      title: 'எண்கள் மற்றும் கணிதம்',
      description: 'Numbers and Basic Math',
      duration: '45 mins',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'science',
      title: 'அறிவியல் அடிப்படைகள்',
      description: 'Science Fundamentals',
      duration: '60 mins',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'english',
      title: 'English Language',
      description: 'Learn English Grammar and Literature',
      duration: '45 mins',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'social',
      title: 'Social Science',
      description: 'History, Geography and Civics',
      duration: '60 mins',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  const handleStartLesson = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Lessons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img src={lesson.image} alt={lesson.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-2">{lesson.title}</h3>
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{lesson.level}</span>
                </div>
              </div>
              <button 
                onClick={() => handleStartLesson(lesson.id)}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Play className="h-4 w-4" />
                <span>Start Lesson</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lessons;