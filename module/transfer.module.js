/**
 * 页面元素
 *      debug-message
 * 前置文件
 *      /utility/assistant.js
 * @constructor
 */
function TransferModule() {
    // 属性
    this.record = [];
    this.cursor = null;
    this.pager = null;
    this.textures = null;
    this.video = null;
    this.monitor = null;
    this.more = null;

    // 方法
    this.init = function () {
        var key,
            value,
            rawData,
            backUrl,
            _url,
            _request;

        _url = window.location.search;
        _request = [];

        document.getElementById("debug-message").innerHTML += "<br/> " + "search: " + decodeURIComponent(_url);

        if (_url.indexOf("?") !== -1) {
            var _str = _url.substr(1);
            var _subStrs = _str.split("&");

            for (var i = 0; i < _subStrs.length; i++) {
                _request[_subStrs[i].split("=")[0]] = decodeURIComponent(_subStrs[i].split("=")[1]);
                key = _subStrs[i].split("=")[0];
                rawData = decodeURIComponent(_subStrs[i].split("=")[1]);
                document.getElementById("debug-message").innerHTML += "<br/> " + "key: " + key + ", rowData: " + rawData;
                // 记录参数
                this.record.push(jsonUtils.parse('{"' + key + '":"' + rawData + '"}'));
                /**
                 *  光标定位
                 */
                if (this.cursor && key === this.cursor.fileName) {
                    // 解析
                    value = jsonUtils.parse(rawData);
                    if (value.hasOwnProperty('focusArea')) {
                        this.cursor.focusArea = parseInt(value.focusArea);
                        switch (this.cursor.focusArea) {
                            case 0:         // 菜单
                                if (value.hasOwnProperty('focusPosX') && value.hasOwnProperty('focusPosY')) {
                                    this.cursor.menu.focusPosX = parseInt(value.focusPosX);
                                    this.cursor.menu.focusPosY = parseInt(value.focusPosY);
                                }
                                break;
                            case 1:         // 海报
                                if (value.hasOwnProperty('focusPos')) {
                                    this.cursor.post.focusPos = parseInt(value.focusPos);
                                }
                                break;
                            case 2:         // 列表
                                if (value.hasOwnProperty('focusPos')) {
                                    this.cursor.list.focusPos = parseInt(value.focusPos);
                                }
                                break;
                            case 3:         // 图片按键
                                if (value.hasOwnProperty('focusPos')) {
                                    this.cursor.button.focusPos = parseInt(value.focusPos);
                                }
                                break;
                            case 4:         // 更多内容
                                if (value.hasOwnProperty('focusPosX') && value.hasOwnProperty('focusPosY')) {
                                    this.cursor.more.focusPosX = parseInt(value.focusPosX);
                                    this.cursor.more.focusPosY = parseInt(value.focusPosY);
                                }
                                break;
                            case 5:         // BAR
                                if (value.hasOwnProperty('focusPos')) {
                                    this.cursor.bar.focusPos = parseInt(value.focusPos);
                                }
                                break;
                            default:
                                break;
                        }
                        /* end of switch */
                    }
                    /* end of if */
                }

                /**
                 *   图文列表
                 */
                if (this.textures) {
                    // 解析
                    value = jsonUtils.parse(rawData);
                    if (value.hasOwnProperty('isShowGraphics')) {
                        this.textures.isShowGraphics = value.isShowGraphics;
                    }
                    if (value.hasOwnProperty('backURL')) {
                        this.textures.backURL = value.backURL;
                    }
                    if (value.hasOwnProperty('logoImageSrc')) {
                        this.textures.logoImageSrc = value.logoImageSrc;
                    }
                    if (value.hasOwnProperty('id')) {
                        this.textures.id = value.id;
                    }
                    /* end of if */
                }

                /**
                 *   视频播放
                 */
                if (this.video) {
                    // 解析
                    value = jsonUtils.parse(rawData);
                    if (value.hasOwnProperty('resourceId')) {
                        this.video.resourceId = value.resourceId;
                        document.getElementById("debug-message").innerHTML += "<br/> " + "resourceId: " + this.video.resourceId;
                    }
                    if (value.hasOwnProperty('backURL')) {
                        backUrl = decodeURIComponent(value.backURL);
                        if (value.hasOwnProperty('fileName')
                            && value.hasOwnProperty('focusArea')
                            && value.hasOwnProperty('focusPos')) {
                            backUrl += '?' + value.fileName + '=' + encodeURIComponent('{focusArea:' + value.focusArea + ',focusPos:' + value.focusPos + '}');
                        }
                        this.video.backURL = encodeURIComponent(backUrl);
                        document.getElementById("debug-message").innerHTML += "<br/> " + "backURL: " + decodeURIComponent(this.video.backURL);
                    }
                }

                /**
                 *  视频监控
                 */
                if (this.monitor) {
                    // 解析
                    value = jsonUtils.parse(rawData);
                    if (value.hasOwnProperty('assetid')) {
                        this.monitor.assetid = value.assetid;
                        document.getElementById("debug-message").innerHTML += "<br/> " + "assetid: " + this.monitor.assetid;
                    }
                    if (value.hasOwnProperty('backURL')) {
                        backUrl = decodeURIComponent(value.backURL);
                        if (value.hasOwnProperty('fileName')
                            && value.hasOwnProperty('focusArea')
                            && value.hasOwnProperty('focusPos')) {
                            backUrl += '?' + value.fileName + '=' + encodeURIComponent('{focusArea:' + value.focusArea + ',focusPos:' + value.focusPos + '}');
                        }
                        this.monitor.backURL = encodeURIComponent(backUrl);
                        document.getElementById("debug-message").innerHTML += "<br/> " + "backURL: " + decodeURIComponent(this.monitor.backURL);
                    }
                }

                /**
                 *   更多内容
                 */
                if (this.more) {
                    // 解析
                    value = jsonUtils.parse(rawData);
                    if (value.hasOwnProperty('resourceId')) {
                        this.more.resourceId = value.resourceId;
                    }
                    if (value.hasOwnProperty('resourceType')) {
                        this.more.resourceType = value.resourceType;
                    }
                    if (value.hasOwnProperty('backURL')) {
                        this.more.backURL = value.backURL;
                    }
                    if (value.hasOwnProperty('logoImageSrc')) {
                        this.more.logoImageSrc = value.logoImageSrc;
                    }
                    if (value.hasOwnProperty('pageIndex')) {
                        this.more.pageIndex = parseInt(value.pageIndex);
                    }
                }
            }
        }
    };

    this.package = function (data) {
        var
            index,
            key,
            params = '?';

        document.getElementById("debug-message").innerHTML += "<br/>" + "====>     package ";
        index = 0;
        for (var i = 0, length = this.record.length; i < length; i++) {
            for (key in this.record[i]) {
                document.getElementById("debug-message").innerHTML += "<br/>" + "KEY: " + key + " VALUE: " + this.record[i][key];
                if (index++ > 0) {
                    params += '&' + key + '=' + encodeURIComponent(this.record[i][key]);
                } else {
                    params += key + '=' + encodeURIComponent(this.record[i][key]);
                }
            }
        }

        for (key in data) {
            document.getElementById("debug-message").innerHTML += "<br/>" + "KEY: " + key + " VALUE: " + jsonUtils.stringify(data[key]);
            if (index++ > 0) {
                params += '&' + key + '=' + encodeURIComponent(jsonUtils.stringify(data[key]));
            } else {
                params += key + '=' + encodeURIComponent(jsonUtils.stringify(data[key]));
            }
        }

        return params;
    };

    this.backUrl = function () {
        return encodeURIComponent(window.location.protocol + '//' + window.location.host + window.location.pathname);
        //return encodeURIComponent(window.location.href);
    };

    this.empty = function () {
        this.record = [];
    };

    this.remove = function (key) {
        var i,
            length,
            item;

        for (i = 0, length = this.record.length; i < length; i++) {
            for (item in this.record[i]) {
                if (item === key) {
                    this.record.splice(i, 1);
                }
            }
        }
    };

    this.toggle = function () {
        if (document.getElementById("debug-message").style.display === "block") {
            document.getElementById("debug-message").style.display = "none";
        } else {
            document.getElementById("debug-message").style.display = "block";
        }
    };
}