<template>
    <div class="app">
        <div class="title">Search Engine</div>

        <div class="input">
            <input type="text" placeholder="hello world" id="search-input">
            <button id="search-button" onclick="sendRequest()">Search</button>
        </div>
    </div>
</template>

<script>
</script>

<style lang="less" scoped>
body {
    background:
        linear-gradient(to right,
            rgb(113, 65, 168),
            rgb(44, 114, 251));
}

.app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 98%;
    /* height: 650px; */
    background: #fafafa;
    box-sizing: border-box;
    margin-top: 40px;
    margin-left: 1%;
    padding-top: 30px;
    border-radius: 5px;
    padding-bottom: 300px;
}

.title {
    color: rgb(80, 90, 200);
    /* background: red; */
    text-align: center;
    font-size: 70px;
    font-weight: 700;
    margin-top: 100px;
}

.input {
    display: flex;
    margin-top: 30px;
    margin-left: 150px;
    width: 50%;
}

input {
    border-radius: 25px 0 0 25px;
    width: 500px;
    height: 50px;
    padding-left: 10px;
}

button {
    background:
        linear-gradient(to right,
            rgb(113, 65, 168),
            rgb(44, 114, 251));
    color: aliceblue;
    border-radius: 0 25px 25px 0;
    cursor: pointer;
}
</style>