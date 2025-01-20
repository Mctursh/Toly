// components/EmojiSuggestions.tsx
import data from '@emoji-mart/data';
import { init, SearchIndex } from 'emoji-mart';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


init({ data });

interface EmojiSuggestionsProps {
  query: string;
  onSelect: (emoji: string) => void;
  position: { top: number; left: number };
}

export const EmojiSuggestions: React.FC<EmojiSuggestionsProps> = ({
  query,
  onSelect,
  position
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (query.startsWith(':')) {
      const searchTerm = query.slice(1);
      if (searchTerm.length >= 2) {
        SearchIndex.search(searchTerm).then(results => {
          setSuggestions(results.slice(0, 5));
        });
      }
    }
  }, [query]);

  if (!suggestions.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute z-50 bg-[#121417] rounded-lg shadow-lg border border-white/10"
      style={{ top: position.top, left: position.left }}
    >
      {suggestions.map(emoji => (
        <button
          key={emoji.id}
          onClick={() => onSelect(emoji.native)}
          className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
        >
          <span>{emoji.native}</span>
          <span className="text-sm text-gray-400">{emoji.name}</span>
        </button>
      ))}
    </motion.div>
  );
};