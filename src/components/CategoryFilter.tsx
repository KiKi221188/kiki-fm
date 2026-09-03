import './CategoryFilter.css';

interface Props {
  categories: string[];
  active: string | null;
  onChange: (category: string | null) => void;
}

export function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div className="category-filter" role="group" aria-label="Filter by category">
      <button
        className={`category-pill ${active === null ? 'category-pill--active' : ''}`}
        onClick={() => onChange(null)}
        aria-pressed={active === null}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-pill ${active === cat ? 'category-pill--active' : ''}`}
          onClick={() => onChange(active === cat ? null : cat)}
          aria-pressed={active === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
