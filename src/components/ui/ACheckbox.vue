<script setup>
import AControl from "@/components/ui/AControl.vue";
</script>

<template>
  <div
    class="-m-[5px] flex cursor-pointer select-none items-center gap-2 p-[5px]"
    @click="$emit('update:checked', !checked)"
  >
    <a-control
      class="ks__checkbox h-[16px] w-[16px] !p-0 !shadow-none"
      v-bind="$attrs"
      :class="{ checked }"
    />
    <div v-if="$slots.default">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["checked"],
};
</script>

<style>
.ks__checkbox.checked {
  background: url("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJfeDIwMTRfX0l0ZW1fMV8iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCINCgkgeT0iMHB4IiB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMXB4IiB2aWV3Qm94PSIwIDAgMTIgMTEiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyIDExIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIGlkPSJjaGVjay5zdmciPg0KCTxnPg0KCQk8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzJFMzY0MCIgZD0iTTExLjQ3NiwwLjE1MWMtMC4zNzctMC4yOTYtMC45OTctMC4xMzktMS4zNTksMC4zMjRMNS4xNTMsNi41Mw0KCQkJQzUuMDc3LDYuNjI0LDQuODg0LDYuNjU3LDQuNzg1LDYuNTk1TDEuNzIzLDQuNjg4QzEuMjQsNC4zNDIsMC42MjQsNC4zNjYsMC4zNDksNC43NTNjLTAuMjY4LDAuMzc4LTAuMTgsMC45OTQsMC4yMDksMS40NjQNCgkJCWwzLjUwOSw0LjIzNEM0LjM2MSwxMC44MDUsNC43NDIsMTEsNS4xNCwxMWMwLjQ2NSwwLDAuODk1LTAuMjY2LDEuMTc3LTAuNzI4bDUuMjY0LTguNjE1QzExLjkxNiwxLjEwOSwxMS44NzEsMC40NjIsMTEuNDc2LDAuMTUxDQoJCQl6Ii8+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=")
    no-repeat center;
}
</style>
