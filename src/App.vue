<template>
    <div id="app">
        <!-- 渲染router中指向的页面 -->
        <!-- 占位符，表示组件从这里开始显示 -->
        <router-view />
    </div>
</template>

<script>
// html 中可以拿到这个变量
export default {
    name: 'App'
}
</script>
