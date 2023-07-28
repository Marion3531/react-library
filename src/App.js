import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.';
import AllBooksPage from './pages/AllBooksPage';
import AddBookPage from './pages/AddBookPage';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/all-books" element={<AllBooksPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
      </Routes>
    </Router>

  );

}

export default App;
