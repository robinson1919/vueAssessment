<template>
  <div class="campaign-detail">
    <div class="container">
      <!-- TODO: Implement campaign detail view -->
      <!-- TODO: Display campaign information -->
      <!-- TODO: Show metrics and history -->
      <!-- TODO: Add back button -->
      <!-- TODO: Handle loading and error states -->
      <p class="text-start text-h5 font-weight-semibold pb-2">Campaign Details</p>
      <v-row dense>
        <v-col cols="12" md="6" lg="6" sm="6"> 
          <v-text-field
            label="Name"
            v-model="editedItem.name"
            variant="underlined"
            :rules="formRules.name"
            required
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" md="6" lg="6" sm="6"> 
          <v-select
            label="Status"
            v-model="editedItem.status"
            :items="statusOptions"
            variant="underlined"
            :rules="formRules.status"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" md="6" lg="6" sm="6"> 
          <v-text-field
            label="Budget"
            v-model="editedItem.budget"
            variant="underlined"
            :rules="formRules.budget"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" lg="6" sm="6"> 
          <v-date-input
            label="Start Date"
            v-model="editedItem.startDate"
            variant="underlined"
            max-width="368"
            autocomplete="off"
            :rules="formRules.startDate"
            required
          ></v-date-input>
        </v-col>

        <v-col cols="12" md="6" lg="6" sm="6"> 
          <v-date-input
            label="End Date"
            v-model="editedItem.endDate"
            variant="underlined"
            max-width="368"
            autocomplete="off"
            :rules="formRules.endDate"
            required                    
          ></v-date-input>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// TODO: Implement component logic
export default {
  name: 'CampaignDetail',
  data: () => ({
    editedItem: {
      name: '',
      status: null,
      budget: '',
      startDate: '',
      endDate: '',
    },
    statusOptions: ['Active', 'Paused', 'Completed'],
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
    }
  },
  mounted() {
    this.loadSingleCampaign();
  },
  methods: {
    async loadSingleCampaign() {
      try {
        const campaignId = this.$route.params.id;
        const { data } = await this.$axios.get(`/campaigns/${campaignId}`);
        this.editedItem = data;

        console.log(data);
        
          
      } catch (error) {
        console.log('Error loading campaign:', error);
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
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
