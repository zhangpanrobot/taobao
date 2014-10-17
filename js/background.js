var apiGroup = {};
var infoGroup = {};
var displayInfo = {};
var h = 0;
var finalNum = 0;

function sendToContent() {
	finalNum++;
	if (finalNum === 3) {
		chrome.tabs.query({
			active: true
		}, function(tabs) {
			chrome.tabs.sendRequest(tabs[0].id, {
				cmd: 'basicInfo',
				data: displayInfo
			}, function() {
				console.log('sendMessage')
			});
		});
		finalNum = 0;
	}
}

function getType(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1);
}
chrome.extension.onRequest.addListener(function(msg) {
	switch (msg.cmd) {
		case 'get-basicInfo':
			h = 0; //页面变动, 状态清零
			apiGroup = msg;
			infoGroup.commentList = []; //评价
			infoGroup.normalCommentList = []; //中评
			infoGroup.tradeDetailList = []; //交易详情
			displayInfo.successRate = ''; //交易成功率
			displayInfo.badCommentList = []; //差评
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
				dataCollection(data, displayInfo.badCommentList);
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
	} else if (getType(data) === "Array") {
		dataList = data;
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
				tradeLength += curTradeDetailList.match(buyer) ? curTradeDetailList.match(buyer).length : 0;
				anonyTradeLength += curTradeDetailList.match(new RegExp(/匿名/g)) ? curTradeDetailList.match(new RegExp(/匿名/g)).length : 0;
			}
		}
		displayInfo.anonyCommentsRate = ((anonyCommentsLength / commentsLength) * 100).toFixed(2); //评价匿名率
		displayInfo.anonyTradeRate = ((anonyTradeLength / tradeLength) * 100).toFixed(2); //成交量匿名率
		displayInfo.badCommentList = displayInfo.badCommentList[0].comments && badCommentRefine(displayInfo.badCommentList[0].comments);
		sendToContent();
	}
}

function shopInfoBundle(data) {
	var dateIndex = data.indexOf('id="J_showShopStartDate"');
	var foundDate = data.slice(dateIndex, data.indexOf('/>', dateIndex));
	displayInfo.shopStartDate = foundDate.match(new RegExp(/[0-9\-]{4,}/g))[0];
	var locationMatch = data.match(/<li>所在地区/g);
	var locationRefer = data.lastIndexOf('<li>所在地区') + 9;
	if (locationMatch) {
		displayInfo.location = data.slice(locationRefer, data.indexOf('</', locationRefer)).trim();
	}
	//后加载数据链接
	var lateDataMatch = new RegExp(/id="monthuserid"\svalue="(.*)(?=")/); //请求参数
	var userId = lateDataMatch.exec(data)[1].trim();
	var lateDataSource = 'http://rate.taobao.com/ShopService4C.htm?userNumId=' + userId + '&shopID=' + apiGroup.g_con.shopId + '&isB2C=false';
	var rateApi = 'http://rate.taobao.com/member_rate.htm?&callback=shop_rate_list&result=-1&user_id=' + userId;

	sendRequest(lateDataSource, function(badData) {
		var formatBadData = JSON.parse(badData); //所有不好的数据
		//退款
		displayInfo.ratRefund = {};
		displayInfo.complaints = {};
		displayInfo.punish = {};
		var ratRefund = formatBadData.ratRefund;
		var complaints = formatBadData.complaints;
		var punish = formatBadData.punish;
		displayInfo.ratRefund.refundCount = ratRefund.refundCount; //退款总笔数
		displayInfo.ratRefund.danger = +ratRefund.indVal - (+ratRefund.localVal) <= 0 ? true : false;
		displayInfo.ratRefund.localVal = ratRefund.localVal;
		//纠纷
		displayInfo.complaints.disputRefundNum = complaints.disputRefundNum; //纠纷退款
		displayInfo.complaints.danger = +complaints.indVal - (+complaints.localVal) <= 0 ? true : false;
		displayInfo.complaints.localVal = complaints.localVal;
		//处罚
		displayInfo.punish.punishCount = punish.punishCount; //处罚数
		displayInfo.punish.cPunishTimes = punish.cPunishTimes; //售假数, 不为零时显示"售假"
		displayInfo.punish.danger = +punish.indVal - (+punish.localVal) < 0 ? true : false;
		displayInfo.punish.localVal = punish.localVal;
		sendToContent();
	});

	sendRequest(rateApi, function(allBadData) {
		displayInfo.allBadCommentList = [];
		allBadData = (new Function('function shop_rate_list(obj){return obj};return ' + allBadData.trim()))();
		displayInfo.allBadCommentList = allBadData.rateListDetail && badCommentRefine(allBadData.rateListDetail);
		sendToContent();
	});
}

function badCommentRefine(list) { //差评信息筛选
	var listLen = list.length;
	var badCommentList = [];
	for (var i = 0; i < listLen; i++) {
		var badComment = {};
		var curList = list[i];
		badComment.auctionPrice = curList.auction.auctionPrice; //价格
		badComment.title = curList.auction.title; //名称
		badComment.sku = curList.auction.sku; //款式等信息
		badComment.date = curList.date;
		badComment.content = curList.content; //内容
		badComment.name = curList.user.nick + (JSON.parse(curList.user.anony) ? '(匿名)' : '');
		badComment.rank = curList.user.rank;
		badComment.vipLevel = curList.user.vipLevel;
		badComment.appendContent = curList.append && curList.append.content; //追回评论
		badCommentList.push(badComment);
	}
	return badCommentList;
}