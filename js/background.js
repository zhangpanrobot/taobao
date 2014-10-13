function sendRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback(xhr.responseText);
		}
	}
	xhr.open('GET', url, true);
	xhr.send();
}

function $(selector) {
	return document.getElementById(selector);
}

var g_config = (new Function('return ' + document.getElementsByTagName('title')[0].nextElementSibling.textContent.replace(/\g_config.dynamicScript.*/g, '')))();//大部分参数
//店铺信息url
var shopInfoSource = $('J_ShopInfo').getAttribute('data-rateUrl');//获取店铺信息链接
var microscopeData = document.getElementsByName('microscope-data')[0].getAttribute('content').split(';').slice(0, -1);//必要参数
var objBase = {};
// microscopeData.forEach(function(item) {
// 	var sub = item.split('=');
// 	objBase[sub[0]] = sub[1];
// });

(function(){
	var sub;
	for(var i = 0; i< microscopeData.length; i++) {
		sub = item.split('=');
		objBase[sub[0]] = sub[1];
	}
})();

//评价参数
var commonOptions = {
	callback: 'jsonp_reviews_list',
	userNumId: g_config.sellerId,
	auctionNumId: g_config.pageId || g_config.itemId,
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
function shopInfoBundle(data) {
	//正则取出所有数据
	var shopLocation = data.slice(data.indexOf("class=\"text\"", data.indexOf("<dt>所在地区：")) + 13, data.indexOf("</span", data.indexOf("<dt>所在地区：")));//所在地
	var foundDate = data.slice(data.indexOf("class=\"text\"", data.indexOf("<dt>创建时间")) + 13, data.indexOf("</span", data.indexOf("<dt>创建时间")));//成立日期
	//后加载数据链接
	var lateDataMatch = new RegExp(/id="monthuserid"\svalue="(.*)(?=")/);//请求参数
	var lateDataSource = 'http://rate.taobao.com/ShopService4C.htm?userNumId=' + lateDataMatch.exec(data)[1].trim() + '&shopID=' + g_config.shopId + '&isB2C=false';
	sendRequest(lateDataSource, function(badData) {
		//shopDataDetail = data;
		shopDataDetail.complaintsLocalVal = badData.complaints.localVal//纠纷(行业均值 为'indVal')
		shopDataDetail.punishLocalVal = badData.punish.localVal//处罚
		shopDataDetail.ratRefundLocalVal = badData.ratRefund.localVal//退款
	});
}

//评价url拼接
function rateUrl() {
	return http: //rate.taobao.com/feedRateList.htm?callback=jsonp_reviews_list&userNumId=shopInfoSource.
}

//评价
function sellRecord() {
	//评价数量
	var commonInfoSource = document.getElementById('reviews').getAttribute('data-commonApi');
	sendRequest(commonInfoSource, );//处理评价比率
	//差评汇总
	var badCommonInfoSource = 'http://rate.taobao.com/feedRateList.htm?callback=jsonp_reviews_list&userNumId=' + commonOptions.userNumId + '&auctionNumId=' + commonOptions.auctionNumId + '&siteId=' + commonOptions.siteId + '&currentPageNum=' + commonOptions.currentPageNum + '&rateType=-1&orderType=sort_weight&showContent=1&attibute=';
	sendRequest(badCommonInfoSource, function() {

	})
}