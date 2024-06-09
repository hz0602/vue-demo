<template>
    <div class="dashboard-container">
        <div class="dashboard-text">administrator</div>
        <button @click="logout">注销</button>

        <a href="http://localhost:9528/#/common/test">跳转</a>
    </div>
</template>

<script>
export default {
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
        display: flex;
    }

    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
