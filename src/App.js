import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage.";
import AllBooksPage from "./pages/AllBooksPage";
import AddBookPage from "./pages/AddBookPage";
import UpdateBookPage from "./pages/UpdateBookPage";
import AllAuthorsPage from "./pages/AllAuthorsPage";
import AddAuthorPage from "./pages/AddAuthorPage";
import AllLoansPage from "./pages/AllLoansPage";
import InfoBookPage from "./pages/InfoBookPage";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/all-books" element={<AllBooksPage />} />
          <Route path="/info-book/:bookId" element={<InfoBookPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/all-books/update-book/:bookId"element={<UpdateBookPage />} />

          <Route path="/all-authors" element={<AllAuthorsPage />} />
          <Route path="/add-author" element={<AddAuthorPage />} />

          <Route path="/all-loans" element={<AllLoansPage />} />

          <Route path="/search-results" element={<SearchResultsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
