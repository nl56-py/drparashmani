
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add Poppins and Noto Sans Devanagari fonts
const poppinsFont = document.createElement('link');
poppinsFont.rel = 'stylesheet';
poppinsFont.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
document.head.appendChild(poppinsFont);

const nepaliFont = document.createElement('link');
nepaliFont.rel = 'stylesheet';
nepaliFont.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@300;400;500;600;700&display=swap';
document.head.appendChild(nepaliFont);

// Add CSS variables for doctor colors
const styleElement = document.createElement('style');
styleElement.textContent = `
:root {
  --doctor-blue: #0096cc;
  --doctor-blue-dark: #043c6d;
  --doctor-blue-light: #e6f7ff;
}

.doctor-blue { color: var(--doctor-blue); }
.doctor-blue-dark { color: var(--doctor-blue-dark); }
.doctor-blue-light { color: var(--doctor-blue-light); }

.bg-doctor-blue { background-color: var(--doctor-blue); }
.bg-doctor-blue-dark { background-color: var(--doctor-blue-dark); }
.bg-doctor-blue-light { background-color: var(--doctor-blue-light); }

.border-doctor-blue { border-color: var(--doctor-blue); }
.border-doctor-blue-dark { border-color: var(--doctor-blue-dark); }
.border-doctor-blue-light { border-color: var(--doctor-blue-light); }

.hover\\:bg-doctor-blue:hover { background-color: var(--doctor-blue); }
.hover\\:bg-doctor-blue-dark:hover { background-color: var(--doctor-blue-dark); }

.nepali {
  font-family: 'Noto Sans Devanagari', sans-serif;
}

.font-nepali {
  font-family: 'Noto Sans Devanagari', sans-serif;
}

.font-poppins {
  font-family: 'Poppins', sans-serif;
}
`;
document.head.appendChild(styleElement);

createRoot(document.getElementById("root")!).render(<App />);
