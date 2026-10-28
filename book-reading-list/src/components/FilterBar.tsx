interface FilterBarProps {
  active: 'all' | 'want-to-read' | 'reading' | 'finished';
  onChange: (filter: 'all' | 'want-to-read' | 'reading' | 'finished') => void;
  counts: { all: number; 'want-to-read': number; reading: number; finished: number };
}

const FILTERS: { key: FilterBarProps['active']; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'want-to-read', label: 'Want to Read' },
  { key: 'reading', label: 'Reading' },
  { key: 'finished', label: 'Finished' },
];

export function FilterBar({ active, onChange, counts }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const isActive = active === f.key;
        const count = counts[f.key];
        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              isActive
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f.label}
            <span
              className={`inline-flex items-center justify-center rounded-full px-1.5 text-xs ${
                isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
