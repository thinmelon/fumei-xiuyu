function MoreModule() {
    // 属性
    this.perRowsInPage = 2;         //  每页最多显示两行
    this.perItemsInRow = 4;         //  每行最多显示四项
    this.focusPosX = 0;             //  默认定位在第一行第一项
    this.focusPosY = 0;

    this.pageIndex = 0;
    this.totalPages = 0;

    this.moreItemArray = [];
    this.logoImageSrc = '';
    this.cardLeft = 0;
    this.cardTop = 0;
    this.cardWidth = 268;
    this.cardHeight = 212;
    this.cardPadding = 296;
    this.cardMarginLeft = 57;
    this.cardMarginTop = 136;
    this.lineSpacing = 237;
    this.marqueeNumber = 10;

    this.resourceId = '';
    this.resourceType = 'textures';
    this.backURL = '';

    // 方法
    this.init = function (pageIndex, callback) {
        var that = this;

        this.removeAllMoreItems();

        if (cmsConfig.environment === 'DEBUG') {
            var testData = [
                {assetid: 111, img: '../images/news/3.jpg', title: '我我我我我我我我我我我', flag: 0, id: 21},
                {assetid: 111, img: '../images/news/3.jpg', title: '我我我我我我我我我我我', flag: 0, id: 21},
                {assetid: 111, img: '../images/news/3.jpg', title: '我我我我我我我我我我我', flag: 0, id: 21},
                {assetid: 111, img: '../images/news/3.jpg', title: '我我我我我我我我我我我', flag: 0, id: 21},
                {assetid: 111, img: '../images/news/3.jpg', title: '我我我我我我我我我我我', flag: 0, id: 21},
                {assetid: 111, img: '../images/news/3.jpg', title: '我我我我我我我我我我我', flag: 0, id: 21},
                {assetid: 111, img: '../images/news/3.jpg', title: '我我我我我我我我我我我', flag: 0, id: 21},
                {assetid: 111, img: '../images/news/3.jpg', title: '我我我我我我我我我我我', flag: 0, id: 21}
            ];
            this.pageIndex = pageIndex;
            this.totalPages = 8;
            this.addMoreItem(testData);
            callback();
        } else {
            if (this.resourceId !== '') {
                cmsApi.getListItems(this.resourceId, 8, pageIndex, function (response) {
                    if ('1' === response.code || 1 === response.code) {
                        if (response.dataArray.length > 0) {
                            that.pageIndex = pageIndex;
                            that.totalPages = response.total_page;
                            document.getElementById('debug-message').innerHTML += '<br/>' + 'Page index ==> ' + that.pageIndex + ' Total pages: ' + that.totalPages;
                            document.getElementById('more-page-index-text').innerHTML = that.pageIndex + ' / ' + that.totalPages;
                            that.addMoreItem(response.dataArray);
                            callback();
                        }
                    }
                });
            }
        }
    };

    this.changePage = function (direction, callback) {
        var index;

        index = this.pageIndex + direction;
        if (index >= 1 && index <= this.totalPages) {
            this.focusOut();
            this.focusPosX = 0;
            this.focusPosY = 0;
            document.getElementById('debug-message').innerHTML += '<br/>' + 'changePage ==> direction = ' + direction + ' | page index = ' + index;
            this.init(index, callback);
        }
    };

    this.removeAllMoreItems = function () {
        var i,
            parent = document.getElementById('content'),
            children = parent.childNodes;

        //每页最多显示两行
        this.moreItemArray[0] = [];
        this.moreItemArray[1] = [];

        for (i = children.length - 1; i >= 0; i--) {
            parent.removeChild(children[i]);
        }
    };

    this.addMoreItem = function (data) {
        var i,
            maxItems = this.perRowsInPage * this.perItemsInRow,
            length,
            card,
            cardImage,
            cardText;

        // document.getElementById('self-define-logo').children[0].src = this.logoImageSrc;

        for (i = 0, length = data.length; i < length && i < maxItems; i++) {
            card = document.createElement('div');
            card.className = 'more-page-item';

            cardImage = document.createElement('img');
            if (cmsConfig.environment === 'DEBUG') {
                cardImage.src = data[i].img;
            } else {
                cardImage.src = cmsConfig.imgUrl + data[i].img;
            }


            cardText = document.createElement('div');
            cardText.id = 'more-page-item-text-' + i;
            cardText.className = 'more-page-item-text';
            cardText.innerHTML = data[i].title;

            card.appendChild(cardImage);
            card.appendChild(cardText);

            if (i < this.perItemsInRow) {
                card.style.left = this.cardLeft + (i * this.cardPadding) + 'px';
                card.style.top = this.cardTop + 'px';

                this.moreItemArray[0][i] = {
                    assetid: data[i].assetid,
                    img: data[i].img,
                    title: data[i].title,
                    flag: parseInt(data[i].flag),
                    id: data[i].id,
                    date: data[i].date,
                    left: this.cardMarginLeft + this.cardLeft + (i * this.cardPadding),
                    top: this.cardMarginTop + this.cardTop,
                    width: this.cardWidth,
                    height: this.cardHeight
                };

            } else {
                card.style.left = this.cardLeft + ((i - this.perItemsInRow) * this.cardPadding) + 'px';
                card.style.top = this.cardTop + this.lineSpacing + 'px';

                this.moreItemArray[1][(i - this.perItemsInRow)] = {
                    assetid: data[i].assetid,
                    img: data[i].img,
                    title: data[i].title,
                    flag: parseInt(data[i].flag),
                    id: data[i].id,
                    date: data[i].date,
                    left: this.cardMarginLeft + this.cardLeft + ((i - this.perItemsInRow) * this.cardPadding),
                    top: this.cardMarginTop + this.cardTop + this.lineSpacing,
                    width: this.cardWidth,
                    height: this.cardHeight
                };
            }
            document.getElementById('content').appendChild(card);
        }
    };

    this.focusOn = function (cursor) {
        console.info('more.module.js ==> focusOn ==> focusX = ' + this.focusPosX + ' focusY = ' + this.focusPosY);
        var _num = this.focusPosY * this.perItemsInRow + this.focusPosX;

        if (this.moreItemArray[0].length > 0) {
            cursor.style.visibility = 'visible';
            cursor.style.left = this.moreItemArray[this.focusPosY][this.focusPosX].left + 'px';
            cursor.style.top = this.moreItemArray[this.focusPosY][this.focusPosX].top + 'px';
            cursor.style.width = this.moreItemArray[this.focusPosY][this.focusPosX].width + 'px';
            cursor.style.height = this.moreItemArray[this.focusPosY][this.focusPosX].height + 'px';

            showTitleForMarquee(this.moreItemArray[this.focusPosY][this.focusPosX].title, document.getElementById('more-page-item-text-' + _num), this.marqueeNumber);
        }

    };

    this.focusOut = function () {
        var _num = this.focusPosY * this.perItemsInRow + this.focusPosX;

        if (this.moreItemArray[0].length > 0) {
            document.getElementById('more-page-item-text-' + _num).innerHTML = this.moreItemArray[this.focusPosY][this.focusPosX].title;
        }
    };

    this.moveX = function (_direction) {
        this.focusPosX += _direction;
        if (this.focusPosX >= 0 && this.focusPosX < this.moreItemArray[this.focusPosY].length) {

        } else if (this.focusPosX < 0) {
            if (this.focusPosY > 0) {
                this.focusPosY--;
                this.focusPosX = this.moreItemArray[this.focusPosY].length - 1;
            } else {
                this.focusPosX = 0;
            }
        } else {
            if (this.focusPosY === 0 && this.moreItemArray[1].length > 0) {
                this.focusPosY++;
                this.focusPosX = 0;
            } else {
                this.focusPosX = this.moreItemArray[this.focusPosY].length - 1;
            }

        }
        console.info('more.module.js    ==>     moveX | X: ' + this.focusPosX + ' Y: ' + this.focusPosY);
    };

    this.moveY = function (_direction) {
        var rows;

        if (this.moreItemArray[1].length > 0) {
            rows = 2;
        } else if (this.moreItemArray[0].length > 0) {
            rows = 1;
        }
        this.focusPosY += _direction;
        if (this.focusPosY >= 0 && this.focusPosY < rows) {
            if (this.focusPosX > this.moreItemArray[this.focusPosY].length - 1) {
                this.focusPosY = 0;
            }
        } else if (this.focusPosY < 0) {
            this.focusPosY = 0;
        } else {
            this.focusPosY = rows - 1;
        }
        console.info('more.module.js    ==>     moveY | X: ' + this.focusPosX + ' Y: ' + this.focusPosY);
    };

    this.doSelect = function (postfix) {
        switch (this.resourceType) {
            case 'textures':
                window.location.href = 'textures.html' + postfix;
                break;
            case 'monitor':
                window.location.href = 'monitor.html' + postfix;
                break;
            default:
                break;
        }
    };
}