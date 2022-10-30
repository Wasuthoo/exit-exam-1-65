<template>
  <v-container fluid class="bg-pink-lighten-2 ma-0 fill-height">
    <v-card class="pa-7">

      <!-- Header -->
      <v-container class="d-flex justify-space-between mb-6">
        <h1>CS Personal Message Customer List</h1>
        <v-btn class="bg-green" elevation="10" height="100" @click="dialogAdd = true"> Add Customer </v-btn>
        <v-btn  elevation="10" height="100" class="bg-red" @click="getResult()">Processing</v-btn>

      </v-container>
    </v-card>
    
    <v-card class="ma-5 pa-5" v-for="item in customer">
      <a>
        <b>Name : </b> {{ item.name }} <br />
        <b>Massager : </b> {{ item.demand }} <br />
        <b>Cost : </b> {{ item.cost }} <br />
      </a>
    </v-card>



    <v-dialog v-model="dialogAdd"  max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Customer</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Messager" v-model="demand" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Money" v-model="cost" required></v-text-field>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogAdd = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="addCustomer()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogRes" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Result</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <h1>Service Customer </h1>
            <v-card v-for="item in serv">
              <a>
        <b>Name : </b> {{ item.name }} <br />
        <b>Massager : </b> {{ item.demand }} <br />
        <b>Cost : </b> {{ item.cost }} <br />
      </a>
      
          </v-card>
    <h1>This Round Cost : {{result.cost}}</h1>


          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogRes = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>

import { store_pinia } from "../stores/store_pinia";

export default {
  name: "HomeView",

  data: () => ({
    modelStore: store_pinia(),
    customer: [
    { name: "A", demand: "3", cost: "100" }, 
    { name: "B", demand: "4", cost: "50" },
    { name: "C", demand: "2", cost: "200" }],
    serv :[],
    dialogAdd: false,
    dialogRes: false,
    name: "",
    demand: "",
    cost: "",
    result:""
  }),

  computed: {

  },

  methods: {
    getCustomers() {
      this.customer = this.modelStore.getCustomers
    },
    addCustomer() {
      if (this.name == "" || this.demand == "" || this.cost == "") {
        alert("Please enter Every field")
        
      }
      else if(this.demand > 8 || this.demand < 1){
        alert("Please enter number between 1-8")
      }
      else if (this.cost < 0){
        alert("Please enter number more than 0")
      }
      else{
        const input = {
        name: this.name,
        demand: this.demand,
        cost: this.cost,
      }
      this.customer.push(input);
      this.modelStore.setCustomers(input);
      this.dialog = false;
      this.name = "";
      this.demand = "";
      this.cost = "";
      this.dialogAdd = false;
      }
    },
     getResult(){
      this.result = this.modelStore.getResult
      this.modelStore.calculate();
      this.serveCustomer();
      this.dialogRes = true;

      console.log(this.result);
     },

     serveCustomer(){
      for (let i = 0; i < this.customer.length; i++){
        for (let j = 0; j < this.result.items.length; j++) {
        if (this.customer[i].demand == this.result.items[j]) {
          this.serv.push(this.customer[i]);
        }
      }
      }
    }
  },
};
</script>