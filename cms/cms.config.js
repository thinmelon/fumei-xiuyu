/**
 * 参数配置 *
 */

var cmsConfig = {
    //serverUrl : "http://localhost:8080/manage/web/",
    //imgUrl : "http://localhost:8080/manage/",
    //serverUrl : "http://192.168.55.10:8080/manage/web/",		//  给电脑用的
    //imgUrl : "http://192.168.55.10:8080/manage/",
    serverUrl: 'http://10.184.255.10:8080/manage/web/',		    //  给机顶盒用的
    imgUrl: 'http://10.184.255.10:8080/manage/',
    backUrl: '',
    index_back_url: '',
    // environment: 'DEBUG',
    environment: 'PRODUCT',
    //
    /**
     * 富美秀屿
     */
    indexResourceIdArray: [
        {title: '富美秀屿', resourceId: ''},
        // ---------------  菜单  ---------------  //


        // ---------------  海报（播放视频）  ---------------  //
        {title: '左侧海报', resourceId: '831'},
        {title: '右下海报', resourceId: '0'},

        // ---------------  滚动页  ---------------  //
        {title: '右侧滚动页', resourceId: '819'},
        {title: '第一张', resourceId: '819'},
        {title: '第二张', resourceId: '820'},
        {title: '第三张', resourceId: '821'},
        {title: '第四张', resourceId: '828'},
        {title: '第五张', resourceId: '829'}
    ],

    /**
     * 秀屿新闻
     */
    newsResourceIdArray: [
        {title: '秀屿新闻', resourceId: ''},
        // ---------------  菜单  ---------------  //

        // ---------------  海报（播放视频）  ---------------  //

        // ---------------  列表  ---------------  //
        {title: '最新动态', resourceId: '769'},

        // ---------------  滚动页  ---------------  //
        {title: '右侧滚动页', resourceId: '855'}
    ],

    /**
     * 乡镇风采
     */
    xiuyuResourceIdArray: [
        {title: '乡镇风采', resourceId: ''},
        // ---------------  菜单  ---------------  //
        {title: '笏石镇', resourceId: '812'},       //   笏石镇
        {title: '东庄镇', resourceId: '813'},       //   东庄镇
        {title: '月塘镇', resourceId: '814'},       //   月塘镇
        {title: '东峤镇', resourceId: '815'},       //   东峤镇
        {title: '埭头镇', resourceId: '816'},       //   埭头镇
        {title: '平海镇', resourceId: '817'},       //   平海镇
        {title: '南日镇', resourceId: '818'},       //   南日镇

        // ---------------  海报（播放视频）  ---------------  //

        // ---------------  列表  ---------------  //
        {title: '最新动态', resourceId: '769'},

        // ---------------  滚动页  ---------------  //
        {title: '右侧滚动页', resourceId: '856'}
    ],

    /**
     * 部门荟萃
     */
    apartmentResourceIdArray: [
        {title: '部门荟萃', resourceId: ''},
        // ---------------  菜单  ---------------  //

        // ---------------  海报（播放视频）  ---------------  //

        // ---------------  列表  ---------------  //
        {title: '最新信息', resourceId: '770'},

        // ---------------  滚动页  ---------------  //
        {title: '右侧滚动页', resourceId: '857'}
    ],


    /**
     * 便民服务
     */
    serviceResourceIdArray: [
        {title: '便民服务', resourceId: ''},

        // ---------------  菜单  ---------------  //
        {title: '政策法规', resourceId: '771'},

        // ---------------  海报（播放视频）  ---------------  //

        // ---------------  列表  ---------------  //

        // ---------------  滚动页  ---------------  //
        {title: '右侧滚动页', resourceId: '858'}
    ],

    /**
     * 专题专栏
     */
    topicResourceIdArray: [
        {title: '专题专栏', resourceId: '0'},
        // ---------------  菜单  ---------------  //
        {title: '海报一', resourceId: '875'},
        {title: '海报二', resourceId: '876'},
        {title: '人文秀屿', resourceId: '822'},
        {title: '平安秀屿', resourceId: '823'},
        {title: '教育卫生', resourceId: '824'},
        {title: '三农在线', resourceId: '825'},
        {title: '旅游推介', resourceId: '826'},
        {title: '城市管理', resourceId: '827'},
        {title: '海报三', resourceId: '1004'},

        // ---------------  海报（播放视频）  ---------------  //

        // ---------------  列表  ---------------  //

        // ---------------  滚动页  ---------------  //
        {title: '右侧滚动页', resourceId: '859'}
    ],

    /**
     * 智慧党建
     */
    partyResourceIdArray: [
        {title: '智慧党建', resourceId: '0'},

        // ---------------  菜单  ---------------  //

        // ---------------  海报（播放视频）  ---------------  //

        // ---------------  列表  ---------------  //

        // ---------------  滚动页  ---------------  //
        {title: '右侧滚动页', resourceId: '854'}
    ],

    /**
     *  美丽莆田
     */
    putianResourceIdArray: [
        {title: '美丽莆田', resourceId: '0'},

        // ---------------  菜单  ---------------  //

        // ---------------  海报（播放视频）  ---------------  //

        // ---------------  列表  ---------------  //

        // ---------------  滚动页  ---------------  //
        {title: '右侧滚动页', resourceId: '861'}
    ],

    operator: '',
    weather: '',
    temperature: '',
    windScale: ''
};