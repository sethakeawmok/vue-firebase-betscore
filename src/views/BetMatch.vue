<template>
  <div class="betmatch">
    <Navbar></Navbar>
    <div class="container">

      <!-- Modal -->
      <div
        class="modal fade"
        id="Modal_BetForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
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
                <div class="form-group row">
                  <div class="col">
                    <v-select :options="teams" v-model="bet_match.home"></v-select>
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="customRadiohome"
                        name="customRadiohome"
                        value="home"
                        v-model="bet_match.change"
                      />
                      <label class="custom-control-label" for="customRadiohome"
                        >เลือก</label
                      >
                    </div>
                  </div>
                  <div class="text-center">
                    VS
                  </div>
                  <div class="col">
                    <v-select :options="teams" v-model="bet_match.away"></v-select>
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        class="custom-control-input"
                        id="customRadioaway"
                        name="customRadioaway"
                        value="away"
                        v-model="bet_match.change"
                      />
                      <label class="custom-control-label" for="customRadioaway"
                        >เลือก</label
                      >
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      v-model="bet_match.bet"
                      value="0"
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <div class="col">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Score Home"
                      v-model="bet_match.score_home"
                      value="0"
                    />
                  </div>
                  <div class="text-center">
                    VS
                  </div>
                  <div class="col">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Score Away"
                      v-model="bet_match.score_away"
                      value="0"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <select
                    name="bet_status"
                    class="form-control"
                    id=""
                    v-model="bet_match.status"
                  >
                    <option value="">Bet Status</option>
                    <option value="W">Win</option>
                    <option value="D">Down</option>
                    <option value="L">Lost</option>
                  </select>
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
                  @click="closeModal"
                >
                  Claer
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
        + Add Bet
      </button>

      <div class="row">
        <div class="col-lg-12 mt-3 mb-3">
          <span style="float: right;">Bets Total {{ bets_match.length }}</span>
        </div>
        <div class="col-lg-12 mt-3 mb-3">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" style="min-width: 200px;">Bet</th>
                  <th scope="col" class="text-center" style="min-width: 140px;">Status</th>
                  <th scope="col" class="text-center" style="min-width: 170px;">Mgt</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="match in bets_match" :key="match.id">
                  <td>
                    <span v-bind:class="{'font-weight-bold':(match.data().change === 'home')}">{{ match.data().home }}</span>
                    <span v-if="match.data().change === 'home'"> [{{ match.data().bet }}]</span>
                    <br>
                    <span v-bind:class="{'font-weight-bold':(match.data().change === 'away')}">{{ match.data().away }}</span>
                    <span v-if="match.data().change === 'away'"> [{{ match.data().bet }}]</span>
                  </td>
                  <td class="text-center">
                      <span
                        v-bind:class="{'badge':true
                        ,'badge-success':(match.data().status == 'W')
                        ,'badge-warning':(match.data().status == 'D')
                        ,'badge-danger':(match.data().status == 'L')}"
                      >
                        {{ match.data().score_home }} - {{ match.data().score_away }} </span
                      >
                  </td>
                  <td class="text-center">
                    <a
                      class="btn btn-info btn-sm"
                      href="#"
                      @click="editModal(match)"
                    >
                      <i class="fas fa-pencil-alt"> </i>
                      Edit </a
                    >&nbsp;
                    <a
                      class="btn btn-danger btn-sm"
                      href="#"
                      @click="deleteData(match.id)"
                    >
                      <i class="fas fa-trash"> </i>
                      Delete
                    </a>
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

import { db } from "@/firebase";

export default {
  name: "betmatch",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      editmode: false,
      teams: [],
      bets_match: [],
      bet_match: {
        home: "",
        away: "",
        change: "",
        bet: 0,
        score_home: 0,
        score_away: 0,
        status: ""
      },
      bet_match_id: null
    };
  },
  methods: {
    getAllTeams() {
      this.teams = [];
      db.collection("teams")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            //console.log(doc.id, " => ", doc.data());
            this.teams.push(doc.data().name);
          });
        });
    },
    newModal() {
      this.editmode = false;
      this.reset();
      window.$("#Modal_BetForm").modal();
    },
    editModal(match) {
      this.editmode = true;
      this.bet_match = match.data();
      this.bet_match_id = match.id;
      window.$("#Modal_BetForm").modal();
    },
    watcher() {
      db.collection("bet_match").orderBy("date", "desc").onSnapshot(querySnapshot => {
        this.bets_match = [];
        querySnapshot.forEach(doc => {
          this.bets_match.push(doc);
        });
      });
    },
    getAllBets() {
      this.bets_match = [];
      db.collection("bet_match")
        .orderBy("date", "desc")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            //console.log(doc.id, " => ", doc.data());
            this.bets_match.push(doc);
            //console.log(this.teams);
          });
        });
    },
    saveData() {
      db.collection("bet_match")
        .add({
          home: this.bet_match.home,
          away: this.bet_match.away,
          change: this.bet_match.change,
          bet: this.bet_match.bet,
          score_home: this.bet_match.score_home,
          score_away: this.bet_match.score_away,
          status: this.bet_match.status,
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
          window.$("#Modal_BetForm").modal("hide");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    updateData() {
      db.collection("bet_match")
        .doc(this.bet_match_id)
        .update({
          home: this.bet_match.home,
          away: this.bet_match.away,
          change: this.bet_match.change,
          bet: this.bet_match.bet,
          score_home: this.bet_match.score_home,
          score_away: this.bet_match.score_away,
          status: this.bet_match.status,
          date: Date.now()
        })
        .then(() => {
          //console.log("Document successfully updated!");
          this.watcher();
          alert("Update ข้อมูลเรียบร้อย");
          this.reset();
          window.$("#Modal_BetForm").modal("hide");
          //  Toast.fire({
          //     icon: "success",
          //     title: "Product Update successfully"
          //   });
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
        db.collection("bet_match")
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
    closeModal() {
      window.$("#Modal_BetForm").modal("hide");
      this.reset();
    },
    reset() {
      (this.bet_match.home = ""),
        (this.bet_match.away = ""),
        (this.bet_match.change = ""),
        (this.bet_match.bet = 0),
        (this.bet_match.score_home = 0),
        (this.bet_match.score_away = 0),
        (this.bet_match.status = ""),
        (this.bet_match_id = null);
    }
  },
  created() {
    this.getAllBets();
    this.getAllTeams();
  }
};
</script>
