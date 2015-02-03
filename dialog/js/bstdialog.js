/**
 * bstyun-全局对话框
 * @authors supmain (mtingfeng@gmail.com)
 * @date    2014-09-28 15:16:55
 * @update  2014-09-28 17:04:55
 * @for *.html
 * @version $Id$
 */
//jQuery.easing动画效果插件
jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}}});

// art.dialog扩展
artDialog.fn.shake = function (){
    var style = this.DOM.wrap[0].style,
        p = [4, 8, 4, 0, -4, -8, -4, 0],
        fx = function () {
            style.marginLeft = p.shift() + 'px';
            if (p.length <= 0) {
                style.marginLeft = 0;
                clearInterval(timerId);
            };
        };
    p = p.concat(p.concat(p));
    timerId = setInterval(fx, 13);
    return this;
};
artDialog.notice = function (options) {
    var opt = options || {},
        api, aConfig, hide, wrap, top,
        duration = 800;
        
    var config = {
        id: 'Notice',
        left: '100%',
        top: '100%',
        fixed: true,
        drag: false,
        resize: false,
        follow: null,
        lock: false,
        init: function(here){
            api = this;
            aConfig = api.config;
            wrap = api.DOM.wrap;
            top = parseInt(wrap[0].style.top);
            hide = top + wrap[0].offsetHeight;
            
            wrap.css('top', hide + 'px')
                .animate({top: top + 'px'}, duration, function () {
                    opt.init && opt.init.call(api, here);
                });
        },
        close: function(here){
            wrap.animate({top: hide + 'px'}, duration, function () {
                opt.close && opt.close.call(this, here);
                aConfig.close = $.noop;
                api.close();
            });
            
            return false;
        }
    };

    for (var i in opt) {
        if (config[i] === undefined) config[i] = opt[i];
    };
    
    return artDialog(config);
};
var BSTYUN = BSTYUN || {};
BSTYUN.dialog = {
	/**
	 * [创建dialog对话框]
	 * @param  {[字面量格式]} options  [对话框参数]
	 * @return {[dialog]}              [创建的dialog对象]
	 */
    creat: function (options) {
        var dialog = null;
        options = $.extend({
            fixed:true,
            title:false,
            lock:true,
            padding:'20px 40px',
            id: '',
            content: ''
        },options);
        dialog=$.dialog(options);
        return dialog;
    },
	/**
	 * 关闭对话框
	 * @param  {[string]} id   [dialog对象的id]
	 * @return {[undefind]}    [无返回值]
	 */
	close: function(id){
		var i,list = $.dialog.list;
		if (id) {
			list[id].close();
		}else{
			for (i in list) {
				list[i].close();
			}
		}
	},
	/**
	 * [获取dialog对象]
	 * @param  {[string]} id [dialog对象的id]
	 * @return {[dialog]}    [无参数，则返回全部dialog，有id，则返回对应的dialog对象]
	 */
	get: function(id){
		return id === undefined ? $.dialog.list : $.dialog.list[id]; 
	},
	/**
	 * [提示信息]
	 * @param  {[string]}   html   [提示内容]
	 * @param  {Function} callback [回调函数]
	 * @return {[undefined]}       [无返回值]
	 */
	ok: function (html,callback){
        var dialog = null;
        html = '<div class="ok-tip"><i class="iconfont">&#xe629;</i>'+html+'</div>';
        dialog = this.creat({id:'ok',content:html});
        dialog.button({
            name: '知道了',
            focus: true,
            callback: callback
        });
    },
    /**
     * [警告信息]
     * @param  {[string]}   html     [警告内容]
     * @param  {Function} callback   [回调函数]
     * @return {[undefined]}         [无返回值]
     */
	warn: function(html,callback){
		var dialog = null,
		html = '<div class="warn-tip"><i class="iconfont">&#xe603;</i>'+html+'</div>';
		dialog = this.creat({id: 'warn',content:html});
		dialog.button({
			name: '知道了',
			focus: true,
			callback: callback
		});
	},
	/**
	 * [操作成功]
	 * @param  {[string]} html 		[成功提示]
	 * @param  {[number]} time 		[提示消失时间，秒]
	 * @return {[undefined]}      	[无返回值]
	 */
    success: function (html,time) {
        var dialog = null;
        time = time || 2;
        this.close();
        html = '<div class="success-tip"><i class="iconfont">&#xe662;</i>'+html+'</div>'
        dialog = this.creat({id:'success',content:html,lock:false});
        setTimeout(function(){
            var $dg = $(dialog.DOM.wrap);
            $dg.animate({'top':'-=50px','opacity':0},300,'easeInBack',function(){
                dialog.close();
            });
        }, time*1000);
    },
    /**
     * [确认对话框]
     * @param  {[string]}   html     [确认内容]
     * @param  {Function} callback   [回调函数]
     * @return {[undefined]}         [无返回值]
     */
    confirm: function (html,callback) {
        var dialog = null;
        html = '<div class="confirm-tip"><i class="iconfont">&#xe61e;</i>'+html+'</div>';
        dialog = this.creat({id:'confirm',content:html});
        dialog.button({
            name: '确定',
            focus: true,
            callback: callback
        },{
            name: '取消'
        });
    },
    /**
     * [禁止操作对话框]
     * @param  {[string]}   html   [禁止内容]
     * @param  {Function} callback [回调函数]
     * @return {[undefined]}       [返回值]
     */
    prohibit: function(html,callback){
        var dialog = null,$dg = null;
        html = '<div class="prohibit-tip"><i class="iconfont">&#xe63e;</i>'+html+'</div>';
        dialog = this.creat({
            id: 'prohibit',
            content: html,
            init: function(){
                $dg  = $('.aui_outer');
                $dg.removeClass('aui_outer');
            },
            close: function(){
                $dg.addClass('aui_outer');
            }
        });
        dialog.button({
            name: '知道了',
            focus: true,
            callback: callback
        });
        dialog.shake && dialog.shake();// 调用抖动接口
    },
    /**
     * [右下角通知]
     * @param  {[string]}   html     [通知内容]
     * @param  {Function} callback   [回调函数]
     * @return {[undefined]}         [返回值]
     */
    notice: function(html,callback){
        var dialog = null;
        dialog = art.dialog.notice({
            id: 'notice',
            title: '百顺通提醒您',
            width: 220, // 必须指定一个像素宽度值或者百分比，否则浏览器窗口改变可能导致artDialog收缩
            content: '<div class="notice-tip"><i class="iconfont">&#xe64b;</i>'+html+'</div>',
            time: 5,
            close: function(){
                callback && callback();
            }
        });
    },
    /**
     * [显示加载的进度]
     * @param  {[string]}   html        [显示的标语]
     * @param  {Function} callback      [进度完成的回调函数]
     * @return {[undefined]}            [返回值]
     */
    loading: function(html,callback){
        var dialog = null;
        dialog = $.dialog({
            id: 'loading',
            fixed:true,
            title:false,
            lock:true,
            padding:'10px 20px',
            content: '<div class="loading-tip">'+html+'</div>'
        });
    },
    /**
     * [请求ajax返回数据]
     * @param  {[string]}   url      	[请求的后台地址]
     * @param  {Function} callback 		[确定的回调函数]
     * @return {[undefined]}            [返回值]
     */
    requestContent: function(url,callback){
		var dialog = null;
    	dialog = $.dialog({
            fixed:true,
            title:false,
            lock:true,
            padding:'20px 40px',
            id: 'requestContent',
            content: undefined
	    });
		$.ajax({
			url: url,
			type: 'post',
			dataType: 'text',
			success:function(html){
				dialog.content(html);
				dialog.button([{
            	name: '确定',
            	focus: true,
            	callback: callback
            	}]);
			},
			error: function(error){
				alert(error)
			}
		});

    },
    /*购物车*/
    go2cart: function(html){
	    var $cart = this.creat({
	        id: 'addCartSuccess',
	        title: false,
	        lock: true,
	        content: html
	    });
	    var $radio = $('.taocan_radio');
	    $radio.on('click', function(event) {
			var $this = $(this);
			var $em = $this.parent('span').next().find('em');
			var taocan = $this.nextAll('em').text();
			var use_year = $em.eq(0).text(),
				use_people = $em.eq(1).text();
			$('.addcart_success').find('.taocan_detail').html('您选择了'+taocan+'套餐，截至时间，则该产品您所能购买的最大年限为'+use_year+'年，最大使用人数为'+use_people+'人。同意点击确定，否则请点击取消');
		});
		$radio.eq(0).trigger('click');
    },
    /**
     * [全局登录]
     * @param  {[string]} reurl      [登录后的跳转地址]
     * @return {[undefined]}         [返回值]
     */
    showLogin:function(reurl){
        var _login_box = null,
            reurl = reurl || location.href,
        html = '<div class="dialog_login_box"><div id="login-box">'
                +'<h2><div class="trig">没有帐号？<a href="javascript:void(0)" target="_blank" class="trigger-box">点击注册</a></div>登录</h2>'
                +'<div class="form-bd"><div class="form_box cle" id="login-bstyun">'
                +'<div class="login_box"><form id="login-bstyun-form"><ul class="form">'
                +'<li class="text_input"><span class="error_icon"></span><span class="iconfont">&#xe612;</span><input type="text" name="j_username" class="text" placeholder="用户名/邮箱/手机号"></li>'
                +'<li class="text_input"><span class="error_icon"></span><span class="iconfont">&#xe606;</span><input type="password" name="j_password" class="text" placeholder="密码"></li>'
                +'<li class="error_box"><em></em></li>'
                +'<li class="login_param"><p><a class="forget_psd" href="javascript:void(0)">忘记密码?</a><label><input type="checkbox" checked="checked" name="_spring_security_remember_me" class="remember-me">下次自动登录</label></p></li>'
                +'<li class="last"><input type="submit" class="btn" value="登 录" /></li>'
                +'</ul></form></div>'
                +'</div></div>'
                +'</div></div>';
        _login_box = BSTYUN.dialog.creat({
            title: '您尚未登录',
            lock: true,
            drag: false,
            fixed: true,
            padding:"0",
            id: "login",
            content:html,
            init: function() {

                var $form = $('#login-bstyun-form'),
                    $name = $form.find('input[name=j_username]'),
                    $pwd = $form.find('input[name=j_password]'),
                    $submit = $form.find('input[type=submit]'),
                    $msg = $form.find('li.error_box em'),
                    $input = $form.find('li.text_input');

                    $form.find("input").focus(function() {
                        $input.removeClass("params_error");
                    });

                $form.submit(function(){
                    var _name = $.trim($name.val()),
                        _pwd = $.trim($pwd.val()),
                        text, params;

                    if($submit.hasClass('disabled')){
                        return false;
                    }

                    if(_name == '' || _pwd == ''){
                        text = (_name == '') ? '请输入用户名':'请输入密码';
                        $msg.text(text).show().delay(2000).fadeOut();
                        return false;
                    }

                    $submit.addClass('disabled').val('登录中');
                    params = {
                        'j_username': _name,
                        'j_password': _pwd,
                        '_spring_security_remember_me':'on'
                    };

                    $.ajax({
                        url: "/j_spring_security_check",
                        type: 'post',
                        data: params,
                        dataType: 'json',
                        success: function(data){
                            if(data.status == 1){
                                location.href=reurl;
                            }else if(data.status == 0){
                                $submit.removeClass('disabled').val('登 录');
                                $msg.text('您输入的密码和用户名不匹配').show().delay(2000).fadeOut();
                                $input.addClass('params_error');
                            }
                        },
                        error: function(xhr){
                            if(xhr.status == 200){
                                location.reload();
                            }else{
                                $submit.removeClass('disabled').val('登 录');
                                BSTYUN.dialog.warn("服务器忙，请稍后再试。("+xhr.status+")");
                            }
                        }
                    });
                    return false;
                });
            }
        });
    }
};