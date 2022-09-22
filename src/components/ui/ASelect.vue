<script setup>
import AControl from "@/components/ui/AControl.vue";
import { directive as vClickOutside } from "click-outside-vue3";
import { ChevronDownIcon, ChevronUpIcon, InformationCircleIcon } from "@heroicons/vue/solid";
</script>

<template>
  <div v-click-outside="() => (expanded = false)" class="relative select-none">
    <a-control
      v-bind="$attrs"
      class="flex items-center border-dashed"
      :title="title"
      :disabled="disabled"
      @a-click.stop="expanded = !expanded"
    >
      <div
        v-if="errors.length"
        class="-ml-[9px] -mt-[1px] px-[9px] text-red-400"
        :title="errors.join(', ')"
      >
        <information-circle-icon class="h-[15px] w-[15px]" />
      </div>
      <div class="flex-1 truncate">{{ title }}</div>
      <div class="-mr-[9px] mt-[1px] px-[9px]">
        <div v-if="expanded">
          <chevron-up-icon class="h-[15px] w-[15px]" />
        </div>
        <div v-else>
          <chevron-down-icon class="h-[15px] w-[15px]" />
        </div>
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
      this.$emit('update:value', value);
      this.expanded = false;
    },
  },
};
</script>
