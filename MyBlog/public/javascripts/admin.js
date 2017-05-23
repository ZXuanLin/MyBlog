window.addEventListener('load',function(){
	var oLeftNav = document.getElementById('leftNav');
	var oTopNav = document.getElementById('topNav');
	var oContentItem = document.getElementById('contentItem');
	// oLeftNav.style.height = document.documentElement.clientHeight - oTopNav.offsetHeight + 'px';
})

$(function(){
	var url = window.location.href;
    var tmp = url.split('/').pop().split('.')[0];
    console.log(tmp)
    if(tmp === 'category'){
    	$('#leftContent li[data-item="four"]').addClass('layui-nav-itemed')
    }
	//layui-nav-itemed
	$(document).on('click','#leftContent li[data-item="four"]',function(){
		//$('#leftContent li[data-item="four"]').addClass('layui-nav-itemed')
	})
})
