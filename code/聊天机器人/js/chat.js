// $(function() {
//     // 初始化右侧滚动条  定位到最底部
//     // 这个方法定义在scroll.js中
//     resetui()

//     // 😊为发送按钮绑定鼠标点击事件
//     $('#btnSend').on('click', function() {
//         //先拿到用户输入的内容
//         var text = $('#ipt').val().trim()
//             //对用户输入的内容进行判断
//         if (text.length <= 0) {
//             //return并且清空文本框的值
//             return $('#ipt').val('')
//         }
//         //对用户输入的内容追加到li进行显示
//         $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
//         $('#ipt').val('')
//         resetui()

//         //发起请求 再调用这个
//         getMsg(yh)
//     })


//     // 😊获取聊天机器人发送回来的消息

//     //用户先发送请求 通过$.ajax({})
//     function getMsg(yh) {
//         $.ajax({
//             method: 'GET',
//             url: 'http://www.liulongbin.top:3006/api/robot',
//             data: {
//                 spoken: text
//             },
//             success: function(res) {
//                 // console.log(res);
//                 if (res.message === 'success') {
//                     //要拿到服务器响应回来的消息
//                     var msg = res.data.info.text //这个text就是底下的text
//                         //渲染到机器人页面中
//                     $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /><span>' + msg + '</span></li>')
//                         //重置滚动条
//                     resetui()
//                     getVoice(msg)
//                 }
//             }
//         })

//     }


//     // 😊把文字转化为语音进行播放
//     function getVoice(text) {
//         $.ajax({
//             method: 'GET',
//             url: 'http://www.liulongbin.top:3006/api/synthesize',
//             data: {
//                 text: text
//             },
//             success: function(res) {
//                 // console.log(res);
//                 if (res.status === 200) {
//                     //语音赋值audio来播放  自定义属性attr('设置的属性'，’属性的值)
//                     //为audio设置src属性  把res.voiceUrl赋值给src属性
//                     $('#voice').attr('src', res.voiceUrl)
//                 }
//             }
//         })
//     }


//     // 😊为文本框绑定 keyup 事件
//     $('#ipt').on('keyup', function(e) {
//         if (e.key === 'Enter') {
//             //触发按钮的自动处理
//             $('#btnSend').click()
//         }
//     })
// })

//1.1😊在文本框输入内容，鼠标点击可发送出去
$(function() {
    $(".input_sub").on("click", function() { //点击发送按钮
            let inputText = $(".input_txt").val().trim();
            if (inputText === "") {
                return "";
            }

            //1.2将inpText发送到页面中间右边的部分
            $(".talk_list").append(`
            <li class="right_word">
                <img src="img/person02.png" /> 
                <span>${inputText}</span>
            </li> 
        `)
            resetui(); //1.3😊这样就启动了鼠标滚轮的效果了
            //1.4😊输入完成后把文本框里的值清空
            $(".input_txt").val("");

            //😊😊😊😊😊之前不会：调用函数：getMessage()
            //底下获取机器人信息和第一个点击按钮函数没关系了，而且是不同的作用域，所以我拿不到inputText，所以采用调用函数传递参数的方式。😊思路分析：拿到用户消息之后，会在页面的中右部分显示出来，然后调用函数，调用函数的时候把inputText的值给调用函数的实参，然后下一个作用域的形参也就接收到了，然后在底下的函数里边就可以拿到这个inputText了。
            getMessage(inputText);
        })
        // 2.1获得机器人的回复 可单独在封装一个函数
    function getMessage(msg) {
        $.ajax({
            type: "get",
            url: "http://www.liulongbin.top:3006/api/robot",
            data: {
                spoken: msg
            },
            success: function(backData) {
                //😊忘了，最好做一个判断
                if (backData.message === "success") { //😊注意if的大括号范围
                    let robotText = backData.data.info.text;
                    console.log(robotText);
                    $(".talk_list").append(`
                        <li class="left_word">
                            <img src="img/person01.png" /> <span>${robotText}</span>
                        </li>
                    `)
                    getVoice(robotText); //😊在这里调用才可以使用实参  //将文字转语音
                }
            }
        })
    }

    //3.1将机器人的回复转成语音输出
    function getVoice(voice) { //😊形参
        $.ajax({
            type: "get",
            url: "http://www.liulongbin.top:3006/api/synthesize",
            data: {
                text: voice
            },
            success: function(backData) {
                console.log(backData);
                if (backData.status === 200) {
                    $("audio").attr("src", backData.voiceUrl); //这是自定义属性，html里src没有写，所以我们在这里的src位置上加了voiceUrl
                    //因为html里audio有个属性是自动播放.原生js将audio的播放速度放快
                    document.querySelector("audio").playbackRate = 2;
                }
            }
        })
    }

    // 1.5😊忘了：和点击事件没关系 写在外边。为文本框绑定回车发送
    $(".input_txt").on("keyup", function(e) {
        if (e.key === "Enter") {
            $(".input_sub").click();
            console.log(e);
        }
    })
})