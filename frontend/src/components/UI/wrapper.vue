<template>
  <app-card
    v-bind="$attrs"
    class="v-card--material mt-0"
  >
    <v-card-title class="d-flex align-center pt-4">
      <v-row class="mx-0 my-0 d-flex align-center justify-space-between" no-gutters>
        
        <!-- v-if="hasTitle || hasHeading || btnTitle || addFilter || $slots.title || $slots.subtitle || $slots.heading" -->
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

        <!-- <v-col 
          :cols="isMobile ? 6 : 1"
          class="align-title"
        >
          
        </v-col> -->

        <v-spacer v-if="spacer"></v-spacer>
        <v-col
          cols="12"
          sm="12"
          :md="fullSearchBar ? 12 : rightColumn"
          class="colSerch mt-2 mt-md-0 mt-lg-0 pt-0 mx-0 px-0"
        > 
          <v-row class="my-0 mx-0 py-0 px-0 d-flex align-end">
          
            <v-btn   
              v-if="addFilter"       
              fab
              small
              elevation="2"
              height="44"
              width="44"
              color="primary" 
              class="mr-5" 
              @click.stop="showMenuFn()"
            >
              <v-icon>mdi-filter</v-icon>
            </v-btn>

            <v-col 
              v-if="showMenu"
              sm="2"
              md="2"
              lg="2"
              cols="6"
              class="filter-menu elevation-1 rounded-lg"
            >
              <v-list>
                <v-list-item v-for="(item, index) in listFilter" :key="index" class="list-item" @click.stop="showFilters(item)">
                  <p>
                    {{item.name}}
                  </p>
                </v-list-item>
              </v-list>
                
            </v-col> 

            <v-col 
              v-if="showCompanyFilter"
              sm="2"
              md="2"
              lg="3"
              cols="9"
              class="filter-menu-company elevation-3 rounded-lg "
            >
              <v-autocomplete            
                item-title="company_name"
                item-value="company_id"
                name="company"
                label="Select a company"  
                :items="companies"
                v-model="companiesValues"
                auto-select-first
                clearable
                deletable-chips
                multiple
                small-chips
                return-object
              ></v-autocomplete>
            </v-col>

            <v-col 
              v-if="showDateFilter"
              sm="3"
              md="3"
              lg="3"
              cols="10"
              class="filter-menu-dates elevation-1 rounded-lg"
            >                   
              <!-- <VueDatePicker 
                ref="datePicker"                
                color="secondary"
                v-model="picker"
                :model-value="picker"           
                :range="{ minRange: 2 }"
                :preset-dates="presetDates"
                :clearable="false" 
                :timezone="{ 
                  timezone: 'America/Santo_Domingo',
                  exactMatch: true,
                  convertModel: true, 
                  dateInTz: 'America/Santo_Domingo',
                }"
                inline       
              >                
                <template #action-buttons>
                  <v-btn color="secondary" size="x-small" dark @click="showDateFilter = false">Close</v-btn>
                  <v-btn class="ml-2" color="primary" size="x-small" dark @click="sendDates">Select</v-btn>
                </template>
              </VueDatePicker> -->
            
            </v-col>
            
            <v-text-field                           
              placeholder="Search"
              variant="underlined"
              v-model.trim="search"
              color="primary"
              clearable
              single-line
              hide-details
              v-on:keydown.enter="sendSearch"                          
            > 
            <!-- v-if="$vuetify.display.mdAndUp" -->
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
              @click="showModal"
            >
              {{ btnTitle }}
            </v-btn>  
          </v-row>
        </v-col>

        <!-- <v-col
          v-if="btnTitle"
          cols="12"
          sm="12"
          md="2"
          class="colSearch my-0 py-0 mx-0 px-0 d-flex justify-center"
        > 
          <v-btn            
            class="ml-md-4 ml-lg-4"
            color="primary"
            dark
            :block="$vuetify.display.smAndDown"
            @click="showModal"
          >
            {{ btnTitle }}
          </v-btn>   
        </v-col> -->
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
  // import { endOfMonth, endOfYear, startOfMonth, startOfYear, subMonths } from 'date-fns';
  import {useAuthStore} from '@/stores/auth'
  import { mapState } from "pinia";
  import { debounce } from '@/utils/debounce';
  import { defineAsyncComponent } from 'vue'
  const AppCard = defineAsyncComponent(() => import('@/components/app/Card'))
  import _ from 'lodash';

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
      companiesValues: [],
      picker: [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date()
      ],
      // presetDates: [
      //   { label: 'Today', value: [new Date(), new Date()] },
      //   {
      //     label: 'Today',
      //     value: [new Date(), new Date()],
      //     slot: 'preset-date-range-button'
      //   },
      //   { label: 'This month', value: [startOfMonth(new Date()), endOfMonth(new Date())] },
      //   {
      //     label: 'Last month',
      //     value: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
      //   },
      //   { label: 'This year', value: [startOfYear(new Date()), endOfYear(new Date())] },
      //   { label: 'A year back', value: [new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date()] },
      // ]
    }),
    computed: {      
      ...mapState(useAuthStore, {
        role: state => state.user?.role,
        AssistatIds: state => state.user.company_id
      }),
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
      isAdmin(){        
        if(((this.role == 'Admin') || (this.role == 'super_user'))) return true
        return false
      },
      listFilter(){
        const list = [
          {
            name: 'Companies',
            action: 'showCompanyFilter'
          },
          {
            name: 'Date range',
            action: 'showDateFilter'
          }
        ]
        if(this.isAdmin) return list
        return [list[1]]
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
      sendSearch: debounce(function (){
        this.emitSearch(); 
      }, 500),
      showFilters({action}){
        if(action == 'showCompanyFilter') {
          this.showCompanyFilter = true
        }

        if(action == 'showDateFilter') {
          this.showDateFilter = true
        }

        this.showMenu = false
      },
      showMenuFn(){
        if(this.showDateFilter === true){
          this.showDateFilter = false
          return
        }

        if(this.showCompanyFilter === true){
          this.showCompanyFilter = false
          return
        }
        this.showMenu = !this.showMenu
      },
      sendDates(){
        this.$refs.datePicker.selectDate()
        this.$emit('date', this.picker)
        this.showDateFilter = false
      },
    },
    watch: {
      search: debounce(function (){
        this.emitSearch(); 
      }, 500),
      companies(){
        this.companiesValues = this.companies;
      },
      companiesValues(){
        const companiesID = this.companiesValues.map(val => val.company_id)
        this.$emit('companiesID', companiesID)
      },
      
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