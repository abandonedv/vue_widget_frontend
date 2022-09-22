<script setup>
import AButton from "@/components/ui/AButton.vue";
import numeral from "@/utils/numeral";
import ACollapse from "@/components/ui/ACollapse.vue";
import Rule from "@/components/Rule.vue";
import { PlusIcon } from "@heroicons/vue/solid";
import ACheckbox from "@/components/ui/ACheckbox.vue";
import AMultiSelectDropdown from "@/components/ui/AMultiSelectDropdown.vue";
</script>

<template>
  <a-collapse>
    <template #default>
      <div class="flex items-center justify-between">
        <div>{{ status.name }}</div>
        <div class="text-[12px] text-gray-500" :class="{ 'text-rose-500': hasErrors }">
          {{ numeral(rules.length, ["правил", "правило", "правила"]) }}
        </div>
      </div>
    </template>
    <template #content>
      <div class="flex select-none flex-col flex-col items-center gap-5 p-[10px] text-[14px]">
        <div
          v-if="rules.length"
          class="flex w-full items-center justify-between pl-[10px] pr-[11px]"
        >
          <a-checkbox
            class="mr-[8px]"
            :checked="isAllSelected(status.id)"
            @update:checked="toggleSelected(status.id)"
          >
            Выбрать все
          </a-checkbox>
          <div class="flex items-center gap-5 text-[13px]">
            <a-multi-select-dropdown
              text="Копировать"
              :options="copyOptions"
              @apply="(statusIDs) => (saving ? null : copyRules(status.id, statusIDs))"
            >
              Копировать выбранные ({{ selectedRules.length }})
            </a-multi-select-dropdown>
            <div
              class="cursor-pointer select-none self-end text-rose-600 underline transition-colors"
              @click="saving ? null : deleteRules(status.id)"
            >
              Удалить выбранные ({{ selectedRules.length }})
            </div>
          </div>
        </div>
        <rule v-for="(rule, index) in rules"
              :key="index"
              :rule="rule"
              :index="index"
        />
        <a-button
          class="flex items-center justify-center gap-2 border-dashed"
          @a-click="addRule(status.id)"
          :disabled="saving"
        >
          <plus-icon class="mt-[1px] h-[13px]" />
          <div>Добавить правило</div>
        </a-button>
      </div>
    </template>
  </a-collapse>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { usePipelineStore } from "@/store/pipeline.js";

export default {
  props: ["status"],
  computed: {
    ...mapState(usePipelineStore, ["saving", "pipeline"]),
    rules() {
      return this.getRules(this.status.id);
    },
    hasErrors() {
      return this.rules.filter((r) => r.errors.length).length > 0;
    },
    copyOptions() {
      return this.pipeline.statuses.reduce((options, status) => {
        options.push({ label: `В «${status.name}»`, value: status.id });
        return options;
      }, []);
    },
    selectedRules() {
      return this.getSelectedRules(this.status.id);
    },
  },

  methods: {
    ...mapActions(usePipelineStore, [
      "getRules",
      "getUsers",
      "addRule",
      "deleteRules",
      "copyRules",
      "getSelectedRules",
      "isAllSelected",
      "toggleSelected",
    ])
  },
};
</script>
