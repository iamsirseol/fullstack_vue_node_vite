<template>
  <div>
    <!-- <select v-model="$i18n.locale" class="locale-selector">
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
    </select> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped lang="less">
.locale-selector {
  display: flex;
  margin: 20px 20px 0 20px;
  font-size: 15px;
  // position: absolute;
  z-index: 99;
}
</style>
