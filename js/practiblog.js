/**
 * Created by Demi on 15-Jul-21.
 */
window.addEventListener("DOMContentLoaded", function(d){
  const dat = Date();

  console.log("loaded");
  console.log(Date());

  // select all the buttons that pertains to adding a post
  const addBtn = document.querySelector("header>button");
  const clsBtn = document.querySelector("#cls_add");
  const postBtn = document.querySelector(".post");
  
  const postsTitles = [];
  let display = "";

  // assign the elements for the articles display 
  const outTitle = document.querySelector(".title");
  const outWriteup = document.querySelector(".writeup");
  const outAuthor = document.querySelector(".author");

  // get all the blog post titles from Storage
  const postTitles = localStorage.getItem("PractiBlogTitles");
  let postTitlesParse = JSON.parse(postTitles);

  // select the last post and display it 
  if (postTitlesParse != null){
    display = postTitlesParse[(postTitlesParse["length"]-1)];
  };

  // check storage (localStorage) for PractiBlog post
  const outPost = localStorage.getItem(display);

  // convert the Storage data back from a string
  let outTemp = JSON.parse(outPost);

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

    // assign the post title to the variable title 
    let title = postCont.querySelector("#post_title").value;

    // add the title to the list of titles 
    postsTitles.push(title);
    
    // store the post data as a string in browser memory
    localStorage.setItem(title, JSON.stringify(post));
    localStorage.setItem("PractiBlogTitles", JSON.stringify(postsTitles))
  });
});