
import { WaitlistFormData } from "./types.ts";

export async function sendToFormspree(data: WaitlistFormData, origin: string | null): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch("https://formspree.io/f/xkgjobbk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": origin || "https://alegi.io"
      },
      body: JSON.stringify({
        name: data.name,
        company: data.company,
        telephone: data.telephone,
        email: data.email,
        industry: data.industry || "Not specified",
        _subject: `New ALEGI Waitlist Registration: ${data.name} from ${data.company}`
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log("Formspree submission success:", result);
      return { success: true };
    } else {
      console.error("Formspree submission error:", result);
      return { 
        success: false, 
        error: result.error || "Formspree submission failed" 
      };
    }
  } catch (error) {
    console.error("Error sending to Formspree:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error with Formspree" 
    };
  }
}

export async function sendToFormSubmit(data: WaitlistFormData, origin: string | null): Promise<{ success: boolean; error?: string }> {
  try {
    // FormSubmit format - send to a custom email endpoint
    const response = await fetch("https://formsubmit.co/ajax/info@alegi.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": origin || "https://alegi.io"
      },
      body: JSON.stringify({
        name: data.name,
        company: data.company,
        telephone: data.telephone,
        email: data.email,
        industry: data.industry || "Not specified",
        _subject: `New ALEGI Waitlist Registration: ${data.name} from ${data.company}`
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log("FormSubmit submission success:", result);
      return { success: true };
    } else {
      console.error("FormSubmit submission error:", result);
      return { 
        success: false, 
        error: result.error || "FormSubmit submission failed" 
      };
    }
  } catch (error) {
    console.error("Error sending to FormSubmit:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error with FormSubmit" 
    };
  }
}
