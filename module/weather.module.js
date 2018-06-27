/*-----------------------------------------------------------------------------------*/
/*------------------------------------- 天气预报  -----------------------------------*/
/*-----------------------------------------------------------------------------------*/
function WeatherModule() {
    var that = this;

    // 属性
    this.weather = "";
    this.temperature = "";
    this.windScale = "";

    // 方法
    this.init = function (callback) {
        cmsApi.fetchWeatherReport(function (response) {
            eval(response);
            that.weather = iPanel.misc.getUserCharsetStr(mainArray[0].t0[0].weather, "UTF8");
            that.temperature = iPanel.misc.getUserCharsetStr(mainArray[0].t0[0].temperature, "UTF8");
            that.windScale = iPanel.misc.getUserCharsetStr(mainArray[0].t0[0].wind, "UTF8");

            callback();
        });
    }
}

/**
 *  启动
 */
(function () {
    var weatherModule = new WeatherModule();
    weatherModule.init(function () {
        if (weatherModule.temperature !== "") {
            document.getElementById("weather-forecast").innerHTML += "<br/>" +
                "秀屿天气预报：今日天气 " +
                "&nbsp;&nbsp;&nbsp;" + weatherModule.weather +
                "&nbsp;&nbsp;&nbsp;" + weatherModule.temperature +
                "&nbsp;&nbsp;&nbsp;" + weatherModule.windScale;
        }
    });
})();