<template>
  <div>
    <span></span>
  </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style lang="scss" scoped>
@keyframes rotate {
    100%{
        transform: rotate(360deg);
    }
}

div{
    background-color: white;
    position: fixed;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    span{
        height: 80px;
        width: 80px;
        border-radius: 50%;
        border: 1px solid;
        border-color: black white black white;
        animation: rotate infinite linear 1s;
    }
}
</style>