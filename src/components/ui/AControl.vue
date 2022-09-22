<template>
  <div
    class="cursor-pointer select-none rounded-[3px] border border-solid border-gray-200 bg-white px-[9px] pt-[8px] pb-[7px] text-[15px] leading-[20px] transition-shadow"
    :class="{
      'bg-[#fcfcfc] opacity-60': disabled,
      'hover:shadow-sm': !disabled,
    }"
    @click="click"
  >
    <slot/>
  </div>
</template>

<script>
export default {
  props: { disabled: { type: Boolean, default: false } },
  emits: ["a-click"],
  methods: {
    click(e) {
      if (!this.disabled) {
        this.$emit("a-click", e);
      }
    },
  },
};
</script>
