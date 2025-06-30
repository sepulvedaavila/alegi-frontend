# Alegi Frontend

A modern legal case management platform with AI-powered analytics and insights.

## Features

### User-Specific Case Management
- **Personal Case Dashboard**: Each user can only see and manage their own uploaded cases
- **Real-time Case Loading**: Cases are fetched from the database and displayed in real-time
- **Case Privacy**: Cases are automatically filtered by user ID, ensuring data privacy
- **Dynamic Case Updates**: New cases are automatically added to the dashboard after creation
- **Case Status Tracking**: Automatic status determination based on case stage (Active, Pending, Closed)
- **Risk Assessment**: AI-powered risk scoring based on case type and factors

### Dashboard Features
- **Interactive Case Selection**: Click on cases in the sidebar to view detailed information
- **Case Comparison**: Compare multiple cases side-by-side
- **Favorites System**: Mark important cases as favorites for quick access
- **Custom Reports**: Generate detailed reports based on your case data
- **Real-time Analytics**: View confidence scores, risk assessments, and outcome predictions

### Case Creation
- **Multi-step Form**: Guided case creation process with validation
- **File Upload Support**: Upload evidence and supporting documents
- **Automatic Case Enrichment**: AI-powered case analysis and insights
- **Instant Dashboard Integration**: New cases appear immediately in your dashboard

## Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Development**
   ```bash
   npm run dev
   ```

4. **Building for Production**
   ```bash
   npm run build
   ```

## Architecture

### User Authentication
- Supabase Auth integration
- Automatic user session management
- Protected routes and components

### Case Management
- User-specific case storage in Supabase
- Real-time case synchronization
- Automatic case filtering by user ID

### Dashboard Context
- Centralized state management for dashboard data
- Real-time case updates
- Loading states and error handling

## Database Schema

The application uses the following key tables:
- `case_briefs`: Main case information with user_id for privacy
- `case_plaintiffs`: Plaintiff information linked to cases
- `case_defendants`: Defendant information linked to cases
- `case_evidence`: Evidence items linked to cases
- `case_documents`: Supporting documents linked to cases

## Security Features

- **Row Level Security (RLS)**: Database policies ensure users can only access their own cases
- **User Authentication**: Required for all case operations
- **Data Privacy**: Cases are automatically filtered by user ID
- **Secure File Uploads**: Files are stored securely with proper access controls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.