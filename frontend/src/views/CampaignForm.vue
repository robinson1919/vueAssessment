<template>
  <div class="campaign-form">
    <div class="container">
      <!-- TODO: Implement campaign create/edit form -->
      <!-- TODO: Add form validation -->
      <!-- TODO: Handle form submission -->
      <!-- TODO: Show validation errors -->
      <!-- TODO: Add loading states -->
      <Wrapper
        :icon="icon"
        icon-small
        elevation="2"
        :title="title"
        color="primary" 
        :showSearch="false"        
      > 
        <v-card elevation="3" class="mt-3">
          <v-card-title class="headline d-flex justify-space-between">      
            <p class="text-start text-h5 font-weight-semibold pb-2">
              {{ title }}
            </p>          
          </v-card-title>

          <v-card-text>
            <v-form
              ref="form"
              lazy-validation
            >
              <v-row dense>
                <v-col cols="12" md="6" lg="6" sm="6"> 
                  <v-text-field
                    label="Name"
                    variant="underlined"
                    v-model.trim="editedItem.name"
                    :rules="formRules.name"
                    required
                  ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6" lg="6" sm="6"> 
                  <v-select
                    label="Status"
                    variant="underlined"
                    type="text"
                    v-model.trim="editedItem.status"
                    :items="statusOptions"
                    :rules="formRules.status"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6" lg="6" sm="6"> 
                  <v-text-field
                    label="Budget"
                    variant="underlined"
                    type="number"
                    autocomplete="off"
                    v-model.trim="editedItem.budget"
                    :rules="formRules.budget"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" lg="6" sm="6"> 
                  <v-select
                    label="Target Audience"
                    variant="underlined"
                    v-model.trim="editedItem.targetAudience"
                    :items="tartgetAudienceOptions"
                    :rules="formRules.targetAudience"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6" lg="6" sm="6"> 
                  <v-date-input
                    label="Start Date"
                    variant="underlined"
                    max-width="368"
                    autocomplete="off"
                    :allowed-dates="allowedStartDates"
                    v-model.trim="editedItem.startDate"
                    :rules="formRules.startDate"
                    required
                  ></v-date-input>
                </v-col>

                <v-col cols="12" md="6" lg="6" sm="6"> 
                  <v-date-input
                    label="End Date"
                    variant="underlined"
                    max-width="368"
                    autocomplete="off"
                    :allowed-dates="allowedEndDates"
                    v-model.trim="editedItem.endDate"
                    :rules="formRules.endDate"
                    required                    
                  ></v-date-input>
                </v-col>

                <v-col cols="12" md="12" lg="12" sm="12"> 
                  <v-textarea
                    label="Description"
                    variant="underlined"
                    v-model.trim="editedItem.description"
                    :rules="formRules.description"
                    rows="1"
                    counter="150"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>

            </v-form>
          </v-card-text>

          <v-card-actions class="d-flex justify-space-between">
            <v-btn
              fab
              small
              color="blue-grey"
              variant="flat"
              prepend-icon="mdi-arrow-left"
              @click="$router.push({ path: isNewcampaign ? '/' : `/campaigns/${editedItem.id}` })"
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
                fab
                small
                color="primary"
                variant="flat"
                :prepend-icon="isNewcampaign ? 'mdi-plus' : 'mdi-pencil'"
                @click="submit()"
              >
                {{ isNewcampaign ? 'Create' : 'Edit' }}
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
import {useAppStore} from '@/stores/app'
import { mapState } from "pinia";
import moment from 'moment';

import Wrapper from '../components/UI/wrapper.vue';

export default {
  name: 'CampaignForm',
  components: {
    Wrapper,
  },
  data: () => ({
    icon: 'mdi-bullhorn',
    editedItem: {
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
    tartgetAudienceOptions: 
    [
      "18-24, US",
      "25-30, US",
      "31-35, US",
      "36-40, US",
      "41-45, US",
      "18-22, US",
      "23-27, US",
      "28-32, US",
      "33-37, US",
      "38-45, US",
      "55+, US"
    ],
    statusOptions: ['active', 'paused', 'completed', 'draft'],
  }),
  computed: {
    campaignId() {
      return this.$route.params.id;
    },
    isNewcampaign() {
      return !this.campaignId || this.$route.path.endsWith('/new');
    },
    title() {
      return this.isNewcampaign ? 'Create Campaign' : 'Edit Campaign';
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
        description: [
          v => !!v || 'Description is required',
          v => (v && v.length <= 150) || 'Description must be less than 150 characters',
        ],
        targetAudience: [
          v => !!v || 'Target Audience is required',
        ],
      }
    },
    ...mapState(useAppStore, {
      campaign: state => state.campaign,
    })
  },
  mounted() {
    if(!this.isNewcampaign) {
      this.editedItem = this.campaign;
    } 
  },
  methods: {
    submit() {
      if(this.isNewcampaign) {
        this.save()
      } else {
        this.edit()
      }
    },
    async save(){
      const {valid} = await this.validate()
      if(!valid) return;

      try {
        const {
          name,
          status,
          budget,
          startDate,
          endDate,
          description,
          targetAudience
        } = this.editedItem

        const newBudget = parseInt(budget, 10);
        const newStartDate = moment(startDate).format('YYYY-MM-DD');
        const newEndDate = moment(endDate).format('YYYY-MM-DD');

        await this.$axios.post('/campaigns', {
          name,
          status,
          budget: newBudget,
          startDate: newStartDate,
          endDate: newEndDate,
          description,
          targetAudience
        })
        
        toast.success('Campaign created successfully');
        this.close();
      } catch ({message}) {
        toast.error(message);
      }
    },
    async edit(){
      const {valid} = await this.validate()
      if(!valid) return;

      try {
        const {
          id,
          name,
          status,
          budget,
          startDate,
          endDate,
          description,
          targetAudience
        } = this.editedItem

        const newBudget = parseInt(budget, 10);
        const newStartDate = moment(startDate).format('YYYY-MM-DD');
        const newEndDate = moment(endDate).format('YYYY-MM-DD');
        
        await this.$axios.put(`/campaigns/${id}`, {
          name,
          status,
          budget: newBudget,
          startDate: newStartDate,
          endDate: newEndDate,
          description,
          targetAudience
        })
        
        toast.success('Campaign updated successfully');
        this.close();
      } catch ({message}) {
        toast.error(message);
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
    async deleteCampaign() {
      try {
        await this.$axios.delete(`/campaigns/${this.editedItem.id}`)
        
        toast.success('Campaign deleted successfully');
        this.close();
      } catch ({message}) {
        toast.error(message);
      }
    },
    close() {
      setTimeout(() => {
        this.$router.push({ path: '/' })
      }, 700)

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.reset()
        this.resetValidation();    
      });      
    },
    allowedStartDates(val) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (!this.editedItem.endDate) {
        return val >= today;
      }
      return val <= this.editedItem.endDate && val >= today;
    },
    allowedEndDates(val) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (this.editedItem.startDate == null) {
        return val >= today;
      }
      return val >= this.editedItem.startDate && val >= today;
    }
  },
};
</script>

<style scoped>

.placeholder-text {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>
