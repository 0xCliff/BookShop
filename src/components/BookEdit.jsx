import { useState } from 'react';

function BookEdit({ book, onEditSubmit }) {
  const [newTitle, setNewTitle] = useState(book.title);

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditSubmit(book.id, newTitle);
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
