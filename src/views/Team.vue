<template>
  <div class="betmatch">
    <Navbar></Navbar>

    <div class="container">
      <div class="row">
        <div class="card mb-3 mt-3" style="width: 100%;">
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
                      <td class="text-center">{{ count.win }}</td>
                      <td class="text-center">{{ count.down }}</td>
                      <td class="text-center">{{ count.lost }}</td>
                    </tr>
                  </tbody>
                </table>
                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
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
          <div style="height:50px"></div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

import { db } from "@/firebase";
import moment from "moment";

export default {
  name: "betmatch",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      moment: moment,
      search_data: "",
      editmode: false,
      matchs: [],
      team: {
        name: null,
        country: null,
        logo_url: null
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
    sortByDate() {
      this.matchs.sort((a, b) =>
        a.data().date < b.data().date
          ? 1
          : a.data().date > b.data().date
          ? -1
          : 0
      );
    },
    getTeamData() {
      this.team.name = this.$route.params.team_name;
      let ref = db
        .collection("teams")
        .where("name", "==", this.$route.params.team_name);
      ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          //console.log(doc.id, " => ", doc.data());
          this.team_id = doc.id;
          this.team = doc.data();
        });
      });
    },
    getMatchByTeamData() {
      //console.log(this.team.name);
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
  },
  created() {
    this.getTeamData();
    this.getMatchByTeamData();

    setTimeout(() => {
      this.sortByDate();
    }, 1000);
  }
};
</script>

<style scoped></style>
