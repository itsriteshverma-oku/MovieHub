

const moviesDiv = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const sortSelect = document.getElementById("sortSelect");
const favContainer = document.getElementById("favContainer");


const API_KEY = "29261b44cb2f64c2ec5544d4763bc62e"


let allMovies = [];
let favorites = [];


async function fetchMovies(query = "batman") {
    try {
        moviesDiv.innerHTML = `<p>Loading... ⏳</p>`;

        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
        const data = await res.json();

        if (data.Response === "False") {
            moviesDiv.innerHTML = `<p>No movies found 😢</p>`;
            return;
        }
        allMovies = data.results;
        displayMovies(allMovies);

    } catch (error) {
        console.log(error)
        moviesDiv.innerHTML = `<p>Something went wrong ⚠️</p>`;
    }
}


function displayMovies(data) {
    moviesDiv.innerHTML = data?.map(movie => `
        <div class="movie">
            <img src='https://image.tmdb.org/t/p/w500${movie.poster_path}'>
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
            <button onclick='addToFav(${JSON.stringify(movie)})'>❤️ Add</button>
        </div>
    `).join("");
}


function addToFav(movie) {
    if (!favorites.find(m => m.id === movie.id)) {
        favorites.push(movie);
        displayFav();
    }
}

function displayFav() {
    favContainer.innerHTML = favorites.map(movie => `
        <div class="movie">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            <h3>${movie.title}</h3>
        </div>
    `).join("");
}


searchBtn.addEventListener("click", () => {
    const query = searchInput.value.toLowerCase();

    const filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(query)
    );

    displayMovies(filtered);
});


sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;

    const getReleaseTime = (movie) => {
        const date = movie.release_date;
        return date ? new Date(date).getTime() : 0;
    };

    let sorted = [...allMovies].sort((a, b) => {
            const timeA = getReleaseTime(a);
        const timeB = getReleaseTime(b);
        return value === "asc" ? timeA - timeB : timeB - timeA;
    });

    displayMovies(sorted);
});


fetchMovies();