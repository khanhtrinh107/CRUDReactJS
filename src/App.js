import { Route, Routes } from "react-router-dom";
import "./App.css";
import Books from "./components/Books";
import Book from "./components/Book";

function App() {

  //test
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="books/:bookcode" element={<Book />} />
      </Routes>
    </div>
  );
}

export default App;
