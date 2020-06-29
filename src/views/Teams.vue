<template>
  <div class="betmatch">
    <Navbar></Navbar>
    <ModalTeam ref="ModalTeam"></ModalTeam>

    <div class="container">
      <!-- Modal -->
      <div
        class="modal fade"
        id="Modal_TeamForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="editmode ? updateData() : saveData()">
                <div class="form-group">
                  <label for="formGroupExampleInput">Team Logo</label>
                  <input
                    type="text"
                    class="form-control"
                    name="logo_url"
                    id="logo_url"
                    placeholder="URL Picture"
                    v-model="team.logo_url"
                  />
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput">Team Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    id="name"
                    placeholder=""
                    v-model="team.name"
                  />
                </div>
                <div class="form-group">
                  <label for="formGroupExampleInput">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    name="country"
                    id="country"
                    placeholder=""
                    v-model="team.country"
                  />
                </div>

                <div class="form-group row">
                  <div class="col">
                    <label for="Win">Win</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Win"
                      v-model="team.win"
                      value="0"
                    />
                  </div>
                  <div class="col">
                    <label for="Down">Down</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Down"
                      v-model="team.down"
                      value="0"
                    />
                  </div>
                  <div class="col">
                    <label for="Lost">Lost</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Lost"
                      v-model="team.lost"
                      value="0"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary"
                  style="width: 50%;"
                  v-show="editmode"
                >
                  Update
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  style="width: 50%;"
                  v-show="!editmode"
                >
                  Create
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  style="width: 50%;"
                  @click="reset"
                >
                  ยกเลิก
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <button
        style="width:100%;"
        type="button"
        class="btn btn-success mt-3"
        data-toggle="modal"
        @click="newModal"
      >
        + Add Team
      </button>

      <div class="form-group mt-3 filter">
        <input
          id="icon_prefix"
          type="search"
          class="form-control"
          v-model="search_data"
          placeholder="Searching.."
        />
        <i
          class="clear material-icons grey-text"
          v-if="search_data"
          @click="resetSearch"
          >close</i
        >
        <span class="badge badge-pill badge-info" @click="filter_contry('England')">England</span>
        <span class="badge badge-pill badge-secondary" @click="filter_contry('Spain')">Spain</span>
        <span class="badge badge-pill badge-success" @click="filter_contry('Italy')">Italy</span>
        <span class="badge badge-pill badge-danger" @click="filter_contry('Germany')"> Germany</span>
        <!-- <span class="badge badge-pill badge-warning">Warning</span>
        <span class="badge badge-pill badge-info">Info</span>
        <span class="badge badge-pill badge-light">Light</span>
        <span class="badge badge-pill badge-dark">Dark</span> -->
      </div>

      <div>
        <a href="#" @click="sortByDate">sortByDate</a>
        <span style="float: right;">Teams Total {{ teams.length }}</span>
      </div>

      <div class="row">
        <div class="col-lg-12 mt-3">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" style="min-width: 170px;">Team Name</th>
                  <th scope="col">Win</th>
                  <th scope="col">Down</th>
                  <th scope="col">Lost</th>
                  <th scope="col" class="text-center" style="min-width: 170px;">Country/Create</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="team in filteredTeams" :key="team.id">
                  <td>
                    <div style="width:100px;text-align: center;">
                      <!-- <router-link
                        :to="{
                          name: 'Team',
                          params: { team_name: team.data().name }
                        }"
                      >
                        <img
                          class="img"
                          :src="team.data().logo_url"
                          height="30px"
                        />
                      </router-link> -->
                      <a href="#" @click="ModalTeamDetail(team)">
                        <img
                          class="img"
                          :src="team.data().logo_url"
                          height="30px"
                        /><br>
                        {{ team.data().name }}
                      </a>
                    </div>
                    <!-- <div>
                      <router-link
                        :to="{
                          name: 'Team',
                          params: { team_name: team.data().name }
                        }"
                      >
                        {{ team.data().name }}
                      </router-link>
                    </div> -->
                  </td>
                  <td class="text-center">{{ team.data().win }}</td>
                  <td class="text-center">{{ team.data().down }}</td>
                  <td class="text-center">{{ team.data().lost }}</td>
                  <td class="text-center">
                    
                    <!-- {{ moment(team.data().date).format(" Y. M. D") }} -->
                    <div>
                      <a
                        class="btn btn-info btn-sm"
                        href="#"
                        @click="editModal(team)"
                      >
                        <i class="fas fa-pencil-alt"> </i>
                        Edit </a
                      >&nbsp;
                      <a
                        class="btn btn-danger btn-sm"
                        href="#"
                        @click="deleteData(team.id)"
                      >
                        <i class="fas fa-trash"> </i>
                        Delete
                      </a>
                    </div>
                    {{ team.data().country }} 
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style="height:50px"></div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import ModalTeam from "@/components/ModalTeam.vue";

import { db } from "@/firebase";
import searchMixin from "@/mixins/searchMixin";
import moment from "moment";

export default {
  name: "betmatch",
  components: {
    Navbar,
    Footer,
    ModalTeam
  },
  data() {
    return {
      moment: moment,
      search_data: "",
      editmode: false,
      teams: [],
      team_detail: "",
      team: {
        name: null,
        country: null,
        logo_url: null,
        win: 0,
        down: 0,
        lost: 0
      },
      team_id: null
    };
  },
  methods: {
    sortByDate() {
      this.teams.sort((a, b) =>
        a.data().date < b.data().date
          ? 1
          : a.data().date > b.data().date
          ? -1
          : 0
      );
    },
    filter_contry(country){
      this.search_data = country;
    },
    newModal() {
      this.editmode = false;
      window.$("#Modal_TeamForm").modal();
    },
    editModal(team) {
      this.editmode = true;
      this.team = team.data();
      this.team_id = team.id;
      window.$("#Modal_TeamForm").modal();
    },
    ModalTeamDetail(team){
      this.$refs.ModalTeam.ShowTeamDetail(team)
      window.$("#Modal_TeamDetail").modal();
    },
    watcher() {
      db.collection("teams")
        .orderBy("win", "desc")
        .onSnapshot(querySnapshot => {
          this.teams = [];
          querySnapshot.forEach(doc => {
            this.teams.push(doc);
          });
        });
    },
    readData() {
      this.teams = [];
      db.collection("teams")
        .orderBy("win", "desc")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.id, " => ", doc.data());
            this.teams.push(doc);
            //console.log(this.teams);
          });
        });
    },
    saveData() {
      db.collection("teams")
        .add({
          name: this.team.name,
          country: this.team.country,
          logo_url: this.team.logo_url,
          win: parseInt(this.team.win),
          down: parseInt(this.team.down),
          lost: parseInt(this.team.lost),
          date: Date.now()
        })
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          this.watcher();
          //$("#modal-product-form").modal("hide");
          // Toast.fire({
          //     icon: "success",
          //     title: "Product Created successfully"
          // });
          alert("เพิ่มข้อมูลเรียบร้อย");
          this.reset();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    updateData() {
      db.collection("teams")
        .doc(this.team_id)
        .update({
          name: this.team.name,
          country: this.team.country,
          logo_url: this.team.logo_url,
          win: parseInt(this.team.win),
          down: parseInt(this.team.down),
          lost: parseInt(this.team.lost)
        })
        .then(() => {
          console.log("Document successfully updated!");
          this.watcher();
          alert("Update ข้อมูลเรียบร้อย");
          //  Toast.fire({
          //     icon: "success",
          //     title: "Product Update successfully"
          //   });
          this.reset();
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },
    deleteData(doc) {
      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: "You won't be able to revert this!",
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: 'Yes, delete it!'
      // }).then((result) => {
      //   if (result.value) {

      if (confirm("ยืนยันการลบข้อมูล !!!")) {
        db.collection("teams")
          .doc(doc)
          .delete()
          .then(() => {
            //   Swal.fire(
            //   'Deleted!',
            //   'Your file has been deleted.',
            //   'success'
            // )
            alert("ลบข้อมูลสำเร็จ");
            this.watcher();
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      }

      //   }
      // })
    },
    resetSearch() {
      this.search_data = "";
    },
    reset() {
      (this.team.name = null),
        (this.team.country = null),
        (this.team.logo_url = null),
        (this.team_id = null),
        window.$("#Modal_TeamForm").modal("hide");
    }
  },
  created() {
    this.readData();
  },
  mixins: [searchMixin]
};
</script>

<style scoped>
.badge {
    margin: 2px;
}
.filter .badge{
  cursor: pointer;
}
</style>
