<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="container text-center mt-3">
      <h1>Welcome To My Bets</h1>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Footer
  }
};
</script>
