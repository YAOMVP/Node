$(function() { //😔入口函数忘写了$
    $(".hero").on("keyup", function(e) {
        if (e.key === "Enter") { //😊拿到用户输入的英雄名
            let heroName = $(this).val().trim(); //😊忘了加上$
            if (heroName === "") {
                return "";
            }
            $.ajax({
                type: "get",
                url: "https://autumnfish.cn/api/hero/info",
                data: {
                    name: heroName
                },
                success: function(backData) {
                    console.log(backData);
                    //😊将返回的数据渲染到指定位置
                    $('.showname, .name').html(heroName);
                    $(".title").html(backData.title);
                    $(".story").html(backData.story);
                    $(".right").css("backgroundImage", `url(${backData.bg})`) //😊背景图片要注意 😊迷瞪：写地址的话是css属性，backgroundImage，`url(${})`
                }
            })
        }
    })
})