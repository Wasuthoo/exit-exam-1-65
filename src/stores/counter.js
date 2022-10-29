import { defineStore } from "pinia";
import axios from "axios";

const apiUrl = "http://localhost:3000";
const subApiAssignment = "/assignments";
const subApistudent = "/student";

export const store_class = defineStore({
  id: "class",
  state: () => ({
    assignments: [],
    students: [],
    loginStatus: false,
  }),
  getters: {
    getAssignments() {
      return this.assignments;
    },
  },
  actions: {
    async getQueryAssignment() {
      try {
        const res = await axios.get(apiUrl + subApiAssignment);
        this.assignments = res.data;
        console.log(
          "API: [",
          apiUrl + subApiAssignment,
          "]: \n",
          this.assignments
        );
      } catch (e) {
        console.error(e);
      }
    },
    async addAssign(payload) {
      try {
        const json = JSON.stringify(payload);
        const res = await axios.post(apiUrl + subApiAssignment, payload);
      } catch (e) {
        console.error(e);
      }
    },
    async getQueryStudent() {
      try {
        const res = await axios.get(apiUrl + subApistudent);
        this.students= res.data;
        console.log(
          "API: [",
          apiUrl + subApistudent,
          "]: \n",
          this.students
        );
      } catch (e) {
        console.error(e);
      }
    },
    async studentSignup(payload) {
      try {
        const res = await axios.post(apiUrl + subApistudent, payload);
      } catch (e) {
        console.error(e);
      }
    },
    async studentLogin(payload) {
      
    },

    addAssignment() {
      console.log("addAssignment");
    },
  },
});
