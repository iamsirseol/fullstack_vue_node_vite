import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ko from "./locales/ko.json";

// json 파일을 읽어들이기 위한 function
// const requireLang = { en, ko };

// const messages = { en, ko };

// json file read
// for (const file of Object.keys(requireLang)) {
//   const path = file.replace(/(\.\/|\.json$)/g, "").split("/"); // 폴더 패스

//   path.reduce((o, s, i) => {
//     if (o[s]) return o[s];

//     o[s] = i + 1 === path.length ? requireLang(file) : {};

//     return o[s];
//   }, messages);
// }

const i18n = createI18n({
  locale: "ko", // 기본 locale
  fallbackLocale: "ko", // locale 설정 실패시 사용할 locale
  messages: { en, ko }, // 다국어 메시지
  silentTranslationWarn: true, // 메시지 코드가 없을때 나오는 console 경고 off
});

export default i18n;
