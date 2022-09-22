<script setup>
import ASelect from "@/components/ui/ASelect";
import ASaveButton from "@/components/ui/ASaveButton";
import {defaultFieldValues} from "@/utils/defaultValues";
import AInput from "@/components/ui/AInput";
import ASavedRule from "./ui/ASavedRule";
import AConditionSelect from "./ui/AConditionSelect";
import {makeStrCondition} from "@/utils/functions";
</script>


<template>
  <div class="flex w-full items-center justify-between">
    <div v-if="rule.isSaved === false" class="outer_div outer_div_not_saved_rule">
      <div class="column_div">
        <h3 class="my_header" :style="{'text-align': 'center'}">Условие</h3>
        <div v-for="condition in this.rule.task_condition_list.condition_list">
          <a-condition-select
              :task-condition="makeStrCondition(condition)"
              :style="{'margin-bottom': '10px'}"
          />
        </div>
        <a-condition-select
            v-model:task-condition="this.taskCondition"
            v-model:selected-sub-options = "this.selectedSubOptions"
            v-model:selected-operation="this.selectedOperation"

            @create="addNewCondition"
            :placeholder="'Добавить условие'"
            :conditions = this.conditions
        />
      </div>

      <div class="mid_column_div column_div">
        <h3 class="my_header">Выполнить</h3>
        <a-select
            v-model:value="taskPerformCondition"
            :options="defaultFieldValues.performConditionDefaultValues"
        />
        <h3 class="my_header">Со сроком выполнения</h3>
        <a-select
            v-model:value="taskPerformTime"
            :options="defaultFieldValues.performTimeDefaultValues"
        />
        <h3 class="my_header">Для</h3>
        <a-select
            v-model:value="taskPersonFor"
            :options = this.users
        />
      </div>

      <div class="column_div">
        <h3 class="my_header">Тип задачи</h3>
        <a-select
            v-model:value="taskType"
            :options="defaultFieldValues.taskTypeDefaultValues"
        />
        <h3 class="my_header">Комментарий</h3>
        <a-input
            v-model:value="taskComment"
            :placeholder="'Добавьте комментарий'"
            :style="{'margin-bottom': '38px'}"
        />
        <a-save-button class="save_button" @click="saveOneRule()"/>
      </div>
    </div>
    <a-saved-rule
        :rule = rule
        :all-conditions = this.conditions
        :operation = selectedOperation
    />
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import { useStore } from "@/store/index.js";
import { usePipelineStore } from "@/store/pipeline.js";

export default {
  data() {
    return {
      conditions: defaultFieldValues.conditionDefaultValues,
      users: [],
      taskConditionVar: {},
      selectedSubOptionsVar: [],
      selectedOperationVar: defaultFieldValues.logicalDefaultValues[1]
    }
  },
  inject: ["widget"],
  props: ["rule", "index"],
  computed: {
    ...mapState(useStore, ["entities"]),
    ...mapState(usePipelineStore, ["saving"]),
    taskCondition: {
      get() {
        return this.taskConditionVar
      },
      set(value) {
        this.taskConditionVar = value;
      },
    },
    selectedOperation: {
      get() {
        return this.selectedOperationVar
      },
      set(value) {
        this.selectedOperationVar = value;
      },
    },
    selectedSubOptions: {
      get() {
        return this.selectedSubOptionsVar
      },
      set(value) {
        this.selectedSubOptionsVar = value;
      },
    },
    taskPersonFor: {
      get() {
        return this.rule.task_person_for
      },
      set(value) {
        this.rule.task_person_for = value;
      },
    },
    taskPerformCondition: {
      get() {
        return this.rule.task_perform_condition
      },
      set(value) {
        this.rule.task_perform_condition = value;
      },
    },
    taskPerformTime: {
      get() {
        return this.rule.task_perform_time
      },
      set(value) {
        this.rule.task_perform_time = value;
      },
    },
    taskType: {
      get() {
        return this.rule.task_type
      },
      set(value) {
        this.rule.task_type = value;
      },
    },
    taskComment: {
      get() {
        return this.rule.task_comment
      },
      set(value) {
        this.rule.task_comment = value;
      },
    },
  },

  mounted() {
    for (let condition of this.conditions) {
      condition.name === "Теги" ? condition.value = this.getTagsIndx() : null
      condition.name === "Ответственный" ? condition.value = this.getUsersIndx() : null
      condition.name === "Ответственный" ? this.users = this.getUsersIndx() : null
      condition.name === "Источник" ? condition.value = this.getSourcesIndx() : null
    }
  },

  methods: {
    getErrors(exclude) {
      let errors = this.rule.errors.filter((e) => !exclude.includes(e.loc[2]));
      errors = errors.reduce((errors, error) => {
        errors.push(error.msg);
        return errors;
      }, []);
      return [...new Set(errors)];
    },
    clearErrors(exclude) {
      this.rule.errors = this.rule.errors.filter((e) => exclude.includes(e.loc[2]));
    },
    saveOneRule() {
      this.rule.isSaved = true
    },
    addNewCondition() {
      if (this.taskCondition.name != undefined) {
        if (this.selectedSubOptions.length != 0) {
          this.rule.task_condition_list.condition_list.push(
              {
                "condition_name": this.taskCondition.name,
                "selected_values": JSON.parse(JSON.stringify(this.selectedSubOptionsVar)),
                "selected_operation": this.selectedOperation
              })
        }
        this.taskCondition = {}
        this.selectedOperation = defaultFieldValues.logicalDefaultValues[1]
        this.selectedSubOptions = []
      }
    },
    ...mapActions(useStore,
        [
          "getUsersIndx",
          "getSourcesIndx",
          "getTagsIndx"
        ])
  },
};
</script>

<style scoped>
@import '@/styles/stylesForComponents.css';
</style>