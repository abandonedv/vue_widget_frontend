<script setup>
import AButton from "@/components/ui/AButton.vue";
import { GlobeIcon } from "@heroicons/vue/outline";
</script>

<template>
  <a-button
    type="primary"
    :class="{ '!border-[#d2a01a] !bg-[#e5b023] !text-white !opacity-100': state === 'saved' }"
    :disabled="disabled || saving"
  >
    <div v-if="state === 'default'">Сохранить</div>
    <div v-else-if="state === 'saved'">Сохранено</div>
    <globe-icon v-else-if="state === 'saving'" class="h-[14px] w-[14px] animate-spin" />
  </a-button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    saved: {
      type: Boolean,
      default: false,
    },
    saving: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({ state: "default" }),
  watch: {
    saving(value) {
      if (value) {
        this.state = "saving";
      } else {
        this.$nextTick(() => {
          if (this.state !== "saved") {
            this.state = "default";
          }
        });
      }
    },
    saved(value) {
      if (value) {
        this.state = "saved";
        setTimeout(() => {
          this.state = "default";
        }, 750);
      }
    },
  },
};
</script>
