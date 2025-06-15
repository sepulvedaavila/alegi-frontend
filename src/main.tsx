
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { logVersionInfo } from './utils/versionInfo.ts'

// Log version information on startup
logVersionInfo();

createRoot(document.getElementById("root")!).render(<App />);
