<template>
  <v-data-table v-if="allServices"
    :headers="headers"
    :items="allServices"
    sort-by="name"
    :search="search"
    class="elevation-1"
  >
     <template   v-slot:item.icon="{ item }">
              <v-avatar size="36px" rounded>
                <v-img 
                   alt="icon"
                  :src="item.icon"
                ></v-img>
              </v-avatar>
              </template>
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Services</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            class="mx-5 my-4"
            hide-details
          ></v-text-field>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Service 
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                
                      <v-col cols="12" sm="12" md="12">
    
                      <v-select
                       v-if="serviceTypes"
                        v-model="service_type_id"
                        :items="serviceTypes"
                        name="name"
                        item-text="name"
                        item-value="id"
                        label="Select type"
                        dense
                        outlined
                      ></v-select>
                    </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                    outlined
                      v-model="editedItem.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                  outlined
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                    outlined
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  
                          <div v-if="editedItem.icon!= null">
                            <img
                              class="preview"
                              height="100"
                              width="200"
                              :src="editedItem.icon"
                            />
                            <br />
                          </div>
                </v-row>
                  <v-col class="d-flex" cols="12" sm="6" md="4">
                      <v-flex md6 offset-sm1>
                        <div>
                          <div>
                            <v-btn @click="click1">set Icon</v-btn>
                            <input
                              type="file"
                              ref="input1"
                              style="display: none"
                              @change="previewImage"
                              accept="image/*"
                            />
                          </div>

                          <div v-if="imageData!= null">
                            <img
                              class="preview"
                              height="100"
                              width="200"
                              :src="img1"
                            />
                            <br />
                          </div>
                        </div>
                      </v-flex>
                    </v-col>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    
    <template v-slot:no-data>
      <v-btn
        color="primary"
      >
        No data available
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import firebase from "firebase/app";
import {mapActions} from "vuex";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
       img1: "",
       imageData: null,
       service_type_id:"",
       search: "",
        headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Icon', value: 'icon' },
        { text: "Actions", value: "actions", sortable: false }

       
      ],
      
 
      editedIndex: -1,
      editedItem: {
        name: '',
        description: "",
        icon: "",
        id:"",
        service_type_id:"",
      },
      defaultItem: {
         name: '',
        description: "",
        icon: "",
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Service ' : 'Edit Service '
      },
       allServices () {
    return this.$store.state.allServices
  },
     serviceTypes () {
    return this.$store.state.serviceTypes
  },

    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      service_type_id(val){

      this.getServices({val})
      this.editedItem.service_type_id=val;

    },
    },

  
    methods: {
     
...mapActions(["addService","updateService","deleteService","getServices"]),

previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },

    click1() {
      this.$refs.input1.click();
    },
    
    onUpload() {
    
      const storageRef = firebase
        .storage()
        .ref(`icons/` + `${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.editedItem.icon = url;
                     this.img1 = url;

            
          });
        }
      );
    },

      editItem (item) {
        this.editedIndex = this.allServices.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.allServices.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deleteService(this.editedItem.id)   
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {   
        this.updateService(this.editedItem)
        this.imageData=null;

        } else {
            //new 
         this.addService(this.editedItem) 
         this.imageData=null;
        
        }
        this.close()
      },
    },
  }
</script>