<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { useStorage } from "@vueuse/core";
import SvgIcon from "@/components/SvgIcon.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import SettingDropdown from "@/components/SettingDropdown.vue";
import { useLocationStore } from "@/store/LocationStore";
import type { City } from "@/store/LocationStore";
import MyContact from "@/components/MyContact.vue";
const locationsStore = useLocationStore();

const locations = useStorage("locations", <City[]>[]);

const weatherData = computed(() => locationsStore.getWeatherData);

const isSettingsOpen = ref(false);
const onToggleSettingButton = () => {
  isSettingsOpen.value = !isSettingsOpen.value;
};

onBeforeMount(() => {
  if (locations.value.length) {
    locations.value.forEach(async (city) => {
      await locationsStore.getWeatherDataByName(city.name);
    });
  } else {
    locationsStore.getCurrentUserCityName();
  }
});
</script>

<template>
  <main class="main">
    <header class="header">
      <h1 class="header__title">Weather App</h1>
      <button
        class="settings-button"
        @click="onToggleSettingButton"
        type="button"
        aria-label="open settings"
      >
        <SvgIcon name="settings" />
      </button>
      <div v-show="isSettingsOpen" class="header__settings-wrap">
        <SettingDropdown
          @close-settings="isSettingsOpen = false"
        ></SettingDropdown>
      </div>
    </header>
    <div class="cards">
      <WeatherCard
        v-if="weatherData.length"
        v-for="(data, index) in weatherData"
        :weatherData="data"
        :key="index"
      />
      <div class="cards__empty" v-else>empty</div>
    </div>
    <MyContact></MyContact>
  </main>
</template>

<style scoped lang="scss">
.main {
  position: relative;
  min-height: 100%;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 16px;
}
.settings-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  svg {
    transform-origin: center;
    will-change: transform;
    transition: transform 0.1s ease 0s;
  }
  &:active {
    svg {
      transform: rotate(60deg);
    }
  }
}
.header__title {
  margin: 0;
  font-size: 1.5rem;
}
.header__settings-wrap {
  font-weight: 600;
  position: absolute;
  background: rgb(219 219 219 / 96%);
  inset: 0;
  border-radius: 20px;
  overflow: hidden;
}
.cards {
  flex: 1 1 auto;
  padding: 16px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: inset var(--box-shadow);
  background: var(--cards-bg, #fff);
}
.cards__empty {
  display: flex;
  align-items: center;
  justify-content: center;

  &.hidden{
    color: red;
    opacity: 0;
    visibility: hidden;
  }
}
</style>
