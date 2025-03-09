import { BookOpen, Video, MessageSquare, GraduationCap, BrainCircuit, LogOut, BarChart3, User } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
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
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
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
              <User  className="h-6 w-6 text-indigo-700" />
            </div>
            <div>
              <p className="text-sm font-medium">Student Name</p>
              <p className="text-xs opacity-70">student@example.com</p>
            </div>
          </div>
          <button className="flex items-center gap-3 w-48 p-3 rounded-xl hover:bg-white hover:bg-opacity-10 text-amber-100">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;