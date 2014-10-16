var apiGroup = {};
var infoGroup = {};
var displayInfo = {};
var h = 0;
chrome.extension.onRequest.addListener(function(msg) {
	switch (msg.cmd) {
		case 'get-basicInfo':
			h = 0; //页面变动, 状态清零
			apiGroup = msg;
			infoGroup.commentList = []; //评价
			infoGroup.badCommentList = []; //差评
			infoGroup.normalCommentList = []; //中评
			infoGroup.tradeDetailList = []; //交易详情
			displayInfo.successRate = ''; //交易成功率
			(function() {
				for (var i = 1; i < 6; i++) {
					sendRequest(apiGroup.dataListApi + '&callback=jsonp_reviews_list&currentPageNum=' + i, function(data) {
						dataCollection(data, infoGroup.commentList);
					}); //评价
					sendRequest(apiGroup.dataApi.replace(/&bid_page=[0-9]*/, '') + '&callback=__jsonp_records_reload&bid_page=' + i, function(data) {
						dataCollection(data, infoGroup.tradeDetailList);
					}); //交易详情
				}
			})();
			//中评
			sendRequest(apiGroup.dataListApi + '&callback=jsonp_reviews_list&currentPageNum=1&rateType=0', function(data) {
				dataCollection(data, infoGroup.normalCommentList);
			});
			//差评
			sendRequest(apiGroup.dataListApi + '&callback=jsonp_reviews_list&currentPageNum=1&rateType=-1', function(data) {
				dataCollection(data, infoGroup.badCommentList);
			});
			//交易成功
			sendRequest(apiGroup.apiItemInfo, function(data) {
				dataCollection(data, displayInfo.successRate);
			});
			sendRequest(apiGroup.dataRateUrl, shopInfoBundle);
			break;
	}
});

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

function dataCollection(data, dataList) {
	data = (new Function('function $callback(obj){return obj};function jsonp_reviews_list(obj){return obj;}function __jsonp_records_reload(obj){return obj;};return ' + data.trim()))();
	if (typeof dataList === "string") {
		displayInfo.successRate = (data.quantity.paySuccessItems / (data.quantity.paySuccessItems + data.quantity.confirmGoodsItems) * 100).toFixed(2);
	} else {
		dataList.push(data);
	}
	h++;
	if (h == 13) { //数据全部获得
		var commentsLength = 0,
			anonyCommentsLength = 0;
			displayInfo.anonyCommentsRate = 0;
		var tradeLength = 0,
			anonyTradeLength = 0;
			displayInfo.anonyTradeRate = 0;
		//处理数据
		console.log(infoGroup);
		for (var i = 0; i < 5; i++) {
			var curCommentsList = infoGroup.commentList[i].comments;
			var curCommentsLength = curCommentsList && curCommentsList.length; //排除curCommentsList为null情况
			commentsLength += curCommentsLength || 0;
			for (var j = 0; j < curCommentsLength; j++) {
				if (JSON.parse(curCommentsList[j].user.anony)) {
					anonyCommentsLength++;
				}
			}
			var curTradeDetailList = infoGroup.tradeDetailList[i].html;
			var buyer = new RegExp(/tb-buyer/g);
			if (~curTradeDetailList.indexOf('tb-buyer')) {
				tradeLength += curTradeDetailList.match(buyer).length;
				anonyTradeLength += curTradeDetailList.match(new RegExp(/匿名/g)).length;
			}
		}
		displayInfo.anonyCommentsRate = ((anonyCommentsLength / commentsLength) * 100).toFixed(2); //评价匿名率
		displayInfo.anonyTradeRate = ((anonyTradeLength / tradeLength) * 100).toFixed(2); //成交量匿名率
	}
}

var shopDataDetail = {};

function shopInfoBundle(data) {
	var dateIndex = data.indexOf('id="J_showShopStartDate"');
	var foundDate = data.slice(dateIndex, data.indexOf('/>', dateIndex));
	displayInfo.shopStartDate = foundDate.match(new RegExp(/[0-9\-]{4,}/g))[0];
	//后加载数据链接
	var lateDataMatch = new RegExp(/id="monthuserid"\svalue="(.*)(?=")/); //请求参数
	var lateDataSource = 'http://rate.taobao.com/ShopService4C.htm?userNumId=' + lateDataMatch.exec(data)[1].trim() + '&shopID=' + apiGroup.g_con.shopId + '&isB2C=false';
	sendRequest(lateDataSource, function(badData) {
		var formatBadData = JSON.parse(badData);//所有不好的数据
		shopDataDetail.complaintsLocalVal = formatBadData.complaints.localVal //纠纷(行业均值 为'indVal')
		shopDataDetail.punishLocalVal = formatBadData.punish.localVal //处罚
		shopDataDetail.ratRefundLocalVal = formatBadData.ratRefund.localVal //退款
		console.log(shopDataDetail); //店铺详情里纠纷率
	});
}
