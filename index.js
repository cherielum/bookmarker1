//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {

    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    console.log(siteName , siteUrl); //shows every element unless you use .value
    // console.log('It works!');

    if(!validateForm(siteName, siteUrl)){
        return false; 
    }

    var bookmark = {
        name: siteName, 
        url: siteUrl
    }
    console.log(bookmark); // returns an object {name: "1", url: "2"}

    //local storage test - only stores strings, but can parse JSON.
    localStorage.setItem('test', 'Hello World');

    //GET item
    console.log(localStorage.getItem('test'));

    //DELETE item
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));

    //TEST if bookmarks is null
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //clears form 
  document.getElementById('myForm').reset(); 

   //re-fetch bookmarks
   fetchBookmarks(); 

    //prevent from submitting 
    e.preventDefault(); //This keeps whatever you put in console.log from dissapearing when submitting.
}

//DELETE bookmark
function deleteBookmark(url) {
    
    //get bookmraks from localStorage 
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));  

    //loop through bookmarks
    for(var i = 0; i <bookmarks.length; i++){
        if(bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks(); 
}

//FETCH bookmarks
function fetchBookmarks(){
    //Get bookmarks from Local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));  
    console.log(bookmarks);


    //Get output id
    var bookmarkResults = document.getElementById('bookmarksResults'); 

    //build output 
    bookmarksResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name; 
        var url = bookmarks[i].url; 

        bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
    }
}

//validate form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form'); 
        return false; 
    }

    //Regex URL
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false; 
    }

    return true; 
}
