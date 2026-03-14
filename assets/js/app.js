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
            <div data-id="${character.id}" class="card" style="width: 18rem; cursor: pointer;"
            data-name="${character.name}"
            data-gender="${character.gender}"
            data-origin="${character.origin.name}"
            data-location="${character.location.name}"
            >
            <img src="${character.image}" class="card-img-top" alt="${character.name}">
            <div class="card-body">
                <h5 class="card-title">${character.name}</h5>
                <p class="card-text">
                    <strong>Species: </strong>${character.species}<br>
                    <strong>Status: </strong>${character.status}<br>
                </p>    
            </div>
            </div>
            `;
            characterGrid.append(card);
        });
    }

    //Dynamic search
    $('#search-input').on('input', function(){
        const searchTerm = $(this).val().toLowerCase();

        $('#character-grid .card').each(function(){
            const characterName = $(this).find('.card-title').text().toLowerCase();
            if(characterName.includes(searchTerm)){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
    });


    //Show modal on card click
    $('#character-grid').on('click', '.card', function(){
        const name = $(this).data('name');
        const gender = $(this).data('gender');
        const origin = $(this).data('origin');
        const location = $(this).data('location');

        $('.modal-title').text(name);
        $('#modal-gender').text(gender);
        $('#modal-origin').text(origin);
        $('#modal-location').text(location);

        const modal = new bootstrap.Modal(document.getElementById('character-modal'));
        modal.show();

    });
    

    //Initialize the app
    fetchCharacters();
});