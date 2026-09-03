import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import stations from '../data/stations.json';
import type { Station } from '../types';
import { usePlayer } from '../hooks/PlayerContext';
import { useFavorites } from '../hooks/useFavorites';

const allStations = stations as Station[];

export function RadioDetails() {
  const { id } = useParams<{ id: string }>();
  const station = allStations.find((s) => s.id === id);
  const { currentStation, status, play } = usePlayer();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (station) {
      document.title = `KiKi FM - ${station.name} Live Radio`;
    }
    return () => {
      document.title = 'KiKi FM — Your Tamil Radio World';
    };
  }, [station]);

  if (!station) {
    return (
      <section className="container section">
        <h1 className="page-title">Station not found</h1>
        <p>
          <Link to="/">Back to all stations</Link>
        </p>
      </section>
    );
  }

  const isCurrent = currentStation?.id === station.id;
  const isPlaying = isCurrent && status === 'playing';
  const location = [station.city, station.country].filter(Boolean).join(', ');
  const favorite = isFavorite(station.id);

  return (
    <section className="container section station-details">
      <img src={station.logo} alt="" className="station-details__logo" />

      <h1 className="page-title">{station.name}</h1>
      <p className="station-details__meta">
        {station.category}
        {location ? ` — ${location}` : ''}
      </p>

      <div className="station-details__actions">
        <button className="play-button play-button--large" onClick={() => play(station)} disabled={!station.isActive}>
          {!station.isActive ? 'Offline' : isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          className={`favorite-button ${favorite ? 'favorite-button--active' : ''}`}
          onClick={() => toggleFavorite(station.id)}
          aria-pressed={favorite}
        >
          {favorite ? '♥ Saved' : '♡ Save'}
        </button>
      </div>

      <h2 className="station-details__heading">About this station</h2>
      <p>{station.description}</p>

      {(station.website || station.socials) && (
        <div className="station-details__links">
          {station.website && (
            <a href={station.website} target="_blank" rel="noopener noreferrer">
              Visit website
            </a>
          )}
        </div>
      )}
    </section>
  );
}
