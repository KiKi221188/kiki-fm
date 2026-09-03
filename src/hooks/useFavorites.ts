import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'kikifm.favorites';

function readStoredFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    // Corrupt or inaccessible storage (e.g. private browsing) — fail soft.
    return [];
  }
}

/**
 * Favorites are intentionally per-browser only (localStorage), so the
 * app never needs a user account, database or backend API.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => readStoredFavorites());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Storage unavailable — favorites simply won't persist this session.
    }
  }, [favorites]);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}
