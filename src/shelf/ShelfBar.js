import React, { useState, useEffect} from "react";

import "../shared/assets/style.css"

function ShelfBar(props){
  // shelfContext can be set with props.setShelfContext
  const [toReadTab, setToReadTab] = useState("btn rounded border-white btn-clicked text-center pointer");
  const [amReadingTab, setAmReadingTab] = useState("btn rounded border-white text-white text-center pointer");
  const [haveReadTab, setHaveReadTab] = useState("btn rounded border-white text-white text-center pointer");

  function setToRead(){
    props.setShelfContext("to-read");
    setToReadTab("btn rounded border-white btn-clicked text-center pointer");
    setAmReadingTab("btn rounded border-white text-white text-center pointer");
    setHaveReadTab("btn rounded border-white text-white text-center pointer");
  }

  function setAmReading(){
    props.setShelfContext("am-reading");
    setToReadTab("btn rounded border-white text-white text-center pointer");
    setAmReadingTab("btn rounded border-white btn-clicked text-center pointer");
    setHaveReadTab("btn rounded border-white text-white text-center pointer");
  }

  function setHaveRead(){
    props.setShelfContext("have-read");
    setToReadTab("btn rounded border-white text-white text-center pointer");
    setAmReadingTab("btn rounded border-white text-white text-center pointer");
    setHaveReadTab("btn rounded border-white btn-clicked text-center pointer");
  }

  return(
    <>
      <div className="shelf-menu">
        <div id="to-read" className={toReadTab} onClick={setToRead}>
          To Read
          <span class="material-symbols-outlined" onClick={setToRead}>favorite</span>
        </div>
        <div id="am-reading" className={amReadingTab} onClick={setAmReading}>
          Am Read(ing)
          <span class="material-symbols-outlined" onClick={setAmReading}>menu_book</span>
        </div>
        <div id="have-read" className={haveReadTab} onClick={setHaveRead}>
          Have Read
          <span class="material-symbols-outlined" onClick={setHaveRead}>check_circle</span>
        </div>
      </div>
    </>
  )

}

export default ShelfBar;