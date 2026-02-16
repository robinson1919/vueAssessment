import colors from 'vuetify/util/colors'

const theme = {
    themes: {
        dark: {
            light: false,
            colors: {
                primary: colors.blue.darken2,
                secondary: '#000000',
                info: "#03c9d7",
                success: "#00c292",
                accent: "#fc4b6c",
                default: "#fb9778",
                warning: "#fec90f",
                error: "#fc4b6c",
            }            
        },
        light: {
            light: true,
            colors: {
                primary: colors.blue.darken2,
                secondary: "#000000",
                info: "#03c9d7",
                success: "#00c292",
                accent: "#fc4b6c",
                default: "#fb9778",
                warning: "#fec90f",
                error: "#fc4b6c",
            }
            
        },
    },
}

export default theme;
// This file defines the theme for Vuetify, which is a Material Design component framework for Vue.js.