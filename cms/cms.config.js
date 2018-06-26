/**
 * 参数配置 *
 */

var cmsConfig = {
    //serverUrl : "http://localhost:8080/manage/web/",
    //imgUrl : "http://localhost:8080/manage/",
    //serverUrl : "http://192.168.55.10:8080/manage/web/",		//  给电脑用的
    //imgUrl : "http://192.168.55.10:8080/manage/",
    serverUrl: "http://10.184.255.10:8080/manage/web/",		    //  给机顶盒用的
    imgUrl: "http://10.184.255.10:8080/manage/",
    backUrl: "",

    isPc: 1,                //显示审核预览：1；显示正式发布：0
    areaId: "21",           //主栏目ID
    index_back_url: "",

    /**
     * 首页
     */
    indexResourceIdArray: [
        {title: "首页", resourceId: ""},
        // ---------------  菜单  ---------------  //


        // ---------------  海报（播放视频）  ---------------  //
        {title: "左侧海报", resourceId: "698"},
        {title: "右侧海报", resourceId: "701"},

        // ---------------  列表  ---------------  //
        {title: "通知公告", resourceId: "700"}
    ],

    /**
     * 走进拱辰
     */
    introResourceIdArray: [
        {title: "走进拱辰", resourceId: "664"},
        // ---------------  菜单  ---------------  //

        // ---------------  海报（播放视频）  ---------------  //

        // ---------------  正文  ---------------  //
        {title: "简介", resourceId: "665"}
    ],

    /**
     * 平安建设
     */
    peaceResourceIdArray: [
        {title: "平安建设", resourceId: "666"},
        // ---------------  菜单  ---------------  //
        {title: "法制建设", resourceId: "678"},
        {title: "民生保障", resourceId: "679"},
        {title: "公共安防", resourceId: "680"},
        {title: "群众权益", resourceId: "681"},
        {title: "信息服务", resourceId: "682"},
        {title: "平安文化", resourceId: "683"},

        // ---------------  海报（播放视频）  ---------------  //
        {title: "顶部海报", resourceId: "684"},
        {title: "底部海报", resourceId: "702"},

        // ---------------  列表  ---------------  //
        {title: "最新信息", resourceId: "703"}
    ],


    /**
     * 政务公开
     */
    affairsResourceIdArray: [
        {title: "政务公开", resourceId: "667"},
        // ---------------  菜单  ---------------  //
        {title: "政策法规", resourceId: "691"},
        {title: "工作动态", resourceId: "692"},
        {title: "政府信息", resourceId: "693"},
        {title: "公示公告", resourceId: "694"},

        // ---------------  海报（播放视频）  ---------------  //
        {title: "顶部海报", resourceId: ""},
        {title: "底部海报", resourceId: ""},

        // ---------------  列表  ---------------  //
        {title: "通知公告", resourceId: "671"}
    ],

    /**
     * 智慧党建
     */
    buildingResourceIdArray: [
        {title: "智慧党建", resourceId: "660"},
        // ---------------  菜单  ---------------  //
        {title: "党的声音", resourceId: "710"},
        {title: "党建常识", resourceId: "695"},
        {title: "党的历程", resourceId: "709"},
        {title: "党风廉政", resourceId: "711"},
        {title: "拱辰先锋", resourceId: "696"},
        {title: "两学一做", resourceId: "697"},
        {title: "全国党员远教", resourceId: "713"},
        {title: "地市党员远教", resourceId: "712"},
        {title: "专题学习", resourceId: "714"},
        {title: "通知公告", resourceId: ""},

        // ---------------  海报（播放视频）  ---------------  //
        {title: "左侧海报", resourceId: "672"}

        // ---------------  列表  ---------------  //
    ],

    /**
     * 文明创建
     */
    cityResourceIdArray: [
        {title: "文明创建", resourceId: "662"},
        // ---------------  菜单  ---------------  //
        {title: "文明聚集", resourceId: "685"},
        {title: "美丽乡村", resourceId: "686"},
        {title: "道德建设", resourceId: "687"},
        {title: "传统文化", resourceId: "688"},
        {title: "城市管理", resourceId: "689"},
        {title: "主题活动", resourceId: "690"},
        {title: "志愿者服务", resourceId: ""},

        // ---------------  海报（播放视频）  ---------------  //
        {title: "顶部海报", resourceId: "704"},
        {title: "底部海报", resourceId: "706"},

        // ---------------  列表  ---------------  //
        {title: "最新消息", resourceId: "663"}
    ],

    /**
     * 服务大厅
     */
    serviceResourceIdArray: [
        {title: "服务大厅", resourceId: "669"},
        // ---------------  菜单  ---------------  //
        {title: "办事流程", resourceId: "675"},
        {title: "公共服务", resourceId: "676"},
        {title: "公积金查询", resourceId: ""},

        // ---------------  海报（播放视频）  ---------------  //
        {title: "左侧海报", resourceId: "707"},
        {title: "右侧海报", resourceId: "708"},

        // ---------------  列表  ---------------  //
        {title: "最新消息", resourceId: "670"}
    ],

    operator: "",
    weather: "",
    temperature: "",
    windScale: ""
};