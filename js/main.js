function $(selector) {
    return document.getElementById(selector);
}
var tbLocation; //发货地址
document.onreadystatechange = function() {
    if (document.readyState == 'complete') {
        tbLocation = document.getElementsByClassName('tb-location')[0].innerText; //预用地址
    }
    document.querySelector('[data-property="尺码"]').children.length > 8; //鞋码判断
    var bodyText = document.body.innerText;
    //bodyText.search( //);
}

var g_con;
var dataApi = $('J_listBuyerOnView').getAttribute('data-api'); //获取交易详情 &callback=__jsonp_records_reload, bid_page页面数
var dataRateUrl = $('J_ShopInfo').getAttribute('data-rateUrl'); //获取店铺信息链接
var reviews = $('reviews');
var dataCommonApi = reviews.getAttribute('data-commonApi'); //获取各种评价数量 json.data.count.bad/normal/good
var dataListApi = reviews.getAttribute('data-listApi'); //获取评价详情  尾部加两个参数  &callback=jsonp_reviews_list&currentPageNum=1(rataType=-1(差评)或0(中评))
var apiItemInfo; //各种交易数据, 及其比率, json.quantity.confirmGoodsItems(交易成功数), json.quantity.paySuccess(交易中笔数), json.quantity.refundCount(纠纷退款数)
//取apiItemInfo

var scripts = document.querySelectorAll('script:not([src])');

(function() {
    for (var i = 0; i < scripts.length; i++) {
        var curContent = scripts[i].innerText;
        if (~curContent.indexOf('Hub.config =') || (~curContent.indexOf('Hub.config='))) {
            var referIndex = curContent.indexOf('"apiItemInfo"');
            var startIndex = curContent.indexOf('"', referIndex + 13); //13为 "apiItemInfo" 的长度
            var endIndex = curContent.indexOf('"', startIndex + 1);
            apiItemInfo = curContent.slice(startIndex + 1, endIndex);
        }
        if (~curContent.indexOf('g_config =') || (~curContent.indexOf('g_config='))) {
            g_con = (new Function('return ' + curContent.replace(/\g_config.dynamicScript.*/g, '')))();
        }
    }
})();

var options = {
    cmd: 'get-basicInfo',
    g_con: g_con, //全局参数
    dataRateUrl: dataRateUrl, //店铺信息
    dataCommonApi: dataCommonApi, //各种评价数量
    dataListApi: dataListApi, //评价详情
    apiItemInfo: apiItemInfo, //交易数据
    dataApi: dataApi //交易详情
};

//一次发所有消息
chrome.extension.sendRequest(options);
// chrome.extension.onRequest.addListener(function(msg) {
//     switch (msg.cmd) {
//         case 'basicInfo': //基本信息

//     }
// });


//创建Node
// var taobaoAssistant;
// var fragMent = document.createDocumentFragment();
// var ul = document.createElement('ul');
// for(var i =0;i<7;i++) {
//     var li = document.createElement('li');
//     li.appendChild(document.createTextNode(''));//遍历数据数组
//     ul.appendChild(li);
// }
// //差评浮层T
// var floatMent = document.createDocumentFragment();
// var floatUl = document.createElement('ul');
// for(var i =0;i<7;i++) {//遍历差评条数
//     var li = document.createElement('li');
//     li.appendChild(document.createTextNode(''));//遍历数据数组
//     ul.appendChild(li);
// }

// function CreateFragments(){

//     var fragment = document.createDocumentFragment();

//     for(var i = 0;i < 10000;i++){

//         var tmpNode = document.createElement("div");
//         tmpNode.innerHTML = "test" + i + "<br />";
//         fragment.appendChild(tmpNode);
//     }

//     document.body.appendChild(fragment);
// }



// //插入页面
// var referenceElement = document.getElementsByClassName('tb-skin')[0];
// referenceElement.parentNode.insertBefore(taobaoAssistant, referenceElement);