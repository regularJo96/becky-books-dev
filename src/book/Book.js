import React, { useState, useEffect} from "react";

import "./Book.css";
import "../addBySearch/AddBySearch.css"
import "../shared/assets/style.css"

function Book(props){

  const [adds, setAdds] = useState(["menu_book", "check_circle", "delete"]);
  const [tipTitle, setTipTitle] = useState(["'To Read'","'Am Reading'","'Have Read'"])
  const [expand, setExpand] = useState("more-info hidden");

  function handleExpand(e){
    setExpand("container position-absolute bottom-0 start-0 bg-wine text-white");
  }

  function handleExpandClose(e){
    setExpand("hidden");
  }

  function handleBookAction(title, author, description, shelf){
    if(shelf=="delete"){
      props.deleteBook(props.book.id);
    }
    else{
      props.addToShelf(title, author, description, shelf);
    }
  }

  function updateToolTipAndAdds(){
    if(props.shelfContext=="to-read"){
      setTipTitle(["'Am Reading'", "'Have Read'", "Delete"]);
      setAdds(["menu_book", "check_circle", "delete"]);
    }
    else if(props.shelfContext=="am-reading"){
      setTipTitle(["'To Read'", "'Have Read'", "Delete"]);
      setAdds(["favorite", "check_circle", "delete"]);
    }
    else if(props.shelfContext=="have-read"){
      setTipTitle(["'To Read'", "'Am Reading'", "Delete"]);
      setAdds(["favorite", "menu_book", "delete"]);
    }
  }

  useEffect(updateToolTipAndAdds, [props.shelfContext]);

  useEffect(() => {
    if(props.location=="search"){
      setTipTitle(["'To Read'", "'Am Reading'", "Have Read"]);
      setAdds(["favorite", "menu_book", "check_circle"]);
    }
    else{
      updateToolTipAndAdds()
    }

  }, [props.location]);

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

  
    if(cover_id == "No Cover Found"){
        return(
          <>
  
            <div className="card border-0 bg-transparent rounded-0">
              <div className="book-cover bg-white border-round" onMouseEnter={handleExpand} onMouseLeave={handleExpandClose}>
                
              <div className={expand}>
                {/* <div className="book-info"></div> */}
                <div className="row align-items-center">
                  <div className="col-4">
                      <span class="material-symbols-outlined pointer" data-toggle="tooltip" data-placement="bottom" title={`Add To ${tipTitle[0]}`} onClick={() => {handleBookAction(title, author, description, `${adds[0]}`)}}>{adds[0]}</span>
                  </div>
                  <div className="col-4">
                    <span class="material-symbols-outlined pointer" data-toggle="tooltip" data-placement="bottom" title={`Add To ${tipTitle[1]}`} onClick={() => {handleBookAction(title, author, description, `${adds[1]}`)}}>{adds[1]}</span>
                  </div>
                  <div className="col-4">
                    <span class="material-symbols-outlined pointer" data-toggle="tooltip" data-placement="bottom" title={`${tipTitle[2]}`} onClick={() => {handleBookAction(title, author, description, `${adds[2]}`)}}>{adds[2]}</span>
                  </div>
                </div>
              </div>
                
                <div id="title" className="title center-all">
                  {title}
                  <p>
                    <small>(No Cover Found)</small>
                  </p>
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

export default Book;