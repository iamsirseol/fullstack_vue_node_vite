<script>
import axiosInstance from "../util";
import common from "../util/common";

export default {
  name: "Signup",
  data: () => ({
    idValue: "",
    passwordValue: "",
    rePasswordValue: "",
    nameValue: "",
    genderValue: "m",
    priorityValue: "1",
    isVisible: {
      visibleID: false,
      visiblePassword: false,
      visibleRePassword: false,
      visibleName: false,
    },
  }),

  methods: {
    async submitForm() {
      if (this.idValue) this.isVisible.visibleID = false;
      else this.isVisible.visibleID = true;

      if (common.passwordValidator(this.passwordValue)) this.isVisible.visiblePassword = false;
      else this.isVisible.visiblePassword = true;

      if (this.passwordValue === this.rePasswordValue && this.rePasswordValue) this.isVisible.visibleRePassword = false;
      else this.isVisible.visibleRePassword = true;

      if (this.nameValue) this.isVisible.visibleName = false;
      else this.isVisible.visibleName = true;

      try {
        if (Object.values(this.isVisible).every((el) => !el === true)) {
          // isVisible이 모두 false가 될 경우(모든항목이 pass인 경우)
          const payload = {
            id: this.idValue,
            password: common.encodeToBase64(this.passwordValue),
            name: this.nameValue,
            gender: this.genderValue,
            priority: this.priorityValue,
          };
          const res = await axiosInstance.post("/api/v1/account/signup", payload);
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<template>
  <form class="signup-container" @submit.prevent="submitForm">
    <div class="inner-div-box"><label for="id">ID</label><input id="id" type="text" v-model="idValue" /></div>
    <div class="invalid-msg" :style="{ visibility: isVisible.visibleID ? 'visible' : 'hidden' }">Wrong Value!</div>
    <div class="inner-div-box">
      <label for="password">Password</label><input id="password" type="password" v-model="passwordValue" />
    </div>
    <div class="invalid-msg" :style="{ visibility: isVisible.visiblePassword ? 'visible' : 'hidden' }">
      Wrong Value!
    </div>
    <div class="inner-div-box">
      <label for="rePassword">Re Password</label><input id="rePassword" type="password" v-model="rePasswordValue" />
    </div>
    <div class="invalid-msg" :style="{ visibility: isVisible.visibleRePassword ? 'visible' : 'hidden' }">
      Wrong Value!
    </div>
    <div class="inner-div-box"><label for="name">Name</label><input id="name" type="text" v-model="nameValue" /></div>
    <div class="invalid-msg" :style="{ visibility: isVisible.visibleName ? 'visible' : 'hidden' }">Wrong Value!</div>
    <div class="inner-gender-box">
      <label for="gender">Gender</label>
      <div class="gender-input">
        <input id="male" type="radio" name="gender" value="m" v-model="genderValue" />
        <label for="male">Male</label>
        <input id="female" type="radio" name="gender" value="f" v-model="genderValue" />
        <label for="female">Female</label>
      </div>
    </div>
    <div class="inner-div-box">
      <label for="priority">Priority</label
      ><select name="priority" id="priority" v-model="priorityValue" class="select-box">
        <option value="1">Admin</option>
        <option value="2">Developer</option>
      </select>
    </div>
    <div class="btn-box">
      <router-link to="/signin"><button>Cancel</button></router-link><button type="submit">Apply</button>
    </div>
  </form>
</template>

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
    .gender-input {
      display: flex;
      margin-left: 25px;
      width: 400px;
    }
  }
  .btn-box {
    margin: 0 auto;
    margin-top: 50px;
    width: 40%;
    display: flex;
    justify-content: space-around;
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
