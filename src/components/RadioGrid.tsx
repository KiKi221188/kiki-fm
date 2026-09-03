import type { Station } from '../types';
import { RadioCard } from './RadioCard';
import './RadioGrid.css';

interface Props {
  stations: Station[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  emptyMessage?: string;
}

export function RadioGrid({ stations, favorites, onToggleFavorite, emptyMessage }: Props) {
  if (stations.length === 0) {
    return (
      <div className="radio-grid__empty">
        <p>{emptyMessage ?? 'No stations match your search yet. Try a different name, city or category.'}</p>
      </div>
    );
  }

  return (
    <div className="radio-grid">
      {stations.map((station) => (
        <RadioCard
          key={station.id}
          station={station}
          isFavorite={favorites.includes(station.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
