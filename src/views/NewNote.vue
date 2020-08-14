<template>
  <div class="container">
    <b-form-textarea
      id="textarea-rows"
      v-model="note"
      placeholder="write a note"
      rows="13"
    ></b-form-textarea>

    <b-form-file></b-form-file>
    <b-button
      class="createNote mt-5"
      variant="success"
      @onclick="handleSubmit()"
      >Create</b-button
    >
  </div>
</template>

<script>
import { API } from "aws-amplify";
export default {
  data() {
    return {
      createNote: {
        note: "",
      },
    };
  },
  methods: {
    async handleSubmit(note) {
      await this.createNote({ note });
      try {
        await API.post("notes", "/notes", {
          body: this.note,
        });
      } catch (error) {
        console.log(error);
      }
      console.log("success");
    },
  },
};
</script>
<style>
.container {
  margin-top: 60px;
}
.createNote {
  width: 200px;
}
</style>
