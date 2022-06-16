//验证用户的用户名是否已经注册
//鼠标blur事件之后弹出，如果以注册，显示已经注册

$(function() {
    //1.输入框失去焦点事件 验证用户名是否已经注册
    $(".username").on("blur", function() {
            //先判断输入的用户名字不能为空
            let username = $(".username").val().trim(); //可以写成("this")
            if (username === "") {
                return "";
            }
            $.post({
                url: "https://autumnfish.cn/api/user/check",
                data: {
                    username: username
                }, //😍忘了：模板字符串的位置记好
                success: function(backData) {
                    console.log(backData);
                    $(".info").text(backData);
                }
            })
        })
        //2.点击按钮返回注册成功或失败
    $(".submit").on("click", function() {
        //😊忘了：点击按钮提交名字到后台，所以还要做判断
        let username = $(".username").val().trim();
        if (username === "") {
            return "";
        }
        //发起post请求，现在才开始注册用户名
        $.post({
            url: "https://autumnfish.cn/api/user/register",
            data: {
                username: username
            },
            success: function(backData) {
                console.log(backData);
                $(".info").text(backData);
            }
        })
    })
})