import React, { useState, useEffect, useRef} from "react";

import AddBookManually from "../addBookManually/AddBookManually";
import AddBook from "../addBook/AddBook";
import InfoBar from "../infoBar/InfoBar";
import ShelfBar from "../shelf/ShelfBar";
import Shelf from "../shelf/Shelf";
import BlogForm from "../blog/BlogForm";

import "../shared/assets/style.css"
import "../shared/assets/background_colors.css"

// const booksController = require("./controllers/books/books_controller.js");



function App() {

  const [API_URL, setAPI_URL] = useState("https://becky-books-server.herokuapp.com");
  const [books, setBooks] = useState([]); // books from a specific shelf
  const [allBooks, setAllBooks] = useState([])
  const [infoBarContext, setInfoBarContext] = useState("bookshelf");
  const [shelfContext, setShelfContext] = useState("to-read");
  const [location, setLocation] = useState("shelf")
  const [shelfLoading, setShelfLoading] = useState(true);

  const myRef = useRef(null);

  useEffect(() => {
    getBooks();

  }, [shelfContext]);

  const getBooks = () => {
      
    fetch(`${API_URL}/${shelfContext}`)
   .then(response => {
     return response.json();
   })
   .then(data => {
     setBooks(data);
   });
}

  function getAllBooks() {
      
    fetch(`${API_URL}/all-books`)
   .then(response => {
     return response.json();
   })
   .then(data => {
     setAllBooks(data);
   });
}
  
  const addToShelf = (title, author, description, shelf) => {
    let id = ""
    let cover = ""
    if(shelf=="favorite"){
      shelf="to-read";
    } else if(shelf=="menu_book") {
      shelf="am-reading";
    } else if(shelf=="check_circle"){
      shelf="have-read";
    }

    fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, author, description, shelf}),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        id=data["id"]
        console.log(id)

        alert(`${title} added to ${shelf}`);

      });

    // fetch to add image to book just created
    fetch(`https://openlibrary.org/search.json?q=${title}&fields=title,cover_edition_key&limit=1`)
      .then(response => {
        return response.json();
      })
      .then(data => {
              let cover_id=data.docs[0].cover_edition_key
              // 
              fetch(`https://covers.openlibrary.org/b/olid/${cover_id}-M.jpg`)
                  .then(response => {
                      return response.blob();
                  })
                  .then(data => {
                  
                      fetch(`${API_URL}/update-image/${id}`, {
                        method: 'POST',
                        headers: {
                          "Content-Type": "application/octet-stream"
                        },
                        body: data
                      })
                      .then(response => {
                          return response.text();
                      })
                      .then(data => {
                        console.log(data);
                        // alert("added image");

                        getBooks();
                      });
                  });

                });             
  }

  const moveToShelf = (id, shelf) => {
    if(shelf=="favorite"){
      shelf="to-read";
    } else if(shelf=="menu_book") {
      shelf="am-reading";
    } else if(shelf=="check_circle"){
      shelf="have-read";
    }

    fetch(`${API_URL}/move-book`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, shelf}),
    })
    .then(response => {
      return response.json();
    })
    .then(data =>{
      alert(`${data[0]["title"]} moved to ${data[0]["shelf"]}`)
      getBooks();
    })
  }

  function deleteBook(id) {
    
    let result = window.confirm("Delete Book?");
      
    if(result){
      fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
            return response.text();
        })
        .then(data => {
          alert("book removed from shelf");
          getBooks();
        });
    }
  }

  const addArticle = (title, description, book_id, content) => {

    fetch(`${API_URL}/add-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description, book_id, content}),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        alert(`blog posted!`);
        console.log(data);
      });
  }
  
  if(infoBarContext=="bookshelf"){
    return (
      <>
        <div>
          <div id="infobar">
            <InfoBar infoBarContext={infoBarContext} setInfoBarContext={setInfoBarContext}/>
          </div>
          <div id="shelfbar">
            <ShelfBar shelfContext={shelfContext} setShelfContext={setShelfContext}/>
          </div>
          <div id="addbook">
            <AddBook addToShelf={addToShelf} apiUrl={API_URL} location={location} setLocation={setLocation} shelfContext={shelfContext}/>
          </div>
          <div>
            <Shelf books={books} moveToShelf={moveToShelf} addToShelf={addToShelf} apiUrl={API_URL} deleteBook={deleteBook} shelfContext={shelfContext} location={location}/>  
          </div>
        </div>
      </>
    );
  } else{
    return(
      <>
        <div>
          <InfoBar infoBarContext={infoBarContext} setInfoBarContext={setInfoBarContext}/>
          <BlogForm allBooks={allBooks} getAllBooks={getAllBooks} addArticle={addArticle}/>
        </div>
      </>
    );
  }

  
}

export default App;
