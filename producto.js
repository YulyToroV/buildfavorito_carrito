$(document).ready(function () {
    // Cargar productos favoritos desde localStorage
    function loadFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites;
    }

    // Guardar productos favoritos en localStorage
    function saveFavorites(favorites) {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Añadir producto a favoritos
    function addToFavorites(product) {
        let favorites = loadFavorites();
        favorites.push(product);
        saveFavorites(favorites);
        toastr.success(product.name + ' ha sido añadido a favoritos');
    }

    // Evento para checkbox
    $('.favorite-checkbox').on('change', function () {
        let product = {
            id: $(this).data('product-id'),
            name: $(this).data('product-name'),
            image: $(this).data('product-image')
        };
        if ($(this).is(':checked')) {
            addToFavorites(product);
        }
    });

    // Configuración de Toastr
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
});
// Configuración para añadir al carrito de compras desde producto aun no conecta debido ala estrutictura html 
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productElement = this.closest('.producto');
        const product = {
            productId: this.dataset.productId,
            productName: productElement.querySelector('.product-name').textContent,
            productPrice: parseFloat(productElement.querySelector('.product-price').textContent.replace('Precio: $', '')),
            productImage: productElement.querySelector('.product-image').src,
            productDescription: productElement.querySelector('.product-description').textContent
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Producto añadido al carrito');
    });
});