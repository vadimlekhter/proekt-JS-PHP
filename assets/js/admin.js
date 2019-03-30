class Admin {
    constructor(source) {
        this.source = source;
        this.feedItems = [];
        this._init();
    }

    _init() {
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let item of data) {
                    this.feedItems.push(item);
                    this._renderItem(item);
                }
            });

        $('.admin').on('click', '.itemBtnApprove', e => {
            this._approveItem(+$(e.target).data('id'));
        });

        $('.admin').on('click', '.itemBtnAdd', e => {
            this._addItem(+$(e.target).data('id'), 'feedbacks');
        });

        $('.admin').on('click', '.itemBtnRemove', e => {
            this._removeItem(+$(e.target).data('id'));
        });

        $('.send').on('click', '.btnSendMsg', e => {
            this._sendMsg(e, $('#name').val(), $('#message').val());
        });

        $('.send').on('click', '.btnSendMsg', e => {
            this._clearInput(e);
        });
    }

    _renderItem(item) {
        if (item.id === null) {
            this.feedItems.push(item);
            $.each(this.feedItems, function (index, value) {
                if (value.id === null) {
                    value.id = index + 1;
                    let $container = $('<div/>', {
                        class: 'feedItemAdmin',
                        'data-id': value.id,
                        'data-approved': false
                    });
                    $container.append($(`<div class="feedItemId">${value.id}</div>`));
                    $container.append($(`<div class="feedItemAuthor">${value.author}</div>`));
                    $container.append($(`<div class="feedItemText">${value.text}</div>`));
                    $container.append($(`<button class="itemBtnAdd" data-id="${value.id}">Добавить на сайт</button>`));
                    $container.append($(`<button class="itemBtnRemove" data-id="${value.id}">Удалить</button>`));
                    $container.append($(`<button class="itemBtnApprove" data-id="${value.id}">Одобрить</button>`));
                    $container.appendTo($('.admin'));
                }
            });
        } else {
            let $container = $('<div/>', {
                class: 'feedItemAdmin',
                'data-id': item.id,
                'data-approved': false
            });
            $container.append($(`<div class="feedItemId">${item.id}</div>`));
            $container.append($(`<div class="feedItemAuthor">${item.author}</div>`));
            $container.append($(`<div class="feedItemText">${item.text}</div>`));
            $container.append($(`<button class="itemBtnAdd" data-id="${item.id}">Добавить на сайт</button>`));
            $container.append($(`<button class="itemBtnRemove" data-id="${item.id}">Удалить</button>`));
            $container.append($(`<button class="itemBtnApprove" data-id="${item.id}">Одобрить</button>`));
            $container.appendTo($('.admin'));
        }
    }

    _approveItem(id) {
        $(`.feedItemAdmin[data-id="${id}"]`).addClass('approved');
        $(`.feedItemAdmin[data-id="${id}"]`).attr('data-approved', 'true');
    }

    _addItem(id, feedbacks) {
        let find = this.feedItems.find(item => item.id === id);
        if ($(`div.${feedbacks}`).find(`div[data-id='${id}']`).length !== 0) {
            alert('Этот отзыв уже добавлен на сайт');
        }
        else if ($(`.feedItemAdmin[data-id="${id}"]`).attr('data-approved') === 'true') {
            let $container = $('<div/>', {
                class: 'feedItemSite',
                'data-id': find.id
            });
            $container.append($(`<div class="feedItemAuthorSite">${find.author}</div>`));
            $container.append($(`<div class="feedItemTextSite">${find.text}</div>`));
            $container.appendTo($('.feedbacks'));
            $(`.feedItemAdmin[data-id="${id}"]`).addClass('added');
        } else alert('Отзыв не одобрен');
    }

    _removeItem(id) {
        if (confirm("Вы уверены?")) {
            $(`.feedItemSite[data-id="${id}"]`).remove();
            $(`.feedItemAdmin[data-id="${id}"]`).removeClass('added');
            $(`.feedItemAdmin[data-id="${id}"]`).addClass('approved');
        }
    }

    _sendMsg(e, name, message) {
        e.preventDefault();
        if (name.length === 0 || message.length === 0) {
            alert('Не  введено имя или сообщение');
        }
        let sendObj = {
            author: name,
            text: message,
            id: null,
        };
        this._renderItem(sendObj);
        this._clearInput();
    }

    _clearInput(e) {
        e.preventDefault();
        $('#name').val();
        $('#message').val();
    }
}