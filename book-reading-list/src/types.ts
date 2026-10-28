export type ReadingStatus = 'want-to-read' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  createdAt: number;
}

export const STATUS_META: Record<
  ReadingStatus,
  { label: string; color: string; dot: string; badge: string }
> = {
  'want-to-read': {
    label: 'Want to Read',
    color: 'text-amber-700',
    dot: 'bg-amber-400',
    badge: 'bg-amber-100 text-amber-700',
  },
  reading: {
    label: 'Reading',
    color: 'text-sky-700',
    dot: 'bg-sky-500',
    badge: 'bg-sky-100 text-sky-700',
  },
  finished: {
    label: 'Finished',
    color: 'text-emerald-700',
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700',
  },
};

export const STATUS_ORDER: ReadingStatus[] = ['want-to-read', 'reading', 'finished'];
