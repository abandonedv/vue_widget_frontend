import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router/index.js";
import App from "@/App.vue";
import style from "@/styles/style.lazy.css";

function createSettingsApp() {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(router);
  app.use(pinia);

  style.use();
  return app;
}

function removeSettingsApp(app) {
  style.unuse();
  app.unmount();
  router.push({ path: "/" });
}

define([], function () {
  return function () {
    let self = this;

    this.callbacks = {
      render: function () {
        return true;
      },
      advancedSettings: function () {
        $("#work_area").append($("<div id='app'></div>"));

        self.settingsApp = createSettingsApp();
        self.settingsApp.provide("widget", self);
        self.settingsApp.provide("amocrm", AMOCRM);
        self.settingsApp.mount("#app");

        return true;
      },
      destroy() {
        if (self.settingsApp) {
          removeSettingsApp(self.settingsApp);
        }
        return true;
      },
      init: function () {
        return true;
      },
      bind_actions: function () {
        return true;
      },
      onSave: function () {
        return true;
      },
    };
    return this;
  };
});
