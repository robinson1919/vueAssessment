<template>
  <div class="campaign-list">
    <div class="container">
      <!-- <div class="page-header">
        <h2>Campaigns</h2>
        <v-btn
          fab
          
          color="primary"
          variant="flat"
          prepend-icon="mdi-plus"
          @click="$router.push({ path: '/campaigns/new' })"
        >
          New Campaign
        </v-btn>
      </div> -->
      
      <!-- TODO: Implement search and filters -->
      <!-- TODO: Implement campaign list display -->
      <!-- TODO: Implement pagination -->
      <!-- TODO: Add loading and error states -->
      <Wrapper
        :icon="icon"
        icon-small
        elevation="2"
        :title="title"
        color="primary"
        :btnTitle="btnTitle"
        :showSearch="true"
        @search="searchReceived" 
      >      
        <v-data-table-server
          :headers="campaignHeader"
          :items="campaigns"
          :search="search"
          :options="params"
          @update:options="sendParams"
          @click:row="editItem"
          :items-per-page="params.itemsPerPage"
          :items-length="params.totalItems || 0"
          class="elevation-3 cursor"
        >
          <template v-slot:no-data>
            <v-btn color="primary" @click="loadCampaigns">Load Campaigns</v-btn>
          </template>
        </v-data-table-server>
        
      </Wrapper>
     
    </div>
  </div>
</template>

<script>
// TODO: Implement component logic
import {useAppStore} from '@/stores/app'
import { mapActions } from "pinia";

import Wrapper from '../components/UI/wrapper.vue';

export default {
  name: 'CampaignList',
  components: {
    Wrapper,
  },
  data: () => ({
    btnTitle: 'New Campaign',
    title: 'Campaigns',
    icon: 'mdi-bullhorn',
    dialog: false,
    editedIndex: -1,
    campaigns: [],
    search: '',
    editedItem: {
    },
    params: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['name'],
      totalItems: 0,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Campaign" : "Edit Campaign";
    },
    campaignHeader() {
      const headers = [
        { title: 'Name', sortable: true, value: 'name', width: 200 },
        { title: 'Status', sortable: true, value: 'status', width: 200 },
        { title: 'Start Date', sortable: true, value: 'startDate', width: 200 },
        { title: 'End Date', sortable: true, value: 'endDate', width: 200 },
        { title: 'Budget', sortable: true, value: 'budget', width: 200 },
      ];
      return headers;
    },    
  },
  mounted() {
  },
  methods: {
    ...mapActions(useAppStore, ['setCampaign']),
    async loadCampaigns(params) {
      try {
        const { data, pagination } = await this.$axios.get('/campaigns', { params });
        this.campaigns = data;
        
        this.params.totalItems = pagination.total;
      } catch (err) {
        console.log(err)  
      }
    },
    sendParams(params){
      this.params = params;
      if(params.sortBy.length > 0) {
          const {key, order} = params.sortBy[0]
          params.sortBy = key
          params.orderBy = order
      }  
      this.loadCampaigns(params);
    },
    editItem(click, {item}) {   
      this.setCampaign(item);
      this.$router.push({ path: `/campaigns/${item.id}` });
    },  
    searchReceived(value){
      this.params.search = value;
      this.loadCampaigns(this.params)
    },
  }
}
</script>

<style scoped>


.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h2 {
  margin: 0;
  font-size: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-primary {
  background: #0066cc;
  color: white;
}

.btn-primary:hover {
  background: #0052a3;
}

.placeholder-text {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>
