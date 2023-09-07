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
import AllUsersPage from "./pages/AllUsersPage";
import AddUserPage from "./pages/AddUserPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import UpdateAuthorPage from "./pages/UpdateAuthorPage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={<AddUserPage />} />
          <Route path="/authenticate" element={<AuthPage />} />

          <Route path="/all-books" element={<AllBooksPage />} />
          <Route path="/info-book/:bookId" element={<InfoBookPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/all-books/add-book" element={<AddBookPage />} />  {/* annoying */}
          <Route path="/all-books/update-book/:bookId" element={<UpdateBookPage />} />
          <Route path="/info-book/:bookId/update-book/:bookId" element={<UpdateBookPage />} /> {/* annoying */}

          <Route path="/all-authors" element={<AllAuthorsPage />} />
          <Route path="/add-author" element={<AddAuthorPage />} />
          <Route path="/all-authors/add-author" element={<AddAuthorPage />} /> {/* annoying */}
          <Route path="/all-authors/update-author/:authorId" element={<UpdateAuthorPage />} />

          <Route path="/all-users" element={<AllUsersPage />} />
          <Route path="/all-users/update-user/:userId" element={<UpdateUserPage />} />
          <Route path="/all-loans" element={<AllLoansPage />} />

          <Route path="/search-results" element={<SearchResultsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
