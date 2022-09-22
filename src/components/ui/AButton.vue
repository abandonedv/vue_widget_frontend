<script setup>
import AControl from "@/components/ui/AControl.vue";
</script>

<template>
  <a-control
    class="!py-[10px] !px-[14px] text-center !text-[14px] !leading-[14px]"
    :class="{
      'font-bold': ['cancel', 'primary'].includes(type),
      '!border-[#e5e7eb] !bg-[#FFFFFF] text-[#92989b] hover:!bg-[#4d85e6]':
        type === 'primary' && !disabled,
      'mt-[1px] !border-0 text-[#92989b] !shadow-none': type === 'cancel',
    }"
    :disabled="disabled"
    @a-click="click"
  >
    <slot />
  </a-control>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "default",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Object,
      default: null,
    },
  },
  methods: {
    click() {
      if (this.to) {
        this.$router.push(this.to);
      }
    },
  },
};
</script>
