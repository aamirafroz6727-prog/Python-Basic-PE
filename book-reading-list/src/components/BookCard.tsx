import { Trash2 } from 'lucide-react';
import {
  STATUS_META,
  STATUS_ORDER,
  type Book,
  type ReadingStatus,
} from '@/types';

interface BookCardProps {
  book: Book;
  onUpdateStatus: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export function BookCard({ book, onUpdateStatus, onRemove }: BookCardProps) {
  const meta = STATUS_META[book.status];

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${meta.dot}`} />
          <h3 className="text-base font-semibold leading-snug text-gray-900">
            {book.title}
          </h3>
        </div>
        <button
          onClick={() => onRemove(book.id)}
          aria-label="Remove book"
          className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${meta.badge}`}
        >
          {meta.label}
        </span>
        <div className="ml-auto flex items-center gap-1">
          {STATUS_ORDER.map((s) => {
            const isActive = s === book.status;
            return (
              <button
                key={s}
                onClick={() => onUpdateStatus(book.id, s)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {STATUS_META[s].label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
