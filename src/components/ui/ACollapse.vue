<script setup>
import AControl from "@/components/ui/AControl.vue";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/solid";
</script>

<template>
  <div>
    <a-control
      class="relative z-10 flex"
      :class="{ 'hover:!shadow-none': expanded }"
      @click="expanded = !expanded"
    >
      <div class="flex-1">
        <slot />
      </div>
      <div class="-mr-[9px] mt-[3px] px-[9px]">
        <div v-if="expanded">
          <chevron-up-icon class="h-[15px] w-[15px]" />
        </div>
        <div v-else>
          <chevron-down-icon class="h-[15px] w-[15px]" />
        </div>
      </div>
    </a-control>
    <div
      v-if="expanded"
      class="z-0 -mt-[5px] select-all rounded-b-[3px] border border-solid border-gray-200 bg-white p-[9px] pt-[14px]"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
