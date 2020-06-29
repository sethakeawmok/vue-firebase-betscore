<template>
  <div class="login">
    <!-- Modal -->
    <div
      class="modal fade animate Modal_TeamDetail"
      id="Modal_TeamDetail"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content animate-bottom">

          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"> <i class="fas fa-arrow-left" style="cursor: pointer;" @click="back"></i></h5>
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



          <div class="row no-gutters mt-2">
            <div class="col-md-6 text-center">
              <img
                :src="team.logo_url"
                class=""
                alt=""
                style="max-height: 100px;"
              />
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title">{{ team.name }}</h5>
                <p class="card-text">{{ team.country }}</p>
                <table class="table">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">Win</th>
                      <th class="text-center" scope="col">
                        Down
                      </th>
                      <th class="text-center" scope="col">Lost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center">{{ team.win }}</td>
                      <td class="text-center">{{ team.down }}</td>
                      <td class="text-center">{{ team.lost }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="row no-gutters">
            <div class="col-md-12 text-left">
              <a href="#" @click="sortByDate">sortByDate</a>
            </div>
            <div class="col-md-12 text-center">
              <table class="table">
                <thead>
                  <tr>
                    <th class="text-center" scope="col" style="width: 40%;">
                      Home
                    </th>
                    <th
                      class="text-center"
                      scope="col"
                      style="min-width: 60px;"
                    >
                      VS
                    </th>
                    <th class="text-center" scope="col" style="width: 40%;">
                      Away
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="match in matchs" :key="match.id">
                    <td class="text-center">
                      <b>{{ match.data().home }}</b>
                      <span v-if="match.data().change == 'home'"> ({{ match.data().bet }})</span>
                    </td>
                    <td class="text-center">
                      <div v-if="match.data().change == 'home'">
                          <span v-if="match.data().home == team.name">
                            <span
                              class="badge badge-success"
                              v-if="match.data().status == 'W'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }} <br><br>Win </span
                            >
                            <span
                              class="badge badge-warning"
                              v-if="match.data().status == 'D'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }}<br><br>Down</span
                            >
                            <span
                              class="badge badge-danger"
                              v-if="match.data().status == 'L'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }}<br><br>Lost</span
                            >
                          </span> 
                          <span v-else>
                            <span
                              class="badge badge-success"
                              v-if="match.data().status == 'L'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }} <br><br>Win </span
                            >
                            <span
                              class="badge badge-warning"
                              v-if="match.data().status == 'D'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }}<br><br>Down</span
                            >
                            <span
                              class="badge badge-danger"
                              v-if="match.data().status == 'W'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }}<br><br>Lost</span
                            >
                          </span> 
                      </div>
                      <div v-else>
                          <span v-if="match.data().away == team.name">
                            <span
                              class="badge badge-success"
                              v-if="match.data().status == 'W'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }} <br><br>Win </span
                            >
                            <span
                              class="badge badge-warning"
                              v-if="match.data().status == 'D'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }}<br><br>Down</span
                            >
                            <span
                              class="badge badge-danger"
                              v-if="match.data().status == 'L'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }}<br><br>Lost</span
                            >
                          </span> 
                          <span v-else>
                            <span
                              class="badge badge-success"
                              v-if="match.data().status == 'L'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }} <br><br>Win </span
                            >
                            <span
                              class="badge badge-warning"
                              v-if="match.data().status == 'D'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }}<br><br>Down</span
                            >
                            <span
                              class="badge badge-danger"
                              v-if="match.data().status == 'W'"
                            >
                              {{ match.data().score_home }} - {{ match.data().score_away }}<br><br>Lost</span
                            >
                          </span> 
                      </div>
                      
                    </td>
                    <td class="text-center">
                      <b>{{ match.data().away }}</b><span v-if="match.data().change == 'away'"> ({{ match.data().bet }})</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  name: "ModalTeamDetail",
  data() {
    return {
      matchs: [],
      team: {
        name: null,
        country: null,
        logo_url: null,
        win: 0,
        down: 0,
        lost: 0
      },
      team_id: null,
      count: {
        win: 0,
        down: 0,
        lost: 0
      }
    };
  },
  methods: {
    back(){
      window.$("#Modal_TeamDetail").modal("hide");
    },
    sortByDate() {
      this.matchs.sort((a, b) =>
        a.data().date < b.data().date
          ? 1
          : a.data().date > b.data().date
          ? -1
          : 0
      );
    },
    ShowTeamDetail(team){
      this.team.name = team.data().name
      this.team.country = team.data().country
      this.team.logo_url = team.data().logo_url
      this.team.win = team.data().win
      this.team.down = team.data().down
      this.team.lost = team.data().lost

      this.getMatchByTeamData()

      setTimeout(() => {
        this.sortByDate();
      }, 1000);
    },
    getMatchByTeamData() {
      this.matchs = [];
      db.collection("bet_match")
        .where("home", "==", this.team.name)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            //console.log(doc.id, " => ", doc.data());
            this.matchs.push(doc);

            if (doc.data().change == "home") {
              if (doc.data().status == "W") {
                this.count.win += 1;
              } else if (doc.data().status == "D") {
                this.count.down += 1;
              } else if (doc.data().status == "L") {
                this.count.lost += 1;
              }
            } else {
              if (doc.data().status == "W") {
                this.count.lost += 1;
              } else if (doc.data().status == "D") {
                this.count.down += 1;
              } else if (doc.data().status == "L") {
                this.count.win += 1;
              }
            }
            //console.log(doc.data().status);
          });
        });

      db.collection("bet_match")
        .where("away", "==", this.team.name)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            //console.log(doc.id, " => ", doc.data());
            this.matchs.push(doc);

            if (doc.data().change == "away") {
              if (doc.data().status == "W") {
                this.count.win += 1;
              } else if (doc.data().status == "D") {
                this.count.down += 1;
              } else if (doc.data().status == "L") {
                this.count.lost += 1;
              }
            } else {
              if (doc.data().status == "W") {
                this.count.lost += 1;
              } else if (doc.data().status == "D") {
                this.count.down += 1;
              } else if (doc.data().status == "L") {
                this.count.win += 1;
              }
            }
          });
        });
    }
  }
};
</script>
<style scoped>
.Modal_TeamDetail {
  padding: 0 !important;
  background-color: white;
}
.modal-dialog {
  margin: 0;
  max-width: 100%;
}
.modal-content {
  border-radius: 0px;
}
.animate-bottom {
  position: relative;
  animation: animatebottom 0.4s;
}

@keyframes animatebottom {
  from {
    bottom: -300px;
    opacity: 0;
  }

  to {
    bottom: 0;
    opacity: 1;
  }
}
</style>
