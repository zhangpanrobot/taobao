chrome.extention.onRequest.addListener(function(msg){
	switch(msg.cmd) 
	{
		case 'get-basicInfo':
			getBaiscInfo(msg.shopInfoSource);
			chrome.extention.sendRequest();
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
//取5次评论, 算匿名率

//取5次成交记录, 算匿名率

var shopDataDetail = {};
function shopInfoBundle(data) {
    //正则取出所有数据
    var shopLocation = data.slice(data.indexOf("class=\"text\"", data.indexOf("<dt>所在地区：")) + 13, data.indexOf("</span", data.indexOf("<dt>所在地区："))); //所在地
    var foundDate = data.slice(data.indexOf("class=\"text\"", data.indexOf("<dt>创建时间")) + 13, data.indexOf("</span", data.indexOf("<dt>创建时间"))); //成立日期
    //后加载数据链接
    var lateDataMatch = new RegExp(/id="monthuserid"\svalue="(.*)(?=")/); //请求参数
    var lateDataSource = 'http://rate.taobao.com/ShopService4C.htm?userNumId=' + lateDataMatch.exec(data)[1].trim() + '&shopID=' + g_config.shopId + '&isB2C=false';
    sendRequest(lateDataSource, function(badData) {
        //shopDataDetail = data;
        shopDataDetail.complaintsLocalVal = badData.complaints.localVal //纠纷(行业均值 为'indVal')
        shopDataDetail.punishLocalVal = badData.punish.localVal //处罚
        shopDataDetail.ratRefundLocalVal = badData.ratRefund.localVal //退款
    });
}

function getBaiscInfo(url) {
	sendRequest(url, function(data) {
		shopInfoBundle(data);
	});
}

function parseQueryString(url)
{
   var obj={};
   var keyvalue=[];
   var key="",value="";       
   var paraString=url.substring(url.indexOf("?")+1,url.length).split("&");
   for(var i in paraString)
   {
      keyvalue=paraString[i].split("=");
      key=keyvalue[0];
      value=keyvalue[1];
      obj[key]=value;            
   }        
   return obj;
}