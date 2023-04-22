import { useEffect, useState } from "react";
import { useParams , Navigate, Link  } from "react-router-dom";

function Books(props) {
    const params = useParams();
    const [book, setBook] = useState({});
    const bookcode = params.bookcode;

    const onSaveClick = () => {
        // send data to the backend via POST
        fetch(`http://localhost:8080/book/save/${bookcode}`, {
            method: bookcode < 0 ? "POST" : "PUT" ,
            mode: "cors",
            body: JSON.stringify(book), // body data type must match "Content type" header
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch(`http://localhost:8080/book/${bookcode}`)
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(err => console.log(err))
            console.log(book)
    },[]);

    return (
        <div>
            <h1>{bookcode < 0 ? "New Book" : `Book ${bookcode}`}</h1>
            Title:
            <input type="text" value={book.title}
                onChange={e => setBook({ ...book, title: e.target.value })} />
            <br />
            Author:
            <input type="text" value={book.author}
                onChange={e => setBook({ ...book, author: e.target.value })} />
            <br />
            Category:
            <input type="text" value={book.category}
                onChange={e => setBook({ ...book, category: e.target.value })} />
            <br />
            Approved:
            <input type="checkbox" value={book.approved}
                onChange={e => setBook({ ...book, approved: e.target.checked })} />
            <br />
            <Link to={'/'} className="save"  onClick={onSaveClick}>Save</Link>
        </div>
    )
}
export default Books;