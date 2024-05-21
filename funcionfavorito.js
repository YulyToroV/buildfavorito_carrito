function loadFavorites() {
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    var favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';
    favorites.forEach(function(favorite) {
        var listItem = document.createElement('div');
        listItem.className = 'favorite-item';
        listItem.dataset.productId = favorite.id;

        var img = document.createElement('img');
        img.src = favorite.image;
        img.alt = favorite.name;

        var name = document.createElement('span');
        name.textContent = favorite.name;

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function() {
            removeFromFavorites(favorite.id);
        });

        listItem.appendChild(img);
        listItem.appendChild(name);
        listItem.appendChild(deleteButton);
        favoritesList.appendChild(listItem);
    });
}

function removeFromFavorites(productId) {
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.id != productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
}

loadFavorites();