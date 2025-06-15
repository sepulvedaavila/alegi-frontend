
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { ResetPasswordDialog } from '@/components/auth/ResetPasswordDialog';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-alegi-gray-light">
      <Card className="w-full max-w-md md:max-w-lg">
        <CardHeader className="text-center">
          <Link to="/" className="mx-auto mb-2">
            <img 
              src="/lovable-uploads/f895d413-c639-44b2-9e10-9fd357a8b941.png" 
              alt="Logo" 
              className="h-20 mx-auto" 
            />
          </Link>
          <CardDescription>Sign in or create a new account</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <SignInForm 
              email={email}
              setEmail={setEmail}
              onResetPasswordClick={() => setIsResetPasswordOpen(true)}
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </Card>

      <ResetPasswordDialog 
        isOpen={isResetPasswordOpen}
        onOpenChange={setIsResetPasswordOpen}
        email={email}
        setEmail={setEmail}
      />
    </div>
  );
};

export default Auth;
