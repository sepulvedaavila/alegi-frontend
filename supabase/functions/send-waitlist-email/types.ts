
export interface WaitlistFormData {
  name: string;
  company: string;
  telephone: string;
  email: string;
  industry?: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  emailSent?: boolean;
}
