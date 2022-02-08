

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


function renderMovie(x) {
    const $movieCard = document.createElement("div");
    $movieCard.className = "movie-card";
    basicMovieCard.appendChild($movieCard);

    const $movieImg = document.createElement("img");
    $movieImg.className = "movie-img";
    $movieCard.appendChild($movieImg);
    if (x.poster_path == null) {
        const IMGPATH = "movie-poster-template.jpg";
        $movieImg.src = IMGPATH;
    } else {
        let newImg = IMGPATH + x.poster_path
        $movieImg.src = newImg;
    }

    const $descMovie = document.createElement("p");
    $descMovie.className = "movie-desc";
    $movieCard.appendChild($descMovie);

    const $movieName = document.createElement("p");
    $movieName.className = "movie-name";
    $descMovie.appendChild($movieName);
    $movieName.textContent = x.title;

    const $movieAverage = document.createElement("p");
    $movieAverage.className = "movie-average";
    $descMovie.appendChild($movieAverage);
    $movieAverage.textContent = x.vote_average;

    const $movieDate = document.createElement("p");
    $movieDate.className = "movie-date";
    $descMovie.appendChild($movieDate);
    $movieDate.textContent = x.release_date;
}



const basicBookCard = document.querySelector(".books");
function renderBook(x) {
    const $bookCard = document.createElement("div");
    $bookCard.className = "book-card";
    basicBookCard.appendChild($bookCard);

    const $bookImgContainer = document.createElement("div");
    $bookImgContainer.className = "book-img";
    $bookCard.appendChild($bookImgContainer);

    const $bookImg = document.createElement("img");
    $bookImg.className = "book-img-container";
    $bookImgContainer.appendChild($bookImg);
    console.log(x.volumeInfo.imageLinks.smallThumbnail);
    $bookImg.src = x.volumeInfo.imageLinks.smallThumbnail;

    const $bookDesc = document.createElement("div");
    $bookDesc.className = "book-desc";
    $bookCard.appendChild($bookDesc);

    const $bookName = document.createElement("p");
    $bookName.className = "book-name";
    $bookDesc.appendChild($bookName);
    console.log(x.volumeInfo.title);
    $bookName.textContent = x.volumeInfo.title;


    const $bookAuthor = document.createElement("p");
    $bookAuthor.className = "book-author";
    $bookDesc.appendChild($bookAuthor);
    console.log(x.volumeInfo.authors);
    $bookAuthor.textContent = x.volumeInfo.authors;

    const $bookLink = document.createElement("a");
    $bookLink.className = "book-link-to-read";
    $bookDesc.appendChild($bookLink);
    console.log(x.volumeInfo.previewLink);
    $bookLink.href = x.volumeInfo.previewLink;
}






//      *************** DEFAULT MOVIES *******************
// const movieURLBasic = "https://api.themoviedb.org/3/search/movie?&api_key=e4e72d82643e224bf78695be0b5602cd&query=random";
// sendRequest(movieURL, (response) => {
//     let req = response.results;
//     console.log(req);
//     for (let i = 0; i < req.length; i++) {
//         renderMovie(response.results[i]);
//     }
// })



const bookURLBasic = "https://www.googleapis.com/books/v1/volumes?q=";
// sendRequest(bookURLBasic, (response) => {
//     console.log(response);
//     // bookName.textContent = response.items[0].volumeInfo.title;
//     // bookAuthor.textContent = response.items[0].volumeInfo.authors;
//     // bookImg.src = response.items[0].volumeInfo.imageLinks.smallThumbnail;
//     // bookLink.href = response.items[0].volumeInfo.previewLink;

// })

searchBtn.addEventListener("click", () => {
    let movieURLSearched = movieURL + searchWord.value;
    sendRequest(movieURLSearched, (response) => {
        // console.log(response);
        let req = response.results;
        // console.log(req);
        for (let i = 0; i < req.length; i++) {
            renderMovie(response.results[i]);
        }
    })
    let bookURLSearched = bookURLBasic + searchWord.value;
    sendRequest(bookURLSearched, (response) => {
        console.log(response);

        // for (let i = 0; i < 2; i++) {
        //     console.log(response);
        //     renderBook(response.items[i]);
        //     console.log(response.items[i].volumeInfo.previewLink);
        // }
        // console.log(response.items[0].volumeInfo.previewLink);
        bookName.textContent = response.items[0].volumeInfo.title;
        bookAuthor.textContent = response.items[0].volumeInfo.authors;
        bookImg.src = response.items[0].volumeInfo.imageLinks.smallThumbnail;
        bookLink.href = response.items[0].volumeInfo.previewLink;

        bookName1.textContent = response.items[1].volumeInfo.title;
        bookAuthor1.textContent = response.items[1].volumeInfo.authors;
        bookImg1.src = response.items[1].volumeInfo.imageLinks.smallThumbnail;
        bookLink1.href = response.items[1].volumeInfo.previewLink;
        // renderBook(response.items[0]);
    })
}) // End EventListener 



