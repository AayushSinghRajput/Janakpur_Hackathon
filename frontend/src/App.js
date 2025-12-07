import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from './hooks/useAuth';

import Home from './pages/Home';
import ReportForm from './pages/ReportForm';
import NGODashboard from './pages/NGODashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Privacy from './pages/Privacy';
import SecurityStandards from './pages/Security';
import CookieAndTerms from './pages/CookieandTerms';
import ChatPage from './pages/ChatPage';
import NGOProfilesPage from './pages/NGOProfile';
import AnalyticsPage from './pages/AnalyticsPage';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/report" element={<ReportForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/security" element={<SecurityStandards />} />
              <Route path="/cookie-terms" element={<CookieAndTerms />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/ngo-profiles" element={<NGOProfilesPage />} />
              <Route path="/ngo-profiles/:incidentType" element={<NGOProfilesPage />} /> 
              <Route path="/analytics" element={<AnalyticsPage />} /> 
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <NGODashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
