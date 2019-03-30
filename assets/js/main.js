$(document).ready(() => {

    $('.single_page_slider').slick({
        autoplay: true
    });

   //Корзина
    let mycart = new Cart('assets/js/getCart.json');

    //Товары
    let product = new Product ('assets/js/product.json', mycart);

    let admin = new Admin('assets/js/feedback.json');

});