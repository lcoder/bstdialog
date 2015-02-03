$.browser = {};
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
$(function(){
	/*demo演示*/
	var $a = $('dl dt a');
    $a.on('click', function(event) {
        //alert($a.size());
        var $this = $(this),
            name = $.trim($this.attr('name'));
        switch(name){
            case 'ok':
                BSTYUN.dialog.ok('修改成功');
                break;
            case 'warn':
                BSTYUN.dialog.warn('网络错误，请检查');
                break;
            case 'success':
                BSTYUN.dialog.success('评论成功');
                break;
            case 'prohibit':
                BSTYUN.dialog.prohibit('请先选择套餐');
                break;
            case 'notice':
                BSTYUN.dialog.notice('尊敬的顾客朋友，您IQ卡余额不足10元，请及时充值');
                break;
            case 'confirm':
                BSTYUN.dialog.confirm('确认提交订单？');
                break;
            case 'loading':
                BSTYUN.dialog.loading('努力加载中');
                break;
            case 'requestContent':
                var url = '/cdn/bst/bstdialog_requestcontent.html';
                BSTYUN.dialog.requestContent(url);
                break;
            case 'go2cart':
                var cart_html = '<div class="addcart_success"><h3>您已经购买的套餐：</h3><dl>';
                cart_html += '<dt><span class="taocan_name"><input type="radio" class="taocan_radio" name ="taocan" checked="checked"/>套餐<em>A</em>名称:XXX</span><span>使用年限：<em class="use_year">2</em>年 使用人数：<em class="use_people">100人</em></span></dt>';
                cart_html += '<dd><p>子产品：OA，即时通，云随洽</p></dd>';
                cart_html += '<dt><span class="taocan_name"><input type="radio" class="taocan_radio" name ="taocan"/>套餐<em>B</em>名称:XXX</span><span>使用年限：<em class="use_year">1</em>年 使用人数：<em class="use_people">99人</em></span></dt>';
                cart_html += '<dd><p>子产品：视频会议</p></dd>';
                cart_html += '<p class="taocan_detail"></p>';
                cart_html += '</dl><div class="btm"><a href="javascript:BSTYUN.dialog.close();" class="graybtn">取消</a><span>&nbsp;</span><a href="javascript:BSTYUN.dialog.close();" class="btn">确定</a></div></div>';
                BSTYUN.dialog.go2cart(cart_html);
                break;
            case 'timedown':
                var timer;
                BSTYUN.dialog.creat({
                    content: "时间越来越少，越来越少..",
                    init: function () {
                      var that = this, i = 5;
                        var fn = function () {
                            that.title(i + "秒后关闭");
                            !i && that.close();
                            i --;
                        };
                        timer = setInterval(fn, 1000);
                        fn();
                    },
                    close: function () {
                      clearInterval(timer);
                    }
                }).show();
                break;
            case 'timedown2':
                BSTYUN.dialog.creat({
                    content: "默认3秒后关闭",
                    title: '标题',
                    time: 3
                });
                break;
            case 'showLogin':
                BSTYUN.dialog.showLogin();
                break;
        }
    });
    /*代码高亮*/
    $("pre.js").snippet("javascript",{style:"berries-light",transparent:false,showNum:true});
});