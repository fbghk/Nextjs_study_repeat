// import { useState, useEffect } from 'react';

// export default function Home() {
//   const [title, setTitle] = useState('');
//   const [books, setBooks] = useState([]);

//   const fetchBooks = async () => {
//     const response = await fetch('http://localhost:3000/books');
//     const data = await response.json();
//     setBooks(data);
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const handleButtonClick = async () => {
//     const response = await fetch('http://localhost:3000/books', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         title,
//         author: "Author Name",
//         publisher: "Publisher",
//         genre: "Genre",
//         price: 20,
//         introduce: "Book introduction",
//         hashtags: ["example"],
//       }),
//     });

//     if (response.ok) {
//       setTitle('');
//       fetchBooks(); // 책 목록을 다시 불러옵니다.
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter book title"
//       />
//       <button onClick={handleButtonClick}>Add Book</button>
//       <ul>
//         {books.map((book, index) => (
//           <li key={index}>{book.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

'use client'
import { useState, useEffect } from 'react';

// Book 인터페이스 정의
interface Book {
  title: string;
  author: string;
  publisher: string;
  genre: string;
  price: number;
  introduce: string;
  hashtags: string[];
}

export default function Home() {
  const [title, setTitle] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Book[] = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleButtonClick = async () => {
    try {
      const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author: "Author Name",
          publisher: "Publisher",
          genre: "Genre",
          price: 20,
          introduce: "Book introduction",
          hashtags: ["example"],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setTitle('');
      fetchBooks(); // 책 목록을 다시 불러옵니다.
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter book title"
      />
      <button onClick={handleButtonClick}>Add Book</button>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}