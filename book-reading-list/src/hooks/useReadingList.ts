import { useCallback, useEffect, useState } from 'react';
import type { Book, ReadingStatus } from '@/types';

const STORAGE_KEY = 'reading-list-books';

function loadBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Book[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useReadingList() {
  const [books, setBooks] = useState<Book[]>(() => loadBooks());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch {
      /* ignore quota errors */
    }
  }, [books]);

  const addBook = useCallback(
    (title: string, status: ReadingStatus): boolean => {
      const trimmed = title.trim();
      if (!trimmed) return false;
      const lower = trimmed.toLowerCase();
      let isDuplicate = false;
      setBooks((prev) => {
        if (prev.some((b) => b.title.toLowerCase() === lower)) {
          isDuplicate = true;
          return prev;
        }
        const book: Book = {
          id:
            typeof crypto !== 'undefined' && 'randomUUID' in crypto
              ? crypto.randomUUID()
              : String(Date.now() + Math.random()),
          title: trimmed,
          status,
          createdAt: Date.now(),
        };
        return [book, ...prev];
      });
      return !isDuplicate;
    },
    []
  );

  const updateStatus = useCallback((id: string, status: ReadingStatus) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }, []);

  const removeBook = useCallback((id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { books, addBook, updateStatus, removeBook };
}
