export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      case_ai_enrichment: {
        Row: {
          applicable_case_law: string | null
          applicable_statute: string | null
          case_id: string
          cause_of_action: Json | null
          court_abbreviation: string | null
          created_at: string | null
          enhanced_case_type: string | null
          id: string
          jurisdiction_enriched: string | null
          potential_assigned_judges: Json | null
          raw_gpt_response: Json | null
          related_cases: Json | null
          strategy_used: string | null
          updated_at: string | null
        }
        Insert: {
          applicable_case_law?: string | null
          applicable_statute?: string | null
          case_id: string
          cause_of_action?: Json | null
          court_abbreviation?: string | null
          created_at?: string | null
          enhanced_case_type?: string | null
          id?: string
          jurisdiction_enriched?: string | null
          potential_assigned_judges?: Json | null
          raw_gpt_response?: Json | null
          related_cases?: Json | null
          strategy_used?: string | null
          updated_at?: string | null
        }
        Update: {
          applicable_case_law?: string | null
          applicable_statute?: string | null
          case_id?: string
          cause_of_action?: Json | null
          court_abbreviation?: string | null
          created_at?: string | null
          enhanced_case_type?: string | null
          id?: string
          jurisdiction_enriched?: string | null
          potential_assigned_judges?: Json | null
          raw_gpt_response?: Json | null
          related_cases?: Json | null
          strategy_used?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_ai_enrichment_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      case_attorneys: {
        Row: {
          bar_id: string | null
          case_id: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          bar_id?: string | null
          case_id: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          bar_id?: string | null
          case_id?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_attorneys_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      case_briefs: {
        Row: {
          additional_notes: string | null
          applicable_law: string | null
          attorneys_of_record: Json | null
          case_name: string | null
          case_narrative: string
          case_number: string | null
          case_stage: string | null
          case_type: string | null
          created_at: string
          date_filed: string | null
          expected_outcome: string | null
          history_narrative: string | null
          id: string
          jurisdiction: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          additional_notes?: string | null
          applicable_law?: string | null
          attorneys_of_record?: Json | null
          case_name?: string | null
          case_narrative: string
          case_number?: string | null
          case_stage?: string | null
          case_type?: string | null
          created_at?: string
          date_filed?: string | null
          expected_outcome?: string | null
          history_narrative?: string | null
          id?: string
          jurisdiction?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          additional_notes?: string | null
          applicable_law?: string | null
          attorneys_of_record?: Json | null
          case_name?: string | null
          case_narrative?: string
          case_number?: string | null
          case_stage?: string | null
          case_type?: string | null
          created_at?: string
          date_filed?: string | null
          expected_outcome?: string | null
          history_narrative?: string | null
          id?: string
          jurisdiction?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      case_defendants: {
        Row: {
          case_id: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          case_id: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          case_id?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_defendants_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      case_documents: {
        Row: {
          ai_extracted_text: string | null
          case_id: string
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          pdf_text: string | null
        }
        Insert: {
          ai_extracted_text?: string | null
          case_id: string
          created_at?: string
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          pdf_text?: string | null
        }
        Update: {
          ai_extracted_text?: string | null
          case_id?: string
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          pdf_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_documents_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      case_evidence: {
        Row: {
          ai_extracted_text: string | null
          case_id: string
          created_at: string
          description: string
          file_path: string | null
          id: string
          type: string
        }
        Insert: {
          ai_extracted_text?: string | null
          case_id: string
          created_at?: string
          description: string
          file_path?: string | null
          id?: string
          type: string
        }
        Update: {
          ai_extracted_text?: string | null
          case_id?: string
          created_at?: string
          description?: string
          file_path?: string | null
          id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_evidence_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      case_legal_issues: {
        Row: {
          case_id: string
          created_at: string
          id: string
          issue: string
        }
        Insert: {
          case_id: string
          created_at?: string
          id?: string
          issue: string
        }
        Update: {
          case_id?: string
          created_at?: string
          id?: string
          issue?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_legal_issues_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      case_plaintiffs: {
        Row: {
          case_id: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          case_id: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          case_id?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_plaintiffs_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      case_predictions: {
        Row: {
          additional_facts_recommendations: string | null
          alternative_approach: string | null
          analyzed_cases: Json | null
          appeal_after_trial: number | null
          average_time_resolution: number | null
          average_time_resolution_type: string | null
          case_complexity_score: number | null
          case_id: string
          confidence_prediction_percentage: number | null
          created_at: string | null
          estimated_financial_outcome: number | null
          fact_strength_analysis: Json | null
          financial_outcome_range: Json | null
          id: string
          judge_analysis: string | null
          lawyer_analysis: string | null
          litigation_cost_estimate: number | null
          litigation_cost_range: Json | null
          outcome_prediction_score: number | null
          plaintiff_success: number | null
          precedent_cases: Json | null
          primary_fact_strength_analysis: number | null
          primary_strategy: string | null
          prior_similar_rulings: Json | null
          real_time_law_changes: Json | null
          recommended_settlement_window: string | null
          resolution_time_range: Json | null
          risk_score: number | null
          settlement_success_rate: number | null
          settlement_trial_analysis: string | null
          similar_cases: Json | null
          updated_at: string | null
          witness_score: number | null
        }
        Insert: {
          additional_facts_recommendations?: string | null
          alternative_approach?: string | null
          analyzed_cases?: Json | null
          appeal_after_trial?: number | null
          average_time_resolution?: number | null
          average_time_resolution_type?: string | null
          case_complexity_score?: number | null
          case_id: string
          confidence_prediction_percentage?: number | null
          created_at?: string | null
          estimated_financial_outcome?: number | null
          fact_strength_analysis?: Json | null
          financial_outcome_range?: Json | null
          id?: string
          judge_analysis?: string | null
          lawyer_analysis?: string | null
          litigation_cost_estimate?: number | null
          litigation_cost_range?: Json | null
          outcome_prediction_score?: number | null
          plaintiff_success?: number | null
          precedent_cases?: Json | null
          primary_fact_strength_analysis?: number | null
          primary_strategy?: string | null
          prior_similar_rulings?: Json | null
          real_time_law_changes?: Json | null
          recommended_settlement_window?: string | null
          resolution_time_range?: Json | null
          risk_score?: number | null
          settlement_success_rate?: number | null
          settlement_trial_analysis?: string | null
          similar_cases?: Json | null
          updated_at?: string | null
          witness_score?: number | null
        }
        Update: {
          additional_facts_recommendations?: string | null
          alternative_approach?: string | null
          analyzed_cases?: Json | null
          appeal_after_trial?: number | null
          average_time_resolution?: number | null
          average_time_resolution_type?: string | null
          case_complexity_score?: number | null
          case_id?: string
          confidence_prediction_percentage?: number | null
          created_at?: string | null
          estimated_financial_outcome?: number | null
          fact_strength_analysis?: Json | null
          financial_outcome_range?: Json | null
          id?: string
          judge_analysis?: string | null
          lawyer_analysis?: string | null
          litigation_cost_estimate?: number | null
          litigation_cost_range?: Json | null
          outcome_prediction_score?: number | null
          plaintiff_success?: number | null
          precedent_cases?: Json | null
          primary_fact_strength_analysis?: number | null
          primary_strategy?: string | null
          prior_similar_rulings?: Json | null
          real_time_law_changes?: Json | null
          recommended_settlement_window?: string | null
          resolution_time_range?: Json | null
          risk_score?: number | null
          settlement_success_rate?: number | null
          settlement_trial_analysis?: string | null
          similar_cases?: Json | null
          updated_at?: string | null
          witness_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "case_predictions_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      case_shares: {
        Row: {
          case_id: string
          created_at: string | null
          id: string
          permission_level: string
          shared_by: string
          shared_with: string
        }
        Insert: {
          case_id: string
          created_at?: string | null
          id?: string
          permission_level?: string
          shared_by: string
          shared_with: string
        }
        Update: {
          case_id?: string
          created_at?: string | null
          id?: string
          permission_level?: string
          shared_by?: string
          shared_with?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_shares_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      gpt_errors: {
        Row: {
          case_id: string | null
          error_message: string | null
          gpt_input: Json | null
          id: string
          timestamp: string | null
        }
        Insert: {
          case_id?: string | null
          error_message?: string | null
          gpt_input?: Json | null
          id?: string
          timestamp?: string | null
        }
        Update: {
          case_id?: string | null
          error_message?: string | null
          gpt_input?: Json | null
          id?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gpt_errors_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      jurisdictions: {
        Row: {
          abbreviation: string | null
          citation_abbreviation: string | null
          count: string | null
          homepage: string | null
          id: number
          in_use: string
          jurisdiction: string | null
          modified: string | null
          name: string | null
          start_date: string | null
        }
        Insert: {
          abbreviation?: string | null
          citation_abbreviation?: string | null
          count?: string | null
          homepage?: string | null
          id?: number
          in_use: string
          jurisdiction?: string | null
          modified?: string | null
          name?: string | null
          start_date?: string | null
        }
        Update: {
          abbreviation?: string | null
          citation_abbreviation?: string | null
          count?: string | null
          homepage?: string | null
          id?: number
          in_use?: string
          jurisdiction?: string | null
          modified?: string | null
          name?: string | null
          start_date?: string | null
        }
        Relationships: []
      }
      precedent_cases: {
        Row: {
          applicable_statutes: Json | null
          case_id: string | null
          case_name: string | null
          citation: string | null
          court: string | null
          created_at: string
          decision_summary: string | null
          full_text_url: string | null
          id: string
          judge_name: string | null
          jurisdiction: string | null
          legal_issues: Json | null
          outcome: string | null
          similarity_score: number | null
          strategy_used: string | null
        }
        Insert: {
          applicable_statutes?: Json | null
          case_id?: string | null
          case_name?: string | null
          citation?: string | null
          court?: string | null
          created_at?: string
          decision_summary?: string | null
          full_text_url?: string | null
          id?: string
          judge_name?: string | null
          jurisdiction?: string | null
          legal_issues?: Json | null
          outcome?: string | null
          similarity_score?: number | null
          strategy_used?: string | null
        }
        Update: {
          applicable_statutes?: Json | null
          case_id?: string | null
          case_name?: string | null
          citation?: string | null
          court?: string | null
          created_at?: string
          decision_summary?: string | null
          full_text_url?: string | null
          id?: string
          judge_name?: string | null
          jurisdiction?: string | null
          legal_issues?: Json | null
          outcome?: string | null
          similarity_score?: number | null
          strategy_used?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "precedent_cases_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_briefs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      waitlist_submissions: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          industry: string | null
          name: string
          telephone: string
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          id?: string
          industry?: string | null
          name: string
          telephone: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          industry?: string | null
          name?: string
          telephone?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { uri: string }
          | { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { uri: string } | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { uri: string; content: string; content_type: string }
          | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      insert_case_brief: {
        Args: { case_data: Json }
        Returns: Json
      }
      is_case_owner: {
        Args: { case_id: string }
        Returns: boolean
      }
      policy_exists: {
        Args: { table_name: string; policy_name: string }
        Returns: boolean
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
    }
    Enums: {
      app_role: "super_admin" | "admin" | "user"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "admin", "user"],
    },
  },
} as const
