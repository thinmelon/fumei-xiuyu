/* -------------------------------------------------------------------------------------------- */
/* -----------------------------------------   视频播放模块   ----------------------------------- */
/* -------------------------------------------------------------------------------------------- */

function VideoModule() {
    var that = this;

    // 属性
    this.smallScreenPlay = false;                  //  对于 video.html 默认为全屏播放
    this.resourceId = '';
    this.assertId = '';
    this.backURL = '';
    this.smallScreenLeft = 56;
    this.smallScreenTop = 164;
    this.smallScreenWidth = 792;
    this.smallScreenHeight = 446;
    this.mediaPlayer = null;

    if (cmsConfig.environment === 'DEBUG') {
        this.ip = '10.215.0.12';
        this.port = '8080';
        this.account = '8350310392603009';
        this.client = '8350310392603009';
    } else {
        this.ip = GlobalVarManager.getItemStr('ip');
        this.port = GlobalVarManager.getItemStr('port');
        this.account = GlobalVarManager.getItemStr('account');
        this.client = CAManager.cardSerialNumber;
    }

    // 方法
    this.init = function () {
        document.getElementById('debug-message').innerHTML += '<br/>' + '  Resource ID ==> ' + this.resourceId;
        document.getElementById('debug-message').innerHTML += '<br/>' + '  Assert ID ==> ' + this.assertId;
        if (cmsConfig.environment === 'PRODUCT') {
            //  小屏播放，创建播放器对象
            if (this.smallScreenPlay) {
                this.mediaPlayer = cmsApi.createMediaPlayer(
                    this.smallScreenLeft,
                    this.smallScreenTop,
                    this.smallScreenWidth,
                    this.smallScreenHeight
                );
            }
            //  视频地址来源
            if (this.assertId !== '') {
                this.play();
            } else if (this.resourceId !== '') {
                //  获取视频assetId
                cmsApi.fetchVideoAssetId(this.resourceId, function (json) {
                    if ('1' === json.code || 1 === json.code) {
                        that.assertId = json.dataArray[0].assetid;
                        that.play();
                    }
                });
            }
        }
    };
    /** end of init */

    this.focusOn = function (cursor) {
        cursor.style.visibility = 'visible';
        cursor.style.left = this.smallScreenLeft + 'px';
        cursor.style.top = this.smallScreenTop + 'px';
        cursor.style.width = this.smallScreenWidth + 'px';
        cursor.style.height = this.smallScreenHeight + 'px';
    };

    this.focusOut = function (cursor) {
        cursor.style.visibility = 'hidden';
    };

    this.moveX = function (_direction) {
        return -1;
    };

    this.moveY = function (_direction) {
        return -1;
    };

    this.play = function () {
        var that = this;

        //
        // 获取视频播放参数
        //
        cmsApi.fetchVideoDetails(that.ip, that.port, that.assertId, that.client, that.account, function (response) {
            var
                _data;

            _data = parseDom(response);
            document.getElementById('debug-message').innerHTML += '<br/>' + '  0 ==> ' + jsonUtils.stringify(_data.ItemData[0].SelectableItem[0]);
            document.getElementById('debug-message').innerHTML += '<br/>' + '  0.1 ==> ' + _data.ItemData[0].SelectableItem[0].serviceId;
            document.getElementById('debug-message').innerHTML += '<br/>' + '  0.2 ==> ' + jsonUtils.stringify(_data.ItemData[0].SelectableItem[0].RentalInfo[0]);
            if (typeof (_data) === 'object' && _data !== null) {
                if ('ItemData' in _data) {
                    //
                    // 获取rtsp流
                    //
                    cmsApi.fetchRtspStream(
                        that.ip,
                        that.port,
                        that.assertId,
                        that.client,
                        that.account,
                        _data.ItemData[0].SelectableItem[0].serviceId,
                        function (rawData) {
                            var
                                stream = parseDom(rawData);

                            document.getElementById('debug-message').innerHTML += '<br/>' + '1  ==> ' + jsonUtils.stringify(stream.StartResponse[0]);
                            document.getElementById('debug-message').innerHTML += '<br/>' + '1.1  ==> ' + stream.StartResponse[0].rtsp;
                            if (typeof (stream) === 'object' && stream !== null) {
                                if (that.smallScreenPlay) {
                                    //
                                    //  小屏播放
                                    //
                                    cmsApi.setSmallScreenVideo(
                                        stream.StartResponse[0].rtsp.split(';'),
                                        that.mediaPlayer
                                    );
                                } else {
                                    //
                                    // 跳转至视频播放链接（全屏）
                                    //
                                    cmsApi.playVideo(
                                        stream.StartResponse[0].rtsp.split(';'),
                                        stream.StartResponse[0].previewAssetId,
                                        stream.StartResponse[0].startTime,
                                        stream.StartResponse[0].purchaseToken,
                                        that.assertId,
                                        _data.ItemData[0].SelectableItem[0],
                                        0,
                                        that.backURL
                                    );
                                }
                            }
                        });
                } else {
                    // 错误处理
                    if ('NavServerResponse' in _data) {
                        var _message = _data.NavServerResponse[0].debug,
                            _errorCode = _data.NavServerResponse[0].code;

                        document.getElementById('debug-message').innerHTML += '<br/>' + 'Error - ' + _errorCode + ', message:' + _message;
                    } else {
                        document.getElementById('debug-message').innerHTML += '<br/>' + '获取数据失败';
                    }
                }

            }
        });
    };

    this.autoPlaySmallVideo = function () {
        cmsApi.playSmallScreenVideo(this.mediaPlayer);
    };

    this.stop = function () {
        cmsApi.stopSmallScreenVideo(this.mediaPlayer);
    };
}