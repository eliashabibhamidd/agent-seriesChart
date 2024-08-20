function openMovie(id) {
    localStorage.setItem('selectedShowId', id);
    window.location.assign(`docs/movie.html`);
}


function showLoading() {
    document.getElementById('loading').style.display = 'block';
}


function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Fetch and display trending TV shows
function fetchTrendingShows() {
    showLoading();
    fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US&api_key=0c23b158b013c7b7845ed5e115ee9847')
        .then(response => response.json())
        .then(data => {
            const shows = data.results;
            displayShows(shows);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('movies_name').innerHTML = '<p>Error loading shows. Please try again later.</p>';
        })
        .finally(() => hideLoading());
}

// Search for TV series based on user input
function searchSeries() {
    const query = document.getElementById('search_input').value;
    showLoading();
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=0c23b158b013c7b7845ed5e115ee9847&language=en-US&query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const shows = data.results;
            displayShows(shows);
        })
        .catch(error => {
            console.error('Error searching series:', error);
            document.getElementById('movies_name').innerHTML = '<p>Error searching DEDEB.  try again later.</p>';
        })
        .finally(() => hideLoading());
}


function displayShows(shows) {
    const moviesContainer = document.getElementById('movies_name');
    moviesContainer.innerHTML = ''; // Clear previous results

    if (shows.length === 0) {
        moviesContainer.innerHTML = '<p>No results found</p>';
    } else {
        for (const show of shows) {
            moviesContainer.innerHTML += `
            <div class="show fade-in" onclick="openMovie(${show.id})">
                <div class="img-con">
                    <img src="https://image.tmdb.org/t/p/w200${show.poster_path}" alt="${show.name} "/>
                </div>
                <h3>${show.name}</h3>
            </div>`;
        }
      
        setTimeout(() => {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(el => el.classList.add('show'));
        }, 100);
    }
    
}


// Fetch and display trending shows when the page loads
fetchTrendingShows();


               
                

  





