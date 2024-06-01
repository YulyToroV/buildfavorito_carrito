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
$(document).ready(function () {
    $(".add-to-cart-button").click(function () {
        const productId = $(this).data("product-id");
        const productElement = $(this).closest(".product-item");
        const productName = productElement.find("h2").text();
        const productPrice = productElement.find("h3").text().replace('$', '');
        const productImage = productElement.find("img").attr("src");
        const productDescription = productElement.find("p").text();

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({
            productId,
            productName,
            productPrice,
            productImage,
            productDescription
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        toastr.success('Producto añadido al carrito');
    });
});

// Verificar si el producto ya está en el carrito
const existingProductIndex = cart.findIndex(item => item.productId === product.productId);
if (existingProductIndex === -1) {
    cart.push(product);
} else {
    alert('Este producto ya está en el carrito.');
}