import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import MainApp from './components/MainApp';
import LessonUnits from './pages/LessonUnits';
import UnitDetails from './pages/UnitDetails';
import LandingPage from './pages/LandingPage';

// Define props type for ProtectedRoute
interface ProtectedRouteProps {
  children: ReactNode;
}

// Protected route component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/landingpage" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/landingpage" replace />} /> {/* Redirect to LandingPage */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/lesson/:lessonId" element={<LessonUnits />} />
          <Route path="/lesson/:lessonId/unit/:unitId" element={<UnitDetails />} />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;