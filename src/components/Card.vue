<template>
  <div class="flex flex-col gap-5">
    <div class="text-[16px] font-semibold">
      <slot name="title" />
    </div>
    <slot name="content" />
  </div>
</template>

<script>
export default {};
</script>
