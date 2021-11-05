<template>
    <section class="sec-wrapper">   
      <section class="main-section">  
        <div class="div-wrapper clearfix">
            <div class="cont-left">
                <div class="cont-item"></div>
                <div class="cont-item"></div>
                <div class="cont-item"></div>
                <div class="cont-item"></div>
                <div class="cont-item"></div>
                <div class="cont-item"></div>
                <div class="cont-item"></div>
                <div class="cont-item"></div>
            </div>
            <div class="list-right">
                <div class="box-fixed">新闻列表</div>
            </div>
        </div>
      </section>
      <div class="foot">页面底部</div>
    </section>
  
</template>


<script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
<script type="text/javascript">
    $(function(){
          var fheight = $('.foot').height() + 30; // 获取底部及底部上方边距的总高度
          var boxfixed = $('.box-fixed');  // 获取固定容器的jquery对象
          $(window).scroll(function() {
              var scrollTop = $(window).scrollTop();  // 获取滚动条滚动的高度
              var contLeftTop = $('.cont-left').offset().top+20; // 右侧列表相对于文档的高度
              var scrollBottom = $(document).height() - $(window).scrollTop() - boxfixed.height();
              if (scrollTop >= contLeftTop) {
                if (scrollBottom > fheight) {  // 滚动条距离底部的距离大于fheight,添加tab_fix类,否则添加tab_fix_bottom类
                  boxfixed.removeClass("tab_fix_bottom").addClass('tab_fix');
                } else {
                  boxfixed.removeClass('tab_fix').addClass("tab_fix_bottom");
                }
              } else if (scrollTop < contLeftTop) {
                boxfixed.removeClass('tab_fix').removeClass("tab_fix_bottom");
              }
          });
    });

    export default {
      name: 'BodyWrapper',

      methods: {
        
      }
    }
    
</script>
