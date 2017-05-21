//登陆弹层
function LoginLayer(){
	var content = [
			'<div class="layui-form-item">',
		    '<div class="layui-inline" style="margin-top:20px">',
		      '<label class="layui-form-label">用户名</label>',
		      '<div class="layui-input-inline">',
		        '<input type="tel" name="phone" lay-verify="phone" autocomplete="off" class="layui-input">',
		      '</div>',
		    '</div>',
		    '<div class="layui-inline" style="margin-top:20px">',
		      '<label class="layui-form-label">密 码</label>',
		      '<div class="layui-input-inline">',
		        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input">',
		      '</div>',
		    '</div>',
		  '</div>'
  ].join('');
	layui.use('layer',function(){
		var layer = layui.layer;
		  layer.open({
        type: 1
        ,title: false //不显示标题栏
        ,closeBtn: false
        ,area: ['350px']
        ,shade: 0.8
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['登陆', '取消']
        ,moveType: 1 //拖拽模式，0或者1
        ,content:content
        ,success: function(layero){
          var btn = layero.find('.layui-layer-btn');
          btn.css('text-align', 'center');
          btn.find('.layui-layer-btn0').attr({
            href: 'http://www.layui.com/'
            ,target: '_blank'
          });
        }
      });
	})
}
//注册弹层
function RegLayer(){
	var content = [
			'<div class="layui-form-item">',
		    '<div class="layui-inline" style="margin-top:20px">',
		      '<label class="layui-form-label">用户名</label>',
		      '<div class="layui-input-inline">',
		        '<input type="tel" name="phone" lay-verify="phone" autocomplete="off" class="layui-input">',
		      '</div>',
		    '</div>',
		    '<div class="layui-inline" style="margin-top:20px">',
		      '<label class="layui-form-label">密 码</label>',
		      '<div class="layui-input-inline">',
		        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input">',
		      '</div>',
		    '</div>',
		    '<div class="layui-inline" style="margin-top:20px">',
		      '<label class="layui-form-label">确认密码</label>',
		      '<div class="layui-input-inline">',
		        '<input type="text" name="email" lay-verify="email" autocomplete="off" class="layui-input">',
		      '</div>',
		    '</div>',
		  '</div>'
  ].join('');
	layui.use('layer',function(){
		var layer = layui.layer;
		  layer.open({
        type: 1
        ,title: false //不显示标题栏
        ,closeBtn: false
        ,area: ['350px']
        ,shade: 0.8
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['注册', '取消']
        ,moveType: 1 //拖拽模式，0或者1
        ,content:content
        ,success: function(layero){
          var btn = layero.find('.layui-layer-btn');
          btn.css('text-align', 'center');
          btn.find('.layui-layer-btn0').attr({
            href: 'http://www.layui.com/'
            ,target: '_blank'
          });
        }
		});
	})      
}

function showLayerDate(){

}

$(function(){
	$(document).on('click','#regShow .reg',function(){
		RegLayer();
	})

	$(document).on('click','#regShow .login',function(){
		LoginLayer();
	})
})
	

