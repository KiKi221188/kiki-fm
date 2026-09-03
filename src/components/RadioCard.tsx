import { Link } from 'react-router-dom';
import type { Station } from '../types';
import { usePlayer } from '../hooks/PlayerContext';
import './RadioCard.css';

interface Props {
  station: Station;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function RadioCard({ station, isFavorite, onToggleFavorite }: Props) {
  const { currentStation, status, play } = usePlayer();
  const isCurrent = currentStation?.id === station.id;
  const isPlaying = isCurrent && status === 'playing';
  const isLoading = isCurrent && status === 'loading';

  const location = [station.city, station.country].filter(Boolean).join(', ');

  return (
    <article className={`radio-card ${!station.isActive ? 'radio-card--offline' : ''}`}>
      <Link to={`/radio/${station.id}`} className="radio-card__logo-link">
        <img src={station.logo} alt="" className="radio-card__logo" loading="lazy" />
      </Link>

      <div className="radio-card__body">
        <Link to={`/radio/${station.id}`} className="radio-card__name">
          {station.name}
        </Link>
        <p className="radio-card__meta">
          {station.category}
          {location ? ` — ${location}` : ''}
        </p>
        <p className="radio-card__desc">{station.description}</p>
      </div>

      <div className="radio-card__actions">
        <button
          className="play-button"
          onClick={() => play(station)}
          disabled={!station.isActive}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? `Pause ${station.name}` : `Play ${station.name}`}
        >
          {isLoading ? (
            <span className="play-button__spinner" aria-hidden="true" />
          ) : isPlaying ? (
            <PauseIcon />
          ) : (
            <PlayIcon />
          )}
          <span>{!station.isActive ? 'Offline' : isLoading ? 'Connecting' : isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <button
          className={`favorite-button ${isFavorite ? 'favorite-button--active' : ''}`}
          onClick={() => onToggleFavorite(station.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remove ${station.name} from favorites` : `Add ${station.name} to favorites`}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
    </article>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <rect x="2" y="1.5" width="3.5" height="11" fill="currentColor" />
      <rect x="8.5" y="1.5" width="3.5" height="11" fill="currentColor" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2 4 5.8 4c2 0 3.6 1.1 4.4 2.7.5 1 .8 1 1.6 0C12.6 5.1 14.2 4 16.2 4 20 4 21.5 7.8 20 11.2c-2.5 4.7-10 9.3-10 9.3z"
        fill={filled ? 'var(--kumkum)' : 'none'}
        stroke={filled ? 'var(--kumkum)' : 'currentColor'}
        strokeWidth="1.6"
      />
    </svg>
  );
}
