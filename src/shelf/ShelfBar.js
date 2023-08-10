import React, { useState, useEffect} from "react";

import "../shared/assets/style.css"

function ShelfBar(props){
  // shelfContext can be set with props.setShelfContext
  const [toReadTab, setToReadTab] = useState("");
  const [amReadingTab, setAmReadingTab] = useState("");
  const [haveReadTab, setHaveReadTab] = useState("");

  useEffect(() => {
    if(props.shelfContext=="to-read"){
      setToReadTab("btn rounded border-white btn-clicked text-center pointer");
      setAmReadingTab("btn rounded border-white text-white text-center pointer");
      setHaveReadTab("btn rounded border-white text-white text-center pointer");
    }
    else if(props.shelfContext=="am-reading"){
      setToReadTab("btn rounded border-white text-white text-center pointer");
      setAmReadingTab("btn rounded border-white btn-clicked text-center pointer");
      setHaveReadTab("btn rounded border-white text-white text-center pointer");
    }
    else if(props.shelfContext=="have-read"){
      setToReadTab("btn rounded border-white text-white text-center pointer");
      setAmReadingTab("btn rounded border-white text-white text-center pointer");
      setHaveReadTab("btn rounded border-white btn-clicked text-center pointer");
    }
  }, [props.shelfContext]);

  function setToRead(){
    props.setShelfContext("to-read");
  }

  function setAmReading(){
    props.setShelfContext("am-reading");
  }

  function setHaveRead(){
    props.setShelfContext("have-read");
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