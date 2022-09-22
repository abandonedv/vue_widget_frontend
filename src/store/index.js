import { defineStore } from "pinia";
import { cloneDeep } from "lodash";
import Api from "@/utils/api";

export const useStore = defineStore("pipelinesStore", {
  api: null,
  state: () => (
      {
        entities: null,
        pipelines: null,
        rules: null,
        users: null,
        sources: null,
        tags: null
      }
  ),
  getters: {
    loading({ rules, pipelines, entities }) {
      return [rules, pipelines, entities].includes(null);
    },
  },
  actions: {
    load(widget, amocrm) {
      this.api = new Api(widget, amocrm);

      this.api.getEntities({ success: (data) => (this.entities = data) });
      this.api.getPipelines({ success: (data) => (this.pipelines = data) });
      this.api.getSources({ success: (data) => (this.sources = data) });
      this.api.getUsers({ success: (data) => (this.users = data) })
      this.api.getTags({ success: (data) => (this.tags = data) })

      this.api.getRules({
        success: (data) => {
          this.rules = data.reduce((rules, rule) => {
            rule.errors = [];
            rule.isSelected = false;
            rule.isSaved = true;
            rules.push(rule);
            return rules;
          }, []);
        },
      });
    },
    getPipeline(pipelineID) {
      return this.pipelines.filter((p) => p.id === pipelineID)[0];
    },
    getRules(pipelineID) {
      return this.rules.filter((r) => r.pipeline_id === pipelineID);
    },
    getSourcesIndx() {
      console.log(this.sources)
      return this.sources;
    },
    getUsersIndx() {
      console.log(this.users)
      return this.users;
    },
    getTagsIndx() {
      console.log(this.tags)
      return this.tags;
    },
    updateRules(pipelineID, rules) {
      this.rules = this.rules.filter((r) => r.pipeline_id !== pipelineID);
      this.rules = this.rules.concat(cloneDeep(rules));
    },
  },
});
