	$(document).ready(function() {
	    //提示：已经在页面导航部分的Settings中的JavaScript部分引入了wildog.js和jquery.js
	    //在www.wildog.com 注册一个账号，创建一个应用，自动生成一个url,替换下边url即可
	    var config = {
	        authDomain: "danmu-hh.wilddog.com/",
	        syncURL: "https://danmu-hh.wilddogio.com/"
	    };
	    wilddog.initializeApp(config);
	    var arr = [];
	    var total = 0;
	    var bill = {};
	    var day = "";
	    var uid = "";
	    var ref;
	    var flag = false;


	    $(".register").click(function() {
	        register();
	    });

	    $(".login").click(function() {
	        login();
	    });
	    //替换成自己的邮箱和密码 完成首次注册后 就可以登录了 
	    function register() {
	        wilddog.auth().createUserWithEmailAndPassword("**********@qq.com", "*******").then(function(user) {
	            // 获取用户
	            console.log(user);
	        }).catch(function(error) {
	            // 错误处理
	            console.log(error);
	        });
	    }

	    function login() {
	        wilddog.auth().signInWithEmailAndPassword("**********@qq.com", "*******").then(function(res) {
	            console.log(res);
	            uid = wilddog.auth().currentUser.uid;
	            ref = wilddog.sync().ref("users/" + uid);
	            flag = true;


	            

	        }).catch(function(error) {
	            // 错误处理
	            console.log(error);
	        });
	    }


	    $(".s_date").keypress(function(event) {
	        if (event.keyCode == "13") {
	            console.log(uid);
	            day = $(".s_date").val();

	            
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
	                    $(".bill_show").append(textObj);
	                    total += Number(price);
	                }
	                $(".bill_message").click(function() {
	                    var name = $(this).attr("id");
	                    console.log("delete" + name);
	                    ref.child(day).child(name).remove();
	                });
	                $(".total").text("");
	                $(".total").text("总计 " + total + "元");
	            });
	        }


	    });

	    $(".s_sub").click(function() {
	    	if (bill !== {}) {
	    	    bill = {};
	    	}
	        var item = $(".s_item").val();
	        var price = $(".s_price").val();
	        if (item && price) {
	            bill[item] = price;
	            ref.child(day).update(bill);
	            $(".s_item").val('');
	            $(".s_price").val('');

	        }

	    });
	    

	    $(".s_del").click(function() {
	        arr = [];
	        $('.bill_show').empty();
	        $(".total").empty();
	        ref.child(day).remove();
	    });



	});
