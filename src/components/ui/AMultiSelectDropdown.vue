<script setup>
import { directive as vClickOutside } from "click-outside-vue3";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/solid";
import ACheckbox from "@/components/ui/ACheckbox.vue";
import AButton from "@/components/ui/AButton.vue";
</script>

<template>
  <div v-click-outside="() => (expanded = false)" class="relative">
    <div @click="expanded = !expanded" class="flex cursor-pointer items-center gap-1">
      <div>
        <slot />
      </div>
      <div class="mt-[2px] h-[14px] w-[14px]">
        <chevron-up-icon v-if="expanded" />
        <chevron-down-icon v-else />
      </div>
    </div>
    <div
      v-if="expanded"
      class="absolute right-0 z-20 mt-[3px] mr-[1px] overflow-hidden rounded-[5px] bg-white text-left shadow"
    >
      <div class="max-h-[350px] max-w-[280px] overflow-y-auto">
        <div
          v-for="option in options"
          :key="option.value"
          class="flex cursor-pointer truncate hover:bg-gray-50"
        >
          <a-checkbox
            class="w-full px-[19px] py-[13px]"
            :checked="value.has(option.value)"
            @update:checked="(checked) => toggle(option.value, checked)"
          >
            <div class="ml-[5px]">{{ option.label }}</div>
          </a-checkbox>
        </div>
      </div>
      <a-button class="!rounded-t-[0px] !py-[7px] !text-[13px]" type="primary" @click="apply">
        {{ text }}
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: { options: {}, text: { default: "Применить" } },
  emits: ["apply"],
  data: () => ({ expanded: false, value: new Set() }),
  methods: {
    toggle(value, checked) {
      if (checked) {
        this.value.add(value);
      } else {
        this.value.delete(value);
      }
    },
    apply() {
      this.expanded = false;
      this.$emit("apply", [...this.value]);
    },
  },
  watch: {
    expanded() {
      this.value = new Set();
    },
  },
};
</script>