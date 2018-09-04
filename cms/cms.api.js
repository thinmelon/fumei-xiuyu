var cmsApi = {
    doGet: function (url, response) {
        var postman = new Postman();

        document.getElementById('debug-message').innerHTML += '<br/>' + ' URL ==> ' + url;
        postman.createXmlHttpRequest(
            function (result) {
                var json = eval('(' + result + ')');
                document.getElementById('debug-message').innerHTML += '<br/>' + ' Response:' + result;
                response(json);
            },
            function (err) {
                document.getElementById('debug-message').innerHTML += '<br/>' + ' Error ==> ' + err;
                response(err);
            });
        postman.sendRequest(
            'GET',
            url,
            null
        );
    },

    /**
     * 不对返回结果作JSON化处理
     * @param url
     * @param response
     */
    doGet2: function (url, response) {
        var postman = new Postman();

        document.getElementById('debug-message').innerHTML += '<br/>' + ' URL ==> ' + url;
        postman.createXmlHttpRequest(
            function (result) {
                document.getElementById('debug-message').innerHTML += '<br/>' + ' Response:' + result;
                response(result);
            },
            function (err) {
                document.getElementById('debug-message').innerHTML += '<br/>' + ' Error ==> ' + err;
                response(err);
            });
        postman.sendRequest(
            'GET',
            url,
            null
        );
    },

    doPost: function (url, data, response) {
        var postman = new Postman();

        postman.createXmlHttpRequest(
            function (result) {
                response(result);

            },
            function (err) {
                response(err);
            }
        );
        postman.sendRequest(
            'POST',
            url,
            data);
    },

    /**
     * 获取图文列表项
     * @param resoureId
     * @param num
     * @param curPage
     * @param response
     */
    getListItems: function (resoureId, num, curPage, response) {
        var url = cmsConfig.serverUrl +
            'queryTitleListMobile.shtml?resourceId=' + resoureId + '&num=' + num + '&cur_page=' + curPage;

        this.doGet(url, response);
    },

    /**
     * 获取图文详情
     * @param id
     * @param response
     */
    getListItemDetails: function (id, response) {
        var url = cmsConfig.serverUrl +
            'queryTitleByIdMobile.shtml?id=' + id;

        document.getElementById('debug-message').innerHTML += '<br/>' + 'getListItemDetails   ==>  URL ==> ' + url;

        this.doGet(url, response);
    },

    /**
     * CMS后台管理系统
     * 获取视频播放的AssetId
     * @param resourceId
     * @param response
     */
    fetchVideoAssetId: function (resourceId, response) {
        var url = cmsConfig.serverUrl +
            'queryTitleListMobile.shtml?resourceId=' + resourceId + '&num=1&cur_page=1';

        document.getElementById('debug-message').innerHTML += '<br/>' + 'fetchVideoAssetId  ==>  URL ==> ' + url;

        this.doGet(url, response);
    },

    /**
     * 根据AssetId获取视频的详细参数
     * @param ip
     * @param port
     * @param assetId
     * @param client
     * @param account
     * @param response
     */
    fetchVideoDetails: function (ip, port, assetId, client, account, response) {
        var url = 'http://' + ip + ':' + port + '/GetItemData',
            data = '<?xml version=\'1.0\' encoding=\'UTF-8\' standalone=\'yes\'?><GetItemData titleAssetId=\'' + assetId
                + '\' portalId=\'1\' client=\'' + client
                + '\' account=\'' + account
                + '\' languageCode=\'Zh-CN\' profile=\'1\'/>';

        document.getElementById('debug-message').innerHTML += '<br/>' + 'fetchVideoDetails  ==>  URL ==> ' + url;
        document.getElementById('debug-message').innerHTML += '<br/>' + 'Data ==> ' + encodeURI(data);

        this.doPost(url, data, response);
    },

    /**
     * 获取RTSP流
     * @param ip
     * @param port
     * @param assetId
     * @param client
     * @param account
     * @param serviceId
     * @param response
     */
    fetchRtspStream: function (ip, port, assetId, client, account, serviceId, response) {
        var url,
            data;

        url = 'http://' + ip + ':' + port + '/SelectionStart';
        data = '<?xml version=\'1.0\' encoding=\'UTF-8\' standalone=\'yes\'?><SelectionStart titleAssetId=\'' + assetId
            + '\' folderAssetId=\'' + assetId
            + '\' portalId=\'1\'  client=\'' + client
            + '\' account=\'' + account
            + '\' serviceId=\'' + serviceId + '\'/>';

        document.getElementById('debug-message').innerHTML += '<br/>' + 'fetchRtspStream    ==>   URL ==> ' + url;
        document.getElementById('debug-message').innerHTML += '<br/>' + 'Data ==> ' + encodeURI(data);

        this.doPost(url, data, response);
    },

    /**
     * 播放视频
     * @param rtsp
     * @param previewAssetId
     * @param startTime
     * @param purchaseToken
     * @param assetId
     * @param video
     * @param resumePoint
     * @param backURL
     */
    playVideo: function (rtsp, previewAssetId, startTime, purchaseToken, assetId, video, resumePoint, backURL) {
        var
            _link,
            playUrl = rtsp[0] + ';' + rtsp[1] + ';' + rtsp[2] + ';areacode=' + VOD.areaCode + ';client=' + CAManager.cardSerialNumber;

        GlobalVarManager.setItemStr('vodPlayUrl', playUrl);
        // playUrl
        // rtsp://10.215.0.50:554/;purchaseToken=2264654112;serverID=10.215.0.12:8080;areacode=3069;client=8350310392603009

        document.getElementById('debug-message').innerHTML += '<br/>' + 'GlobalVarManager.setItemStr ==> vodPlayUrl ==> ' + playUrl;

        _link =
            'http://vod.fjgdwl.com:80/gldb/NEW_UI/vodPlay/vodPlay.htm?previewId=' + previewAssetId +
            '&startTime=' + startTime + '&purchaseToken=' + purchaseToken +
            '&playCurrName=' + video.titleFull + '&assetId=' + assetId +
            '&rentDateTime=' + video.RentalInfo[0].rentDateTime + '&providerId=' + video.providerId +
            '&displayRunTime=' + video.displayRunTime + '&folderAssetId=' + video.folderAssetId +
            '&resumePoint=' + resumePoint + '&from=' + backURL;

        document.getElementById('debug-message').innerHTML += '<br/>' + 'playVideo ==> ' + _link;
        window.location.href = _link;
    },

    /**
     * 创建播放器对象
     * @param left
     * @param top
     * @param width
     * @param height
     * @returns {MediaPlayer}
     */
    createMediaPlayer: function (left, top, width, height) {
        var mediaPlayer = new MediaPlayer(),                    //  创建播放器
            mediaID = mediaPlayer.getPlayerInstanceID(),        //   获取mediaID
            flag = mediaPlayer.bindPlayerInstance(mediaID),     // 绑定
            rectangle;

        document.getElementById('debug-message').innerHTML += '<br/>' + 'createMediaPlayer ==> mediaID: ' + mediaID + ' | Flag: ' + flag;
        if (flag === 0) {
            rectangle = new Rectangle(left, top, width, height);
            var displayArea = mediaPlayer.setVideoDisplayArea(rectangle);
            var displayMode = mediaPlayer.setVideoDisplayMode(0);
            var refresh = mediaPlayer.refresh();
            document.getElementById('debug-message').innerHTML += '<br/>' + 'createMediaPlayer ==> rectangle ==> LEFT ' + rectangle.left + ' | TOP: ' + rectangle.top + ' | WIDTH: ' + rectangle.width + ' | HEIGHT: ' + rectangle.height;
            document.getElementById('debug-message').innerHTML += '<br/>' + 'createMediaPlayer ==> displayArea: ' + displayArea + ' | displayMode: ' + displayMode + ' | refresh: ' + refresh;
        }

        return mediaPlayer;
    },

    /**
     * 小屏播放
     * @param rtsp
     * @param mediaPlayer
     */
    setSmallScreenVideo: function (rtsp, mediaPlayer) {
        // var
        //     playUrl = rtsp[0] + ';' + rtsp[1] + ';' + rtsp[2] + ';areacode=' + VOD.areaCode + ';client=' + CAManager.cardSerialNumber;
        var
            serverId = rtsp[2].split(':'),
            smallScreenPlayUrl = rtsp[0] + ';' + rtsp[1] + ';' + serverId[0] + ':8080' + ';areacode=' + VOD.areaCode + ';client=' + CAManager.cardSerialNumber;

        document.getElementById('debug-message').innerHTML += '<br/>' + 'cms.api.js ==> smallScreenPlayUrl ==> ' + smallScreenPlayUrl;
        GlobalVarManager.setItemStr('playType', 'VOD');
        mediaPlayer.setMediaSource(smallScreenPlayUrl);

    },

    playSmallScreenVideo: function (mediaPlayer) {
        if (mediaPlayer) {
            document.getElementById('debug-message').innerHTML += '<br/>' + 'cms.api.js ==> playSmallScreenVideo';
            mediaPlayer.play();
        }
    },

    /**
     * 暂停小屏播放
     * @param mediaPlayer
     */
    stopSmallScreenVideo: function (mediaPlayer) {
        document.getElementById('debug-message').innerHTML += '<br/>' + 'cms.api.js ==> stopSmallScreenVideo';
        if (mediaPlayer) {
            var mediaID = mediaPlayer.getPlayerInstanceID();    //   获取mediaID
            document.getElementById('debug-message').innerHTML += '<br/>' + 'cms.api.js ==> stopSmallScreenVideo ==> mediaID: ' + mediaID;
            mediaPlayer.stop();
            mediaPlayer.unbindPlayerInstance(mediaID);          //MediaPlayer对象和当前播放器实例解除绑定，并释放播放器的相关资源。
            mediaPlayer = null;
        }
    },

    /**
     * 天气预报
     * @param response
     */
    fetchWeatherReport: function (response) {
        var _url = 'http://10.215.0.36/weather/sy/PUTIAN.js';

        this.doGet2(_url, response);
    },

    /**
     *  获取服务器上的图片，并更新模块
     * @param component
     * @param resourceId
     * @param element
     * @param options
     */
    fetchServerImage: function (component, resourceId, element, options) {
        if (cmsConfig.environment === 'PRODUCT') {
            cmsApi.getListItems(resourceId, 1, 1, function (response) {
                if (response.hasOwnProperty('code')) {
                    if ('1' === response.code || 1 === response.code) {
                        if (response.dataArray.length > 0) {
                            document.getElementById('debug-message').innerHTML += '<br/>' + '  IMAGE  ==> ' + response.dataArray[0].img;
                            element.bgImageSrc = 'url(' + cmsConfig.imgUrl + response.dataArray[0].img + ')';
                            component.init();
                        }
                    }
                }
            });
        } else {
            element.bgImageSrc = options;
            component.init();
        }
    }

    // mediaPlayer: null,
    // mediaID: null,
    // createPlayerSuccess: false,
    //
    // /*首页版块小视屏相关  start*/
    // createMediaPlayer: function () {//创建播放器对象
    //     document.getElementById('debug-message').innerHTML += '<br/>' + '!!!!!! createMediaPlayer !!!!!!';
    //     this.mediaPlayer = new MediaPlayer();
    //     this.mediaID = this.mediaPlayer.getPlayerInstanceID();
    //     var flag = this.mediaPlayer.bindPlayerInstance(this.mediaID);
    //     document.getElementById('debug-message').innerHTML += '<br/>' + '===> createMediaPlayer ===> FlAG: ' + flag;
    //     this.createPlayerSuccess = (flag === 0);
    //     if (this.createPlayerSuccess) {
    //         var rect = new Rectangle(71, 142, 575, 325);
    //         var flag1 = this.mediaPlayer.setVideoDisplayArea(rect);
    //         var flag2 = this.mediaPlayer.setVideoDisplayMode(0);
    //         var flag3 = this.mediaPlayer.refresh();
    //         document.getElementById('debug-message').innerHTML += '<br/>' + '===> createMediaPlayer ===> New Rectangle ';
    //         GlobalVarManager.setItemStr('playType', 'DVB');
    //         GlobalVarManager.setItemStr('stopMode', '0');
    //     }
    // },
    //
    // stopSmallAV: function () {//停止播放小视屏
    //     if (this.createPlayerSuccess) {
    //         this.mediaPlayer.stop();
    //     }
    // },
    //
    // //播放小视屏，第一次进入则播放0频道，否则的话播放关机频道
    // playSmallAV: function () {
    //     if (!this.createPlayerSuccess)
    //         return;
    //
    //     document.getElementById('debug-message').innerHTML += '<br/>' + '===> playSmallAV';
    //     var filterArray = [1000, 1000];
    //     var valueArray = [1, 2];
    //     var channelList = ChannelManager.filter(filterArray, valueArray);
    //     var currChannel = null;
    //     var servcieId;
    //     var location;
    //
    //     document.getElementById('debug-message').innerHTML += '<br/>' + '===> playSmallAV ==> Channel List Length:  ' + channelList.length;
    //     if (channelList.length === 0) {
    //         //$("AVTips").innerText = "无节目，请重新搜索";
    //         //$("AVTips").style.visibility = "visible";
    //         return;
    //     }
    //
    //     var initPlayServiceId = GlobalVarManager.getItemStr('initPlayServiceId');
    //
    //     document.getElementById('debug-message').innerHTML += '<br/>' + '===> playSmallAV ==> initPlayServiceId: ' + initPlayServiceId;
    //
    //     for (var i = 0; i < channelList.length; i++) {
    //         servcieId = channelList[i].getService().service_id;
    //         if (servcieId === initPlayServiceId) {
    //             currChannel = channelList[i];
    //             break;
    //         }
    //     }
    //
    //     document.getElementById('debug-message').innerHTML += '<br/>' + '===> playSmallAV ==> currChannel: ' + currChannel;
    //
    //     if (currChannel) {
    //         location = currChannel.getService().getLocation();
    //         document.getElementById('debug-message').innerHTML += '<br/>' + '===> playSmallAV ==> location: ' + location;
    //         this.mediaPlayer.setMediaSource(location);              //0频道不让编辑的，因此不用判断是否锁定
    //         return;
    //     }
    //
    //     currChannel = ChannelManager.getShutDownChannel(128);
    //
    //     document.getElementById('debug-message').innerHTML += '<br/>' + '===> playSmallAV ==> currChannel After getShutDownChannel: ' + currChannel;
    //
    //     if (!currChannel) {
    //         currChannel = channelList[0];
    //         document.getElementById('debug-message').innerHTML += '<br/>' + '===> playSmallAV ==> currChannel set as : channelList[0]: ' + currChannel;
    //     }
    //
    //     if (currChannel.type === 0x02) {//广播频道
    //         //$("musicImg").src = "audio_bg.jpg";
    //         //$("musicBg").style.visibility = "visible";
    //     }
    //     else {
    //         //$("musicBg").style.visibility = "hidden";
    //     }
    //     var tableID = DataAccess.getUserPropertyTable('userInfo');
    //     var passwordEnable = DataAccess.getProperty(tableID, 'passwordEnable');
    //
    //     document.getElementById('debug-message').innerHTML += '<br/>' + '===> playSmallAV ==> tableID: ' + tableID + ' ==> passwordEnable' + passwordEnable;
    //     if (passwordEnable && currChannel.isLocked) {//锁定的
    //         this.mediaPlayer.stop();
    //         //$("AVTips").style.visibility = "频道锁定";
    //         //$("AVTips").style.visibility = "visible";
    //     }
    //     else {
    //         location = currChannel.getService().getLocation();
    //         this.mediaPlayer.setMediaSource(location);
    //     }
    // }
};