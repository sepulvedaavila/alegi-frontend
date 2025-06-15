
import { Case } from '@/types/dashboard';

// Mock cases data
export const mockCases: Case[] = [
  { 
    id: 'C-2023-0105', 
    title: 'Johnson v. MedTech Inc.', 
    status: 'Active', 
    confidence: 82, 
    date: '2023-08-15', 
    risk: 'Medium' 
  },
  { 
    id: 'C-2023-0097', 
    title: 'Roberts Family Trust', 
    status: 'Pending', 
    confidence: 64, 
    date: '2023-07-28', 
    risk: 'High' 
  },
  { 
    id: 'C-2023-0089', 
    title: 'Peterson v. Allied Health', 
    status: 'Closed', 
    confidence: 91, 
    date: '2023-06-12', 
    risk: 'Low' 
  },
  { 
    id: 'C-2023-0076', 
    title: 'Williams Healthcare Claim', 
    status: 'Active', 
    confidence: 77, 
    date: '2023-04-30', 
    risk: 'Medium' 
  }
];
