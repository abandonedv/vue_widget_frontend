<script setup>
import AButton from "@/components/ui/AButton.vue";
import Card from "@/components/Card.vue";
import Status from "@/components/Status.vue";
import ASaveButton from "@/components/ui/ASaveButton.vue";
</script>

<template>
  <card v-if="pipeline">
    <template #title>{{ pipeline.name }}</template>
    <template #content>
      <div class="flex flex-col gap-3">
        <status v-for="status in pipeline.statuses" :key="status.id" :status="status" />
      </div>
      <div class="flex justify-between">
        <a-button :to="{ name: 'pipelines' }" :disabled="saving">Назад</a-button>
        <div class="flex gap-2">
<!--          <a-button v-if="modified && !saving" type="cancel" @click="reset">Отменить</a-button>-->
          <a-save-button :saving="saving" :saved="saved" :disabled="!modified" @a-click="save" />
        </div>
      </div>
    </template>
  </card>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useStore } from "@/store/index.js";
import { usePipelineStore } from "@/store/pipeline";

export default {
  inject: ["widget", "amocrm"],
  computed: { ...mapState(usePipelineStore, ["pipeline", "modified", "saving", "saved"]) },
  methods: {
    ...mapActions(useStore, ["getPipeline"]),
    ...mapActions(usePipelineStore, ["load", "reset", "save"]),
  },
  created() {
    let pipeline = this.getPipeline(+this.$route.params.id);

    if (!pipeline) {
      this.$router.push({ name: "pipelines" });
    } else {
      this.load(this.widget, this.amocrm, pipeline);
    }
  },
};
</script>
