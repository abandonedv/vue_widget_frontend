<template>
  <input
      class="cursor-pointer select-none rounded-[3px] border border-dashed border-gray-200 bg-white px-[9px] pt-[8px] pb-[7px] text-[13px] leading-[20px] transition-shadow"
      :value="value"
      :placeholder="this.placeholder"
      @input="updateInput"
  >

</template>

<script>
export default {
  name: "AInput",
  props: {
    value: { type: String },
    placeholder: { type: String },
  },
  methods: {
    updateInput(event) {
      this.$emit("update:value", event.target.value);
    },
  },
}
</script>

<style scoped>

</style>