import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        setError(error.message);
      } else if (isSignUp) {
        toast({
          title: "সাইন আপ সফল হয়েছে",
          description: "আপনার ইমেইল যাচাই করুন এবং লগইন করুন।",
        });
        setIsSignUp(false);
      } else {
        toast({
          title: "স্বাগতম",
          description: "সফলভাবে লগইন হয়েছে।",
        });
      }
    } catch (err) {
      setError('একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bengali-display">
            {isSignUp ? 'অ্যাডমিন নিবন্ধন' : 'অ্যাডমিন লগইন'}
          </CardTitle>
          <CardDescription className="font-bengali">
            {isSignUp ? 'নতুন অ্যাডমিন অ্যাকাউন্ট তৈরি করুন' : 'আপনার অ্যাকাউন্টে প্রবেশ করুন'}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription className="font-bengali">{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bengali">ইমেইল</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="আপনার ইমেইল ঠিকানা"
                className="font-bengali"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="font-bengali">পাসওয়ার্ড</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="আপনার পাসওয়ার্ড"
                className="font-bengali"
                minLength={6}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full font-bengali" 
              disabled={loading}
            >
              {loading ? 'অপেক্ষা করুন...' : (isSignUp ? 'নিবন্ধন করুন' : 'লগইন করুন')}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              className="w-full font-bengali"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Auth;