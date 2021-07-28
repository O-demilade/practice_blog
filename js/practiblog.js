/**
 * Created by Demi on 15-Jul-21.
 */
window.addEventListener("DOMContentLoaded", function(d){
  console.log("loaded");

  // select all the buttons that pertains to adding a post
  const addBtn = document.querySelector("header>button");
  const clsBtn = document.querySelector("#cls_add");
  const postBtn = document.querySelector(".post");
  
  const postsTitles = [];

  const outTitle = document.querySelector(".title");
  const outWriteup = document.querySelector(".writeup");
  const outAuthor = document.querySelector(".author");

  // check storage (localStorage) for PractiBlog post
  const outPost = localStorage.getItem("PractiBlogPost");

  // convert the Storage data back from a string
  outTemp = JSON.parse(outPost);

  if (outPost && outTemp.title != "" && outTemp.writeup != "") {

    outTitle.innerText = outTemp.title
    outWriteup.innerText = outTemp.writeup
    outAuthor.innerText = "- " + outTemp.author
    postsTitles.push(outTemp.title);
  };

  addBtn.addEventListener("click", function(d){
    document.querySelector(".input").style.display="block";
  });

  clsBtn.addEventListener("click", function(d){
    document.querySelector(".input").style.display="none";
  });

  postBtn.addEventListener("click", function(d){
    
    const postCont = d.currentTarget.parentNode;
    const post = {
      title:postCont.querySelector("#post_title").value,
      writeup:postCont.querySelector("#post_writeup").value,
      author:postCont.querySelector("#post_author").value
    };
    
    // store the post data as a string in browser memory
    localStorage.setItem("PractiBlogPost", JSON.stringify(post));

  });
});