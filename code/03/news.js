// $(function() {
//     //1.😊发起ajax请求，获得数据
//     $.ajax({
//         type: "get",
//         url: "http://www.liulongbin.top:3006/api/news",
//         success: function(backData) {
//             console.log(backData);
//             if (backData.status === 200) {
//                 let dataArr = backData.data;
//                 console.log(dataArr);
//                 //2.😊其中tags是连在一起的字符串格式，连在一起了！！！如何变成分开的标签形式呢？？？ 后台不是分开的字符串，需要转成数组，就是单独的字符串了
//                 //3.😊,分隔方法split() ->分割字符串变成数组
//                 $.each(dataArr, function(index, value) {
//                     //😊拆成了数组，要存回tags😊😊😊😊😊把自己改掉，再赋值自己
//                     value.tags = value.tags.split(",");
//                     console.log(dataArr);

//                     let htmlStr = template("tpl-news", dataArr);
//                     $("#news-list").html(htmlStr);

//                 })
//             }
//         }
//     })
// })