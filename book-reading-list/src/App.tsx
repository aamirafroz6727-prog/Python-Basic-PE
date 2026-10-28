import { useMemo, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useReadingList } from '@/hooks/useReadingList';
import { AddBookForm } from '@/components/AddBookForm';
import { FilterBar } from '@/components/FilterBar';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import { Summary } from '@/components/Summary';
import type { ReadingStatus } from '@/types';

type Filter = 'all' | ReadingStatus;

function App() {
  const { books, addBook, updateStatus, removeBook } = useReadingList();
  const [filter, setFilter] = useState<Filter>('all');

  const counts = useMemo(
    () => ({
      all: books.length,
      'want-to-read': books.filter((b) => b.status === 'want-to-read').length,
      reading: books.filter((b) => b.status === 'reading').length,
      finished: books.filter((b) => b.status === 'finished').length,
    }),
    [books]
  );

  const visibleBooks = useMemo(
    () => (filter === 'all' ? books : books.filter((b) => b.status === filter)),
    [books, filter]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Reading List</h1>
              <p className="text-sm text-gray-500">
                Track books across your reading journey
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-6">
          <AddBookForm onAdd={addBook} />

          {books.length > 0 && (
            <Summary
              total={counts.all}
              reading={counts.reading}
              finished={counts.finished}
            />
          )}

          {books.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Your Books
              </h2>
              <FilterBar active={filter} onChange={setFilter} counts={counts} />
            </div>
          )}

          {books.length === 0 ? (
            <EmptyState />
          ) : visibleBooks.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 px-6 py-12 text-center">
              <p className="text-sm text-gray-500">
                No books in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {visibleBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onUpdateStatus={updateStatus}
                  onRemove={removeBook}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
