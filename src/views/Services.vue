<template>
  <div>
    <h3 class="mx-5 my-5">Services </h3>
 
<template>
  <v-card>
    <v-toolbar
      color="primary"
      flat
      dark
    >
      <template v-slot:extension>
        <v-tabs
          v-model="model"       
          slider-color="orange"
        >
          <v-tab
            v-for="i in tabsHeaders"
            :key="i"
           
          >
            {{ i }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="model">
      <v-tab-item
      
      >
        <v-card flat>
           <ServiceType/>

        </v-card>
      </v-tab-item>

      <v-tab-item
      
      >
        <v-card flat>
       
     <AllServices/>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
           <AllItems/>
     
        </v-card>
      </v-tab-item>
            <v-tab-item
      
      >
        <v-card flat>


       <template>
  <v-toolbar
      flat
      color="primary"
      dark
    >
      <v-toolbar-title>Services</v-toolbar-title>
    </v-toolbar>

    
  <v-card>
    <v-tabs vertical
      v-model="tab"
  
    >
      <v-tab
        v-for="item in serviceTypes"
        :key="item.name"
        @click="getServices({val:item.id})"
      >
        {{ item.name }}
      </v-tab>
        <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in serviceTypes"
        :key="item.name"
      >
        <v-card flat>



            <v-card>
    <v-tabs vertical
      v-model="tabServices"   >
      <v-tab
        v-for="item in services"
        :key="item.name"
        @click="getItems({val:item.id})"

      >
        {{ item.name }}
      </v-tab>
        <v-tabs-items v-model="tabServices">
      <v-tab-item
        v-for="item in services"
        :key="item.name"
      >
        <v-card flat>
          <v-card-text>
          
                 <template>
                    <v-data-table v-if="itemsSaved"
                      dense
                      :headers="headersItemSaved"
                      :items="itemsSaved"
                      :search="search"
                      item-key="name"
              
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
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-tabs>
  </v-card>


        </v-card>
      </v-tab-item>
    </v-tabs-items>
    </v-tabs>

  
  </v-card>
</template>




        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { db } from "../firebase";
import {mapActions} from "vuex";
import ServiceType from "@/components/ServiceType";
import AllServices from "@/components/AllServices";
import AllItems from "@/components/AllItems";

export default {
  name: "Services",
  components: { ServiceType,AllServices,AllItems },

  data: () => ({
    dialog: false,
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
    items:[],
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

    
    item: {
      name: "",
      price: 0,
      description: "",
      icon: "",
      service_type_id:"",
      service_id:""
    },

    companies: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      business_no: "",
      type: "",
      physical_location: "",
      krapin: "",
      status: ""
    },
    defaultItem: {
      name: "",
      business_no: "",
      type: "",
      physical_location: "",
      krapin: "",
      status: ""
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
  }
  ,
  allItems () {
      console.log("allItems",this.$store.state.allItems)
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
         

    dialog(val) {
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
    ...mapActions(["getServices","getItems","addItem"]),

    saveItem() {
      //get the items and add to the array
      this.item.service_id=this.service_id
      this.item.service_type_id=this.service_type_id

      this.addItem(this.item)

      this.item={
      name: "",
      price: 0,
      description: "",
      icon: "",
      service_type_id:"",
      service_id:""
    }


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
            this.item.icon=url;
            console.log(this.img1);
          });
        }
      );
    },
    
  
    editItem(item) {
      this.editedIndex = this.companies.indexOf(item);
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.companies[this.editedIndex], this.editedItem);
      } else {
        this.companies.push(this.editedItem);
      }
   
    }
  }
};
</script>

<style></style>


