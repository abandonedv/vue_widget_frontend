<script setup>
import { GlobeIcon } from "@heroicons/vue/outline";
</script>

<template>
  <div class="rounded-[3px] bg-white p-[18px] pb-[29px] shadow-sm">
    <div v-if="loading" class="mt-[10px] flex w-full items-center justify-center">
      <globe-icon class="h-[35px] w-[35px] animate-spin text-sky-500" />
    </div>
    <div v-else class="w-[600px]">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useStore } from "@/store/index.js";

export default {
  inject: ["widget", "amocrm"],
  computed: { ...mapState(useStore, ["loading"]) },
  methods: { ...mapActions(useStore, ["load"]) },
  mounted() {
    this.load(this.widget, this.amocrm);
  },
};
</script>
