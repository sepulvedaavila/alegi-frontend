import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { DashboardProvider } from '@/contexts/DashboardContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHome from '@/components/dashboard/DashboardHome';
import Settings from '@/components/dashboard/Settings';
import CaseBriefForm from '@/components/cases/CaseBriefForm';
import CustomReports from '@/components/dashboard/CustomReports';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !user) {
      toast.error('Please sign in to access the dashboard');
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  // Load feedback widget for dashboard
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@betahuhn/feedback-js/dist/feedback-js.min.js';
    script.defer = true;
    script.setAttribute('data-feedback-opts', JSON.stringify({
      endpoint: import.meta.env.VITE_ZAPIER_WEBHOOK,
      id: 'dashboard',
      emailField: true,
      title: 'We want to know your feedback!',
      forceShowButton: true
    }));
    
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.querySelector('script[src*="feedback-js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  // If not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <DashboardProvider>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/new-case" element={<CaseBriefForm />} />
          <Route path="/case-comparison" element={<div className="p-6"><h1 className="text-2xl font-bold">Case Comparison</h1><p className="mt-4">Case comparison interface will be implemented soon.</p></div>} />
          <Route path="/custom-reports" element={<CustomReports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </DashboardLayout>
    </DashboardProvider>
  );
};

export default Dashboard;
