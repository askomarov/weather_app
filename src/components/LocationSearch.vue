<script setup lang="ts">
import { ref } from "vue";
import { useLocationStore } from "@/store/LocationStore";

// const locations = useStorage('locations', <string[]>[], localStorage);
const searchValue = ref<string>("");
const locationsStore = useLocationStore();
const searchSubmit = ()=>{
  locationsStore.addCity(searchValue.value.trim())
  searchValue.value = '';
}

</script>
<template>
  <form class="location-search" @submit.prevent="searchSubmit">
    <h3 class="location-search__title">Add Location</h3>
    <div class="location-search__input-wrap">
      <input class="input" type="text" v-model="searchValue" required />
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.location-search {
}
.location-search__title {
  text-align: left;
  margin: 0 0 16px;
}
.location-search__input-wrap {
  display: flex;
  align-items: center;
  align-items: center;
  gap: 8px;
}
.input {
  flex: 1 1 auto;
  width: 100%;
}
</style>
