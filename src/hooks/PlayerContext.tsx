import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { PlayerStatus, Station } from '../types';

interface PlayerContextValue {
  currentStation: Station | null;
  status: PlayerStatus;
  volume: number;
  muted: boolean;
  play: (station: Station) => void;
  togglePlayPause: () => void;
  retry: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [status, setStatus] = useState<PlayerStatus>('idle');
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    const handleWaiting = () => setStatus('loading');
    const handlePlaying = () => setStatus('playing');
    const handlePause = () => setStatus((s) => (s === 'error' ? s : 'paused'));
    const handleError = () => setStatus('error');

    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  const play = useCallback((station: Station) => {
    const audio = audioRef.current;
    if (!audio) return;

    // A station connection is only opened when the listener presses
    // Play — never pre-loaded or auto-started for every card on screen.
    if (currentStation?.id !== station.id) {
      setCurrentStation(station);
      setStatus('loading');
      audio.src = station.streamUrl;
      audio.play().catch(() => setStatus('error'));
    } else if (audio.paused) {
      setStatus('loading');
      audio.play().catch(() => setStatus('error'));
    } else {
      audio.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStation]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentStation) return;
    if (audio.paused) {
      setStatus('loading');
      audio.play().catch(() => setStatus('error'));
    } else {
      audio.pause();
    }
  }, [currentStation]);

  const retry = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentStation) return;
    setStatus('loading');
    audio.src = currentStation.streamUrl;
    audio.play().catch(() => setStatus('error'));
  }, [currentStation]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (v > 0 && muted) setMuted(false);
  }, [muted]);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  return (
    <PlayerContext.Provider
      value={{
        currentStation,
        status,
        volume,
        muted,
        play,
        togglePlayPause,
        retry,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within a PlayerProvider');
  return ctx;
}
