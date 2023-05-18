<template>
  <form class="signup-container" @submit.prevent="submitForm">
    <div class="inner-div-box">
      <label for="id">{{ $t("account.id") }}</label
      ><input id="id" type="text" v-model="formData.idValue" />
    </div>
    <div class="invalid-msg" :style="{ visibility: isVisible.visibleID ? 'visible' : 'hidden' }">
      {{ $t("account.wrongValue") }}
    </div>
    <div class="inner-div-box">
      <label for="password">{{ $t("account.password") }}</label
      ><input id="password" type="password" v-model="formData.passwordValue" />
    </div>
    <div class="invalid-msg" :style="{ visibility: isVisible.visiblePassword ? 'visible' : 'hidden' }">
      {{ $t("account.wrongValue") }}
    </div>
    <div class="inner-div-box">
      <label for="rePassword">{{ $t("account.rePassword") }}</label
      ><input id="rePassword" type="password" v-model="formData.rePasswordValue" />
    </div>
    <div class="invalid-msg" :style="{ visibility: isVisible.visibleRePassword ? 'visible' : 'hidden' }">
      {{ $t("account.wrongValue") }}
    </div>
    <div class="inner-div-box">
      <label for="name">{{ $t("account.name") }}</label
      ><input id="name" type="text" v-model="formData.nameValue" />
    </div>
    <div class="invalid-msg" :style="{ visibility: isVisible.visibleName ? 'visible' : 'hidden' }">
      {{ $t("account.wrongValue") }}
    </div>
    <div class="inner-gender-box">
      <label class="gender-label" for="gender">{{ $t("account.gender") }}</label>
      <div class="gender-input">
        <input id="male" type="radio" name="gender" value="m" v-model="formData.genderValue" />
        <label for="male">{{ $t("account.male") }}</label>
        <input id="female" type="radio" name="gender" value="f" v-model="formData.genderValue" />
        <label for="female">{{ $t("account.female") }}</label>
      </div>
    </div>
    <div class="inner-div-box">
      <label for="priority">{{ $t("account.priority") }}</label
      ><select name="priority" id="priority" v-model="formData.priorityValue" class="select-box">
        <option value="1">{{ $t("account.admin") }}</option>
        <option value="2">{{ $t("account.developer") }}</option>
      </select>
    </div>
    <div class="btn-box">
      <router-link to="/signin"
        ><button>{{ $t("button.cancel") }}</button></router-link
      ><button type="submit">{{ $t("button.apply") }}</button>
    </div>
  </form>
</template>

<script>
import common from "../util/common";
import * as AccountStore from "../store/module/account";

export default {
  name: "Signup",
  data: () => ({
    formData: {
      idValue: "",
      passwordValue: "",
      rePasswordValue: "",
      nameValue: "",
      genderValue: "m",
      priorityValue: 1,
    },
    isVisible: {
      visibleID: false,
      visiblePassword: false,
      visibleRePassword: false,
      visibleName: false,
    },
  }),
  computed: {
    ...AccountStore.mapState(["SIGNUP_RESULT"]),
  },
  methods: {
    ...AccountStore.mapActions(["SIGNUP_USER"]),
    async submitForm() {
      // 각 항목별 값이 있거나 validator를 만족시킨 경우 에러 문구를 보여주지 않는다.
      this.isVisible.visibleID = this.idValue ? true : false;
      this.isVisible.visiblePassword = common.passwordValidator(this.passwordValue) ? true : false;
      this.isVisible.visibleRePassword =
        this.rePasswordValue && this.passwordValue === this.rePasswordValue ? true : false;
      this.isVisible.visibleName = this.nameValue ? true : false;
      try {
        if (Object.values(this.isVisible).every((el) => el === false)) {
          // isVisible이 모두 false가 될 경우(모든항목이 pass인 경우)
          const payload = {
            id: this.formData.idValue,
            password: common.encodeToBase64(this.formData.passwordValue),
            name: this.formData.nameValue,
            gender: this.formData.genderValue,
            priority: this.formData.priorityValue,
          };
          await this.SIGNUP_USER(payload);
          console.log(this.SIGNUP_RESULT);
          // this.$router.push("/signin"); // 계정 생성 성공 Modal?
        }
      } catch (e) {
        return e;
      }
    },
  },
};
</script>

<style scoped lang="less">
.signup-container {
  width: 758px;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 15% auto;
  input {
    width: 80%;
  }
  .inner-div-box {
    width: 90%;
    display: flex;
    justify-content: space-between;
    font-size: 15px;
  }
  .inner-gender-box {
    display: flex;
    width: 400px;
    margin-bottom: 28px;
    .gender-label {
      width: 100px;
      text-align: left;
      margin-left: auto;
    }
    .gender-input {
      display: flex;
      margin-left: 30px;
      width: 300px;
      label {
        width: 100px;
      }
      input {
        width: 20px;
      }
    }
  }
  .btn-box {
    margin: 0 auto;
    margin-top: 50px;
    width: 40%;
    display: flex;
    justify-content: space-around;
    button {
      width: 100px;
    }
  }
  .select-box {
    width: 81%;
  }
  .invalid-msg {
    font-size: 11px;
    color: red;
    margin: 5px 0 10px 0;
    display: flex;
    margin-left: 130px;
    visibility: hidden;
  }
}
</style>
