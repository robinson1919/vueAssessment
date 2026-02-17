<template>
  <div class="d-flex justify-center align-center container-custom" grid-list-xs>    
  
    <div class="page-loader flex-column" v-if="loaderType === 'spinner-message'">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
      <span class="text-muted fs-6 fw-bold mt-5">Loading...</span>
    </div>  
  </div>
</template>
  
<script>
  
  export default {
    name: "Loader",
    props: {
      loaderType: String
    },
    data: () => ({
    }),
    computed: {
    }
  };
</script>
  
<style lang="scss">
  .container-custom {
    position: fixed;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.534);
  }

 
</style>