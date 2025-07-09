# Enhanced Case Components

This directory contains the new enhanced case components that integrate with the updated backend processing pipeline.

## Components

### CaseProcessingStatus
**File:** `CaseProcessingStatus.tsx`

A real-time processing status dashboard that shows:
- Overall progress percentage
- Current processing stage
- Individual stage status (pending, started, completed, failed)
- Document processing statistics
- Data fusion status
- External data counts
- Processing errors

**Features:**
- Real-time polling every 5 seconds
- Visual progress indicators
- Color-coded status indicators
- Error handling with retry functionality

**Usage:**
```tsx
<CaseProcessingStatus caseId="case-123" />
```

### EnhancedCaseData
**File:** `EnhancedCaseData.tsx`

A comprehensive enhanced case data display that shows:
- Data quality metrics (fusion confidence, extraction confidence)
- Fused case information (parties, legal claims, damages)
- Document analysis with extraction results
- Precedent cases with similarity scores
- AI enrichment data

**Features:**
- Data quality visualization
- Fused data display
- Document analysis breakdown
- Precedent case analysis
- AI enrichment information

**Usage:**
```tsx
<EnhancedCaseData caseId="case-123" />
```

## Hooks

### useCaseProcessingStatus
**File:** `../hooks/useCaseProcessingStatus.ts`

Manages the fetching and polling of case processing status.

**Returns:**
- `status`: Processing status data
- `loading`: Loading state
- `error`: Error state
- `refreshStatus`: Function to manually refresh

### useEnhancedCaseData
**File:** `../hooks/useEnhancedCaseData.ts`

Manages the fetching of enhanced case data.

**Returns:**
- `enhancedData`: Enhanced case data
- `loading`: Loading state
- `error`: Error state
- `refreshData`: Function to manually refresh

## API Endpoints

### Processing Status
```
GET /api/cases/[id]/processing-status
```

**Response:**
```json
{
  "status": {
    "progress": {
      "percentage": 75,
      "currentStage": "Document Analysis"
    },
    "stages": [
      {
        "name": "Document Upload",
        "status": "completed"
      },
      {
        "name": "Document Analysis",
        "status": "started"
      }
    ],
    "documentProcessing": {
      "totalDocuments": 5,
      "completed": 3,
      "failed": 0,
      "extractions": [...]
    },
    "dataFusion": {
      "status": "pending"
    },
    "externalData": {
      "precedentCases": 12,
      "courtListenerCases": 8
    },
    "errors": []
  }
}
```

### Enhanced Data
```
GET /api/cases/[id]/enhanced-data
```

**Response:**
```json
{
  "enhancedData": {
    "dataQuality": {
      "fusionConfidence": 0.85,
      "averageExtractionConfidence": 0.92,
      "hasDocumentExtractions": true,
      "hasPrecedentCases": true
    },
    "fusedData": {
      "parties": {
        "plaintiffs": ["John Doe"],
        "defendants": ["ABC Corp"]
      },
      "legalClaims": ["Breach of Contract"],
      "damagesSought": "$50,000"
    },
    "documentAnalysis": {
      "totalDocuments": 5,
      "documents": [...]
    },
    "precedentAnalysis": {
      "totalPrecedents": 12,
      "precedents": [...]
    },
    "aiEnrichment": {
      "enhancedCaseType": "Contract Dispute",
      "causeOfAction": "Breach of Contract",
      "applicableStatute": "UCC Article 2",
      "jurisdictionEnriched": "California",
      "courtAbbreviation": "CA"
    }
  }
}
```

## Integration

These components are integrated into the main case view (`CaseViewNew.tsx`) with:

1. **Processing Status Banner**: Shows when case is processing
2. **Enhanced Analysis Tab**: New tab for comprehensive enhanced data
3. **Updated Tab Structure**: 5 tabs instead of 4

## Styling

Additional CSS styles are available in `CaseProcessingStatus.css` for custom styling if needed.

## Error Handling

Both components include comprehensive error handling:
- Loading states
- Error states with retry functionality
- Graceful fallbacks for missing data
- User-friendly error messages

## Real-time Updates

The processing status component automatically polls for updates every 5 seconds when processing is active, providing real-time feedback to users. 