import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Books(props) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/books2")
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((err) => console.log(err))
    }, []);
    const handleSearch = (keyword) => {
        setBooks(books.filter(book => {
            return book.title.includes(keyword);
        }))
    }
    const handleDelete = (id ) => {
        fetch(`http://localhost:8080/book/delete/${id}` , {
            method : "DELETE"
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            setBooks(books.filter((book) => {
                return book.bookCode !== id;
            } ))
        })
    }

    return (
        <div>
            <h2 className="text-center">Book List</h2>
            <input placeholder="Enter keyword..." onInput={e => handleSearch(e.target.value)} />
            <div className="row">
                <Link to = 'books/-1'  className="btn btn-primary">Add Book</Link>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered mt-3 bg-light rounded p3">
                    <thead class="table-dark">
                        <tr>
                            <th>BookCode</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th disabled>Approved</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((book) => (
                            <tr key={book.bookCode}>
                                <td>{book.bookCode}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>
                                    <input type="checkbox" defaultChecked={book.approved} />
                                </td>
                                <td>
                                    <Link to={`Books/${book.bookCode}`} className="btn btn-success">Update</Link>
                                    <button  onClick={() => handleDelete(book.bookCode)}  className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Books;