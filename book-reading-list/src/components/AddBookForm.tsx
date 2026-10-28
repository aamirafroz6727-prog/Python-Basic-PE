import { useState, type FormEvent } from 'react';
import { BookPlus } from 'lucide-react';
import { STATUS_META, STATUS_ORDER, type ReadingStatus } from '@/types';

interface AddBookFormProps {
  onAdd: (title: string, status: ReadingStatus) => boolean;
}

export function AddBookForm({ onAdd }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want-to-read');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Please enter a book title.');
      return;
    }
    if (trimmed.length > 60) {
      setError('Book title must be 60 characters or fewer.');
      return;
    }
    const added = onAdd(trimmed, status);
    if (!added) {
      setError('This book is already in your reading list.');
      return;
    }
    setTitle('');
    setStatus('want-to-read');
    setError('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor="book-title"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Book Title
          </label>
          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. The Great Gatsby"
            className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-gray-900 placeholder-gray-400 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
          {error ? (
            <p className="mt-1 text-sm text-red-500">{error}</p>
          ) : (
            <p
              className={`mt-1 text-right text-xs ${
                title.length > 60 ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              {title.length}/60
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="book-status"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="book-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ReadingStatus)}
            className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-gray-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100 sm:w-auto"
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-sky-700 active:scale-[0.98]"
        >
          <BookPlus className="h-5 w-5" />
          Add Book
        </button>
      </div>
    </form>
  );
}
