
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const OAuthButtons = () => {
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Error signing in with Google');
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-center text-xs my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <span className="bg-background px-4 text-muted-foreground z-10 relative">Or continue with</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button 
          type="button" 
          variant="outline" 
          onClick={signInWithGoogle}
          className="flex items-center justify-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4001 8.116C15.4001 7.48533 15.3428 6.88667 15.2361 6.31267H8.00012V9.0475H12.1908C12.0001 9.95533 11.4641 10.7233 10.6641 11.2408V13.0483H13.1188C14.5574 11.7243 15.4001 10.0883 15.4001 8.116Z" fill="#4285F4"/>
            <path d="M8.00004 15.4999C10.0987 15.4999 11.8454 14.8133 13.1188 13.0483L10.6641 11.2408C9.97875 11.7116 9.08204 11.9999 8.00004 11.9999C5.99337 11.9999 4.2927 10.6908 3.67604 8.8975H1.15137V10.7575C2.41804 13.5841 5.00604 15.4999 8.00004 15.4999Z" fill="#34A853"/>
            <path d="M3.67597 8.8975C3.51597 8.4275 3.42264 7.9225 3.42264 7.39917C3.42264 6.87583 3.51597 6.37083 3.67597 5.90083V4.04083H1.15129C0.655908 5.02417 0.366211 6.1725 0.366211 7.39917C0.366211 8.62583 0.655908 9.77417 1.15129 10.7575L3.67597 8.8975Z" fill="#FBBC05"/>
            <path d="M8.00004 2.79833C9.15271 2.79833 10.1887 3.19083 11.0014 3.95667L13.1954 1.7625C11.8414 0.500833 10.0954 -0.166504 8.00004 -0.166504C5.00604 -0.166504 2.41804 1.74683 1.15137 4.575L3.67604 6.435C4.2927 4.64167 5.99337 2.79833 8.00004 2.79833Z" fill="#EA4335"/>
          </svg>
          Google
        </Button>
      </div>
    </>
  );
};
