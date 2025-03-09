import React from 'react';
import { BrainCircuit, Clock, Trophy, Star } from 'lucide-react';

function Quizzes() {
  const quizzes = [
    {
      title: 'தமிழ் மொழி அறிவு',
      description: 'Test your Tamil language knowledge',
      questions: 20,
      timeLimit: '30 mins',
      difficulty: 'Intermediate',
      completed: false
    },
    {
      title: 'அடிப்படை கணிதம்',
      description: 'Basic mathematics assessment',
      questions: 15,
      timeLimit: '25 mins',
      difficulty: 'Beginner',
      completed: true,
      score: 85
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Quizzes</h2>
        <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-lg">
          <Trophy className="h-5 w-5 text-amber-600" />
          <span className="text-amber-800">Your Rank: 42</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <BrainCircuit className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{quiz.title}</h3>
                  <p className="text-sm text-gray-600">{quiz.description}</p>
                </div>
              </div>
              {quiz.completed && (
                <div className="bg-green-100 px-3 py-1 rounded-full">
                  <span className="text-sm text-green-700">Completed</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{quiz.timeLimit}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{quiz.difficulty}</span>
              </div>
              <div>
                <span>{quiz.questions} questions</span>
              </div>
            </div>

            {quiz.completed ? (
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Your Score</span>
                  <span className="text-xl font-bold text-amber-600">{quiz.score}%</span>
                </div>
                <button className="mt-3 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                  Retake Quiz
                </button>
              </div>
            ) : (
              <button className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors">
                Start Quiz
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quizzes;