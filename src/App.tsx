import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { RadioDetails } from './pages/RadioDetails';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { usePlayer } from './hooks/PlayerContext';

export function App() {
  const { currentStation } = usePlayer();

  return (
    <div className={`app ${currentStation ? 'app--player-visible' : ''}`}>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/radio/:id" element={<RadioDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <AudioPlayer />
    </div>
  );
}
