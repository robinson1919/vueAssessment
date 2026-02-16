<template>
  <v-app-bar 
    id="app-bar"
    elevation="2"
    rounded    
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon>        
      </v-app-bar-nav-icon>
    </template>
    <v-col cols="11" class="py-0 px-0">
      
      <v-row class="align-center">    

        <!--  -->
        <v-col 
          :cols="!breakPoint ? '6' : '8'" 
          :class="!breakPoint ? 'pb-1' : 'pr-0' "
          class="d-flex"
        >
          
          <v-spacer v-if="!breakPoint" />
        </v-col>
        <v-col cols="3" v-if="!breakPoint" class="pb-1">
          
          
        </v-col>
        <v-col :cols="!breakPoint ? '1' : '1'" class="d-flex" :class="!breakPoint ? 'justify-end pb-1': 'justify-center pb-1' ">
        
        </v-col>
        <v-col :cols="!breakPoint ? '2' : '2'" class="d-flex justify-end" :class="!breakPoint ? '': 'ml-1' ">
         
        </v-col>
        
      </v-row>
    </v-col>
    
  </v-app-bar>  
</template>

<script>

export default {
  name: 'DefaultBar',
  components: {
    Account,
    Notifications
  },
  data: () => ({    
  }),

  computed: {  
    breakPoint(){
      return !this.$vuetify.display.mdAndUp
    },
  },
  methods: {
  },
}
</script>


<style scoped>
#app-bar {
  position: relative!important; /* Ensure it is positioned correctly */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure it is above other content */
}
/* create a media query for 960px > < 1280px */
/* @media (min-width: 960px) and (max-width: 1279px) {
  :deep(.v-toolbar__prepend) {
    margin-right: 10px;
  }
} */

@media (width > 960px) {
  :deep(.v-toolbar__prepend) {
    margin-right: 10px;
  }
}

/* make the same query for  960px > < 1280px but the newest way of making the media query */

</style>