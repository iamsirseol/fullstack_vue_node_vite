export default {
  passwordValidator: (pass) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/;
    return passwordRegex.test(pass);
  },
  encodeToBase64: (pass) => {
    return btoa(pass);
  },
};
