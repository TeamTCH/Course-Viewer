<template>
  <v-container text-xs-center>
        <v-layout column>
            <header>
                <h1>Edit Programs</h1>
            </header>
        </v-layout>
        <v-layout row class='justify-center'>
              <div>
                <v-toolbar flat color="white">
                <v-toolbar-title>Programs Listing</v-toolbar-title>
                <v-divider
                    class="mx-2"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="650px">
                    <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
                    <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                        <v-layout column>
                            <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.name" label="Program Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                            <v-text-field v-model="editedItem.link" label="Link"></v-text-field>
                            </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
                </v-toolbar>
                <v-data-table
                :headers="headers"
                :items="programs"
                class="elevation-1"
                >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.link }}</td>
                    <td class="justify-center layout px-0">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(props.item)"
                    >
                        delete
                    </v-icon>
                    </td>
                </template>
                <template slot="no-data">
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
                </v-data-table>
            </div>
        </v-layout>
  </v-container>
</template>

<script>
  import programList from '../assets/data/ProgramList.json'
    export default {
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: 'Program Name',
                    align: 'left',
                    value: 'name'
                },
                {
                    text: 'Link',
                    sortable: false,
                    value: 'link'
                },
            ],
            programs: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                link: ''
            },
            defaultItem: {
                name: '',
                link: ''
            }
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            }
        },

        watch: {
            dialog (val) {
                val || this.close()
            }
        },

        created () {
        this.initialize()
        },

        methods: {
            initialize () {
                this.programs = programList
            },
            editItem (item) {
                this.editedIndex = this.programs.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.programs.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.programs.splice(index, 1)
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                Object.assign(this.programs[this.editedIndex], this.editedItem)
                } else {
                this.programs.push(this.editedItem)
                }
                this.close()
            }
        }

    }
</script>

<style scoped>

</style>
