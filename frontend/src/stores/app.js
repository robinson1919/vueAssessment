import { defineStore } from 'pinia'


export const useAppStore = defineStore('app', {
    state: () => ({
        loading: false,
        campaign: null
    }),
    actions: {
        setLoading(value) {
            this.loading = value;
        },
        setCampaign(campaign) {            
            this.campaign = campaign;
            localStorage.setItem('selectedCampaign', JSON.stringify(campaign));
        },
        setStatus(status) {
            if(this.campaign) {
                this.campaign.status = status;
                localStorage.setItem('selectedCampaign', JSON.stringify(this.campaign));
            }
        },
        loadCampaign() {
            const storedCampaign = localStorage.getItem('selectedCampaign');
            if (storedCampaign) {
                this.campaign = JSON.parse(storedCampaign);
            }
        }
    }
})