	$(document).ready(function() {
    //提示：已经在页面导航部分的Settings中的JavaScript部分引入了wildog.js和jquery.js
	  //在www.wildog.com 注册一个账号，创建一个应用，自动生成一个url,替换下边url即可
	  var ref = new Wilddog("https://********.wilddogio.com");
	  var arr = [];
	  var total = 0;
	  var bill = {};
	  var day = "";

	  $(".s_date").keypress(function(event) {
	    if (event.keyCode == "13") {
	      day=$(".s_date").val();
	      $(".s_sub").click(function() {
	  	    var item = $(".s_item").val();
	  	    var price = $(".s_price").val();
	  	    bill[item] = price;
	  	    console.log(bill);

	  	    ref.child(day).update(bill);
	  	    $(".s_item").val('');
	  	    $(".s_price").val('');
	  	  });
	  	  //响应按键清除事件
	  	  $(".s_del").click(function() {
	  	    arr = [];
	  	    $('.dm_show').empty();
	  	    $(".total").empty();
	  	    ref.remove();
	  	  });
	  	  //监听云端数据变更，云端数据变化，弹幕框里数据也跟着变化。
	  	  ref.child(day).on('value', function(snapshot) {
	  	  	total = 0;
	  	  	$('.dm_show').empty();
	  	  	$(".total").empty();
	  	    var items = snapshot.val();
	  	    console.log(items);
	  	    for(var item in items) {
	  	    	var name = item;
	  	    	var price = items[item];
	  	    	var list = name + " " + price +"元";
	  	    	var textObj = $("<div class=\"dm_message\"></div>");
	  	    	textObj.text(list);
	  	    	$(".dm_show").append(textObj);
	  	    	total += Number(price);
	  	    }
	  	    $(".total").text("");
	  		$(".total").text("总计 " + total + "元");
	  	  });
	    }
	  });
	  //把数据提交到野狗云
	  
	  //按照时间规则显示弹幕内容。	
	});