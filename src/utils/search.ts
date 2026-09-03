import type { Station } from '../types';

/**
 * Matches a station against a free-text query across the fields a
 * listener would reasonably search by: name, description, city,
 * country and category. Case-insensitive, no external search engine.
 */
export function matchesQuery(station: Station, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    station.name,
    station.description,
    station.city,
    station.country,
    station.category,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(q);
}

export function filterStations(
  stations: Station[],
  query: string,
  category: string | null
): Station[] {
  return stations.filter((station) => {
    const inCategory = !category || station.category === category;
    return inCategory && matchesQuery(station, query);
  });
}

export function getCategories(stations: Station[]): string[] {
  const set = new Set(stations.map((s) => s.category));
  return Array.from(set).sort();
}
