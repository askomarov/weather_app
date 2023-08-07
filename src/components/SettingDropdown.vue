<script setup lang="ts">
import { computed } from "vue";
import LocationItem from "@/components/LocationItem.vue";
import LocationSearch from "./LocationSearch.vue";
import { useLocationStore } from "@/store/LocationStore";
import draggable from "vuedraggable";

const locationsStore = useLocationStore();
// const weatherData = computed(() => locationsStore.data.weatherData);
const cities = computed(() => locationsStore.getCitiesData);
const dragEnd = () => {
  console.log("dragEnd");
  locationsStore.updateCities(cities.value);
};
</script>
<template>
  <div class="settings">
    <header>
      <h2 class="settings__title">Settings</h2>
    </header>
    <draggable
      v-show="cities.length"
      tag="ul"
      handle=".handle"
      class="settings__locations-list locations-list"
      :list="cities"
      item-key="id"
      @end="dragEnd"
    >
      <template #item="{ element }">
        <li>
          <LocationItem
            :id="element.id"
            :city="element.name"
            :key="element.id"
          ></LocationItem>
        </li>
      </template>
    </draggable>
    <div class="settings__empty-list" v-show="!cities.length">empty</div>
    <footer>
      <LocationSearch @submit-search="$emit('submitSearch')"></LocationSearch>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.settings {
  height: 100%;
  padding: 16px;
  position: relative;
  display: grid;
  grid-template-rows: auto 2fr 1fr;
  gap: 16px;
}
.settings__title {
  margin: 0;
  line-height: 1;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.settings__locations-list {
  flex: 1 0 auto;
  display: grid;
  align-content: start;
  align-items: start;
  gap: 8px;
}
.settings__empty-list {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.locations-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
