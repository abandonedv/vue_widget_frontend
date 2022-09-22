<script setup>
import {makeStrConditionSaved} from "../../utils/functions";
</script>

<template>
  <div v-if="rule.isSaved === true" class="flex w-full items-center justify-between">
    <a-checkbox v-model:checked="rule.isSelected" />
    <div class="outer_div outer_div_saved_rule">
      <p>
        <b>Если:</b>
        {{
          rule.task_condition_list.condition_list.length != 0 ?
          `Сделка.${rule.task_condition_list.condition_list.map((item) => makeStrConditionSaved(item, allConditions).name).join(', ')}` :
          null
        }}
      </p>

      <p>
        <b>Создать задачу:</b>
        {{ rule.task_type ? rule.task_type.name : null }}
      </p>

      <p>
        <b>Выполнить:</b>
        {{ rule.task_perform_condition ? rule.task_perform_condition.name : null }}
      </p>

      <p>
        <b>Со сроком выполнения:</b>
        {{ rule.task_perform_time ? rule.task_perform_time.name : null }}
      </p>

      <p>
        <b>Для:</b>
        {{ rule.task_person_for ? rule.task_person_for.name : null }}
      </p>

      <p>
        <b>Комментарий:</b>
        {{ rule.task_comment }}
      </p>
    </div>
  </div>
</template>

<script>
import ACheckbox from "./ACheckbox";

export default {
  name: "ASavedRule",
  components: {ACheckbox},
  props: {
    rule: { type: Object },
    allConditions: { type: Object },
  }
}
</script>

<style scoped>
@import '@/styles/stylesForComponents.css';
</style>