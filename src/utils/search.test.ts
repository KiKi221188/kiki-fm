import { describe, expect, it } from 'vitest';
import { filterStations, getCategories, matchesQuery } from '../utils/search';
import type { Station } from '../types';

const stations: Station[] = [
  {
    id: 'a',
    name: 'Hello FM',
    description: 'Tamil hits',
    streamUrl: 'https://example.com/a',
    logo: '/a.svg',
    category: 'Tamil Hits',
    city: 'Chennai',
    country: 'India',
    isActive: true,
  },
  {
    id: 'b',
    name: 'Melody Radio',
    description: 'Soft songs',
    streamUrl: 'https://example.com/b',
    logo: '/b.svg',
    category: 'Melody',
    city: 'Madurai',
    country: 'India',
    isActive: true,
  },
];

describe('matchesQuery', () => {
  it('matches by city, case-insensitively', () => {
    expect(matchesQuery(stations[0], 'chennai')).toBe(true);
    expect(matchesQuery(stations[1], 'chennai')).toBe(false);
  });

  it('empty query matches everything', () => {
    expect(matchesQuery(stations[0], '')).toBe(true);
  });
});

describe('filterStations', () => {
  it('filters by category', () => {
    const result = filterStations(stations, '', 'Melody');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('b');
  });

  it('combines query and category', () => {
    const result = filterStations(stations, 'madurai', 'Tamil Hits');
    expect(result).toHaveLength(0);
  });
});

describe('getCategories', () => {
  it('returns unique sorted categories', () => {
    expect(getCategories(stations)).toEqual(['Melody', 'Tamil Hits']);
  });
});
