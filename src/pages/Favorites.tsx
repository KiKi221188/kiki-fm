import { useMemo } from 'react';
import stations from '../data/stations.json';
import type { Station } from '../types';
import { RadioGrid } from '../components/RadioGrid';
import { useFavorites } from '../hooks/useFavorites';

const allStations = stations as Station[];

export function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteStations = useMemo(
    () => allStations.filter((s) => favorites.includes(s.id)),
    [favorites]
  );

  return (
    <section className="container section">
      <h1 className="page-title">Favorites</h1>
      <p className="page-subtitle">Saved on this device — stored in your browser, no account needed.</p>
      <div className="section--grid">
        <RadioGrid
          stations={favoriteStations}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          emptyMessage="You haven't saved any stations yet. Tap the heart on a station to add it here."
        />
      </div>
    </section>
  );
}
