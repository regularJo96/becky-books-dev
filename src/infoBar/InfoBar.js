import React, { useState, useEffect} from "react";

import "../shared/assets/style.css"

function InfoBar(props){
  var defaultStyle = "button rounded text-white text-center pointer menu-item";
  
  const [shelvesHighlight, setShelvesHighlight] = useState("");
  const [blogHighlight, setBlogHighlight] = useState("");
  const [shelvesActiveStyle, setShelvesActiveStyle]= useState("button rounded border-white btn-clicked text-center pointer menu-item");
  const [blogActiveStyle, setblogActiveStyle] = useState("button rounded border-white btn-clicked text-center pointer menu-item");

  const handleHighlight = (e, highlight) => {
    if(e.id=="shelves"){
      if(highlight){
        setShelvesActiveStyle("button rounded border-white text-center pointer menu-item");
        setShelvesHighlight("highlight");
      } else{
        setShelvesHighlight("");
        setShelvesActiveStyle("button rounded border-white btn-clicked text-center pointer menu-item");
      }
    } else{
      if(highlight){
        setblogActiveStyle("button rounded border-white text-center pointer menu-item");
        setBlogHighlight("highlight");
      } else{
        setBlogHighlight("");
        setblogActiveStyle("button rounded border-white btn-clicked text-center pointer menu-item");
      }
    }
  }

  const scrollDown = (id) => {
    const element = document.getElementById(id);

    // Get the position
    const rect = element.getBoundingClientRect();

    let offset = window.innerHeight*.1;

    window.scrollBy({top: rect.top-offset, left: 0, behavior: 'smooth'})
  };

  function setBookshelf(){
    props.setInfoBarContext("bookshelf");
    scrollDown("shelves");
  }

  function setBlog(){
    console.log(props.infoBarContext)
    props.setInfoBarContext("blog");
  }

  if(props.infoBarContext=="bookshelf"){
    return (
      <>
        <div id="menu" className="menu bg-wine">
            
          <div className="name text-white">
            becky's books
          </div>
  
          <div id="shelves" className={`${shelvesActiveStyle} ${shelvesHighlight}`} onClick={setBookshelf}>Bookshelves</div>
          <div id="blog" className={`${defaultStyle} ${blogHighlight}`} onClick={setBlog} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}}>blog</div>
        </div>
      </>
    );

  } else{

    return (
      <>
        <div id="menu" className="menu bg-wine">
            
          <div className="name text-white">
            becky's books
          </div>

          <div id="shelves" className={`${defaultStyle} ${shelvesHighlight}`} onClick={setBookshelf} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => handleHighlight(e.target, false)}>Bookshelves</div>
          <div id="blog" className={`${blogActiveStyle} ${blogHighlight}`} onClick={setBlog}>blog</div>
        </div>
      </>
    );
  }
} 

export default InfoBar;