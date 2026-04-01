

const moviesDiv = document.getElementById("movies");
const loading = document.getElementById("loading");
console.log(loading)


const API_KEY = "d1871e60";

async function fetchMovies() {
    try {
  

        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=batman`);
        const data = await res.json();

        console.log(data)




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