import React, { useState, useEffect} from "react";

import "../shared/assets/style.css";

function ShelfBar(props){
var defaultStyle = "button shelf-item rounded border-white text-white text-center pointer";
var activeStyle = "button shelf-item rounded border-white text-white bg-wine text-center pointer";


  // shelfContext can be set with props.setShelfContext
  const [toReadTab, setToReadTab] = useState(activeStyle);
  const [amReadingTab, setAmReadingTab] = useState(defaultStyle);
  const [haveReadTab, setHaveReadTab] = useState(defaultStyle);

  function setToRead(){
    props.setShelfContext("to-read");
    setToReadTab(activeStyle);
    setAmReadingTab(defaultStyle);
    setHaveReadTab(defaultStyle);
  }

  function setAmReading(){
    props.setShelfContext("am-reading");
    setToReadTab(defaultStyle);
    setAmReadingTab(activeStyle);
    setHaveReadTab(defaultStyle);
  }

  function setHaveRead(){
    props.setShelfContext("have-read");
    setToReadTab(defaultStyle);
    setAmReadingTab(defaultStyle);
    setHaveReadTab(activeStyle);
  }

  return(
    <>
      <div className="shelf-menu">
        <div id="to-read" className={`${toReadTab}`} onTouchStart={setToRead} onTouchEnd={setToRead} onClick={setToRead}>
          <span class="material-symbols-outlined" onClick={setToRead}>favorite</span>
          To Read
          <span class="material-symbols-outlined" onClick={setToRead}>favorite</span>
        </div>
        <div id="am-reading" className={amReadingTab} onClick={setAmReading}>
         <span class="material-symbols-outlined" onClick={setAmReading}>menu_book</span>
          Am Reading
          <span class="material-symbols-outlined" onClick={setAmReading}>menu_book</span>
        </div>
        <div id="have-read" className={haveReadTab} onClick={setHaveRead}>
         <span class="material-symbols-outlined" onClick={setHaveRead}>check_circle</span>
          Have Read
          <span class="material-symbols-outlined" onClick={setHaveRead}>check_circle</span>
        </div>
      </div>
    </>
  )

}

export default ShelfBar;