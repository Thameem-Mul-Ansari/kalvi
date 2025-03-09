import { BookOpen, Activity, Award } from 'lucide-react';

function Dashboard() {
  const learningProgress = {
    completedLessons: 24,
    totalLessons: 40,
    streak: 7,
    points: 850
  };

  const recommendedCourses = [
    {
      title: 'தமிழ் எழுத்துக்கள்',
      description: 'Learn Tamil alphabets and basic writing',
      progress: 65,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000'
    },
    {
      title: 'அடிப்படை கணிதம்',
      description: 'Basic Mathematics in Tamil',
      progress: 30,
      image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&q=80&w=1000'
    }
  ];

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome back, மாணவர்!</h2>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Activity className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Daily Streak</p>
            <p className="font-bold text-gray-800">{learningProgress.streak} Days</p>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Lessons Progress</h3>
            <BookOpen className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">
            {Math.round((learningProgress.completedLessons / learningProgress.totalLessons) * 100)}%
          </p>
          <p className="text-sm text-gray-600">
            {learningProgress.completedLessons} of {learningProgress.totalLessons} completed
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Learning Points</h3>
            <Award className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{learningProgress.points}</p>
          <p className="text-sm text-gray-600">Total points earned</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Next Milestone</h3>
            <Activity className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">150</p>
          <p className="text-sm text-gray-600">Points to next level</p>
        </div>
      </div>

      {/* Recommended Courses */}
      <h3 className="text-xl font-bold text-gray-800 mb-6">Recommended for You</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedCourses.map((course, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h4 className="font-bold text-gray-800 mb-2">{course.title}</h4>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="relative w-full h-2 bg-gray-200 rounded">
                <div 
                  className="absolute top-0 left-0 h-full bg-amber-600 rounded"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{course.progress}% completed</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;