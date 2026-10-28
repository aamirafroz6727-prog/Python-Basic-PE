import { BookMarked } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
        <BookMarked className="h-7 w-7" />
      </div>
      <p className="text-base font-medium text-gray-700">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
