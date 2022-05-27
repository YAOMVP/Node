//1.😊获取评论列表的数据
function getCommentList() {
    $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/cmtlist',
        data: {}, //因为没有携带数据,没有参数格式
        success: function(res) {
            if (res.status !== 200) {
                return alert('获取评论列表失败')
            } else {

                //2.获取评论列表
                //先定义一个空数组
                var rows = []
                    //循环里边的data数据,每循环一次都会执行函数,得到索引i和数据item
                $.each(res.data, function(i, item) {
                        //每循环一次都会创建一个li字符串
                        var str = '<li class="list-group-item"><span class="badge" style="background-color: #F0AD4E;">评论时间：' + item.time + '</span><span class="badge" style="background-color: #5BC0DE;">评论人：' + item.username + '</span>' + item.content + '</li>'
                            //每生成一个都要将str push到rows里边去
                        rows.push(str)
                    })
                    //整个循环走完 所有的行都push到rows里边了 就把完整的rows append到ul的里边
                    //empty先清空里边的数据 join()用空字符串进行拼接
                $('#cmt-list').empty().append(rows.join(''))
            }
        }
    })
}
getCommentList()

//监听了form的submit事件
$(function() {
    $('#formAddCmt').submit(function(e) {
        e.preventDefault() //阻止表单的默认提交行为
        var data = $(this).serialize() //快速获得表单中的数据 一会儿发送到服务器

        //发起Ajax请求 添加服务数据
        //文档写的是用post方法  
        //第一个参数是url地址 必须写  第二个参数是刚才获取表单中的的data 第三个参数是回调函数
        $.post('http: //www.liulongbin.top:3006/api/addcmt', data, function(res) {
            if (res !== 201) {
                return alert('发表评论失败')
            }
            //成功的话重新刷新 也就是调用一下函数
            getCommentList()
                //清空表单的内容  [0]是DOM语法 使用[0]里的reset()即可
            $('#formAddCmt')[0].reset()
        })
    })

})