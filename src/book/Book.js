import React, { useState, useEffect} from "react";

import "./Book.css";

function Book(props){

  const [adds, setAdds] = useState(["menu_book", "check_circle"]);
  const [expand, setExpand] = useState("more-info hidden");

  function handleExpand(e){
    setExpand("more-info");
  }

  function handleExpandClose(e){
    setExpand("more-info hidden");
  }

  useEffect(() => {
    if(props.shelfContext=="to-read"){
      setAdds(["menu_book", "check_circle"]);
    }
    else if(props.shelfContext=="am-reading"){
      setAdds(["favorite", "check_circle"]);
    }
    else if(props.shelfContext=="have-read"){
      setAdds(["favorite", "menu_book"]);
    }
    
  }, [props.shelfContext]);

  let author = "";
  try{
    author = props.book.author_name[0];
  }
  catch{
    author = props.book.author;
  }

  let title = props.book.title;
  let cover_id = "No Cover Found";
  let description = "none"
  let shelf = ""

  if(props.location == "search"){
    if(cover_id == "No Cover Found"){
      return(
        <>
            <div className="book-container center-all">
              <div className="book-cover bg-green-dark border-round" onMouseEnter={handleExpand} onMouseLeave={handleExpandClose}>
                <div id="title" className="title center-all">
                  {title}
                </div>
              </div>
              <div className={expand} onMouseEnter={handleExpand} onMouseLeave={handleExpandClose}>
                <div className="book-info"></div>
                <div>
                    <span class="material-symbols-outlined pointer" onClick={() => {props.addToShelf(title, author, description, "favorite")}}>favorite</span>
                </div>
                <div>
                  <span class="material-symbols-outlined pointer" onClick={() => {props.addToShelf(title, author, description, "menu_book")}}>menu_book</span>
                </div>
                <div>
                  <span class="material-symbols-outlined pointer" onClick={() => {props.addToShelf(title, author, description, "check_circle")}}>check_circle</span>
                </div>
              </div>


              <div className="author center-all">
                {author}
              </div>
  
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
  
            <div className="book-container center-all">
              <div className="book-cover bg-green-dark border-round" onMouseEnter={handleExpand} onMouseLeave={handleExpandClose}>
                <div id="title" className="title center-all">
                  {title}
                </div>
              </div>
              <div className={expand} onMouseEnter={handleExpand} onMouseLeave={handleExpandClose}>
                <div className="book-info"></div>
                <div>
                  <span class="material-symbols-outlined pointer" onClick={() => {props.deleteBook(props.book.id)}}>
                    delete
                  </span>
                </div>
                <div>
                    <span class="material-symbols-outlined pointer" onClick={() => {props.addToShelf(title, author, description, adds[0])}}>{adds[0]}</span>
                </div>
                <div>
                  <span class="material-symbols-outlined pointer" onClick={() => {props.addToShelf(title, author, description, adds[1])}}>{adds[1]}</span>
                </div>
              </div>


              <div className="author center-all">
                {author}
              </div>
  
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