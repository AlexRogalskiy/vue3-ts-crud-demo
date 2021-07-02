<template>
  <div v-if="currentTutorial.id" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="btn btn-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>

    <button
      v-else
      class="btn btn-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="btn btn-danger mr-2" @click="deleteTutorial">
      Delete
    </button>

    <button type="submit" class="btn btn-success" @click="updateTutorial">
      Update
    </button>

    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "tutorial-detail",
  data() {
    return {
      currentTutorial: {} as Tutorial,
      message: "",
    };
  },
  methods: {
    /**
     * query tutorial by id
     */
    getTutorial(id: number) {
      TutorialDataService.get(id)
        .then((response: ResponseData) => {
          this.currentTutorial = response.data;
        })
        .catch((e: Error) => {
          console.error(e);
        });
    },
    /**
     * update status
     */
    updatePublished(status: boolean) {
      const data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status,
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then((response: ResponseData) => {
          this.currentTutorial.published = status;
          this.message = "Update status success!";
        })
        .catch((e: Error) => {
          console.error(e);
        });
    },
    /**
     * update tutorial
     */
    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then((response: ResponseData) => {
          this.message = "Update tutorial success!";
        })
        .catch((e: Error) => {
          console.error(e);
        });
    },
    /**
     * delete current tutorial
     */
    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then((response: ResponseData) => {
          this.$router.push({ name: "tutorials" });
        })
        .catch((e: Error) => {
          console.error(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorial(Number(this.$route.params.id));
  },
});
</script>

<style lang="less" scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
