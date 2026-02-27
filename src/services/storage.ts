import { get, set } from 'idb-keyval';

export interface SavedBook {
  id: string;
  name: string;
  theme: string;
  age: string;
  cover: string;
  pages: string[];
  createdAt: number;
}

export async function saveBook(book: SavedBook) {
  const books = await getBooks();
  books.push(book);
  await set('magical-books', books);
}

export async function getBooks(): Promise<SavedBook[]> {
  const books = await get('magical-books');
  return books || [];
}

export async function deleteBook(id: string) {
  const books = await getBooks();
  const filtered = books.filter(b => b.id !== id);
  await set('magical-books', filtered);
}
