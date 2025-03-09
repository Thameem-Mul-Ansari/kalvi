import { SetStateAction, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { BookOpen, Video, MessageSquare, GraduationCap, BrainCircuit, LogOut, BarChart3, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../pages/Dashboard';
import Lessons from '../pages/Lessons';
import Discussion from '../pages/Discussion';
import CareerGuidance from '../pages/CareerGuidance';
import Quizzes from '../pages/Quizzes';
import Profile from '../pages/Profile';

function MainApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  const handleNavClick = (tabId: SetStateAction<string>) => {
    setActiveTab(tabId);
    navigate(`/${tabId === 'dashboard' ? '' : tabId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex">
      {/* Sidebar */}
      <div className="fixed w-72 h-full bg-gradient-to-b from-indigo-600 to-blue-700 text-white p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <BookOpen className="h-8 w-8 text-amber-200" />
          </div>
          <h1 className="text-2xl font-bold text-amber-200">கல்வி மையம்</h1>
        </div>
        
        <nav className="space-y-3">
          {[
            { icon: BarChart3, label: 'Dashboard', id: 'dashboard' },
            { icon: Video, label: 'Lessons', id: 'lessons' },
            { icon: MessageSquare, label: 'Discussion', id: 'discussion' },
            { icon: GraduationCap, label: 'Career Guidance', id: 'career' },
            { icon: BrainCircuit, label: 'Quizzes', id: 'quizzes' },
            { icon: User, label: 'Profile', id: 'profile' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all
                ${activeTab === item.id 
                  ? 'bg-white bg-opacity-15 text-amber-200 shadow-md font-medium transform scale-105' 
                  : 'hover:bg-white hover:bg-opacity-10'}`}
            >
              <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-amber-200' : ''}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 w-60">
          <div className="border-t border-indigo-500 pt-4 pb-2 px-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center">
                <User className="h-6 w-6 text-indigo-700" />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.email?.split('@')[0] || 'Student'}</p>
                <p className="text-xs opacity-70">{user?.email || 'student@example.com'}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-48 p-3 rounded-xl hover:bg-white hover:bg-opacity-10 text-amber-100"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-72 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <div className="h-1 w-20 bg-amber-400 rounded-full"></div>
            </div>
            
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/discussion" element={<Discussion />} />
              <Route path="/career" element={<CareerGuidance />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainApp;