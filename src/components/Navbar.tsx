'use client';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <nav className="fixed w-full top-0 left-0 z-50 border-b border-indigo-100/80 dark:border-indigo-300/10 bg-white/80 dark:bg-[#111426]/85 backdrop-blur-xl shadow-sm shadow-indigo-950/5">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 via-blue-500 to-pink-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/25">
            <i className="fas fa-wand-magic-sparkles text-xl"></i>
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg leading-none text-slate-900 dark:text-white">
              venus-AI-Asisten
            </h1>
            <p className="text-xs text-indigo-600 dark:text-indigo-200/70">
              Teman ngobrol pintar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-300/15 hover:bg-indigo-50 dark:hover:bg-indigo-300/10 transition-colors text-indigo-700 dark:text-indigo-100 flex items-center justify-center"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} sm:mr-1.5`} />
            <span className="hidden sm:inline text-xs font-medium">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <button
            className="px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-300/15 hover:bg-pink-50 dark:hover:bg-pink-300/10 transition-colors text-indigo-700 dark:text-indigo-100 flex items-center justify-center"
            title="API Status"
          >
            <i className="fas fa-circle text-green-500 sm:mr-1.5" style={{ fontSize: '0.65rem' }}></i>
            <span className="hidden sm:inline text-xs font-medium">Live</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
