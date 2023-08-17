import { useEffect, useState } from 'react';
import axios from 'axios';

import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

const URL = 'http://localhost:3001/books';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks();
  }, []);

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

  const updateTitleById = async (id, newTitle) => {
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

  return (
    <div className='app'>
      <h1>Reading List</h1>
      <BookList
        books={books}
        onDelete={deleteBookById}
        onEdit={updateTitleById}
      />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
