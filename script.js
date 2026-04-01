// // const API_KEY = "373be66e"; // replace if needed
// const BASE_URL = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=373be66e");

// const moviesContainer = document.getElementById("moviesContainer");
// const recContainer = document.getElementById("recContainer");
// const searchBtn = document.getElementById("searchBtn");
// const searchInput = document.getElementById("searchInput");

// // 🔥 Default fallback movies (IMPORTANT)
// const defaultMovies = [
//   { Title: "Batman Begins", Year: "2005", Poster: "https://m.media-amazon.com/images/I/51k0qa6u1FL._AC_.jpg" },
//   { Title: "The Dark Knight", Year: "2008", Poster: "https://m.media-amazon.com/images/I/51EbJjlzHjL._AC_.jpg" },
//   { Title: "Avengers", Year: "2012", Poster: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SL1500_.jpg" },
//   { Title: "Spider-Man", Year: "2002", Poster: "https://m.media-amazon.com/images/I/51oD5i9sJPL._AC_.jpg" }
// ];

// // Display movies
// function displayMovies(movies) {
//   moviesContainer.innerHTML = movies.map(movie => `
//     <div class="movie">
//       <img src="${movie.Poster}">
//       <h3>${movie.Title}</h3>
//       <p>${movie.Year}</p>
//     </div>
//   `).join("");
// }

// // Display recommendations
// function displayRecommendations(movies) {
//   recContainer.innerHTML = movies.map(movie => `
//     <div class="movie">
//       <img src="${movie.Poster}">
//       <h3>${movie.Title}</h3>
//     </div>
//   `).join("");
// }

// // Fetch movies
// async function fetchMovies(query) {
//   moviesContainer.innerHTML = "<p>Loading...</p>";

//   try {
//     const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
//     const data = await res.json();

//     if (data.Response === "True") {
//       displayMovies(data.Search);
//     } else {
//       // ❗ fallback if API fails
//       displayMovies(defaultMovies);
//     }

//   } catch (error) {
//     displayMovies(defaultMovies);
//   }
// }

// // Fetch recommendations
// async function fetchRecommendations() {
//   try {
//     const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=avengers`);
//     const data = await res.json();

//     if (data.Response === "True") {
//       displayRecommendations(data.Search.slice(0, 4));
//     } else {
//       displayRecommendations(defaultMovies);
//     }

//   } catch (error) {
//     displayRecommendations(defaultMovies);
//   }
// }

// // Search
// function handleSearch() {
//   const query = searchInput.value.trim();
//   if (query) {
//     fetchMovies(query);
//   }
// }

// searchBtn.addEventListener("click", handleSearch);

// searchInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     handleSearch();
//   }
// });

// // 🔥 Always show something on load
// displayMovies(defaultMovies);
// displayRecommendations(defaultMovies);

// // Try API in background
// fetchMovies("Batman");
// fetchRecommendations();

const moviesDiv = document.getElementById("movies");
const loading = document.getElementById("loading");
console.log(loading)

// ✅ Use your NEW API key
const API_KEY = "d1871e60";

async function fetchMovies() {
    try {
        // loading.style.display = "block";

        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=batman`);
        const data = await res.json();

        console.log(data)

        // loading.style.display = "none";

        // ❗ If API fails or no data
        if (data.Response === "False") {
            moviesDiv.innerHTML = `<p>No movies found 😢 (${data.Error})</p>`;
            return;
        }

        moviesDiv.innerHTML = data.Search.map(movie => 
        `
            <div class="card">
                <img 
                    src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" 
                    alt="${movie.Title}"
                >
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
        `).join("");

    } catch (error) {
        loading.style.display = "none";
        moviesDiv.innerHTML = `<p>Something went wrong ⚠️</p>`;
        console.error(error);
    }
}

fetchMovies();