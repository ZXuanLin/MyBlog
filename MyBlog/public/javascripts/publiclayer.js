window.addEventListener('load', function(){

	layui.use('element',function(){
		var element = layui.element();
		//选项卡点击
		element.on('nav(indexNav)',function(ele){
			 // layui-nav-itemed
			 // var ele = $(ele)
			 // console.log(ele);
		})
	})

},false);