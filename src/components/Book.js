import { useEffect, useState } from "react";
import { useParams , Link , useNavigate   } from "react-router-dom";

function Books(props) {
    const params = useParams();
    const [book, setBook] = useState({});
    const [isDirty, setIsDirty] = useState(false);
    const [message , setMessage] = useState('')
    const bookcode = params.bookcode;
    const navigate = useNavigate();
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
            .then(data => {
                if(data.message !== undefined){
                    setMessage(data.message)
                }
                else{
                    setBook(data)
                    navigate('/');
                }
            })
            .catch(err => console.log(err))
    }

    console.log(book)

    useEffect(() => {
        fetch(`http://localhost:8080/book/${bookcode}`)
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(err => console.log(err))
    },[]);
    return (
        <div>
            <h1>{bookcode < 0 ? "New Book" : `Book ${bookcode}`}</h1>
            <h2>{message}</h2>
            Title:
            <input type="text" value={book.title}
                onChange={e => {
                    setBook({ ...book, title: e.target.value })
                    setIsDirty(true)
                }
                } />
            <br />
            Author:
            <input type="text" value={book.author}
                 onChange={e => {
                    setBook({ ...book, author: e.target.value })
                    setIsDirty(true)
                }
                } />
            <br />
            Category:
            <input type="text" value={book.category}
                 onChange={e => {
                    setBook({ ...book, category: e.target.value })
                    setIsDirty(true)
                }
                } />
            <br />
            Approved:
            <input type="checkbox" value="true"
    checked={book.approved}
    onChange={e => {
        setBook({ ...book, approved: e.target.value })
        setIsDirty(true)
    }
    }  />
            <br />
            <button  className="save" disabled = {!isDirty}  onClick={onSaveClick}>Save</button>
        </div>
    )
}
export default Books;