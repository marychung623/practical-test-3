$(document).ready(function() {
    // Toggle navbar for mobile view
    $(".navbar-icon").click(function() {
        $("#navbar").toggleClass("show");
        $("body").toggleClass("navbar-open");

        if ($("#navbar").hasClass("show")) {
            $("#navbarOverlay").css({ opacity: 1, visibility: 'visible' });
        } else {
            $("#navbarOverlay").css({ opacity: 0, visibility: 'hidden' });
        }
    });

    // Close navbar when "X" button is clicked
    $(".close-btn").click(function() {
        $("#navbar").removeClass("show");
        $("#navbarOverlay").css({ opacity: 0, visibility: 'hidden' });
    });

    let movies = [];

    // Function to display movies on the page
    function displayMovies(movieArray) {
        const movieList = $("#movieList");
        movieList.empty();
        $.each(movieArray, function(index, movie) {
            movieList.append(`
                <div class="movie-item">
                    <img class="movie-cover" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="movie-overlay">
                        <h3>${movie.title}</h3>
                        <p class="movie-content">${movie.overview}</p>
                        <p><img src="assets/img/fire.png" style="width: 16px; vertical-align: middle;"> ${movie.popularity}</p>
                    </div>
                </div>
            `);
        });
    }

    // Function to sort movies by popularity
    function sortMovies() {
        movies.sort((a, b) => b.popularity - a.popularity);
        displayMovies(movies);
    }

    // Fetch movie data from TMDB API
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTkwNDIzNDY3ODZhOTIxY2E3MzJmZmM0YzAxYTIxZiIsIm5iZiI6MTcyMTgwNzc3MC40NTAyNzcsInN1YiI6IjY2YTBhN2VhZjdhMTE0YTA4M2UwZDRhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SQjgB9waWCim1CPQFSbrHehebcAcr4uDQV8iIYgIrps'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => {
            movies = data.results;
            displayMovies(movies);
        })
        .catch(err => console.error(err));

    // Add event listener for sorting
    $("#sortButton").click(sortMovies);

});