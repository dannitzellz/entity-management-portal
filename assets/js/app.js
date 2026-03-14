$(document).ready(function(){
    //Define de API endpoint
    const apiUrl = 'https://rickandmortyapi.com/api/character';

    //Function to fetch data from the API
    function fetchCharacters(){
        $('#loading-spinner').show();

        //AJAX request
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(response){
                console.log("Data succesfully fetched:", response.results);
                $('#loading-spinner').hide();
                //Render the cards
                renderCharacters(response.results);
            },
            error: function(xhr, status, error){
                console.log("API Error:", error);
                $('#loading-spinner').hide();
                $('#character-grid').html('<div class="alert alert-danger" role="alert"> Error loading characters. Please try again later</div>')
            }
            
        });

    }

    function renderCharacters(characters){
        const characterGrid = $('#character-grid');
        characterGrid.empty();

        characters.forEach(character => {
            const card = `
            <div data-id="${character.id}" class="card" style="width: 18rem;">
            <img src="${character.image}" class="card-img-top" alt="${character.name}">
            <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="card-text">
                    <strong>Species</strong>${character.species}<br>
                    <strong>Status</strong>${character.status}<br>
                </p>    
            </div>
            </div>
            `;
            characterGrid.append(card);
        });
    }

    //Initialize the app
    fetchCharacters();
});