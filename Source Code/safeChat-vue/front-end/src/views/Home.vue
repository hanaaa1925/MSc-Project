<template>
    <div>
        <SearchBar></SearchBar>
        <PostForm></PostForm>
        <BodyWrapper></BodyWrapper>
        <SlideShow></SlideShow>
        <DailyUpdate></DailyUpdate>
    </div>
</template>

<script>
    import SearchBar from '@/components/SearchBar'
    import PostForm from '@/components/PostForm'
    import BodyWrapper from '@/components/BodyWrapper'
    import SlideShow from '@/components/SlideShow'
    import DailyUpdate from '@/components/DailyUpdate'

    export default {
        name: 'Home',
        components: {
            SearchBar,
            PostForm,
            BodyWrapper,
            SlideShow,
            DailyUpdate,
        },
    }
</script>

<style>
    @import '../assets/css/post-form.css';
    @import '../assets/css/body-wrapper.css';
    @import '../assets/css/global.css';
    @import '../assets/css/slide-show.css';
    @import "../assets/css/daily-update.css";
</style>
