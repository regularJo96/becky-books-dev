import React, { useState, useEffect} from "react";

import "../shared/assets/style.css"

function InfoBar(props){
  var defaultStyle = "button rounded text-white text-center pointer menu-item";
  var activeStyle = "button rounded border-white btn-clicked text-center pointer menu-item";

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
    props.setInfoBarContext("blog");
  }

  if(props.infoBarContext=="bookshelf"){
    return (
      <>
        <div id="menu" className="menu bg-wine">
            
          <div className="name text-white">
            becky's books
          </div>
  
          <div id="shelves" className={activeStyle} onClick={setBookshelf}>Bookshelves</div>
          <div id="blog" className={defaultStyle} onClick={setBlog}>blog</div>
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

          <div id="shelves" className={defaultStyle} onClick={setBookshelf}>Bookshelves</div>
          <div id="blog" className={activeStyle} onClick={setBlog}>blog</div>
        </div>
      </>
    );
  }
} 

export default InfoBar;