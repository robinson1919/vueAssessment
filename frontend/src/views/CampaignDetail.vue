<template>
  <div class="campaign-detail">
    <div class="container">
      <!-- TODO: Implement campaign detail view -->
      <!-- TODO: Display campaign information -->
      <!-- TODO: Show metrics and history -->
      <!-- TODO: Add back button -->
      <!-- TODO: Handle loading and error states -->

      <Wrapper
        :icon="icon"
        icon-small
        elevation="2"
        :title="title"
        color="primary" 
        :showSearch="false"        
      >   
        <v-card elevation="3" class="mt-3">
          <v-card-title class="headline d-flex justify-end align-center">      
            
            <p class="text-body-1">
              <v-select
                label="Status"
                variant="underlined"
                @update:modelValue="updatedStatus"
                :items="statusOptions"
                v-model="editedItem.status"
              ></v-select>
            </p>
          </v-card-title>

          <v-card-text v-if="editedItem.id">
            <v-row dense>
              <v-col cols="6" md="6" lg="6" sm="6">
                <label class="text-body-1 font-weight-medium">Companign name:</label> 
                <div>{{ editedItem.name || 'N/A' }}</div>              
              </v-col>

              <v-col cols="6" md="6" lg="6" sm="6"> 
                <label class="text-body-1 font-weight-medium">Budget:</label> 
                <div>{{ editedItem.budget || 'N/A' }} </div>
              </v-col>

              <v-col cols="6" md="6" lg="6" sm="6"> 
                <label class="text-body-1 font-weight-medium">Spent:</label> 
                <div>{{ editedItem.spent || 'N/A' }}</div>
              </v-col>

              <v-col cols="6" md="6" lg="6" sm="6"> 
                <label class="text-body-1 font-weight-medium">Target Audience:</label> 
                <div>{{ editedItem.targetAudience || 'N/A' }}</div>
              </v-col>

              <v-col cols="6" md="6" lg="6" sm="6"> 
                <label class="text-body-1 font-weight-medium">Start Date:</label> 
                <div>{{ editedItem.startDate || 'N/A' }}</div>
              </v-col>

              <v-col cols="6" md="6" lg="6" sm="6"> 
                <label class="text-body-1 font-weight-medium">End Date:</label> 
                <div>{{ editedItem.endDate || 'N/A' }}</div>
              </v-col>   
              
              <v-divider class="my-5"></v-divider>

              <v-col cols="12" class="text-center">
                <p class="text-h5 font-weight-bold">Metrics</p>
              </v-col>            

              <v-col cols="6" md="4" lg="4" sm="4">
                <label class="text-body-1 font-weight-medium">Impressions:</label> 
                <div>{{ editedItem.metrics.impressions }}</div>
              </v-col>

              <v-col cols="6" md="4" lg="4" sm="4">
                <label class="text-body-1 font-weight-medium">clicks:</label> 
                <div>{{ editedItem.metrics.clicks }}</div>
              </v-col>           

              <v-col cols="6" md="4" lg="4" sm="4">
                <label class="text-body-1 font-weight-medium">conversions:</label> 
                <div>{{ editedItem.metrics.conversions }}</div>              
              </v-col>

              <v-col cols="6" md="4" lg="4" sm="4">
                <label class="text-body-1 font-weight-medium">CPC:</label> 
                <div>{{ editedItem.metrics.cpc }}</div>
              </v-col>

              <v-col cols="6" md="4" lg="4" sm="4">
                <label class="text-body-1 font-weight-medium">CTR:</label> 
                <div>{{ editedItem.metrics.ctr }}</div>
              </v-col>

              <v-col cols="6" md="4" lg="4" sm="4">
                <label class="text-body-1 font-weight-medium">ROAS:</label> 
                <div>{{ editedItem.metrics.roas }}</div>
              </v-col>

              <v-divider class="my-5"></v-divider>

              <v-col cols="12" class="text-center">
                <p class="text-h5 font-weight-bold" v-if="editedItem.history && editedItem.history.length > 0">History</p>
                <p class="text-h5 font-weight-bold" v-else>No History to show</p>
              </v-col>

              <v-col cols="12">
                <v-data-iterator :items="editedItem.history" :page="1" :items-per-page="7" class="pa-0 pt-7">
                  <template v-slot:default="{ items }">
                    <v-card-text v-for="(item, i) in items" :key="i" class="py-0 mb-3">  
                      <v-row 
                        dense 
                        style="background-color: #f9fafb; border-radius: 5px; margin: 0 0px;" 
                        class="d-flex align-center justify-space-between px-5 py-3 elevation-2"
                        v-if="!item.raw.changes.budget && !item.raw.changes.status"
                      > 
                        <div> 
                          <v-chip
                            :color="chipColor(item.raw.action)"
                            text-color="white"
                            small
                            density="compact"
                            class="ma-0 text-body-2 ml-2"
                          >
                            {{ item.raw.action }}
                          </v-chip>
                        </div>
                        
                        <div> 
                          <p class="text-body-2 font-weight-regular pt-0 mt-0 mr-9">{{ formatDate(item.raw.date) }}</p>
                        </div>
                      </v-row>
                      
                      <v-expansion-panels multiple class="px-0 mx-0" v-else>
                        <v-expansion-panel v-for="(value, index) in item.raw.changes" :key="index" class="px-0 mx-0"> 
                          <v-expansion-panel-title>
                            <v-row no-gutters>
                              <v-col cols="12" sm="12" md="12">
                                <v-row 
                                  dense 
                                  style="background-color: #f9fafb; border-radius: 8px;" 
                                  class="d-flex align-center justify-space-between px-3"
                                > 
                                  <div> 
                                    <v-chip
                                      :color="chipColor(item.raw.action)"
                                      text-color="white"
                                      small
                                      density="compact"
                                      class="ma-0 text-body-2 "
                                    >
                                      {{ item.raw.action }}
                                    </v-chip>
                                  </div>
                                  
                                  <div> 
                                    <p class="text-body-2 font-weight-regular pt-0 mt-0">{{ formatDate(item.raw.date) }}</p>
                                  </div>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-title>
                          
                          <v-expansion-panel-text>
                            <v-row dense class="justify-space-between" v-if="item.raw.changes.budget">
                              <div class="font-weight-semibold">Budget</div>
                              <div>{{ item.raw.changes.budget[0] }} → {{ item.raw.changes.budget[1] }}</div>
                            </v-row>

                            <v-row dense class="justify-space-between" v-if="item.raw.changes.status">
                              <div class="font-weight-semibold">Status</div>
                              <div>{{ item.raw.changes.status[0] }} → {{ item.raw.changes.status[1] }}</div>
                            </v-row>
                          </v-expansion-panel-text>
                        </v-expansion-panel> 
                      </v-expansion-panels>
                    </v-card-text>
                  </template>  
                </v-data-iterator>
              </v-col>

            </v-row>
          </v-card-text>

          <v-card-text v-else>
            <p class="placeholder-text">
              Loading campaign details...
            </p>
          </v-card-text>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn
              fab
              small
              color="blue-grey"
              variant="flat"
              prepend-icon="mdi-arrow-left"
              @click="$router.push({ path: '/' })"
            >
              Back
            </v-btn>

            <span>
              <v-btn
                v-if="editedItem.id"
                fab
                small
                color="red"
                variant="flat"
                class="mr-2"
                prepend-icon="mdi-delete"
                @click="deleteCampaign()"
              >
                Delete
              </v-btn>

              <v-btn
                v-if="editedItem.id"
                fab
                small
                color="primary"
                variant="flat"
                prepend-icon="mdi-pencil"
                @click="editCampaign()"
              >
                Edit
              </v-btn>
            </span>
          </v-card-actions>
        </v-card>
      </Wrapper>
      
    </div>
  </div>
</template>

<script>
// TODO: Implement component logic
import { toast } from 'vue3-toastify';
import { formatDate } from '@/utils/formatDate';
import {useAppStore} from '@/stores/app'
import { mapActions, mapState } from "pinia";

import Wrapper from '../components/UI/wrapper.vue';

export default {
  name: 'CampaignDetail',
  components: {
    Wrapper,
  },
  data: () => ({
    icon: 'mdi-chart-bar',
    title: 'Campaign Details',
    editedItem: {
      id: null,
      name: '',
      status: null,
      budget: '',
      spent: '',
      startDate: '',
      endDate: '',
      description: '',
      targetAudience: '',
      createdAt: '',
      updatedAt: '',
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        cpc: 0,
        ctr: 0,
        roas: 0,
      },
      history: [],
    }, 
    defaultItem: {
      id: null,
      name: '',
      status: null,
      budget: '',
      spent: '',
      startDate: null,
      endDate: null,
      description: '',
      targetAudience: null,
      createdAt: '',
      updatedAt: '',
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        cpc: 0,
        ctr: 0,
        roas: 0,
      },
      history: [],
    },   
    statusOptions: ['active', 'paused', 'completed', 'draft']
  }),
  computed: {
    formRules(){
      return {
        name: [
          v => !!v || 'Name is required',
        ],
        status: [
          v => !!v || 'Status is required',
        ],
        budget: [
          v => !!v || 'Budget is required',
        ],
        startDate: [
          v => !!v || 'Start Date is required',
        ],
        endDate: [
          v => !!v || 'End Date is required',
        ],
      }
    },
    campaignId() {
      return this.$route.params.id;
    },   
  },
  mounted() {
    this.loadSingleCampaign();
  },
  methods: { 
    ...mapActions(useAppStore, ['setStatus']),   
    async loadSingleCampaign() {
      try {
        const { data } = await this.$axios.get(`/campaigns/${this.campaignId}`);
        this.editedItem = data;
          
      } catch ({message}) {
        toast.error(message);
      }
    },
    editCampaign() {
      
      this.$router.push({ path: `/campaigns/${this.editedItem.id}/edit` });
    },
    async updatedStatus(status) {
      try {
        await this.$axios.patch(`/campaigns/${this.editedItem.id}/status`, { status });

        this.setStatus(status);
        toast.success('Status updated successfully');
      } catch ({message}) {
        toast.error(message);
      }
    },
    async deleteCampaign() {
      try {
        await this.$axios.delete(`/campaigns/${this.editedItem.id}`)
        
        toast.success('Campaign deleted successfully');
        this.close();
      } catch ({message}) {
        toast.error(message);
      }
    },
    chipColor(action) {
      if (action === 'activated') {
        return 'green lighten-4';
      } else if (action === 'updated') {
        return 'orange lighten-4';
      } else if (action === 'completed') {
        return 'red lighten-4';
      } else if (action === 'draft') {
        return 'grey lighten-4';
      }
      return '';
    }, 
    formatDate(date) {
      return formatDate(date);
    },
    close() {
      this.editedItem = Object.assign({}, this.defaultItem); 
      setTimeout(() => {
        this.$router.push({ path: '/' })
      }, 700)
    },
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.placeholder-text {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>
