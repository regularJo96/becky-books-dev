import React, { useState, useEffect} from "react";

function Book(props){

  const [removeButtonContext, setRemoveButtonContext] = useState(true);

  useEffect(() => {
    changeRemove();
  }, [props.location]);

  function changeRemove(){
    if(props.location == "search"){
      setRemoveButtonContext(false);
    }
    else{
      setRemoveButtonContext(true)
    }
  }

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
  let shelf = "to read"
  if(removeButtonContext){
    if(cover_id == "No Cover Found"){
      return(
        <>
          <div className="book">
            <div className="book-item text-bold default-image bg-green-dark border-gold">{title}
              <div className="pointer" onClick={() => {props.deleteBook(props.book.id)}}>Remove Book</div>
              <div className="tooltip pointer" onClick={() => {props.addToToRead(title, author, description, shelf)}}>Add to Shelf</div>
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
          <div className="book">
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
          <div className="book">
            <div className="book-item text-bold default-image bg-green-dark border-gold">{title}
              <div className="tooltip pointer" onClick={() => {props.addToToRead(title, author, description, shelf)}}>Add to Shelf</div>
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
          <div className="book">
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