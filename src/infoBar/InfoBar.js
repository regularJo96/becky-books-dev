import React, { useState, useEffect} from "react";

import "../shared/assets/style.css"

function InfoBar(props){
  var defaultStyle = "button rounded text-white text-center pointer menu-item";
  var activeStyle = "button rounded border-white btn-clicked text-center pointer menu-item";

  const [bookshelfTab, setBookshelfTab] = useState(activeStyle);
  const [blogTab, setBlogTab] = useState(defaultStyle);

  function setBookshelf(){
    setBookshelfTab(activeStyle);
    setBlogTab(defaultStyle);
    props.setInfoBarContext("bookshelf");
  }

  function setBlog(){
    setBlogTab(activeStyle);
    setBookshelfTab(defaultStyle);
    props.setInfoBarContext("blog");
  }

  return (
    <>
      <div id="menu" className="menu bg-wine">
          
        <div className="name text-white">
          becky's books
        </div>

        <div id="shelves" className={bookshelfTab} onClick={setBookshelf}>Bookshelves</div>
        <div id="blog" className={blogTab} onClick={setBlog}>blog</div>
      </div>
    </>
  );
} 

export default InfoBar;