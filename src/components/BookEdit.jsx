import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';

function BookEdit({ book, onEditSubmit }) {
  const [newTitle, setNewTitle] = useState(book.title);
  const { updateBookById } = useBooksContext();

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditSubmit();
    updateBookById(book.id, newTitle);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='book-edit'>
        <label htmlFor='title'>Title</label>
        <input
          className='input'
          value={newTitle}
          onChange={handleChange}
          type='text'
          name='title'
        />
        <button className='button is-primary'>Save</button>
      </form>
    </div>
  );
}

export default BookEdit;
