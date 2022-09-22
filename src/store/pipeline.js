import {defineStore, mapActions, mapState} from "pinia";
import {cloneDeep, isEqual} from "lodash";
import {useStore} from "@/store/index";
import Api from "@/utils/api";

export const usePipelineStore = defineStore("pipelineStore", {
  api: null,
  state: () => ({
    pipeline: null,
    rules: [],
    saving: false,
    saved: false,
  }),
  getters: {
    ...mapState(useStore, { allRules: "rules", pipelines: "pipelines" }),
    prevRules() {
      return this.allRules.filter((r) => r.pipeline_id === this.pipeline.id);
    },
    rulesData() {
      return this.rulesToData(this.rules);
    },
    prevRulesData() {
      return this.rulesToData(this.prevRules);
    },
    modified() {
      return !isEqual(this.rulesData, this.prevRulesData);
    },
  },
  actions: {
    ...mapActions(useStore, ["updateRules"]),
    load(widget, amocrm, pipeline) {
      this.api = new Api(widget, amocrm);
      this.pipeline = pipeline;
      this.rules = cloneDeep(this.prevRules);
    },
    reset() {
      this.rules = cloneDeep(this.prevRules);
    },
    save() {
      this.saving = true;
      this.saved = false;
      this.clearErrors();

      this.api.updateRules({
        pipeline_id: this.pipeline.id,
        rules: this.rulesData,
        success: () => {
          this.updateRules(this.pipeline.id, this.rules);
          this.saved = true;
        },
        error: (data) => {
          this.bindErrors(data.responseJSON.detail);
        },
        complete: () => {
          this.saving = false;
        },
      });
    },
    rulesToData(rules) {
      return rules.reduce((rules, rule) => {
        const {
          status_id,
          task_time,
          task_condition_list,
          task_perform_condition,
          task_perform_time,
          task_person_for,
          task_type,
          task_comment
        } = rule;

        rules.push(
          {
            status_id,
            task_time,
            task_condition_list,
            task_perform_condition,
            task_perform_time,
            task_person_for,
            task_type,
            task_comment
          });
        return rules;
      }, []);
    },
    getRules(statusID) {
      return this.rules.filter((r) => r.status_id === statusID);
    },
    addRule(statusID) {
      this.rules.push({
        pipeline_id: this.pipeline.id,
        status_id: statusID,
        task_time: Date.now().toString(),
        task_condition_list: {condition_list: []},
        task_perform_condition: {},
        task_perform_time: {},
        task_person_for: {},
        task_type: {},
        task_comment: "",
        errors: [],
        isSelected: false,
        isSaved: false,
      });
    },
    deleteRules(statusID) {
      this.rules = this.rules.filter((r) => r.status_id !== statusID || !r.isSelected);
    },
    copyRules(fromStatusID, toStatusIDs) {
      for (let toStatusID of toStatusIDs) {
        for (let rule of this.getSelectedRules(fromStatusID)) {
          this.rules.push({
            ...cloneDeep(rule),
            status_id: toStatusID,
            errors: [],
            isSelected: false,
          });
        }
      }
    },
    getSelectedRules(statusID) {
      return this.getRules(statusID).filter((r) => r.isSelected);
    },
    toggleSelected(statusID) {
      let isSelected = !this.isAllSelected(statusID);

      for (let rule of this.getRules(statusID)) {
        rule.isSelected = isSelected;
      }
    },
    isAllSelected(statusID) {
      return this.getSelectedRules(statusID).length === this.getRules(statusID).length;
    },
    clearErrors() {
      for (let rule of this.rules) {
        rule.errors = [];
      }
    },
    bindErrors(errors) {
      for (let error of errors) {
        if (error.loc.length === 3 && error.loc[0] === "body") {
          error.msg = this.api.widget.langs.ui.errors[error.type] || error.msg;
          this.rules[error.loc[1]].errors.push(error);
        }
      }
    },
  },
});
