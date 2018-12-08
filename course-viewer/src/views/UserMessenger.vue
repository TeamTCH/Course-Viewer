<template>
    <v-container text-xs-center>
        <v-layout column>
            <header>
                <h1>Messenger</h1>
            </header>
        </v-layout>
        

        <v-layout justify-center align-center scrollable max-height='300'>
            <v-flex md7 class="pa-1">
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h2 class="headline mb-0">Chat Group</h2>
                        </div>
                    </v-card-title>

                    <v-card-text >
                        <div class="grey--text text--darken-2" v-for="(msg, index) in messages" :key="index">
                            <p><span class="indigo--text">{{ msg.user }}: </span>{{ msg.message }}</p>
                        </div>
                    </v-card-text>

                    <v-form @submit.prevent="sendMessage">
                        <v-card-text>
                            <v-text-field label="Message:" v-model="message"/>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn type="submit" flat color="green">Send</v-btn>
                        </v-card-actions>
                    </v-form>

                </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import io from 'socket.io-client';
export default {
    data() {
        return {
            user: 'Guest',
            message: '',
            messages: [],
            socket : io('localhost:3000')
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();

            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message
            });
            this.message = ''
        },
    },
    dialog: false,
    mounted() {
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            // you can also do this.messages.push(data)
        });
    }
}
</script>

<style>

</style>
