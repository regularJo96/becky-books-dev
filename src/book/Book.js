import React, { useState, useEffect} from "react";

import "./Book.css"

function Book(props){

  const [adds, setAdds] = useState(["am-reading", "have-read"]);

  useEffect(() => {
    if(props.shelfContext=="to-read"){
      setAdds(["am-reading", "have-read"]);
    }
    else if(props.shelfContext=="am-reading"){
      setAdds(["to-read", "have-read"]);
    }
    else if(props.shelfContext=="have-read"){
      setAdds(["to-read", "am-reading"]);
    }
    
  }, [props.shelfContext]);
  
  let author = "";
  try{
    author = props.book.author_name[0]
  }
  catch{
    author = props.book.author
  }

  let title = props.book.title;
  let cover_id = "No Cover Found";
  let description = "none"
  let shelf = ""

  if(props.location == "search"){
    if(cover_id == "No Cover Found"){
      return(
        <>
          <div className="book-container">
            <div className="book-item text-bold default-image bg-green-dark border-round title">
              {title}
              <div className="add-to-shelf">
                <div className="add bg-wine pointer" onClick={() => {props.addToShelf(title, author, description, 'to-read')}}>+ To Read</div>
                <div className="add bg-wine pointer" onClick={() => {props.addToShelf(title, author, description, 'am-reading')}}>+ Am Reading</div>
                <div className="add bg-wine pointer" onClick={() => {props.addToShelf(title, author, description, 'have-read')}}>+ Have Read</div>
              </div>
            </div>
            
            <div id="title" className="book-item text-bold overflow-title">{title}</div>
            {/* <p>{description}</p> */}
            <div id="author" className="book-item overflow-title">{author}</div>
            {/* <div className="book-item">ISBN: {isbn}</div> */}
          </div>
        </>
      );
    } else{
      return(
        <>
          <div className="book-container">
          <div className="tooltip">{title}</div>
            <img className="book-item border-gold pointer" src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`} alt={`${title}`} height="209px;" width="140px;"></img>
            <div id="title" className="book-item text-bold overflow-title">{title}</div>
            {/* <p>{description}</p> */}
            <div className="book-item overflow-title">{author}</div>
            {/* <div className="book-item">ISBN: {isbn}</div> */}
          </div>
        </>
      );
    }
  }
  else{
    if(cover_id == "No Cover Found"){
      return(
        <>
          <div className="book-container">
            <div className="book-item text-bold default-image bg-green-dark border-round cover">
              <div className="remove pointer" onClick={() => {props.deleteBook(props.book.id)}}>
                <span class="material-symbols-outlined">
                  delete
                </span>
              </div>

              <div className="bookmarks">
                <div className="one bg-wine border-round pointer" onClick={() => {props.addToShelf(title, author, description, adds[0])}}>+ {adds[0]}</div>
                <div className="two bg-wine border-round pointer" onClick={() => {props.addToShelf(title, author, description, adds[1])}}>+ {adds[1]}</div>
              </div>


              
              <div className="padding-10px title">
                {title}
              </div>
             
            </div>
            
            <div id="title" className="book-item text-bold overflow-title">{title}</div>
            {/* <p>{description}</p> */}
            <div id="author" className="book-item overflow-title">{author}</div>
            {/* <div className="book-item">ISBN: {isbn}</div> */}
          </div>
        </>
      );
    } else{
      return(
        <>
          <div className="book-container">
          <div className="tooltip">{title}</div>
            <img className="book-item border-gold pointer" src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`} alt={`${title}`} height="209px;" width="140px;"></img>
            <div id="title" className="book-item text-bold overflow-title">{title}</div>
            {/* <p>{description}</p> */}
            <div className="book-item overflow-title">{author}</div>
            {/* <div className="book-item">ISBN: {isbn}</div> */}
          </div>
        </>
      );
    }
  }
}

export default Book;