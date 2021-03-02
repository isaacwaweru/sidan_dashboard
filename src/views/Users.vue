<template>
  <div>
    <h3 class="mx-5 my-5">Users</h3>
    <div class="row">
      <div class="col-md-12">
     
      </div>
    </div>
    <v-data-table v-if="users"
      :headers="headers"
      :items="users"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                      outlined
                        v-model="name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                      outlined
                        v-model="title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                      outlined
                        v-model="password"
                        label="Password"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                      outlined
                        v-model="email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
              
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="addUser">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="deleteItem()">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { db } from "../firebase";
import {mapActions} from "vuex";

export default {
  name: "Users",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    name:"",
    title:"",
    password:"",
    email:"",
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Title", value: "title" },
  
    ],

    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add User" : "Edit Item";
    },
    users () {
      console.log("We could be live",this.$store.state.users)
    return this.$store.state.users
  }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
      users (value, oldValue) {
            console.log(oldValue) // Hello World
            console.log(value) // ByeBye World
        }

  
  },



  methods: {
    ...mapActions(["signup"]),
    deleteUser(id) {
      if (window.confirm("Do you really want to delete?")) {
        db.collection("users")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document deleted!");
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
   
   

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },


    addUser() {
     this.$store.dispatch('signup', {
    email: this.email,
    password: this.password,
    name: this.name,
    title: this.title
  })
    }
  }
};
</script>

<style></style>
