<template>
  <div class="login">
    <b-form v-if="show" class="container ">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Your Password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="password"
          required
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button class="loginbutton" @click="handleSubmit()" variant="success"
        >Login</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",

      show: true,
    };
  },
  computed: {
    ...mapState([
      "userHasAuthenticated",

      // ...
    ]),
  },
  methods: {
    async handleSubmit() {
      try {
        await Auth.signIn(this.email, this.password);
        alert("Logged in");
        this.$store.dispatch("changeValue", true);
        console.log("Logged in");
        console.log(this.userHasAuthenticated);
        this.$router.push("/");
      } catch (e) {
        alert(e.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin: center;
  margin-top: 100px;
  max-width: 500px;
}
.loginbutton {
  width: 200px;
}
</style>
