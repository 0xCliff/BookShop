import { createContext, useState } from 'react';
import axios from 'axios';

const BooksContext = createContext();
const URL = 'http://localhost:3001/books';

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const getAllBooks = async () => {
    let data = await axios.get(URL).then((res) => res.data);
    setBooks(data);
  };

  const createBook = async (title) => {
    const response = await axios.post(URL, {
      title: title,
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`${URL}/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const updateBookById = async (id, newTitle) => {
    const response = await axios.put(`${URL}/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const valueToShare = {
    getAllBooks,
    createBook,
    deleteBookById,
    updateBookById,
    books,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
