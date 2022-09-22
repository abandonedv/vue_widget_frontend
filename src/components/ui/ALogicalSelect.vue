<script setup>
import AControl from "@/components/ui/AControl.vue";
import { directive as vClickOutside } from "click-outside-vue3";
</script>

<template>
  <div v-click-outside="() => (expanded = false)">
    <a-control
        v-bind="$attrs"
        class="border-dashed"
        :title="title"
        :disabled="disabled"
        @a-click.stop="expanded = !expanded"
    >
      <div class="flex-1">
        <u>{{ title }}</u>
      </div>
    </a-control>
    <div
        v-if="!disabled && expanded"
        class="absolute z-20 mt-[3px] ml-[1px] overflow-hidden rounded-[5px] bg-white text-left shadow"
    >
      <div class="max-h-[350px] max-w-[280px] overflow-y-auto">
        <div
            v-for="option in options"
            :key="option.name"
            class="cursor-pointer truncate p-[5px] pl-[15px] hover:bg-gray-300"
            :title="option.name"
            @click.stop="select(option)"
        >
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: { type: Object },
    options: { type: Object },
    placeholder: { type: String },
    disabled: { type: Boolean, default: false },
    errors: { type: Array, default: [] },
  },
  data: () => ({ expanded: false }),
  computed: {
    title() {
      return this.value ? this.value.name : this.placeholder;
    },
  },
  methods: {
    select(value) {
      this.$emit("update:value", value);
      this.expanded = false;
    },
  },
};
</script>

<style scoped>
@import '@/styles/stylesForComponents.css';
</style>
