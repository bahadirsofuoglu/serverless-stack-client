<template>
  <div class="login">
    <b-form v-if="controlfrom == false" class="container ">
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
      <b-form-group
        id="input-group-2"
        label="Confirm Password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="confirmPassword"
          required
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button class="signupbutton" @click="handleSubmit()" variant="success"
        >Signup</b-button
      >
    </b-form>
    <b-form v-if="controlfrom == !false" class="container ">
      <b-form-group
        id="input-group-1"
        label="Confirmation Code:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="confirmationCode"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-button
        class="loginbutton"
        @click="handleConfirmSubmit()"
        variant="success"
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
      confirmPassword: "",
      controlfrom: false,
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
        const newUser = await Auth.signUp({
          username: this.email,
          password: this.password,
        });
        console.log(newUser);
        this.controlfrom = true;
        alert("signup");
        this.$store.dispatch("changeValue", true);
        console.log("signup ");
      } catch (e) {
        console.log(e);
      }
    },
    async handleConfirmSubmit() {
      try {
        await Auth.confirmSignUp(this.email, this.confirmationCode);
        await Auth.signIn(this.email, this.password);

        this.$store.dispatch("changeValue", true);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
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
.signupbutton {
  width: 200px;
}
</style>
