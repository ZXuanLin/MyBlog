//登陆弹层
function LoginLayer(){
	var content = [
			'<div class="layui-form-item">',
		    '<div class="layui-inline" style="margin-top:20px">',
		      '<label class="layui-form-label">用户名</label>',
		      '<div class="layui-input-inline">',
		        '<input type="text" name="" lay-verify="phone" autocomplete="off" class="layui-input" data-field="username">',
		      '</div>',
		    '</div>',
		    '<div class="layui-inline" style="margin-top:20px">',
		      '<label class="layui-form-label">密 码</label>',
		      '<div class="layui-input-inline">',
		        '<input type="password" name="email" lay-verify="email" autocomplete="off" class="layui-input" data-field="password">',
		      '</div>',
		    '</div>',
		  '</div>'
  ].join('');
	layui.use('layer',function(){
		var layer = layui.layer;
		  layer.open({
		        type: 1,
		        title: false, //不显示标题栏
		        closeBtn: false,
		        area: ['350px'],
		        shade: 0.8,
		        id:'LAY_layuipro', //设定一个id，防止重复弹出
		        btn:['登陆', '取消'],
		        moveType: 1, //拖拽模式，0或者1
		        content:content,
		        shadeClose:true,
		        success: function(layero){
		        },
        		yes:function(index,layero){
		        	//登陆逻辑
		        	$.ajax({
		        		url:'/api/user/login',
		        		type:'post',
		        		dataType:'json',
		        		data:{
		        			username:$('input[data-field="username"]').val(),
		        			password:$('input[data-field="password"]').val()
		        		},
		        		success:function(res){
		        			if(res.code !== 0){
					          	layer.open({
					          		content:res.message,
					          		yes:function(index,layero){
					          			layer.close(index)
					          		}
					          	})
					          	return;
					        }

					        layer.open({
					          	content:res.message,
					          	yes:function(index,layero){
					          		//登陆成功逻辑
					          		window.location.reload();
					          		layer.closeAll()
					          	}
					        })
					        console.log(res);
		        		}
		        	})
		        	// layer.close(index);
		        	// console.log('ok');
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
		        '<input type="text" name="text" lay-verify="phone" autocomplete="off" class="layui-input" data-field="username">',
		      '</div>',
		    '</div>',
		    '<div class="layui-inline" style="margin-top:20px">',
		      '<label class="layui-form-label">密 码</label>',
		      '<div class="layui-input-inline">',
		        '<input type="password" name="" lay-verify="email" autocomplete="off" class="layui-input" data-field="userpwd">',
		      '</div>',
		    '</div>',
		    '<div class="layui-inline" style="margin-top:20px">',
		      '<label class="layui-form-label">确认密码</label>',
		      '<div class="layui-input-inline">',
		        '<input type="password" name="" lay-verify="email" autocomplete="off" class="layui-input" data-field="userrepwd">',
		      '</div>',
		    '</div>',
		  '</div>'
  ].join('');
	layui.use('layer',function(){
		var layer = layui.layer;
		  layer.open({
		        type: 1,
		        title: false, //不显示标题栏
		        closeBtn: false,
		        area: ['350px'],
		        shade: 0.8,
		        id:'LAY_layuipro',//设定一个id，防止重复弹出
		        btn:['注册', '取消'],
		        moveType: 1, //拖拽模式，0或者1
		        content:content,
		        shadeClose:true,
        		success: function(layero){
        		},
        		yes:function(index,layero){
        			$.ajax({
			          	type:'post',
			          	url:'/api/user/register',
			          	dataType:'json',
			          	data:{
			          		username:$('input[data-field="username"]').val(),
			          		password:$('input[data-field="userpwd"]').val(),
			          		repassword:$('input[data-field="userrepwd"]').val()
			          	},
			          	success:function(res){
			          		if(res.code !== 0){
			          			layer.open({
			          				content:res.message,
			          				yes:function(index,layero){
			          					layer.close(index)
			          				}
			          			})
			          			return;
			          		}
			          		layer.open({
			          			content:res.message,
			          			yes:function(index,layero){
			          				console.log(res);
			          				//注册成功逻辑
			          				window.location.reload();
			          				layer.closeAll();
			          			}
			          		})

			          	}
			          })
        		}
		});
	})      
}

function showLayerDate(){

}

$(function(){
	//注册
	$(document).on('click','#regShow .reg',function(){
		RegLayer();
	})
	//登陆
	$(document).on('click','#regShow .login',function(){
		LoginLayer();
	})

	//退出

	$(document).on('click','#loginShow .out',function(){

		layui.use('layer',function(){
			var layer = layui.layer;
			layer.msg('确认退出吗？',{
				time:20000,
				btn:['确定','取消'],
				yes:function(index,layero){
					$.ajax({
						url:"/api/user/logout",
						type:'get',
						success:function(res){
							if(!res.code){
								window.location.reload();
							}
						}
					})
					layer.close(index)
				}
			})
		})
	})
})
	

