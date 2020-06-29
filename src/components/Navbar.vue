<template>
  <div class="Navbar">
    <Login></Login>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark menu-desktop">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="#">My Bets</a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/bet" class="nav-link">Bet Match</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/teams" class="nav-link">Teams</router-link>
          </li>
        </ul>

        <form class="form-inline my-2 my-lg-0">
          <ul v-if="user" class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a href="#" class="nav-link"> {{ user.email }} | </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="logout"> Logout</a>
            </li>
          </ul>

          <button
            v-if="!user"
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#Modal_AuthUser"
          >
            Login
          </button>
        </form>
      </div>
    </nav>

    <nav class="navbar fixed-bottom navbar-expand navbar-dark bg-dark menu-mobile">
      <div class="" id="" style="width: 100%;">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0" style="width: 100%;">
          <li class="nav-item">
            <router-link to="/" class="nav-link"
              ><i class="fa fa-home"></i><br> Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/bet" class="nav-link"><i class="fas fa-list-alt"></i> <br>Match</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/teams" class="nav-link"><i class="fa fa-futbol"></i><br> Teams</router-link>
          </li>
          <li class="nav-item" v-if="!user">
             <a href="#" class="nav-link" data-toggle="modal"
            data-target="#Modal_AuthUser"><i class="fas fa-sign-in-alt"></i><br> Login</a>
          </li>
           <li class="nav-item" v-if="user">
             <a href="#" class="nav-link" @click="logout"><i class="fa fa-sign-out-alt"></i><br> Logout</a>
          </li>
        </ul>
      </div>
    </nav>

  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import { fb } from "../firebase";

export default {
  name: "navbar",
  components: { Login },
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Home" });
        });
    }
  },
  created() {
    //let user = firebase.auth().currentUser
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        //console.log(user);
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style scoped>
.menu-desktop {
    display: flex;
}
.menu-mobile {
   display: none;
  padding: 0;
}
.menu-mobile ul{
   margin-top: 0 !important;
}
.menu-mobile li{
  width: 25%;
  text-align: center;
  border-right: solid 1px;
}
.router-link-exact-active {
  color: #fff !important;
}


@media screen and (max-width: 992px) {
  .menu-mobile {
    display: flex;
  }
  .menu-desktop {
    display: none;
  }
}
</style>
