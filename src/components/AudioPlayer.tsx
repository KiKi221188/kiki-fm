import { usePlayer } from '../hooks/PlayerContext';
import './AudioPlayer.css';

export function AudioPlayer() {
  const { currentStation, status, volume, muted, togglePlayPause, retry, setVolume, toggleMute } =
    usePlayer();

  if (!currentStation) return null;

  return (
    <div className="audio-player" role="region" aria-label="Now playing">
      <div className="container audio-player__row">
        <div className="audio-player__station">
          <img src={currentStation.logo} alt="" className="audio-player__logo" />
          <div className="audio-player__text">
            <strong>{currentStation.name}</strong>
            <span className="audio-player__status">
              {status === 'loading' && 'Connecting...'}
              {status === 'playing' && 'Now playing'}
              {status === 'paused' && 'Paused'}
              {status === 'error' && 'Unable to connect to this station.'}
            </span>
          </div>
        </div>

        <div className="audio-player__controls">
          {status === 'error' ? (
            <button className="audio-player__retry" onClick={retry}>
              Retry
            </button>
          ) : (
            <button
              className="audio-player__play"
              onClick={togglePlayPause}
              aria-label={status === 'playing' ? 'Pause' : 'Play'}
            >
              {status === 'loading' ? (
                <span className="audio-player__spinner" aria-hidden="true" />
              ) : status === 'playing' ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
            </button>
          )}

          <div className="audio-player__volume">
            <button
              onClick={toggleMute}
              aria-label={muted || volume === 0 ? 'Unmute' : 'Mute'}
              className="audio-player__mute"
            >
              {muted || volume === 0 ? <MuteIcon /> : <VolumeIcon />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="audio-player__slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 1.5v11l9-5.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" aria-hidden="true">
      <rect x="2" y="1.5" width="3.5" height="11" fill="currentColor" />
      <rect x="8.5" y="1.5" width="3.5" height="11" fill="currentColor" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M2 6.5v5h3l4 3v-11l-4 3z" fill="currentColor" />
      <path d="M12 6a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M2 6.5v5h3l4 3v-11l-4 3z" fill="currentColor" />
      <path d="M12 6.5l4 4m0-4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
