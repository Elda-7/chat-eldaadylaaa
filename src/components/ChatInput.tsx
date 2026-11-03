'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

export default function ChatInput({
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading || isComposing) return;

    const message = input.trim();
    setInput('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Blur textarea to hide mobile keyboard
    if (textareaRef.current) {
      textareaRef.current.blur();
    }

    await onSendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tombol Enter sekarang hanya berfungsi untuk baris baru
    // Fitur kirim via Enter telah dimatikan sesuai permintaan user
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(
        textareaRef.current.scrollHeight,
        120
      ) + 'px';
    }
  }, [input]);



  return (
    <div className="border-t border-indigo-100 dark:border-indigo-300/10 pt-4">
      <div className="relative flex items-end gap-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder="Tanya apa aja, asal jangan tanya kapan kiamat"
          disabled={isLoading}
          rows={1}
          className="flex-1 p-3 text-sm md:text-base rounded-xl border border-indigo-100 dark:border-indigo-300/15 bg-white/85 dark:bg-[#171a30]/85 text-slate-900 dark:text-indigo-50 placeholder-slate-400 dark:placeholder-indigo-100/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-pink-400/70 resize-none max-h-[120px] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-pink-500 dark:from-indigo-500 dark:to-pink-500 dark:hover:from-indigo-400 dark:hover:to-pink-400 text-white rounded-xl transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <i className="fas fa-spinner animate-spin"></i>
          ) : (
            <i className="fas fa-paper-plane"></i>
          )}
        </button>
      </div>
      <div className="text-xs text-slate-500 dark:text-indigo-100/50 mt-6 text-center space-y-1">
        <p>“Venus AI adalah asisten virtual dan bisa saja membuat kesalahan.”</p>
        <p>© 2026 Hak Cipta Dilindungi.</p>
        <p>
          Developed by{' '}
          <a
            href="https://adi-muhamad.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-pink-300 hover:text-pink-600 dark:hover:text-pink-200 hover:underline transition-colors"
          >
            adi-muhamad.my.id
          </a>
        </p>
      </div>
    </div>
  );
}
