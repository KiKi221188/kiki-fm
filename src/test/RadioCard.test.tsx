import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { RadioCard } from '../components/RadioCard';
import { PlayerProvider } from '../hooks/PlayerContext';
import type { Station } from '../types';

const station: Station = {
  id: 'kiki-tamil',
  name: 'KiKi FM Tamil',
  description: 'Non-stop Tamil hits',
  streamUrl: 'https://example.com/stream',
  logo: '/images/stations/kiki-tamil.svg',
  category: 'Tamil',
  city: 'Chennai',
  country: 'India',
  isActive: true,
};

function renderCard(favorite = false) {
  return render(
    <MemoryRouter>
      <PlayerProvider>
        <RadioCard station={station} isFavorite={favorite} onToggleFavorite={vi.fn()} />
      </PlayerProvider>
    </MemoryRouter>
  );
}

describe('RadioCard', () => {
  it('renders station name, category and location', () => {
    renderCard();
    expect(screen.getByText('KiKi FM Tamil')).toBeInTheDocument();
    expect(screen.getByText(/Tamil/)).toBeInTheDocument();
    expect(screen.getByText(/Chennai/)).toBeInTheDocument();
  });

  it('shows a Play button for an active station', () => {
    renderCard();
    expect(screen.getByRole('button', { name: /play kiki fm tamil/i })).toBeEnabled();
  });

  it('disables the Play button for an offline station', () => {
    render(
      <MemoryRouter>
        <PlayerProvider>
          <RadioCard station={{ ...station, isActive: false }} isFavorite={false} onToggleFavorite={vi.fn()} />
        </PlayerProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /play kiki fm tamil/i })).toBeDisabled();
  });

  it('reflects favorite state on the heart button', () => {
    renderCard(true);
    expect(screen.getByRole('button', { name: /remove kiki fm tamil from favorites/i })).toBeInTheDocument();
  });
});
