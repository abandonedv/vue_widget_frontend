function animationDelay(func, timeout) {
  let startTime = performance.now();

  function wrapper(data) {
    if (func) {
      let delayTime = Math.max(0, timeout - (performance.now() - startTime));
      setTimeout(() => func(data), delayTime);
    }
  }

  return wrapper;
}

export default class {
  constructor(widget, amocrm) {
    this.widget = widget;
    this.amocrm = amocrm;
  }

  showError() {
    this.amocrm.notifications.show_message({
      header: this.widget.langs.widget.name,
      text: this.widget.langs.ui.badRequest,
    });
  }

  makeRequest({ method, path, data, success, complete, error }) {
    this.widget.$authorizedAjax({
      url: `${this.widget.get_settings().serverURL}${path}/`,
      type: method,
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: animationDelay(success, 750),
      complete: animationDelay(complete, 750),
      error: animationDelay((data) => {
        if (error && data.status === 422) {
          error(data);
        } else {
          this.showError();
        }
      }, 750),
    });
  }

  getPipelines({ success }) {
    this.makeRequest({ method: "get", path: "pipelines", success });
  }

  getEntities({ success }) {
    this.makeRequest({ method: "get", path: "entities", success });
  }

  getRules({ success }) {
    this.makeRequest({ method: "get", path: "rules", success });
  }

  getSources({ success }) {
    this.makeRequest({ method: "get", path: "sources", success });
  }

  getUsers({ success }) {
    this.makeRequest({ method: "get", path: "users", success });
  }

  getTags({ success }) {
    this.makeRequest({ method: "get", path: "tags", success });
  }

  updateRules({ pipeline_id, rules, success, complete, error }) {
    this.makeRequest({
      method: "patch",
      path: `rules/${pipeline_id}`,
      data: rules,
      success,
      complete,
      error,
    });
  }
}
