import React, { useState, useEffect} from "react";

import "./Book.css";
// import "../addBySearch/AddBySearch.css"
import "../shared/assets/style.css"

import coverPlaceholder from "../app/images/the-book-thief.jpg"

function Book(props){

  const [id, setID] = useState(props.book.id);
  const [prompt, setPrompt] = useState("Move to");
  const [cover, setCover] = useState("No Cover Found");
  const [loading, setLoading] = useState(true);
  const [adds, setAdds] = useState(["menu_book", "check_circle", "delete"]);
  const [tipTitle, setTipTitle] = useState(["'To Read'","'Am Reading'","'Have Read'"])
  const [expand, setExpand] = useState("more-info hidden");

  function handleExpand(e){
    setExpand("tool-tips position-absolute bottom-0 start-0 bg-wine text-white");
  }

  function handleExpandClose(e){
    setExpand("hidden");
  }

  function handleBookAction(title, author, description, shelf){
    if(shelf=="delete"){
      props.deleteBook(props.book.id);
    }
    else if(props.location=="search"){
      props.addToShelf(title, author, description, shelf);
    }
    else{
      // need to add a moveBook function and respective API request to do so on server
      props.moveToShelf(props.book.id, shelf);
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

  useEffect(() => {

      setCover(props.cover)
      setLoading(false);

  }, [])

  useEffect(updateToolTipAndAdds, [props.shelfContext]);

  useEffect(() => {
    // getCover(props.book.id)
  }, [props.shelfContext]);

  useEffect(() => {
    if(props.location=="search"){
      setTipTitle(["'To Read'", "'Am Reading'", " Add To 'Have Read'"]);
      setAdds(["favorite", "menu_book", "check_circle"]);
      setPrompt("Add To");
    }
    else{
      updateToolTipAndAdds()
      setPrompt("Move To");
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
  
  let description = "none"
  let shelf = ""
  // setCover("No Cover Found")

  if(loading){
    return(
        <>
          <div>
            Loading books
          </div>
        </>
    );

  } else{

  
    if(cover == "No Cover Found"){
        return(
          <>
  
            <div className="card border-0 bg-transparent rounded-0">
              <div className="book-cover bg-white border-round" onMouseEnter={handleExpand} onMouseLeave={handleExpandClose}>
                
              <div className={expand}>
                {/* <div className="book-info"></div> */}
                <div className="row align-items-center">
                  <div className="col-4">
                      <span class="material-symbols-outlined pointer" data-toggle="tooltip" data-placement="bottom" title={`${prompt} ${tipTitle[0]}`} onClick={() => {handleBookAction(title, author, description, `${adds[0]}`)}}>{adds[0]}</span>
                  </div>
                  <div className="col-4">
                    <span class="material-symbols-outlined pointer" data-toggle="tooltip" data-placement="bottom" title={`${prompt} ${tipTitle[1]}`} onClick={() => {handleBookAction(title, author, description, `${adds[1]}`)}}>{adds[1]}</span>
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
          <div className="card border-0 bg-transparent rounded-0">
            <div className="book-cover bg-white border-round" onMouseEnter={handleExpand} onMouseLeave={handleExpandClose}>
            {/* <div className="tooltip">{title}</div> */}
              {/* <img className="book-item pointer" src={`https://covers.openlibrary.org/b/olid/${cover}-M.jpg`} alt={`${title}`} height="209px;" width="140px;"></img> */}
              <img className="book-item pointer" src={props.cover} alt={`${title}`} height="209px;" width="140px;"></img>
              <div className={expand}>
                  {/* <div className="book-info"></div> */}
                  <div className="row align-items-center">
                    <div className="col-4">
                        <span class="material-symbols-outlined pointer" data-toggle="tooltip" data-placement="bottom" title={`${prompt} ${tipTitle[0]}`} onClick={() => {handleBookAction(title, author, description, `${adds[0]}`)}}>{adds[0]}</span>
                    </div>
                    <div className="col-4">
                      <span class="material-symbols-outlined pointer" data-toggle="tooltip" data-placement="bottom" title={`${prompt} ${tipTitle[1]}`} onClick={() => {handleBookAction(title, author, description, `${adds[1]}`)}}>{adds[1]}</span>
                    </div>
                    <div className="col-4">
                      <span class="material-symbols-outlined pointer" data-toggle="tooltip" data-placement="bottom" title={`${tipTitle[2]}`} onClick={() => {handleBookAction(title, author, description, `${adds[2]}`)}}>{adds[2]}</span>
                    </div>
                  </div>
              </div>
                
            </div>

            <div id="title" className="title center-all">
                {title}
            </div>
            <div className="author center-all">
                  {author}
            </div>

          </div>
          
        </>
      );
    }
  }
}

export default Book;