import { BookOpen, Bookmark, BookCheck } from 'lucide-react';

interface SummaryProps {
  total: number;
  reading: number;
  finished: number;
}

export function Summary({ total, reading, finished }: SummaryProps) {
  const stats = [
    {
      label: 'Total Books',
      value: total,
      icon: BookOpen,
      bg: 'bg-sky-50',
      text: 'text-sky-600',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: Bookmark,
      bg: 'bg-amber-50',
      text: 'text-amber-600',
    },
    {
      label: 'Finished',
      value: finished,
      icon: BookCheck,
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-200 bg-white p-3 text-center shadow-sm sm:flex-row sm:gap-3 sm:px-4 sm:py-3.5"
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${stat.bg} ${stat.text}`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <div className="text-lg font-bold leading-tight text-gray-900 sm:text-xl">
                {stat.value}
              </div>
              <div className="text-[0.65rem] font-medium text-gray-500 sm:text-xs">
                {stat.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
