

const moviesDiv = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const sortSelect = document.getElementById("sortSelect");
const favContainer = document.getElementById("favContainer");

const API_KEY = "d1871e60";

let allMovies = [];
let favorites = [];


async function fetchMovies(query = "batman") {
    try {
        moviesDiv.innerHTML = `<p>Loading... ⏳</p>`;

        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
        const data = await res.json();

        if (data.Response === "False") {
            moviesDiv.innerHTML = `<p>No movies found 😢</p>`;
            return;
        }

        allMovies = data.Search;
        displayMovies(allMovies);

    } catch (error) {
        moviesDiv.innerHTML = `<p>Something went wrong ⚠️</p>`;
    }
}


function displayMovies(data) {
    moviesDiv.innerHTML = data.map(movie => `
        <div class="movie">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button onclick='addToFav(${JSON.stringify(movie)})'>❤️ Add</button>
        </div>
    `).join("");
}


function addToFav(movie) {
    if (!favorites.find(m => m.imdbID === movie.imdbID)) {
        favorites.push(movie);
        displayFav();
    }
}

function displayFav() {
    favContainer.innerHTML = favorites.map(movie => `
        <div class="movie">
            <img src="${movie.Poster}">
            <h3>${movie.Title}</h3>
        </div>
    `).join("");
}


searchBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();

    const filtered = allMovies.filter(movie =>
        movie.Title.toLowerCase().includes(query)
    );

    displayMovies(filtered);
});


sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;

    let sorted = [...allMovies].sort((a, b) => {
        return value === "asc"
            ? a.Year - b.Year
            : b.Year - a.Year;
    });

    displayMovies(sorted);
});


fetchMovies();