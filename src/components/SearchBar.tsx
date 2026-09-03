import './SearchBar.css';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="search-bar">
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12.5 12.5 17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search radio stations..."
        aria-label="Search radio stations"
      />
    </div>
  );
}
