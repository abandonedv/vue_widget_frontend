<script setup>
import Card from "@/components/Card.vue";
import Pipeline from "@/components/Pipeline.vue";
</script>

<template>
  <card>
    <template #title>Выберите воронку</template>
    <template #content>
      <div class="flex flex-col gap-3">
        <pipeline v-for="pipeline in pipelines" :key="pipeline.id" :pipeline="pipeline" />
      </div>
    </template>
  </card>
</template>

<script>
import { mapState } from "pinia";
import { useStore } from "@/store/index.js";

export default {
  computed: { ...mapState(useStore, ["pipelines"]) },
};
</script>
