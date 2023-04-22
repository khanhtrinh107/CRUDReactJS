import { useEffect } from "react"
import { useState } from "react"

export const PostList = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="post-list-container">
          <ul>
            {
              posts.map(post => {
                return <li>
                        <img key={post.id} src={post.url} alt={post.title} className="post-list-image"/>
                      </li>
              })
            }
          </ul>
        </div>
      );
}
