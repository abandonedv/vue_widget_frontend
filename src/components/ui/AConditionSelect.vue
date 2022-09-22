<script setup>
import AControl from "@/components/ui/AControl.vue";
import { directive as vClickOutside } from "click-outside-vue3";
import {defaultFieldValues} from "../../utils/defaultValues";
import ALogicalSelect from "./ALogicalSelect";
</script>

<template>
  <div v-click-outside="createNew" class="relative select-none">
    <a-control
        v-bind="$attrs"
        class="flex items-center border-dashed"
        :title="title"
        :disabled="disabled"
        @a-click.stop="expanded = !expanded"
    >
      <div v-if="conditionSelectedFlag === false" class="flex-1 truncate">
        <div v-if="title == placeholder"
             :style="{'text-align': 'center', 'color': '#92989b'}"
        >
          {{ title }}
        </div>
        <div v-else>
          {{ title }}
        </div>
      </div>

      <div v-if="conditionSelectedFlag === true" class="flex-1 truncate">
        <div :style="{'display':'inline-block'}">
        {{ this.taskCondition.name }}
        </div>
        (<a-logical-select
            :options="defaultFieldValues.logicalDefaultValues"
            class="flex items-center border-none"
            v-model:value="selectedOperation"
            @update:value="changeOperation"
            :style="{'display': 'inline-block', 'padding': '0', 'margin': '0'}"
        />):
        {{ this.selectedSubOptions.map((item) => (item.name)).join('; ')}}
      </div>
    </a-control>
    <div
        v-if="!disabled && expanded"
        class="absolute z-20 mt-[3px] ml-[1px] overflow-hidden rounded-[5px] bg-white text-left shadow"
    >
      <div class="max-h-[350px] max-w-[280px] overflow-y-auto">
        <div
            v-if="conditionSelectedFlag === false"
            v-for="option in conditions"
            :key="option.name"
            class="cursor-pointer truncate p-[5px] pl-[15px] hover:bg-gray-300"
            :title="option.name"
            @click.stop="selectCondition(option)"
        >
          {{ option.name }}
        </div>
        <div
            v-if="conditionSelectedFlag === true"
            v-for="option in this.taskCondition.value"
            :key="option.name"
            class="cursor-pointer truncate p-[5px] pl-[15px] hover:bg-gray-300"
            :title="option.name"
            @click.stop="selectSubCondition(option)"
        >
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defaultFieldValues} from "../../utils/defaultValues";

export default {
  props: {
    taskCondition: { type: Object },
    selectedSubOptions: { type: Array },
    selectedOperation: { type: Object },
    placeholder: { type: String },
    disabled: { type: Boolean, default: false },
    errors: { type: Array, default: [] },
    conditions: { type: Array }
  },
  data: () => (
      {
        expanded: false,
        conditionSelectedFlag: false,
      }
  ),
  computed: {
    title() {
      if (this.taskCondition != undefined) {
        if (this.taskCondition.name != undefined) {
          return this.taskCondition.name
        }
      }
      return this.placeholder;
    }
  },

  methods: {
    selectCondition(value) {
      console.log(value)
      this.$emit("update:taskCondition", value);
      this.expanded = false;
      this.conditionSelectedFlag = true
    },
    selectSubCondition(value) {
      let clone = JSON.parse(JSON.stringify(this.selectedSubOptions));
      clone.push(value)
      this.$emit("update:selectedSubOptions", clone);
    },
    createNew() {
      this.expanded = false
      this.conditionSelectedFlag = false
      this.$emit('create');
    },
    changeOperation(myValue) {
      this.$emit('update:selectedOperation', myValue);
    }
  },
};
</script>

<style scoped>
@import '@/styles/stylesForComponents.css';
</style>
