<template>
  <div>机票列表</div>
</template>

<script>
export default {
  created() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res.data);
    });
  }
};
</script>

<style>
</style>