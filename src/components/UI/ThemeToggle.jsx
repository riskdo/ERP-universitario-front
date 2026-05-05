import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { getTheme, toggleTheme } from '../../store/themeStore';

export default function ThemeToggle() {
  const [theme, setCurrentTheme] = useState(getTheme());

  function handleToggle() {
    setCurrentTheme(toggleTheme());
  }

  return (
    <button className="icon-btn" type="button" onClick={handleToggle} title="Alternar tema" aria-label="Alternar tema">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
