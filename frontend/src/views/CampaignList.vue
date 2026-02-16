<template>
  <div class="campaign-list">
    <div class="container">
      <div class="page-header">
        <h2>Campaigns</h2>
        <router-link to="/campaigns/new" class="btn btn-primary">
          + New Campaign
        </router-link>
      </div>
      
      <!-- TODO: Implement search and filters -->
      <!-- TODO: Implement campaign list display -->
      <!-- TODO: Implement pagination -->
      <!-- TODO: Add loading and error states -->
      <v-data-table-server
        :headers="campaignHeader"
        :items="campaigns"
        :loading="false"
        :search="search"
        :options="params"
        @update:options="sendParams"
        @click:row="editItem"
        :items-per-page="params.itemsPerPage"
        :items-length="5"
        class="elevation-3 cursor"
      >
        <template v-slot:no-data>
          <v-btn color="primary" @click="loadCampaigns">Load Campaigns</v-btn>
        </template>
      </v-data-table-server>
      
      <v-dialog
        v-model="dialog"
        max-width="700"
        persistent
      >
        <v-card>
          <v-card-title class="headline">{{formTitle}}</v-card-title>

          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >

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

            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
     
    </div>
  </div>
</template>

<script>
// TODO: Implement component logic
export default {
  name: 'CampaignList',
  data: () => ({
    dialog: false,
    editedIndex: -1,
    campaigns: [],
    search: '',
    editedItem: {
      name: '',
      status: null,
      budget: '',
      startDate: '',
      endDate: '',
    },
    statusOptions: ['Active', 'Paused', 'Completed'],
    params: {
      page: 1,
      itemsPerPage: 10,
      sortBy: ['name'],
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
  },
  methods: {
    async loadCampaigns(params) {
      try {
        const { data } = await this.$axios.get('/campaigns', { params });
        this.campaigns = data;
      } catch (err) {
        console.log(err)
        // this.error = 'Failed to load campaigns. Please try again.';  
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
      // this.editedItem = Object.assign({}, item);
      // this.editedIndex = this.campaigns.indexOf(item);
      // this.dialog = true;
      this.$router.replace({ path: `/campaigns/${item.id}` });

    },
    submit() {
      if(this.editedIndex > -1) {
        this.edit()
      } else {
        this.save()
      }
    },
    async save(){
      const {valid} = await this.validate()
      if(!valid) return;

      try {
        await this.$axios.post('/campaigns', this.editedItem)
        
        this.loadCampaigns(this.params);
        this.close();
      } catch (error) {
        console.log(error)
      }
    },
    async edit(){
      try {

        await this.$axios.put(`/campaigns/${this.editedItem.id}`, this.editedItem)
        
        this.loadCampaigns(this.params);
        this.close();
      } catch (error) {
        console.log(error)
      }
    },
    validate() {        
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.reset()
        this.resetValidation();
      });
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

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
