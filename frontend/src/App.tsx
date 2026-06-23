import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ProjectProvider } from './contexts/ProjectContext.tsx';
import { NotificationProvider } from './contexts/NotificationContext.tsx';
import { SuperToggleProvider } from './contexts/SuperToggleContext.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import ProjectDetailPage from './pages/ProjectDetailPage.tsx';
import Layout from './components/Layout.tsx';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <NotificationProvider>
          <SuperToggleProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/projects/:projectId"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <ProjectDetailPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </SuperToggleProvider>
        </NotificationProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;