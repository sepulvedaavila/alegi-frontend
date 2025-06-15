import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define form schemas for validation
export const caseSchema = z.object({
  // Page 1: Case Identifiers
  caseName: z.string().optional(),
  caseType: z.string().optional(),
  caseStage: z.string().min(1, { message: 'Case stage is required' }),
  caseNumber: z.string().optional(),
  jurisdiction: z.string().optional(),
  stateJurisdiction: z.string().min(1, { message: 'State is required' }),
  countyJurisdiction: z.string().min(1, { message: 'City/County is required' }),
  dateFiled: z.date().nullable().optional(),
  plaintiffs: z.array(z.object({ 
    name: z.string().min(1, { message: 'Plaintiff name is required' }) 
  })).min(1, { message: 'At least one plaintiff is required' }),
  defendants: z.array(z.object({ 
    name: z.string().min(1, { message: 'Defendant name is required' }) 
  })).min(1, { message: 'At least one defendant is required' }),
  attorneysOfRecord: z.array(z.object({ 
    name: z.string().optional(),
    bar_id: z.string().optional()
  })).optional(),
  
  // Page 2: Case Details
  caseNarrative: z.string().min(10, { message: 'Please describe your claim in more detail' }),
  supportingDocuments: z.array(z.instanceof(File).optional()).optional(),
  historyNarrative: z.string().optional(),
  applicableLaw: z.string().optional(),
  legalIssues: z.array(z.string()).optional(),
  
  // Page 3: Evidence and Additional Info
  evidence: z.array(z.object({
    type: z.string().min(1, { message: 'Evidence type is required' }),
    description: z.string().min(10, { message: 'Please describe your evidence in more detail' }),
    file: z.instanceof(File).optional().nullable()
  })),
  expectedOutcome: z.string().min(10, { message: 'Please describe your expected outcome in more detail' }),
  additional_notes: z.string().optional()
});

export type CaseFormValues = z.infer<typeof caseSchema>;

export const useCaseForm = () => {
  const methods = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      plaintiffs: [{ name: '' }],
      defendants: [{ name: '' }],
      legalIssues: [],
      evidence: [{ type: 'Documentation', description: '', file: null }],
      attorneysOfRecord: [],
      stateJurisdiction: '',
      countyJurisdiction: '',
      caseNarrative: '',
      expectedOutcome: '',
      additional_notes: '',
      dateFiled: null,
      applicableLaw: ''
    },
    mode: 'onChange'
  });

  return methods;
};
