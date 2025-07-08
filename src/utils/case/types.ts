
import { CaseFormValues } from '@/hooks/useCaseForm';

export interface SubmitCaseResult {
  success: boolean;
  error?: string;
  caseId?: string;
  message?: string;
}

export interface CompleteCase {
  caseDetails: {
    id: string;
    case_name: string;
    case_type: string;
    case_stage: string;
    case_number: string | null;
    jurisdiction: string;
    date_filed: string;
    case_narrative: string;
    history_narrative: string | null;
    applicable_law: string | null;
    expected_outcome: string | null;
    additional_notes: string | null;
    created_at: string;
    updated_at: string;
    // Linear pipeline processing fields
    processing_status?: string;
    ai_processed?: boolean;
    last_ai_update?: string;
    success_probability?: number;
    risk_level?: string;
    case_strength_score?: number;
    settlement_probability?: number;
    estimated_timeline?: string;
  };
  plaintiffs: Array<{ id: string; name: string }>;
  defendants: Array<{ id: string; name: string }>;
  attorneys: Array<{ id: string; name: string; bar_id: string | null }>;
  legalIssues: Array<{ id: string; issue: string }>;
  evidence: Array<{
    id: string;
    type: string;
    description: string;
    file_path: string | null;
  }>;
  documents: Array<{
    id: string;
    file_name: string;
    file_type: string;
    file_path: string;
    file_size: number;
  }>;
}

export type Party = {
  name: string;
};

export type FormParty = {
  name?: string;
};

export type Attorney = {
  name: string;
  bar_id?: string;
};

export type FormAttorney = {
  name?: string;
  bar_id?: string;
};

export type EvidenceItem = {
  type: string;
  description: string;
  file?: File | null;
};

export type FormEvidenceItem = {
  type?: string;
  description?: string;
  file?: File | null;
};

export type UploadedDocument = {
  file_name: string;
  file_type: string;
  file_path: string;
  file_size: number;
};
