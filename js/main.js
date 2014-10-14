function $(selector) {
    return document.getElementById(selector);
}

var g_config = (new Function('return ' + document.getElementsByTagName('title')[0].nextElementSibling.textContent.replace(/\g_config.dynamicScript.*/g, '')))(); //大部分参数
//店铺信息url
var shopInfoSource = $('J_ShopInfo') && $('J_ShopInfo').getAttribute('data-rateUrl'); //获取店铺信息链接
var microscopeData = document.getElementsByName('microscope-data')[0] && document.getElementsByName('microscope-data')[0].getAttribute('content').split(';').slice(0, -1); //必要参数
var objBase = {};
var buyerList = $('J_showListIndicator').getAttribute('data-api') + '&callback=Hub.data.records_reload';//详细成交记录url, 
(function() {
    var sub;
    for (var i = 0; i < microscopeData.length; i++) {
        sub = item.split('=');
        objBase[sub[0]] = sub[1];
    }
})();

//评价参数
var commonOptions = {
    callback: 'jsonp_reviews_list',
    userNumId: g_config&&g_config.sellerId,
    auctionNumId: g_config&&(g_config.pageId || g_config.itemId),
    siteID: objBase.siteId,
    currentPageNum: 1,
    rateType: -1,
    orderType: 'sort_weight',
    showContent: 1,
    attribute: ''
};

//评价页码
function commonPageNum(num) {
    commonOptions.currentPageNum = num;
}
//店铺信息
function getShopInfo() {
    sendRequest(shopInfoSource, shopInfoBundle);
}

var shopDataDetail = {};



//评价url拼接
function rateUrl() {
    return http: //rate.taobao.com/feedRateList.htm?callback=jsonp_reviews_list&userNumId=shopInfoSource.
}

var commonInfoSource = document.getElementById('reviews').getAttribute('data-commonApi');
var badCommonInfoSource = 'http://rate.taobao.com/feedRateList.htm?callback=jsonp_reviews_list&userNumId=' + commonOptions.userNumId + '&auctionNumId=' + commonOptions.auctionNumId + '&siteId=' + commonOptions.siteId + '&currentPageNum=' + commonOptions.currentPageNum + '&rateType=-1&orderType=sort_weight&showContent=1&attibute=';

//评价
function sellRecord() {
    //评价数量
    sendRequest(commonInfoSource, ); //处理评价比率
    //差评汇总
    sendRequest(badCommonInfoSource, function() {

    });
}

var options = {
    cmd:'get-basicInfo',
    g_config: g_config,
    shopInfoSource: shopInfoSource,//店铺信息
    commonInfoSource: commonInfoSource, //各种评价
};

//一次发所有消息
chrome.extension.sendRequest(options);

chrome.extension.onRequest.addListener(function(msg) {
    switch (msg.cmd) {
        case 'basicInfo': //基本信息

    }
});

//创建Node
var taobaoAssistant;

//插入页面
var referenceElement = document.getElementsByClassName('tb-skin')[0];
referenceElement.parentNode.insertBefore(taobaoAssistant, referenceElement);