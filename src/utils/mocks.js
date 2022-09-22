import langs from "@/widget/i18n/ru.json";

function getLangs() {
  return langs;
}

function getEnvs() {
  return process.env;
}

define([], function () {
  return {
    widget: {
      langs: getLangs(),
      get_settings: () => ({ serverURL: getEnvs().SERVER_URL }),
      $authorizedAjax: (params) => {
        params.headers = { "X-AUTH-TOKEN": getEnvs().X_AUTH_TOKEN };
        $.ajax(params);
      },
    },
    amocrm: {
      notifications: {
        show_message(parmas) {
          console.log(parmas);
        },
      },
    },
  };
});
