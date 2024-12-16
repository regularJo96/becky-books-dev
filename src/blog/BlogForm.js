import React, { useState, useEffect, useRef} from "react";
import "../shared/assets/style.css"
import "./BlogForm.css"
import Trix from "trix";


function Blog(props){

  const [blogTitle, setBlogTitle] = useState("");
  const [blogBook, setBlogBook] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [buttonHighlight, setButtonHighlight] = useState("bg-wine")

  const myRef = useRef(null);

  useEffect(() => {
    props.getAllBooks();
    const trixEditor = myRef.current;
    trixEditor.addEventListener("trix-change", trixChange);

    return () => {
      trixEditor.removeEventListener("trix-change", trixChange);;
    };
  }, []);

  // useEffect(() => {
  //   console.log("yes")
  // }, [myRef.current.target])

  const trixChange = (e) =>{
    setBlogBody(e.target.value)
    // console.blog(blogBody)
  }

  const handleHighlight = () => {

  }

  const handleSubmit = (event) => {
    event.preventDefault();
  
    let result=true;

    if(blogBook=="0"){
      setBlogBook(0);
    } 
    else if(blogBook=="Select Book"){
      alert("You must select an option from the dropdown menu!");
      result=false;
    }

    if(result){
      props.addArticle(blogTitle, blogDescription, blogBook, blogBody);
    }
  }

  return(
    <>
      <div className="container">
        
        <form className="add-blog-form" onSubmit={handleSubmit}>

          <div className="form-floating w-100">
            <input className="form-control" id="add-blog-title" type="text" placeholder='Add Blog Title' value={blogTitle} onChange={e => setBlogTitle(e.target.value)}/>
            <label for="add-blog-title">Blog Title</label>
          </div>
          
          <div className="form-floating w-100">
            <input id="blog-post-description" className="form-control" type="text" placeholder='Add Blog Post Description' value={blogDescription} onChange={e => setBlogDescription(e.target.value)}/>
            <label for="blog-post-description">Description (can leave blank)</label>
          </div>

            <label for="shelfSelect">Is this blog post related to a book on one of your shelves?</label>
            <select classname="form-item" id="shelfSelect" value={blogBook} onChange={e => setBlogBook(e.target.value)}>
              <option value="Select Book">Select Book</option>
              <option value="0">No</option>
                {
                  (props.allBooks).map(function(book){
                    // let offset = 13 - book.shelf.length
                    // console.log(offset)
                    // if(book.shelf=="to-read"){
                    //   offset=offset+2
                    // }
                    // let spacing = "-".repeat(offset)
                    return (
                        <>
                          <option value={book.id}>{book.title}</option>
                        </>       
                    );
                  })
                }
            </select>

          <input type="hidden" id="blogBodyHidden" value={blogBody}></input>
          
          <trix-editor id="trix" input="blogBodyHidden" value={blogBody} ref={myRef}/>
          
          <button type="submit" className={`button border-latte text-white text-center pointer ${buttonHighlight}`} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>Post Blog</button>
        
        </form>
        
      </div>
    </>
  );
}

export default Blog;