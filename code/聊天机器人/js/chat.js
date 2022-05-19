$(function() {
    // 初始化右侧滚动条  定位到最底部
    // 这个方法定义在scroll.js中
    resetui()

    // 😊为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function() {
        //先拿到用户输入的内容
        var text = $('#ipt').val().trim()
            //对用户输入的内容进行判断
        if (text.length <= 0) {
            //return并且清空文本框的值
            return $('#ipt').val('')
        }
        //对用户输入的内容追加到li进行显示
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
        $('#ipt').val('')
        resetui()

        //发起请求 再调用这个
        getMsg(yh)
    })


    // 😊获取聊天机器人发送回来的消息

    //用户先发送请求 通过$.ajax({})
    function getMsg(yh) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function(res) {
                // console.log(res);
                if (res.message === 'success') {
                    //要拿到服务器响应回来的消息
                    var msg = res.data.info.text //这个text就是底下的text
                        //渲染到机器人页面中
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /><span>' + msg + '</span></li>')
                        //重置滚动条
                    resetui()
                    getVoice(msg)
                }
            }
        })

    }


    // 😊把文字转化为语音进行播放
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function(res) {
                // console.log(res);
                if (res.status === 200) {
                    //语音赋值audio来播放  自定义属性attr('设置的属性'，’属性的值)
                    //为audio设置src属性  把res.voiceUrl赋值给src属性
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }


    // 😊为文本框绑定 keyup 事件
    $('#ipt').on('keyup', function(e) {
        if (e.key === 'Enter') {
            //触发按钮的自动处理
            $('#btnSend').click()
        }
    })




})