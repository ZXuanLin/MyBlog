window.addEventListener('load', function(){

	layui.use('element',function(){
		var element = layui.element();
		//选项卡点击
		element.on('nav(indexNav)',function(ele){
			var ele = $(this);
			var targetClick = ele.attr('data-item');
			switch(targetClick){
				case 'one':
					$('#contentItem .contentItem-item').hide();
					$('#contentItem .contentItem-item').eq(0).show();
				break;
				case 'two':
					$('#contentItem .contentItem-item').hide();
					$('#contentItem .contentItem-item').eq(1).show();
				break;
				case 'three':
					$('#contentItem .contentItem-item').hide();
					$('#contentItem .contentItem-item').eq(2).show();
				break;
				case 'four':
					$('#contentItem .contentItem-item').hide();
					$('#contentItem .contentItem-item').eq(3).show();
				break;
				case 'five':
					$('#contentItem .contentItem-item').hide();
					$('#contentItem .contentItem-item').eq(4).show();
				break;
				case 'six':
					$('#contentItem .contentItem-item').hide();
					$('#contentItem .contentItem-item').eq(5).show();
				break;
			}
		})
	})

},false);