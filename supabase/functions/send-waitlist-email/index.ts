
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders } from "./config.ts";
import { sendToFormspree, sendToFormSubmit } from "./submission-service.ts";
import type { WaitlistFormData, ApiResponse } from "./types.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://zunckttwoeuacolbgpnu.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  try {
    // Get request origin for CORS handling
    const origin = req.headers.get("origin");
    console.log(`Request received from origin: ${origin || "unknown"}`);
    
    // Get appropriate CORS headers based on origin
    const corsHeaders = getCorsHeaders(origin);
    
    // Handle CORS preflight request
    if (req.method === "OPTIONS") {
      console.log("Handling OPTIONS preflight request");
      return new Response("ok", { headers: corsHeaders });
    }

    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json() as WaitlistFormData;
      console.log("Successfully parsed request body:", requestBody);
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const { name, company, telephone, email, industry } = requestBody;

    if (!name || !company || !telephone || !email) {
      console.error("Missing required fields:", { name, company, telephone, email });
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Log the received data
    console.log("Processing waitlist submission:", { name, company, telephone, email, industry });

    // Store submission in database
    try {
      const { error: dbError } = await supabase
        .from('waitlist_submissions')
        .insert({
          name,
          company,
          telephone,
          email,
          industry
        });

      if (dbError) {
        console.error("Error storing in database:", dbError);
        // Continue with email - we don't want to block the submission because of DB issues
      } else {
        console.log("Successfully stored submission in database");
      }
    } catch (dbErr) {
      console.error("Exception storing in database:", dbErr);
      // Continue with email - we don't want to block the submission because of DB issues
    }

    // Try Formspree first
    let emailSent = false;
    const formspreeResult = await sendToFormspree(requestBody, origin);
    
    if (formspreeResult.success) {
      emailSent = true;
    } else {
      // Try FormSubmit as fallback
      const formSubmitResult = await sendToFormSubmit(requestBody, origin);
      if (formSubmitResult.success) {
        emailSent = true;
      }
    }

    // Storing for backup in log
    console.log("Storing waitlist data for backup:", {
      ...requestBody,
      _subject: `New ALEGI Waitlist Registration: ${name} from ${company}`
    });

    // Log the overall result
    if (emailSent) {
      console.log("Email sent successfully through one of the services");
    } else {
      console.error("Email submission failed through all services");
      return new Response(
        JSON.stringify({ 
          error: "Failed to process submission" 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    console.log("Returning success response with CORS headers:", corsHeaders);
    
    // Return success to the client
    const response: ApiResponse = { 
      success: true, 
      message: "Waitlist submission successful",
      emailSent: emailSent
    };
    
    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error processing waitlist submission:", error);
    
    const corsHeaders = getCorsHeaders(req.headers.get("origin"));
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        } 
      }
    );
  }
});
