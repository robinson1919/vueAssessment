<template>
  <app-card
    v-bind="$attrs"
    class="v-card--material mt-0"
  >
    <v-card-title class="d-flex align-center pt-4">
      <v-row class="mx-0 my-0 d-flex align-center justify-space-between" no-gutters>
        
        <v-col 
          :cols="isMobile ? 12 : leftColumn"
          class="d-flex align-center justify-start position-relative py-0 pl-0"      
        >
        
          <v-sheet
            :color="color"        
            class="overflow-hidden position-relative v-card--material__sheet"
            elevation="6"
            max-width="100%"
            rounded
          >
          <!-- dark -->
            <v-theme-provider
              v-if="hasHeading"
              
            >
              <div
                v-if="icon"
                :class="iconSmall ? 'pa-5' : 'pa-8'"
                @click="reload"
              >
                <v-icon
                  :large="!iconSmall"
                  :icon="icon"
                />
              </div>

              <slot name="heading" />

              <div
                v-if="heading"
                class="text-h4 white--text pa-7 v-card--material__title"
              >
                {{ heading }}
              </div>
            </v-theme-provider>
          </v-sheet> 

          <div
            v-if="hasTitle"
            :class="fullHeader ? 'pl-2' : 'pl-4'"
            class="text-h4 d-flex v-card--material__title space"
          >
            <slot name="title" />

            <template v-if="title">
              <p class="text-h4">{{ title }} </p>
              
            </template>        

            <div class="text-subtitle-1 mb-n4">
              <slot name="subtitle" />

              <template v-if="subtitle">
                {{ subtitle }}
              </template>
            </div>        
          </div>      
        </v-col>

        <v-spacer v-if="spacer"></v-spacer>
        <v-col
          cols="12"
          sm="12"
          :md="fullSearchBar ? 12 : rightColumn"
          class="colSerch mt-2 mt-md-0 mt-lg-0 pt-0 mx-0 px-0"
        > 
          <v-row class="my-0 mx-0 py-0 px-0 d-flex align-end">    
            <v-text-field    
              v-if="showSearch"                       
              placeholder="Search"
              variant="underlined"
              v-model.trim="search"
              color="primary"
              clearable
              single-line
              hide-details
              @click:clear="sendSearch"
              v-on:keydown.enter="sendSearch"                          
            > 
              <template                
                v-slot:append
              >
                <v-btn       
                  class="mt-n5"      
                  icon="mdi-magnify"
                  elevation="4"       
                  @click="sendSearch"            
                >
                </v-btn>
              </template>
            </v-text-field>

            <v-btn  
              v-if="btnTitle"          
              class="ml-md-4 ml-lg-4 mt-md-0 mt-lg-0 mt-5"
              color="primary"
              dark
              :block="$vuetify.display.smAndDown"
              @click="btnAction()"
            >
              {{ btnTitle }}
            </v-btn>  
          </v-row>
        </v-col>
      </v-row>
    </v-card-title>

    <slot />

    <template v-if="$slots.actions">
      <v-divider class="mt-2 mx-4" />

      <v-card-actions class="px-4 text-caption grey--text">
        <slot name="actions" />
      </v-card-actions>
    </template>
  </app-card>
</template>

<script>
  import { debounce } from '@/utils/debounce';
  import AppCard from '@/components/UI/Card.vue'

  export default {
    name: 'MaterialCard',
    components: {
      AppCard
    },
    props: {
      color: String,
      fullHeader: Boolean,
      heading: String,
      icon: String,
      iconSmall: Boolean,
      subtitle: String,
      title: String,
      btnTitle: String,
      filterIcon: String,
      addFilter: Boolean,
      fullSearchBar: Boolean,
      showSearch: Boolean,
      spacer: {
        type: Boolean,
        default: true
      },
      leftColumn: {
        type: Number,
        default: 4
      },
      rightColumn: {
        type: Number,
        default: 5
      }
    },
    data: () => ({
      search: '',
      showCompanyFilter: false,
      showDateFilter: false,
      showMenu: false,
    }),
    computed: {
      hasHeading () {
        return !! (
          this.icon ||
          this.heading ||
          this.$slots.heading
        )
      },
      hasTitle () {
        return !! (
          this.title ||
          this.subtitle ||
          this.$slots.title ||
          this.$slots.subtitle
        )
      },
      isMobile() {
        return this.$vuetify.display.smAndDown
      },
    },
    methods: {
      showModal(){
        this.$emit('showModal', true)
      },      
      emitSearch(){    
        this.$emit('search', this.search)
      },
      reload(){
        this.$emit('reload')
      },
      sendSearch: debounce(function (value){        
        this.emitSearch(); 
      }, 500),
      btnAction(){
        if(this.btnTitle == 'New Campaign') {
          this.$router.push({ path: '/campaigns/new' });
        }
      }
    },
    watch: {      
      search: debounce(function (value){
        if(value.length == 0) {
          this.emitSearch(); 
          return
        }
        if(value == null || value == '' || value.length < 3) return
        this.emitSearch(); 
      }, 500),      
    }
  }
</script>

<style scoped>
.filter-menu {
  position: absolute;
  background-color: white!important;
  translate: -160px 120px;
  z-index: 50;
  
}

.filter-menu-company {
  position: absolute;
  background-color: white!important;
  translate: -252px 60px;
  z-index: 50;
}

.filter-menu-dates {
  position: absolute;
  background-color: white!important;
  translate: -261px 379px;
  z-index: 50;
}

.align-title {
  align-self: center;
}

  /* .v-card.v-card--material
    > .v-card__title
      > .v-card--material__title
        flex: 1 1 auto
        word-break: break-word

  .v-card.v-card--material
    > .v-card__title
     padding-bottom: 0
  
  .v-text-field--placeholder
    padding-top: 0
    padding-right: 10px

  .theme--light.v-input input, 
  .theme--light.v-input textarea
    font-weight: 400 */

  
</style>~/app/utils/debounce