<template>
  <div class="search-bar">
      <form action="">
          <input type="search" class="search-input" placeholder="搜索万象…" autofocus>
      </form>
      <button class="btn-search">
          <span class="btn-hexagon-search"><i class="fa fa-search"></i></span>
      </button>
      <button class="search-close">
          <span></span>
          <span></span>
      </button>
  </div>
</template>

<script>
export default {

  name: 'SearchBar',

  mounted() {
      // 点击搜索
            $(".btn-search").click(function () {
                $(".btn-login").hide();
                let searchInput = $(".search-input");
                if (searchInput.is(":hidden")) {
                    $(searchInput).show();
                    $(".btn-search").css("right", "55px");
                    $(".search-close").fadeIn(300);
                } else {
                    //search
                }
            });
            $(".search-close").click(function () {
                $(".search-input").hide();
                $(".search-close").hide();
                if ($(window).width() <= 640) {
                    $(".btn-search").css("right", "15px");
                } else {
                    $(".btn-search").css("right", "0");
                }
                $(".btn-login").delay(200).fadeIn(300);
            });
        }
}
</script>

<style>

</style>