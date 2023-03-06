import React, { useState, useEffect} from "react";

import "../shared/assets/style.css"

function ShelfBar(props){
  // shelfContext can be set with props.setShelfContext
  var defaultTab = "btn rounded border-white text-white text-center pointer";
  var activeTab = "btn rounded border-white btn-clicked text-center pointer";

  const setActive = (e) => {
    if(e.target.id=="to-read"){
      props.setShelfContext("to-read")
    }
    else if(e.target.id=="am-reading"){
      props.setShelfContext("am-reading")
    }
    else if(e.target.id=="have-read"){
      props.setShelfContext("have-read")
    }
  }

  if(props.shelfContext=="to-read"){
    return(
      <>
        <div className="shelf-menu">
          <div id="to-read" className={activeTab} onClick={setActive}>To Read</div>
          <div id="am-reading" className={defaultTab} onClick={setActive}>Am Read(ing)</div>
          <div id="have-read" className={defaultTab} onClick={setActive}>Have Read</div>
        </div>
      </>
    )
  } 
  else if(props.shelfContext=="am-reading") {
    return(
      <>
        <div className="shelf-menu">
          <div id="to-read" className={defaultTab} onClick={setActive}>To Read</div>
          <div id="am-reading" className={activeTab} onClick={setActive}>Am Read(ing)</div>
          <div id="have-read" className={defaultTab} onClick={setActive}>Have Read</div>
        </div>
      </>
    )
  }
  else {
    return(
      <>
        <div className="shelf-menu">
          <div id="to-read" className={defaultTab} onClick={setActive}>To Read</div>
          <div id="am-reading" className={defaultTab} onClick={setActive}>Am Read</div>
          <div id="have-read" className={activeTab} onClick={setActive}>Have Read</div>
        </div>
      </>
    )
  }

}

export default ShelfBar;