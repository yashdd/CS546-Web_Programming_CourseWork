/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page. You can use a client-side fetch or axios request instead of AJAX)
*/
$(document).ready(function() {
    let movieForm = $('#searchMovieForm'),
     movieList = $('#searchResults')
     
    let newSearch = $('#rootLink')

  movieForm.submit(function(event) {
        event.preventDefault();
        
        const search_keyword = $('#movie_search_term').val().trim();
        if (!search_keyword) {
            alert("enter valid text or keyword");
            return;
        }
        const requestConfig1 = {
            method: 'GET',
            url: 'http://www.omdbapi.com/',
            data: {
                apikey: 'CS546',
                s: search_keyword
            }
        };
        const requestConfig2 = {
            method: 'GET',
            url: 'http://www.omdbapi.com/',
            data: {
                apikey: 'CS546',
                s: search_keyword,
                page:2
            }
        };
        
        movieDetails.hide();
        movieList.empty();
        movieForm.hide()
        newSearch.show()

   
    $.ajax(requestConfig1).then(function(responseMessage) {
            if (responseMessage && responseMessage.Search) {
                responseMessage.Search.forEach(function (movie){
                    const movieLink = $('<li><a href="javascript:void(0)" data-id="' + movie.imdbID + '">' + movie.Title + '</a></li>');
                    movieList.append(movieLink);
                });
                
            } 
        })
    $.ajax(requestConfig2).then(function(responseMessage) {
            if (responseMessage && responseMessage.Search) {
                responseMessage.Search.forEach(function (movie){
                    const moviefound = $('<li><a href="javascript:void(0)" data-id="' + movie.imdbID + '">' + movie.Title + '</a></li>');
                    movieList.append(moviefound);
                });
                movieList.show();
            }else{
                movieList.append('<p>No Movies found</p>');
                movieList.show();
            } 
        })
        
    });

    let movieDetails = $('#movieDetails');

    movieList.on('click', 'li', function(event) {
        event.preventDefault();
        let id_movie =$(this).find('a').data('id');
        const requestConfig3 = {
            method: 'GET',
            url: 'http://www.omdbapi.com/',
            data: {
                apikey: 'CS546',
                i: id_movie
            }
        };

        movieDetails.empty();
        movieList.hide();
        
        $.ajax(requestConfig3).then(function(responseMessage) {
            if (responseMessage) {
                const detail = responseMessage;
                let ratings = '';
                detail.Ratings.forEach(rating => {
                    ratings += `
                        <tr>
                            <td>${rating.Source}</td>
                            <td>${rating.Value}</td>
                        </tr>
                    `;
                });
                movieDetails.append(`<article>
                <h1>${detail.Title}</h1>
                  <img alt="The Breakfast Club Poster" src= ${detail.Poster}>
                
                  <h2>Plot</h2>
                  <p>${detail.Plot}</p>
                  <section>
                    <h3>Info</h3>
                    <dl>
                      <dt>Year Released:</dt>
                        <dd>${detail.DVD}</dd>
                      <dt>Rated:</dt>
                        <dd>${detail.Rated}</dd>
                      <dt>Runtime:</dt>
                        <dd>${detail.Runtime}</dd>
                      <dt>Genre(s):</dt>
                        <dd>${detail.Genre}</dd>
                      <dt>Box Office Earnings:</dt>
                        <dd>${detail.BoxOffice}</dd>
                      <dt>DVD Release Date:</dt>
                        <dd>${detail.Released}</dd>
                    </dl>
                  </section>
                
                  <section>
                    <h4>Cast and Crew</h4>
                    <p><strong>Director:</strong>${detail.Director} </p>
                    <p><strong>Writer:</strong>${detail.Writer} </p>
                    <p><strong>Cast:</strong>${detail.Actors} </p>
                  </section>
                  
                  <section>
                    <h4>Ratings</h4>
                    <table class="my_coolratings_table">
                      <tr>
                        <th>Source</th>
                        <th>Rating</th>
                     </tr>
                     
                    ${ratings}
                    
                  </table>
                </section>
                
            </article>`)

                movieDetails.show();
            }else{
                movieDetails.append('<p>No Movies found</p>');
                movieDetails.show();
            } 
            
       })
    })
});
