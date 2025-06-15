
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
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { validateAccessCode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAccessCodeField, setShowAccessCodeField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateCode = () => {
    const isValid = validateAccessCode(accessCode);
    if (!isValid) {
      toast.error('Invalid access code');
    }
    return isValid;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!validateCode()) {
      setLoading(false);
      return;
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      
      toast.success('Signup successful! Please check your email for verification.');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Error during sign up');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSignUp}>
      <CardContent className="space-y-4 pt-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName" 
            type="text" 
            placeholder="John Doe" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input 
            id="signup-email" 
            type="email" 
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Input 
              id="signup-password" 
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
          <p className="text-xs text-gray-500">Password must be at least 6 characters</p>
        </div>

        {!showAccessCodeField ? (
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto text-xs underline mt-2"
            onClick={() => setShowAccessCodeField(true)}
          >
            Have an access code?
          </Button>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="accessCode">Access Code</Label>
            <Input 
              id="accessCode" 
              type="text" 
              placeholder="Enter access code" 
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              required 
            />
            <p className="text-xs text-gray-500">Access code is required to create an account</p>
          </div>
        )}

        <OAuthButtons />
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
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
