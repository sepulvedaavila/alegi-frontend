
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { OAuthButtons } from './OAuthButtons';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  onResetPasswordClick: () => void;
}

export const SignInForm = ({ email, setEmail, onResetPasswordClick }: SignInFormProps) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Error during sign in');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSignIn}>
      <CardContent className="space-y-4 pt-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button 
              variant="link" 
              className="px-0 text-xs" 
              type="button"
              onClick={onResetPasswordClick}
            >
              Forgot Password?
            </Button>
          </div>
          <div className="relative">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <Button 
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={toggleShowPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <OAuthButtons />
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
        <p className="text-xs text-center text-gray-500">
          By continuing, you agree with Alegi's{' '}
          <Link to="/terms-of-service" className="text-primary hover:underline">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link to="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};
