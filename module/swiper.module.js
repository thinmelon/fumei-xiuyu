/**
 * ----------------------------------------------------------------------------------------------
 * ----------------------------------------- 滑块视图容器 ---------------------------------------
 * ----------------------------------------------------------------------------------------------
 */

function SwiperModule() {
    this.swiperTop = 0;             //  上边距
    this.swiperLeft = 0;            //  左边距
    this.swiperWidth = 0;           //  宽度
    this.swiperHeight = 0;          //  高度
    this.album = [];                //  图集
    this.position = 0;              //  当前图片在图集内的位置
    this.interval = 3000;           //  图片滚动的时间间隔
    this.timerId = 0;               //  timer ID
    this.remoteImage = false;       //  图片是否存在CMS上
    this.resourceId = 0;            //  资源 ID
    this.maxCount = 5;              //  海报上限

    /**
     *  初始化
     */
    this.init = function () {
        var that = this;

        if (cmsConfig.environment === 'DEBUG') {
            this.album = [
                {
                    img: 'url(../images/index/3.jpg)',
                    resourceId: cmsConfig.indexResourceIdArray[4].resourceId,
                    assertId: 111
                },
                {
                    img: 'url(../images/index/4.jpg)',
                    resourceId: cmsConfig.indexResourceIdArray[5].resourceId,
                    assertId: 111
                },
                {
                    img: 'url(../images/index/5.jpg)',
                    resourceId: cmsConfig.indexResourceIdArray[6].resourceId
                },
                {
                    img: 'url(../images/index/6.jpg)',
                    resourceId: cmsConfig.indexResourceIdArray[7].resourceId
                },
                {
                    img: 'url(../images/index/7.jpg)',
                    resourceId: cmsConfig.indexResourceIdArray[8].resourceId
                }
            ];
            this.render();
        } else {
            if (this.resourceId !== 0) {
                cmsApi.getListItems(this.resourceId, this.maxCount, 1, function (response) {
                    if (response.hasOwnProperty('code') && ('1' === response.code || 1 === response.code)) {
                        document.getElementById('debug-message').innerHTML += '<br/>' + response;
                        that.remoteImage = true;        //  显示服务器上的图片
                        for (var j = 0, length = response.dataArray.length; (j < length) && (j < that.maxCount); j++) {
                            that.album.push({
                                img: response.dataArray[j].img,
                                assertId: response.dataArray[j].assetid
                            });
                        }
                        that.render();
                    }
                });
            }
        }
    };

    this.render = function () {
        var swiper = document.getElementById('swiper');
        // 初始化滑块视图容器
        swiper.style.top = this.swiperTop + 'px';
        swiper.style.left = this.swiperLeft + 'px';
        swiper.style.width = this.swiperWidth + 'px';
        swiper.style.height = this.swiperHeight + 'px';
        // 创建滑块图片下标组
        var swiperIndexGroup = document.createElement('div');
        swiperIndexGroup.className = 'swiper-index-group';
        // 生成滑块图片下标
        var i, length, swiperIndexItem;
        for (i = 0, length = this.album.length; i < length; i++) {
            swiperIndexItem = document.createElement('div');
            swiperIndexItem.innerHTML = i + 1;
            swiperIndexItem.id = 'swiper-index-' + i;
            swiperIndexItem.className = 'swiper-index';
            swiperIndexGroup.appendChild(swiperIndexItem);
        }
        swiper.appendChild(swiperIndexGroup);
        // 启动图片循环播放
        this.triggerTimer();
    };

    /**
     *  聚焦
     */
    this.focusOn = function () {
        clearInterval(this.timerId);
        // document.getElementById('swiper').style.backgroundImage =
        //     this.remoteImage ? cmsConfig.imgUrl + this.album[this.position].img : this.album[this.position].img;
        this.setBackgroundImage();
        document.getElementById('swiper-index-' + this.position).style.borderColor = '#FFFF00';
    };

    /**
     *  失焦
     */
    this.focusOut = function () {
        document.getElementById('swiper-index-' + this.position).style.backgroundColor = '';
        document.getElementById('swiper-index-' + this.position).style.borderColor = '#FFFFFF';
    };

    /**
     *  横向移动光标
     * @param direction
     */
    this.moveX = function (direction) {
        this.position += direction;
        if (this.position >= 0 && this.position < this.album.length) {
            return 0;
        } else if (this.position < 0) {
            this.position = 0;
            return -1;
        } else {
            this.position = this.album.length - 1;
            return -1;
        }
    };

    /**
     *  纵向移动光标
     * @returns {number}
     */
    this.moveY = function (direction) {
        this.position += direction;
        if (this.position >= 0 && this.position < this.album.length) {
            return 0;
        } else if (this.position < 0) {
            this.position = 0;
            return -1;
        } else {
            this.position = this.album.length - 1;
            return -1;
        }
    };

    /**
     * 设置背景图片
     */
    this.setBackgroundImage = function () {
        var bgImage = this.remoteImage ? 'url(' + cmsConfig.imgUrl + this.album[this.position].img + ')' : this.album[this.position].img;
        document.getElementById('debug-message').innerHTML += '<br/>' + 'triggerTimer ==>  background image ====> ' + bgImage;
        document.getElementById('swiper').style.backgroundImage = bgImage;
        document.getElementById('swiper-index-' + this.position).style.backgroundColor = '#13934F';
    };

    /**
     *  依次显示图集内的图片
     */
    this.triggerTimer = function () {
        var that = this;

        document.getElementById('debug-message').innerHTML += '<br/>' + 'triggerTimer ==>  setBackgroundImage';
        this.setBackgroundImage();
        document.getElementById('swiper-index-' + this.position).style.backgroundColor = '#13934F';

        this.timerId = setInterval(function () {
            document.getElementById('swiper-index-' + that.position).style.backgroundColor = '';
            that.position = (that.position + 1) % that.album.length;
            that.setBackgroundImage();
        }, that.interval);
    };
}