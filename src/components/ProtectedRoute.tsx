import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="font-bengali text-muted-foreground">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold font-bengali-display mb-4">অ্যাক্সেস নিষেধ</h1>
          <p className="font-bengali text-muted-foreground mb-4">
            আপনার অ্যাডমিন অধিকার নেই। শুধুমাত্র অ্যাডমিনরা এই পেজ দেখতে পারেন।
          </p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;