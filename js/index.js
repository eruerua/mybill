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
	            if (bill !== {}) {
	                bill = {};
	            }
	            day = $(".s_date").val();
	            $(".s_sub").click(function() {
	                var item = $(".s_item").val();
	                var price = $(".s_price").val();
	                if (item && price) {
	                    bill[item] = price;
	                    ref.child(day).update(bill);
	                    $(".s_item").val('');
	                    $(".s_price").val('');
	                }
	            });
	            //监听云端数据变更，云端数据变化，弹幕框里数据也跟着变化。
	            ref.child(day).on('value', function(snapshot) {
	                total = 0;
	                $('.bill_show').empty();
	                $(".total").empty();
	                var items = snapshot.val();
	                for (var item in items) {
	                    var name = item;
	                    var price = items[item];
	                    var list = name + " " + price + "元";
	                    var textObj = $('<div class="bill_message"' + 'id = ' + name + '>');
	                    textObj.text(list);
	                    console.log(textObj);
	                    $(".bill_show").append(textObj);
	                    total += Number(price);
	                }
	                $(".bill_message").dblclick(function() {
	                    var name = $(this).attr("id");
	                    cref.child(day).child(name).remove();
	                });

	                $(".total").text("");
	                $(".total").text("总计 " + total + "元");
	            });
	        }
	    });
	    $(".s_del").click(function() {
	        arr = [];
	        $('.bill_show').empty();
	        $(".total").empty();
	        ref.child(day).remove();
	    });
	});
