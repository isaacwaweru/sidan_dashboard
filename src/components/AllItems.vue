<template>
  <div>


                       <v-data-table v-if="allItems"
                        :headers="headersItemSaved"
                          :items="allItems"
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
        <v-toolbar flat>
         <v-toolbar-title>All Items</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            class="mx-5 my-4"
            hide-details
          ></v-text-field>

          <v-dialog v-model="dialogItem" max-width="1000">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add Service
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col class="d-flex" cols="12" sm="6" md="4">
    
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
                    <v-col class="d-flex" cols="12" sm="6" md="4">
                
                      <v-select v-if="services"
                        v-model="service_id"
                        :items="services"
                        name="name"
                        item-text="name"
                        item-value="id"
                        label="Select service"
                        dense
                        outlined
                      ></v-select>
                    </v-col>
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

                          <div v-if="imageData != null">
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
                  </v-row>
                  <v-row>
               
                  <template>
                    <v-data-table  v-if="formTitle === 'New Item'"
                      dense
                      :headers="headersItemSaved"
                      :items="itemsSaved"
                      item-key="name"
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
                    </v-data-table>
                  </template>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Item name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Price amount"
                        type="number"
                        prefix="Ksh"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>

                    <v-btn
                      @click="save()"
                      class="mx-2"
                      fab
                      dark
                      color="indigo"
                    >
                      <v-icon dark>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
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
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem_(item)"
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
  </div>
</template>

<script>
import firebase from "firebase/app";
import { db } from "../firebase";
import {mapActions} from "vuex";

export default {
  name: "AllItems",

  data: () => ({
    dialogItem: false,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    model: 'tab-2',
    tabsHeaders:['Service type','Service','Items','Drill'],
    dialogDelete: false,
    search: "",
    img1: "",
    tab: null,
    tabServices:null,
    service_id:"",
         itemstabs: [
          { tab: 'One', content: 'Tab 1 Content' },
          { tab: 'Two', content: 'Tab 2 Content' },
          { tab: 'Three', content: 'Tab 3 Content' },
      
        ],
    service_type_id:"",
    imageData: null,

    headersItemSaved: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Price', value: 'price' },
        { text: 'Icon', value: 'icon' },
        { text: "Actions", value: "actions", sortable: false }

       
      ],
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Business #", value: "business_no" },
      { text: "Type", value: "type" },
      { text: "Physical Location", value: "physical_location" },
      { text: "KRA Pin", value: "krapin" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    newService: {
      type: "",
      name: "",
      icon: "",
      items: []
    },


    companies: [],
    editedIndex: -1,
    editedItem: {
      description: "",
      icon: "",
      id: "",
      name: "",
      price: 0,
      service_type_id: "",
      services_id: ""
    },

    defaultItem: {
      description: "",
      icon: "",
      id: "",
      name: "",
      price: 0,
      service_type_id: "",
      services_id: ""
    },
    types: ["Home service", "House service"]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    
    services () {
      console.log("services",this.$store.state.services)
    return this.$store.state.services
  },
    serviceTypes () {
      console.log("servicesType",this.$store.state.serviceTypes)
    return this.$store.state.serviceTypes
  },
   itemsSaved () {
      console.log("servicesType",this.$store.state.itemsSaved)
    return this.$store.state.itemsSaved
  },

  allItems () {
    return this.$store.state.allItems
  }
  },

  watch: {
    service_type_id(val){

      this.getServices({val})

    },
    service_id(val){

       this.getItems({val});

    },
         
  editedItem(val){
    console.log("the values are",val)
    //getServiceType
    //getService
    this.service_type_id=val.service_type_id;
    this.service_id=val.service_id;
    this.img1=val.icon;

  }  ,

    dialogItem(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
      services (value, oldValue) {
            console.log("Old ",oldValue) 

     }
  },

  methods: {
    ...mapActions(["getServices","getItems","addItem","deleteItem","updateItem"]),

    saveItem() {
      //get the items and add to the array
      this.editedItem.service_id=this.service_id
      this.editedItem.service_type_id=this.service_type_id

      this.addItem(this.editedItem)

    //   this.editedItem={
    //   name: "",
    //   price: 0,
    //   description: "",
    //   icon: "",
    //   service_type_id:"",
    //   service_id:""
    // }


    },
    SaveNewService() {


      console.log(this.newService);

      // if (this.newService.type === "Home service") {
      //   this.createNewHomeService();
      // } else {
      //   this.createNewHouseService();
      // }
      this.close();
    },

    createNewHomeService() {
      db.collection("home_services")
        .add(this.newService)
        .then(() => {
          console.log("Document successfully written!");
          // this.readEmployees();
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    },
    createNewHouseService() {
      db.collection("house_services")
        .add(this.newService)
        .then(() => {
          console.log("Document successfully written!");
          // this.readEmployees();
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    },
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
      this.img1 = null;
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
            this.img1 = url;
            this.editedItem.icon=url;
            console.log(this.img1);
          });
        }
      );
    },
    
  
    editItem(item) {
      console.log("what is ",item)
      this.editedIndex = this.allItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogItem = true;
    },

    deleteItem_(item) {
      this.editedIndex = this.allItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteItem(this.editedItem.id)   
      this.closeDelete();
    },

    close() {
      this.dialogItem = false;
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

    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem)
       this.updateItem(this.editedItem)
      } else {
        this.saveItem();
      }
   
    }
  }
};
</script>

<style></style>
