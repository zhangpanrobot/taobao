var dbody = document.body;
var origin = location.origin;

function $(selector) {
    return document.getElementById(selector);
}

function $_(selector) {
    return document.getElementsByClassName(selector);
}

function $__(selector) {
    return document.querySelector(selector);
}

if(origin === 'http://item.taobao.com') {//满足条件才执行script
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;e.openTag="{{",e.closeTag="}}";var z=function(a,b){var c=b.split(":"),d=c.shift(),e=c.join(":")||"";return e&&(e=", "+e),"$helpers."+d+"("+a+e+")"};e.parser=function(a){a=a.replace(/^\s/,"");var b=a.split(" "),c=b.shift(),e=b.join(" ");switch(c){case"if":a="if("+e+"){";break;case"else":b="if"===b.shift()?" if("+b.join(" ")+")":"",a="}else"+b+"{";break;case"/if":a="}";break;case"each":var f=b[0]||"$data",g=b[1]||"as",h=b[2]||"$value",i=b[3]||"$index",j=h+","+i;"as"!==g&&(f="[]"),a="$each("+f+",function("+j+"){";break;case"/each":a="});";break;case"echo":a="print("+e+");";break;case"print":case"include":a=c+"("+b.join(",")+");";break;default:if(/^\s*\|\s*[\w\$]/.test(e)){var k=!0;0===a.indexOf("#")&&(a=a.substr(1),k=!1);for(var l=0,m=a.split("|"),n=m.length,o=m[l++];n>l;l++)o=z(o,m[l]);a=(k?"=":"=#")+o}else a=d.helpers[c]?"=#"+c+"("+b.join(",")+");":"="+a}return a},"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();

// //判断品类
// var warnData = {
//     'type': ['shoe', 'milkPowder', 'agentShopping'],
//     'keyword': [['nike', 'adidas', '网球鞋', '运动鞋'], ['奶粉'], ['代购', '全球购', '美国代购']],
// };

document.onreadystatechange = function() {
    if (document.readyState == 'complete') {
        var bodyText = dbody.innerText;
        var keyword = $_('tb-main-title')[0].innerText + $('attributes').innerText;
        //var keyword = $('.tb-main-title').innerText + $('#attributes').innerText;
        var priceRefer = $__('#J_Price') || $__('#J_StrPrice .tb-rmb-num');//价格
        var sellerName = $_('tb-seller-name')[0].innerText;//掌柜名
        var sgShopNews = $_('sg-shop-news')[0];
        var sgExperience = $_('sg-experience')[0];
        var sgAdvise = $_('sg-advise')[0];
        var sgShoppingNews = $_('sg-shopping-news')[0];
        var sgFalsePropaganda = $_('sg-falsePropaganda')[0];
        if(~keyword.search(/(((nike|adidas|耐克|阿迪).*(运动鞋|网球鞋))|((运动鞋|网球鞋).*(nike|adidas|耐克|阿迪)))/i)) {//鞋
            var tbLocation; //发货地址 
            tbLocation = $_('tb-location')[0] && $_('tb-location')[0].innerText; //预用地址
            var sizeLen = $__('.J_Prop.tb-prop').querySelectorAll('li') && $__('.J_Prop.tb-prop').querySelectorAll('li').length > 7? true: false;//鞋码数量
            var shopLocation = !!~displayInfo.location.search(/(福建|广东|浙江)/g) || !!~tbLocation.search(/(福建|广东|浙江)/g);
            var shoePrice = Number(priceRefer.innerText).toFixed(0) < 300? true:false;
            sgShoppingNews.innerHTML = '<a href="http://jingyan.baidu.com/article/597a06438f3652312b52432d.html">如何辨别Nike鞋真假</a>';
            if(sizeLen) {
                sgExperience.innerHTML += '<p>运动鞋号码较全, 请谨慎购买</p>';
            }
            if(shopLocation) {
                sgExperience.innerHTML += '<p class="sg-warn">产地为<span class="sg-rate">' + tbLocation + '</span>, 请谨慎购买</p>';
            }
            if(shoePrice) {
                sgExperience.innerHTML += '<p>价格低于300元, 请谨慎购买</p>';
            }
            sgAdvise.innerHTML = '<p>购买鞋类商品时请您注意: 有的卖家会真假鞋掺和着卖</p><p>即使图片中鞋标是真的, 卖家发货也可能是假的</p>';
        } else if(~keyword.search(/(奶粉.*代购|代购.*奶粉|牛栏.*奶粉|直邮.*爱他美|爱他美.*直邮)/g)) {//代购
            sgShoppingNews.innerHTML = '<a href="http://mp.weixin.qq.com/s?__biz=MjM5OTM4Njc2MA==&mid=200745847&idx=4&sn=17c5bf546419b21f1a46739dddbeeb4e&scene=1#rd">母婴代购黑幕，空姐带货。亲戚在国外。人肉带货都是逗你玩</a>';
            var milkPrice = Number(priceRefer.innerText).toFixed(0);
            if((~keyword.search(/牛栏.*奶粉/g) && milkPrice < 155) || (~keyword.search(/(直邮.*爱他美|爱他美.*直邮/g) && milkPrice < 180)) {
                sgExperience.innerHTML = '<p>奶粉价格低于官网价格,请谨慎购买</p>';
            }
            //sgAdvise.innerHTML = '<p></p>';
        } else if(~keyword.search(/(GNC|汤臣倍健|保健品)/g)) {
            sgShoppingNews.innerHTML = '<p><a target="_blank" href="http://app1.sfda.gov.cn/datasearch/face3/base.jsp?tableId=31&tableName=TABLE31&title=%BD%F8%BF%DA%B1%A3%BD%A1%CA%B3%C6%B7&bcId=118103387241329685908587941736">国家药监局数据查询网址</a></p><p><a target="_blank" href="http://www.yiyaojie.com/bg/bjp/20141009/54641.html">淘宝五钻卖家售假保健品“美秀决明子荷叶胶囊”被抓</a></p><p><a target="_blank" href="http://jxfzb.jxnews.com.cn/system/2014/04/11/013036399.shtml">淘宝网店卖假保健食品...</a></p>';
            if(~keyword.search(/GNC/g)){
                sgShoppingNews.innerHTML += '<p><a target="_blank" href="http://www.91own.com/detail/366.html">如何鉴别真假GNC保健品</a></p>';
            }
        }
        if(~bodyText.search(/(好评.*返现|返现.*好评)/g)) {
            sgFalsePropaganda.innerHTML += '<p>卖家通过好评返现的方式刷好评，请谨慎购物</p>';
        }
        if(~bodyText.search(/假一罚/g)) {
            sgFalsePropaganda.innerHTML += '<p>专柜一般不开具假货证明，假一罚十无效，请谨慎购物</p>';
        }
        if(~bodyText.search(/(专柜.*验货|验货.*专柜)/g)) {
            sgFalsePropaganda.innerHTML += '<p>专柜一般不开具假货证明，专柜验货无效，请谨慎购物</p>';            
        }
    }
    //render template
    template.config('escape', false);
    var badCommentsList = template('sg-badCommentsTmp', data);
    var allBadCommentsList = template('sg-allBadCommentsTmp', data);
    var badComments = document.createElement('div');
    var allBadComments = document.createElement('div');
    badComments.id = 'sg-badComments';
    allBadComments.id = 'sg-allBadComments';
    dbody.appendChild(badComments);
    dbody.appendChild(allBadComments);
    $('sg-badComments').innerHTML = badCommentsList;
    $('sg-allBadComments').innerHTML = allBadCommentsList;
    function autoHide(e){
        e.currentTarget.style.display = 'none';
    }
    $('sg-badComments').addEventListener('click', function(e){
        var target = e.target;
        if(target.className === 'sg-comments-hide') {
            autoHide(e);
        } 
        if(target.parentNode.className === 'sg-more') {
            autoHide(e);
            dbody.scrollTop = $_('tb-tabbar-inner-wrap')[0].getBoundingClientRect().top + document.body.scrollTop;
        }
    });
    $('sg-allBadComments').addEventListener('click', function(e){
        var target = e.target;
        if(target.className === 'sg-comments-hide') {
            autoHide(e);
        }
    });
}

var g_con;
var dataApi = $('J_listBuyerOnView').getAttribute('data-api'); //获取交易详情 &callback=__jsonp_records_reload, bid_page页面数
var dataRateUrl = $('J_ShopInfo').getAttribute('data-rateUrl'); //获取店铺信息链接
var reviews = $('reviews');
var dataCommonApi = reviews.getAttribute('data-commonApi'); //获取各种评价数量 JSON.data.count.bad/normal/good
var dataListApi = reviews.getAttribute('data-listApi'); //获取评价详情  尾部加两个参数  &callback=jsonp_reviews_list&currentPageNum=1(rataType=-1(差评)或0(中评))
var apiItemInfo; //各种交易数据, 及其比率, JSON.quantity.confirmGoodsItems(交易成功数), JSON.quantity.paySuccess(交易中笔数), JSON.quantity.refundCount(纠纷退款数)
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
var displayInfo = {};
var data = {};
var badCommentsList;
chrome.extension.onRequest.addListener(function(msg) {
    switch (msg.cmd) {
        case 'basicInfo': //基本信息
            displayInfo = msg.data;
            data = {
                dataRateUrl: dataRateUrl,
                badComments: displayInfo.badCommentList,
                allBadComments: displayInfo.allBadCommentList
            };
            var mainInfoDisplay = template('sg-mainInfoTmp', displayInfo);
            var taobaoAssistant = document.createElement('div');
            taobaoAssistant.id = 'sg-taobaoAssistant';
            taobaoAssistant.innerHTML = mainInfoDisplay;
            referenceElement.parentNode.insertBefore(taobaoAssistant, referenceElement);
            $('sg-showBad').addEventListener('click', function(e) {
                if(this.className !== 'sg-link ') return;
                $('sg-allBadComments').style.display = 'none';
                $('sg-badComments').style.display = 'block';
                $('sg-badComments').children[1].children[0].style.display = 'block';
            });
            $('sg-showAllBad').addEventListener('click', function(e) {
                if(this.className !== 'sg-link ') return;
                $('sg-badComments').style.display = 'none';
                $('sg-allBadComments').style.display = 'block';
            });
            var switchContent = $_('sg-nav-content');
            $_('sg-nav-tabs')[0].addEventListener('click', function(e) {
                var target = e.target;
                var siblings = target.parentNode.children;
                if(target.nodeName === 'LI') {
                    var index = Array.prototype.indexOf.call(target.parentNode.children, target);
                    var otherSiblingIndex = switchContent.length/2-index;
                    target.className = 'sg-active';
                    siblings[otherSiblingIndex].className = '';
                    switchContent[index].style.display = 'block';
                    switchContent[otherSiblingIndex].style.display = 'none';
                }
            });
            //开始渲染
            break;
        default:
            return;
    }
});
//一次发所有消息
chrome.extension.sendRequest(options);

//插入页面
var referenceElement = $_('sep-line')[0];
//优先执行
var mainInfo = document.createElement('script');
mainInfo.id = 'sg-mainInfoTmp';
mainInfo.type = 'text/html';
mainInfo.innerHTML = '<div id="sg-shoppingGuide"><ul class="sg-nav sg-nav-tabs"><li class="sg-active">卖家服务情况</li><li>如何识别网购真假</li></ul><div><div class="sg-nav-content"><ul><li class="sg-shopStartDate"><p>开店时长: {{shopStartDate[0]}}年</p></li><li class="sg-quality"><p>近30天退款率为 {{ratRefund.localVal}}%, 退款 {{ratRefund.refundCount}} 次<span class="sg-serious-warn {{if !ratRefund.danger}}hide{{/if}}">高于行业平均值</span></p><p>近30天纠纷率为 {{complaints.localVal}}%, 纠纷退款 {{complaints.disputRefundNum}} 笔<span class="sg-serious-warn {{if !complaints.danger}}hide{{/if}}">高于行业平均值</span></p><p>近30天被处罚 {{punish.punishCount}} 次, 出售假冒商品 {{punish.cPunishTimes}} 次, 虚假交易 {{punish.xujiaTimes}} 次<span class="sg-serious-warn {{if !punish.danger}}hide{{/if}}">高于行业平均值</span><span class="sg-serious-warn {{if !+punish.cPunishTimes}}hide{{/if}}">售假</span></p></li><li class="sg-anonymity"><p class="sg-note {{if +(anonyCommentsRate)==100}}sg-warn{{/if}}">评价匿名率:<span class="sg-rate">{{anonyCommentsRate}}%</span><span class="tb-r-sku">无实名评价，请仔细阅读好评，谨防卖家刷单</span></p><p class="sg-note {{if +(anonyTradeRate)==100}}sg-warn{{/if}}">成交记录匿名率:<span class="sg-rate">{{anonyTradeRate}}%</span><span class="tb-r-sku">无实名评价，请仔细查看买家信息，谨防卖家刷单</span></p><p class="sg-note {{if +(successRate)<20}}sg-warn{{/if}}">交易成功比例:<span class="sg-rate">{{successRate}}%</span><span class="tb-r-sku">比例较低，请仔细查看交易记录，谨防卖家刷单可能存在卖家刷单行为</span></p></li><li class="sg-badComment"><p class="sg-evaluate"><span>商品中差评:<span id="sg-showBad" class="sg-link {{if !(badCommentList&&badCommentList.length)}}tb-r-sku{{/if}}">{{(badCommentList&&badCommentList.length) || 0}} 条</span></span><span>卖家所有中差评:<span id="sg-showAllBad" class="sg-link {{if !(allBadCommentList&&allBadCommentList.length)}}tb-r-sku{{/if}}">{{(allBadCommentList&&allBadCommentList.length)|| 0}} 条</span></span></p></li></ul></div><div class="sg-nav-content hide"><ul id="sg-suggest"><li class="sg-shop-news"></li><li class="sg-experience"></li><li class="sg-advise"></li><li class="sg-shopping-news"></li><li class="sg-falsePropaganda"></li></ul></div></div></div>';
dbody.appendChild(mainInfo);

//最后执行, 不影响速度
var badCommentsTmp = document.createElement('script');
var allBadCommentsTmp = document.createElement('script');
badCommentsTmp.id = 'sg-badCommentsTmp';
allBadCommentsTmp.id = 'sg-allBadCommentsTmp';
badCommentsTmp.type = 'text/html';
allBadCommentsTmp.type = 'text/html';
badCommentsTmp.innerHTML = '<div class="sg-comments-header">商品所有中差评<span class="sg-comments-hide"></span></div><div class="sg-comments-content"><div id="reviews"><div class="tb-revhd tb-rev-beta"><ul class="tb-r-comments">{{each badComments as value i}}<li tabindex="0" hidefocus="true" class="tb-r-review" data-uid=""><div class="tb-r-buyer"><div class="tb-r-avatar"><span class="tb-r-ulink"><img class="tb-r-uimg" width="40" height="40" src="{{value["user"]["avatar"]}}"><br><span class="tb-r-unick">{{value["user"]["nick"]}}{{if value["user"]["anony"]}}(匿名){{/if}}</span></span><br>{{if +value["user"]["rank"]>3}}<img src="http://a.tbcdn.cn/sys/common/icon/rank_s/{{value["user"]["displayRatePic"]}}">{{/if}}</div></div><div class="tb-r-bd">{{if value["spuRatting"].length}}<ul class="tb-r-spu-ratting">{{each value["spuRatting"] as v j}}<li>{{v["name"]}} : {{v["desc"]}}</li>{{/each}}</ul>{{/if}}<div class="tb-rev-item" data-id="222763816660"><div class="tb-r-cnt">{{value["content"]}}</div>{{if value["photos"].length}}<div class="tb-r-photos J_PhotoBrowserRoot"><ul class="tb-r-photos-thumb">{{each value["photos"] as phV k}}<li data-act="viewphoto" class="J_Trigger" data-src="{{phV["url"]}}"><img src="{{phV["thumbnail"]}}"> <b class="tb-photos-arrow"></b></li>{{/each}}</ul><div class="tb-r-photo-viewer J_ViewStage" style="display:none"><div class="tb-r-photo-viewer-bar"><a href="#" class="J_Hide"><span class="tb-r-photo-icon tb-r-photo-icon-hide"></span>收起</a><a href="#" class="J_Open" target="_blank"><span class="tb-r-photo-icon tb-r-photo-icon-open"></span>原图</a><a href="#" class="J_TurnLeft"><span class="tb-r-photo-icon tb-r-photo-icon-turnleft"></span>向左转</a><a href="#" class="J_TurnRight"><span class="tb-r-photo-icon tb-r-photo-icon-turnright"></span>向右转</a></div><div class="J_StageMain tb-r-photo-stage-main"><a href="#" hidefocus="on" class="J_Prev tb-r-photo-btn-prev"> <i></i></a><a href="#" hidefocus="on" class="J_Next tb-r-photo-btn-next"> <i></i></a><div class="tb-r-photo-stage-imgbox J_Imgbox"></div></div></div></div>{{/if}}<div class="tb-r-act-bar"><div class="tb-r-info"><span class="tb-r-date">{{value["date"]}}</span><span class="tb-r-sku">{{value["auction"]["sku"]}}</span></div><ul class="tb-rev-actions"><li class="tb-rev-action"><span class="tb-r-markuseful"><span class="tb-r-action-btn" title="有{{value["useful"]}}人认为此评论有用" data-act="markuseful" data-val="222763816660">有用</span><span class="tb-r-count-useful">({{value["useful"]}})</span><div class="tb-r-useful-msg"><div class="tb-r-useful-cnt">content</div> <b class="tb-r-useful-arrow"></b><b class="tb-r-useful-arrow-up"></b></div></span></li></ul></div><div class="tb-rev-comment"><div class="tb-r-sns-comment"></div></div></div>{{if value["append"]}}<div class="tb-rev-item tb-rev-item-append" data-id="223401715296"><div class="tb-r-cnt"><span class="tb-r-label-append">["追加评论"]</span>{{value["append"]["content"]}}</div><div class="tb-r-act-bar"><div class="tb-r-info">确认收货后{{value["append"]["dayAfterConfirm"]}}天追加</div><ul class="tb-rev-actions"></ul></div><div class="tb-rev-comment"><div class="tb-r-sns-comment"></div></div></div>{{/if}}</div></li>{{/each}}</ul></div></div></div><div class="sg-more"><span>查看更多</span></div>';
allBadCommentsTmp.innerHTML = '<div class="sg-comments-header">所有卖家中差评<span class="sg-comments-hide"></span></div><div class="sg-comments-content">{{each allBadComments as value i}}<div class="rate-item"><div class="rate-auction"><a target="_blank" class="J_MakePoint" data-point-val="tbrate.2.14" href="#">{{value["auction"]["title"]}}</a><div class="price">¥ <em>{{value["auction"]["auctionPrice"]}}</em></div></div><div class="rate-type"><span class="rate-icon rate-bad" title="差评"></span><br></div><div class="rate-userinfo"><a target="_blank" class="J_MakePoint" data-point-val="tbrate.2.12" href="{{value["user"]["nickUrl"]}}">{{value["user"]["nick"]}}{{if value["user"]["anony"]}}(匿名){{/if}}</a><br>{{if +value["user"]["rank"]>3}}<a target="_blank" class="J_MakePoint" data-point-val="tbrate.2.13" href="{{value["user"]["rankUrl"]}}"><img align="absmiddle" title="{{value["user"]["rank"]}}买家信用积分" src="http://a.tbcdn.cn/sys/common/icon/rank/{{value["user"]["displayRatePic"]}}" alt="{{value["user"]["rank"]}}个"></a>{{/if}}</div><div class="rate-content"><div class="tb-r-body"><div class="tb-r-cnt">{{value["content"]}}</div><div class="tb-r-info"><span class="tb-r-date">{{value["date"]}}</span><span class="tb-r-sku">{{value["auction"]["sku"]}}</span></div></div></div></div>{{/each}}</div><div class="sg-more"><span><a href="{{dataRateUrl}}#fromsg" target="_blank">查看更多</a></span></div>';
dbody.appendChild(badCommentsTmp);
dbody.appendChild(allBadCommentsTmp);
} else if((origin === 'http://rate.taobao.com') && (location.hash === '#fromsg')) {
    document.onreadystatechange = function(){
        dbody.scrollTop = $('relalist').getBoundingClientRect().top + dbody.scrollTop;
    }
}
//图片缩放, 最后做
// $('#sg-badComments').addEventListener('click', function(e){
//     var target = e.target;
//     var parent = target.parentNode;
//     if(parent.className === 'J_Trigger') {
//         parent.parentNode.nextSibling.querySelector('.tb-r-photo-stage-imgbox').innerHTML = '<img src ="' + parent.getAttribute('data-src') + '">';
//         //target.src = parent.getAttribute('data-src');
//     }
// });
