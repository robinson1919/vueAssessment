import { defineStore } from 'pinia'


export const useAuthStore = defineStore('app', {
    state: () => ({
        loading: false,
    })
})