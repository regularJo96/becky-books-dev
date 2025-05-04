import React, { useState, useEffect} from "react";

import BlogForm from "./BlogForm";
import coverPlaceholder from "../app/images/the-book-thief.jpg"

import "../shared/assets/style.css"
import "../book/Book.css"
import "./Blog.css"

function BlogIndex(props){

    const [book, setBook] = useState("An Original Thought, Not a Book Review");
    const [highlight, setHighlight] = useState("bg-wine");
    const [blogFormOpen, setBlogFormOpen] = useState(false);

    useEffect(() => {
        props.getAllArticles();
    }, [blogFormOpen])

    const handleHighlight = (e, highlight) => {
        if(highlight){
            setHighlight("highlight");
        } 
        else{
            setHighlight("bg-wine");
        }
    }

    const handleFormOpen = (open) => {
        setBlogFormOpen(open);
    }

    if(props.blogs.length==0){
        return(
            <>
                <div className="add-book">
                    <div id="add-book" className={`button rounded border-white text-white text-center center pointer w-25 ${highlight}`} onClick={(() => alert("open blog editor"))} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
                    Write a Blog
                    </div>
                </div>

                <div>
                    No Articles
                </div>
            </>
        );
    }
    else{

        if(blogFormOpen){
            return (
                <>
                    <div className="button center w-30-px">
                        <span className="material-symbols-outlined pointer" onClick={(() => handleFormOpen(false))}>
                            close
                        </span>
                    </div>
                    <BlogForm allBooks={props.allBooks} addArticle={props.addArticle} setBlogFormOpen={setBlogFormOpen}/>
                </>
            )
            
        }
        else{

            return(
                <>

                    <div className="add-book">
                        <div id="add-book" className={`button rounded border-white text-white text-center center pointer w-25 ${highlight}`} onClick={(() => handleFormOpen(true))} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
                            Write a Blog
                        </div>
                    </div>
                    {
                        (props.blogs).map(function(blog){
                            let book=null;
                            for(let i=0;i<props.allBooks.length;i++){
                                if(blog.book_id==props.allBooks[i].id){
                                    book = props.allBooks[i]
                                }
                            }
                            
                            if(book==null){
                                book = {"title":"An Original Thought From My Mind", "cover":false}
                            }

                            let firstIndex = blog.content.indexOf(".");
                            let secondIndex = blog.content.indexOf(".", firstIndex + 1);
                            
                            let preview = blog.content.substring(0,secondIndex);
                            
                            let image=null;
                            if(book.cover){
        
                                const arrayBuffer = new Uint8Array(book.cover.data).buffer;
        
                                // Access the underlying ArrayBuffer
                                const blob = new Blob([arrayBuffer], {"type":"image/jpeg"})
                                image = URL.createObjectURL(blob)

                            } else{
                                image = coverPlaceholder;
                            }
                            
                            return (
                                <>

                                <div class="card bg-latte blog w-50 pointer center" onClick={() => { alert("Opening BLog post")}}>
                                    
                                    <div class="card-header bg-wine text-white">
                                        {blog.title}
                                    </div>

                                    <div className="row">
                                        <div className="col-9">
                                            <div class="card-body">
                                                <p>Related to: {book.title}</p>

                                                <h5 class="card-title">{blog.description}</h5>
                                                
                                                <p class="card-text" dangerouslySetInnerHTML={{ __html: preview + "<span>... More</span>" + "</div>" }}/>
                                                
                                                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                            </div>
                                        </div>

                                        <img className="book-item pointer col-3" src={image} alt={`${book.title}`} height="209px;" width="140px;"></img>
                                    </div>
                                        
                                    
                                </div>
                                    {/* <Blog key={book.id} book={book} cover={image} moveToShelf={props.moveToShelf} addToShelf={props.addToShelf} apiUrl={props.apiUrl} deleteBook={props.deleteBook} shelfContext={props.shelfContext} location={props.location}/> */}
                                

                                </>

                            )
                        
                        })
                    }
                </>
            );
        }
    }

}

export default BlogIndex;