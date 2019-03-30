class Product {
    constructor(source, mycart, container_1 = '.featured-line', container_2 = '.single_page_item_bottom_flex_2') {
        this.source = source;
        this.mycart = mycart;
        this.container_1 = container_1;
        this.container_2 = container_2;
        this.goodItems = [];
        this._init(this.source);
    }

    _init(source) {
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents) {
                    this.goodItems.push(product);
                    this._render(product);
                }
            })
    }

    _render(product) {
        let $lineItem = $('<div/>', {
            class: 'line-item',
            'id_product': product.id_product
        });

        let $lineItemA = $('<a/>', {
            href: "singlepage.html",
            class: 'feat-item'
        });

        $lineItemA.append($(`<img src="${product.product_img}" alt="Рисунок">`));
        $lineItemA.append($(`<p class="line-item-text-1">${product.product_name}</p>`));
        $lineItemA.append($(`<p class="line-item-text-2">$${product.price.toFixed(2)}</p>`));

        let $lineItemDivAdd = $('<div/>', {
            class: 'add-to-cart',
            'id_product': product.id_product
        });

        let $lineItemDivAddA = $('<div/>', {
            class: 'add-to-cart-a',
            text: 'Add to Cart',
            "data-id_product": product.id_product,
            "data-product_img": product.product_img,
            "data-product_name": product.product_name,
            "data-color": product.color,
            "data-size": product.size,
            "data-price": product.price,
            "data-quantity": product.quantity,
            "data-shipping": product.shipping
        });

        let $lineItemDivAddAImg = $('<img/>', {
            src: 'assets/img/cart-white.png',
            "data-id_product": product.id_product,
            "data-product_img": product.product_img,
            "data-product_name": product.product_name,
            "data-color": product.color,
            "data-size": product.size,
            "data-price": product.price,
            "data-quantity": product.quantity,
            "data-shipping": product.shipping
        });

        $lineItemDivAddAImg.prependTo($lineItemDivAddA);

        $lineItemDivAddA.appendTo($lineItemDivAdd);

        $lineItemDivAddA.click((e) => {
            this.mycart.addProduct(e.target);
        });

        $lineItemDivAddAImg.click((e) => {
            this.mycart.addProduct(e.target);
            e.stopPropagation();
        });

        $lineItemA.appendTo($lineItem);
        $lineItemDivAdd.appendTo($lineItem);
        $lineItem.appendTo(this.container_1);
        $lineItem.appendTo(this.container_2);
    }
}