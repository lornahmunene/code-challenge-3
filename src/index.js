
fetch('http://localhost:3000/films')
  .then(res => res.json())
  .then(films => {
    const firstFilm = films[0]; 
    const poster = firstFilm.poster;
    const title = firstFilm.title;
    const runtime = firstFilm.runtime;
    const showtime = firstFilm.showtime;
    const availableTickets = firstFilm.availableTickets;

    const posterHolder = document.getElementsByClassName('four wide column')[1]; 
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    posterHolder.appendChild(titleElement);

    const posterImage = document.createElement('img');
    posterImage.src = poster;
    posterHolder.appendChild(posterImage);

    const runtimeElement = document.createElement('p');
    runtimeElement.textContent = "Runtime: " + runtime + " minutes";
    posterHolder.appendChild(runtimeElement);

    const showtimeElement = document.createElement('p');
    showtimeElement.textContent = "Showtime: " + showtime;
    posterHolder.appendChild(showtimeElement);

    const ticketsElement = document.createElement('p');
    ticketsElement.textContent = "Available Tickets: " + availableTickets;
    posterHolder.appendChild(ticketsElement);
  })
  .catch(error => {
    console.error('Error fetching poster:', error);
  });
  
  fetch('http://localhost:3000/films')
  .then(res => res.json())
  .then(films =>{
    films.forEach(film => {
        const movieTitle=film.title;
        const titleHolder=document.getElementById('films');
        const list=document.createElement('li');
        list.textContent=movieTitle;
        titleHolder.appendChild(list)
    }) 
})
        const ticketButton = document.getElementById('buy-ticket');

        ticketButton.addEventListener('click', () => {
            const filmId = "1"; 
            const ticketsSold = 1; 
            
            fetch('http://localhost:3000/films') 
            .then(res => res.json())
            .then(films => {
                const film = films.find(film => film.id === filmId); 
                if (!film) {
                    console.error('Film not found');
                    return;
                }
                
                const newTicketsSold = film.tickets_sold + ticketsSold; 
                // Calculate new tickets sold
                
                // Make PATCH request to update tickets sold
                fetch(`http://localhost:3000/films/${filmId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tickets_sold: newTicketsSold
                    })
                })
                .then(res => {
                    if (res.ok) {
                        console.log('Ticket sold successful');
                    } else {
                        console.error('Failed to buy ticket');
                    }
                })
                .catch(error => {
                    console.error('Error updating tickets sold:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching films:', error);
            });
        });
