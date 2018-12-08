<template>
    <v-container align-content-center>
        <v-layout row wrap>
            <v-flex xs3 
                v-for="(display, key) in displayOptions" 
                :key="key"
                class="mx-auto"
            >
                <v-hover>
                    <v-card 
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 12 : 2}`"
                        class="mx-auto"
                    >
                        <router-link :to="display.link">
                            <v-responsive>
                                <v-layout align-content-center justify-center class="pa-3">
                                    <v-icon x-large :color="display.color">{{ display.icon }}</v-icon>
                                </v-layout>
                        </v-responsive>
                        </router-link>
                        <v-card-text class="text-xs-center">
                            {{ display.type }}
                        </v-card-text>
                    </v-card>
                </v-hover>
            </v-flex>
            
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                displayOptions: [
                    {
                        type: 'Student',
                        icon: 'fas fa-user-graduate',
                        color: 'blue',
                        link: '/classes'
                    },
                    {
                        type: 'Administrator',
                        icon: 'fab fa-autoprefixer',
                        color: 'green',
                        link: '/administrator'
                    },
                    {
                        type: 'Staff',
                        icon: 'fas fa-user',
                        color: 'red',
                        link: '/staff'
                    },
                    {
                        type: 'Representative',
                        icon: 'fas fa-user',
                        color: 'orange',
                        link: '/representative'
                    }
                ]
            }
        },
        methods: {
            route(name) {

            }
        }
    }
</script>

<style scoped>

</style>