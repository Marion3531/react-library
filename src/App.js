import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.';
import AllBooksPage from './pages/AllBooksPage';
import AddBookPage from './pages/AddBookPage';
import UpdateBookPage from './pages/UpdateBookPage';
import AllAuthorsPage from './pages/AllAuthorsPage';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/all-books" element={<AllBooksPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/all-books/update-book/:bookId" element={<UpdateBookPage />} />
          <Route path="/all-authors" element={<AllAuthorsPage />} />
      </Routes>
    </Router>

  );

}

export default App;
