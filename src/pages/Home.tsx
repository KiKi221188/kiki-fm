import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import stations from '../data/stations.json';
import type { Station } from '../types';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { RadioGrid } from '../components/RadioGrid';
import { useFavorites } from '../hooks/useFavorites';
import { filterStations, getCategories } from '../utils/search';

const allStations = stations as Station[];

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const { favorites, toggleFavorite } = useFavorites();

  const categories = useMemo(() => getCategories(allStations), []);
  const activeCategory = searchParams.get('category');

  const results = useMemo(
    () => filterStations(allStations, query, activeCategory),
    [query, activeCategory]
  );

  function handleCategoryChange(category: string | null) {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  }

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <h1 className="hero__title">
            KiKi FM
            <span className="hero__subtitle">Your Tamil Radio World</span>
          </h1>
          <p className="hero__tagline">Listen to your favourite Tamil radio stations online.</p>
          <div className="hero__search">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>
      </section>

      <section className="container section">
        <CategoryFilter categories={categories} active={activeCategory} onChange={handleCategoryChange} />
      </section>

      <section className="container section section--grid">
        <RadioGrid stations={results} favorites={favorites} onToggleFavorite={toggleFavorite} />
      </section>
    </>
  );
}
