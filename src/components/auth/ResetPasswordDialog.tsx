
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ResetPasswordDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
}

export const ResetPasswordDialog = ({ isOpen, onOpenChange, email, setEmail }: ResetPasswordDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw error;
      
      toast.success('Password reset instructions sent to your email');
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Error sending reset password email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>
            Enter your Alegi account email address, and we'll send you password reset instructions.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleResetPassword} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input 
              id="reset-email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com" 
              required 
            />
          </div>
          
          <div className="flex flex-col space-y-2 mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
            <Button 
              type="button" 
              variant="link" 
              onClick={() => onOpenChange(false)}
            >
              Back to sign in page
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
