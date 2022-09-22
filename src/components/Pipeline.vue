<script setup>
import AControl from "@/components/ui/AControl.vue";
import numeral from "@/utils/numeral";
</script>

<template>
  <router-link :to="{ name: 'pipeline', params: { id: pipeline.id } }">
    <a-control class="flex items-center justify-between">
      <div>{{ pipeline.name }}</div>
      <div class="text-[12px] text-gray-500">
        {{ numeral(rules.length, ["правил", "правило", "правила"]) }}
      </div>
    </a-control>
  </router-link>
</template>

<script>
import { mapActions } from "pinia";
import { useStore } from "@/store";

export default {
  props: ["pipeline"],
  methods: { ...mapActions(useStore, ["getRules"]) },
  computed: {
    rules() {
      return this.getRules(this.pipeline.id);
    },
  },
};
</script>
