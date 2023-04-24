//this gives us the first page of the results, about 30 of the results//
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c08c004a0ffb498c3502c4daeaba041e&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=c08c004a0ffb498c3502c4daeaba041e&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//Get initial movies
getMovies(API_URL);

async function getMovies(url) {
  //fetch returns a promise, so async await
  //this won't give us actual json yet
  const res = await fetch(url);
  //this will give us actual json
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    //destructuring objects. movie is an object
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    
      <img
      src="${IMG_PATH + poster_path}"
      alt="${title}"
    />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>`;
    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  //so it doesn't actually submit to the page
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);
    //to clear the search field
    search.value = "";
  } else {
    //if we submit without anything in there, it reloads
    window.location.reload();
  }
});