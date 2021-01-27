<template>
    <div class="app-header">
        <img src="@/assets/image/logo.png" alt="">
        <app-menu :navList="navList" />
    </div>
</template>

<script>
import AppMenu from '@/components/Main/AppMenu/AppMenu'
export default {
    components: {
        AppMenu
    },
    data(){
        return {
            navList: [
                {
                    name: '登录',
                    icon: 'iconfont icon-denglu',
                    path:'/login'
                },
                {
                    name: '注册账户',
                    icon: 'iconfont icon-zhuce',
                    path:'/register'
                },
                {
                    name: '关于',
                    icon: 'iconfont icon-guanyu',
                    path:'/about'
                },
            ]
        }
    }
}
</script>

<style lang='less' scoped>
.app-header{
    position: fixed;
    top: 0;
    width: calc(100vw - 80px);
    color: #1890ff;
    height: 75px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    overflow: hidden;
    img {
        height: 90px;
    }
}
</style>