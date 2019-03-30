class Cart {
    constructor(source, container = '.cart-icon') {
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.amount = 0; // Общая стоимость товаров
        this.cartItems = []; // Массив с товарами
        this._init(this.source);
        this._clearShoppingCard();
    }

    _init(source) {
        this._render();
        if (!localStorage.getItem('cart')) {
            fetch(source)
                .then(result => result.json())
                .then(data => {
                    for (let product of data.contents) {
                        this.cartItems.push(product);
                        this._renderItem(product);
                    }
                    this.countGoods = data.countGoods;
                    this.amount = data.amount;
                    this._localStorageSet();
                    this._renderSum();
                })
        } else {
            for (let product of JSON.parse(localStorage.getItem('cart'))) {
                this.cartItems.push(product);
                this._renderItem(product);
            }
            this.countGoods = JSON.parse(localStorage.getItem('countGoods'));
            this.amount = JSON.parse(localStorage.getItem('amount'));
            this._renderSum();
        }
    }

    _localStorageSet() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        localStorage.setItem('countGoods', `${this.countGoods}`);
        localStorage.setItem('amount', `${this.amount}`);
    }

    _render() {
        let $cartDropMenu = $('<div/>', {
            class: 'cart_drop_menu'
        });
        $cartDropMenu.appendTo(this.container);
    }

    _renderItem(product) {
        let $container = $('<div/>', {
            class: 'cart_drop_menu_item',
            'data-product': product.id_product
        });
        $container.append($(`<img class="cart_drop_menu_item_img" src="${product.product_img}">`));
        let $container_2 = $('<a/>', {
            href: "singlepage.html",
            class: 'cart_drop_menu_item_name',
            'data-product': product.id_product
        });
        $container_2.append($(`<p class="cart_drop_menu_item_name_text">${product.product_name}</p>`));
        let $container_3 = $('<div/>', {
            class: 'cart_drop_menu_item_quan_x_price',
            'data-product': product.id_product
        });
        $container_3.append($(`<p class="cart_drop_menu_item_quant">${product.quantity} X </p>`));
        $container_3.append($(`<p class="cart_drop_menu_item_price">${product.price.toFixed(2)} $</p>`));
        $container_3.appendTo($container_2);
        $container_2.appendTo($container);
        let $cartDel = $(`<div class="cart_drop_menu_delete" data-id="${product.id_product}"><i class="fas fa-times-circle"></i></div>`);
        $container.append($cartDel);
        $($cartDel).on('click', e => {
            this._deleteFromCart(+$(e.target).parent().data('id'));
        });
        $container.prependTo($('.cart_drop_menu'));


        let $tr = $('<tr/>', {
            id: 'tr',
            'data-product': product.id_product
        });
        let $td1 = $('<td/>', {
            class: 'product_details_item_th_left'
        });
        let $td1A = $('<a/>', {
            href: "singlepage.html",
            class: 'product_details_item_name_link'
        });
        $td1A.append($(`<img class="product_details_item_name_img" src="${product.product_img}"
                                 alt="Заказ">`));
        let $tdDivName = $('<div/>', {
            class: 'product_details_item_name_text'
        });
        $tdDivName.appendTo($td1A);
        $tdDivName.append($(`<p class="product_details_item_name_text_1">${product.product_name}</p>`));
        $tdDivName.append($(`<p class="product_details_item_name_text_2"><span>Color:&nbsp</span>${product.color}</p>`));
        $tdDivName.append($(`<p class="product_details_item_name_text_3"><span>Size:&nbsp</span>${product.size}</p>`));
        $td1A.appendTo($td1);
        $td1.appendTo($tr);

        let $td2 = $('<td/>', {
            class: 'product_details_item_th_center'
        });
        $td2.append($(`<div class="product_details_item_name_price">$${product.price.toFixed(2)}</div>`));
        $td2.appendTo($tr);

        let $td3 = $('<td/>', {
            class: 'product_details_item_th_center'
        });
        let $td3Div = $('<div/>', {
            class: 'product_details_item_name_quan'
        });
        $td3Div.append($(`<input type="text" placeholder="${product.quantity}">`));
        $td3Div.appendTo($td3);
        $td3.appendTo($tr);

        let $td4 = $('<td/>', {
            class: 'product_details_item_th_center'
        });
        $td4.append($(`<div class="product_details_item_name_ship">${product.shipping}</div>`));
        $td4.appendTo($tr);

        let $td5 = $('<td/>', {
            class: 'product_details_item_th_center'
        });
        $td5.append($(`<div class="product_details_item_name_subtotal">$${(product.price * product.quantity).toFixed(2)}</div>`));
        $td5.appendTo($tr);

        let $td6 = $('<td/>', {
            class: 'product_details_item_th_center'
        });
        $td6.append($(`<div class="product_details_item_name_action" data-id="${product.id_product}">
<i class="fas fa-times-circle"></i></div>`));
        $td6.appendTo($tr);
        $($td6).on('click', '.product_details_item_name_action', e => {
            this._deleteFromCart(+$(e.target).parent().data('id'));
        });

        $tr.appendTo($('.product_details_item'));
    }

    _renderSum() {
        let $cartDropMenu = $('.cart_drop_menu');

        let $container = $('<div/>', {
            class: 'cart_drop_menu_total'
        });
        let $totalText = $('<div/>', {
            class: 'cart_drop_menu_total_text',
            text: 'total'
        });
        let $totalSumm = $('<div/>', {
            class: 'cart_drop_menu_total_summ',
            text: `${this.amount.toFixed(2)} $`
        });
        $totalText.appendTo($container);
        $totalSumm.appendTo($container);
        $container.appendTo($cartDropMenu);
        let $checkout = $('<a/>', {
            href: "checkout.html",
            class: 'cart_drop_menu_checkout',
            text: 'checkout'
        });
        let $cartA = $('<a/>', {
            href: "shoppingcart.html",
            class: 'cart_drop_menu_gotocart',
            text: 'go to cart'
        });
        $checkout.appendTo($cartDropMenu);
        $cartA.appendTo($cartDropMenu);

        let $cartCountGoods = $('<div/>', {
            class: 'cart_drop_menu_count_goods',
            text: `${this.countGoods}`
        });
        $cartCountGoods.prependTo($('.header-right'));

        $('.product_details_shipping_coupon_grandtotal_string_1_sum').text(`$${this.amount.toFixed(2)}`);
        $('.product_details_shipping_coupon_grandtotal_string_2_sum').text(`$${this.amount.toFixed(2)}`);
    }

    _updateCart(product) {
        this._localStorageSet();
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.cart_drop_menu_item_quant').text(`${product.quantity} X`);
        $('.cart_drop_menu_total_summ').text(`${this.amount.toFixed(2)} $`);
        $('.cart_drop_menu_count_goods').text(`${this.countGoods}`);
        $('.product_details_shipping_coupon_grandtotal_string_1_sum').text(`$${this.amount.toFixed(2)}`);
        $('.product_details_shipping_coupon_grandtotal_string_2_sum').text(`$${this.amount.toFixed(2)}`);
    }


    addProduct(element) {
        let productId = +$(element).data('id_product');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                product_img: $(element).data('product_img'),
                product_name: $(element).data('product_name'),
                color: $(element).data('color'),
                size: $(element).data('size'),
                quantity: +$(element).data('quantity'),
                shipping: $(element).data('shipping'),
                price: +$(element).data('price')
            };
            this.cartItems.push(product);
            this.countGoods += product.quantity;
            this.amount += product.price;
            this._renderItem(product);
            this._updateCart(product);
        }
    }

    _deleteFromCart(productId) {
        let find = this.cartItems.find(product => product.id_product === productId);
        let findIndex = this.cartItems.indexOf(find);
        this.cartItems.splice(findIndex, 1);
        $(`.cart_drop_menu_item[data-product="${productId}"]`).remove();
        $(`#tr[data-product="${productId}"]`).remove();
        this.amount -= find.price * find.quantity;
        this.countGoods -= find.quantity;
        this._updateCart(find);
    }

    _clearShoppingCard() {
        let $clearCard = $('.clear_shopping_card');
        $($clearCard).on('click', e => {
            this.cartItems = [];
            this.amount = 0;
            this.countGoods = 0;
            this._localStorageSet();
            $('.cart_drop_menu_item').remove();
            $(tr).remove();
            $('.cart_drop_menu_total_summ').text(`${this.amount.toFixed(2)} $`);
            $('.cart_drop_menu_count_goods').text(`${this.countGoods}`);
            $('.product_details_shipping_coupon_grandtotal_string_1_sum').text(`$${this.amount.toFixed(2)}`);
            $('.product_details_shipping_coupon_grandtotal_string_2_sum').text(`$${this.amount.toFixed(2)}`);
        });
    }
}