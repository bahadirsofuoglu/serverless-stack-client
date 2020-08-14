<template>
  <div>
    <b-card>
      <b-row>
        <b-col md="4">
          <b-nav>
            <h4>Scratch</h4>
          </b-nav>
        </b-col>
        <b-col md="4"> </b-col>
        <b-col md="4">
          <b-nav pills align="right">
            <b-button
              v-if="userHasAuthenticated == !true"
              :to="(name = 'signup')"
              variant="outline-primary"
              >Signup</b-button
            >
            <b-button
              v-if="userHasAuthenticated == !true"
              :to="(name = 'login')"
              variant="outline-secondary"
              >Login</b-button
            >
            <b-button
              v-if="userHasAuthenticated == true"
              @click="handleLogout()"
              variant="outline-secondary"
              >logout</b-button
            >
          </b-nav>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
import { Auth } from "aws-amplify";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "userHasAuthenticated",

      // ...
    ]),
  },
  methods: {
    async handleLogout() {
      await Auth.signOut();
      alert("signOut");
      this.$store.dispatch("changeValue", false);
      this.$router.push("/login");
    },
  },
};
</script>
