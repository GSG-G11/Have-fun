// API-KEY MOVIE SITE =>  e4e72d82643e224bf78695be0b5602cd
// ************ Search ************** 
const searchWord = document.querySelector(".search-word");
const searchBtn = document.querySelector("#search");
// ***************  MOVIE ***************
const movieName = document.querySelector(".movie-name");
const movieAverage = document.querySelector(".movie-average");
const movieDate = document.querySelector(".movie-date");
const movieImg = document.querySelector(".movie-img");
const basicMovieCard = document.querySelector(".movies");
const basicBookCard = document.querySelector(".books");
// ******************* BOOK *****************
const bookName = document.querySelector(".book-name");
const bookAuthor = document.querySelector(".book-author");
const bookImg = document.querySelector(".book-img-container");
const bookLink = document.querySelector(".book-link-to-read");

//******************************************* */
const bookName1 = document.querySelector(".book-name1");
const bookAuthor1 = document.querySelector(".book-author1");
const bookImg1 = document.querySelector(".book-img-container1");
const bookLink1 = document.querySelector(".book-link-to-read1");
//      **********************    URL      ************************
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const movieURL = "https://api.themoviedb.org/3/search/movie?&api_key=e4e72d82643e224bf78695be0b5602cd&query=";
const bookURL = "https://www.googleapis.com/books/v1/volumes?q=";



// ******************* SEND REQUEST *********************
function sendRequest(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cb(JSON.parse(xhr.responseText));
        }
    };
    xhr.open('GET', url);
    xhr.send();
}

/* **************************** Render For Movies And Books **********************************************/


function innerRenderForMovies(imgPath, title, voteAverage, releaseDate) {
    basicMovieCard.innerHTML += `      
    <div class="movie-card">
        <img src="${imgPath}" alt="Movie Image" class="movie-img" />
        <div class="movie-desc">
            <p class="movie-name">${title}</p>
            <p class="movie-average">${voteAverage}</p>
            <p class="movie-date">${releaseDate}</p>
        </div>
    </div> 
          `;
};

function renderMovie(x) {
    const title = x.title;
    const average = x.vote_average;
    const release = x.release_date;
    if (x.poster_path == null) {
        const IMGPATH = "movie-poster-template.jpg";
        innerRenderForMovies(IMGPATH, title, average, release);
    } else {
        let newImg = IMGPATH + x.poster_path;
        innerRenderForMovies(newImg, title, average, release);
    }
}

function innerRenderForBooks(img, title, author, link) {
    basicBookCard.innerHTML += `      
    <div class="book-card">
        <div class="book-img">
            <img src="${img}" alt="book image" class="book-img-container"/>
        </div>
        <div class="book-desc">
            <p class="book-name">${title}</p>
            <p class="book-author">${author}</p>
            <a href="${link}" class="book-link-to-read" >Click To Read</a>
        </div>
    </div>
          `;
};


function renderBook(x) {
    const img = x.volumeInfo.imageLinks.smallThumbnail;
    const title = x.volumeInfo.title;
    const link = x.volumeInfo.previewLink;
    if (x.volumeInfo.authors === undefined) {
        const author = "";
        innerRenderForBooks(img, title, author, link);
    } else {
        const author =x.volumeInfo.authors;
        innerRenderForBooks(img, title, author, link);
    }
}

/* *******************************    Default Screen  ********************************************************** */
const movieURLDefault = "https://api.themoviedb.org/3/search/movie?&api_key=e4e72d82643e224bf78695be0b5602cd&query=random";
sendRequest(movieURLDefault, (response) => {
    console.log(response);
    for (let i = 0; i < response.results.length; i++) {
        renderMovie(response.results[i]);
    }
});

const bookURLDefault = "https://www.googleapis.com/books/v1/volumes?q=random";
sendRequest(bookURLDefault, (response) => {
    for (let i = 1; i < 3; i++) {
        renderBook(response.items[i]);
        console.log(response.items[i].volumeInfo.previewLink);
    }
})

searchBtn.addEventListener("click", () => {
    basicMovieCard.textContent = " ";
    let movieURLSearched = movieURL + searchWord.value;
    sendRequest(movieURLSearched, (response) => {
        let req = response.results;
        for (let i = 0; i < req.length; i++) {
            renderMovie(response.results[i]);
        }
    })
    basicBookCard.textContent = "";
    let bookURLSearched = bookURL + searchWord.value;
    sendRequest(bookURLSearched, (response) => {
        console.log(response);
        for (let i = 0; i < 2; i++) {
            console.log(response);
            renderBook(response.items[i]);
            console.log(response.items[i].volumeInfo.previewLink);
        }
    });
    searchWord.value = " ";
}) // End EventListener 
