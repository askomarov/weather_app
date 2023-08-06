<script setup lang="ts">
// import { ref, onMounted } from "vue";
import { rounded, calculateDewPoint } from "@/utils";
import SvgIcon from "@/components/SvgIcon.vue";

interface WeatherData {
  name: String;
  sys: {
    country: String;
  };
  visibility: number;
  weather: [
    {
      main: String;
      description: String;
      icon: String;
    }
  ];
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
}

interface IProps {
  weatherData: WeatherData | null;
}

withDefaults(defineProps<IProps>(), {
  weatherData: null,
});

</script>
<template>
  <div v-if="weatherData" class="card">
    <header class="card__header">
      <p>
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </p>
      <div class="card__header-main">
        <!-- https://openweathermap.org/img/wn/10d@2x.png -->
        <div class="card__img">
          <img
            :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
            width="80"
            height="80"
            alt=""
          />
        </div>
        <div class="card__temp">
          <span>
            {{ rounded(weatherData.main.temp) }} </span
          ><span>℃</span>
        </div>
      </div>
    </header>
    <p class="card__feel-like">
      Feels like {{ rounded(weatherData.main.feels_like) }}℃.
      {{ weatherData.weather[0].description }}.
    </p>
    <dl>
      <div>
        <dt>
          <SvgIcon name="wind" />
          <p hidden>Wind</p>
        </dt>
        <dd>{{ weatherData.wind.speed }}m/s SSE</dd>
      </div>
      <div>
        <dt>
          <SvgIcon name="weight" />
          <p hidden>atmospheric pressure</p>
        </dt>
        <dd>{{ weatherData.main.pressure }}hPa</dd>
      </div>
      <div>
        <dt>Humidity:</dt>
        <dd>{{ weatherData.main.humidity }}%</dd>
      </div>
      <div>
        <dt>Dew point:</dt>
        <dd>
          {{
            calculateDewPoint(
              weatherData.main.temp,
              weatherData.main.humidity
            )
          }}℃
        </dd>
      </div>
      <div>
        <dt>Visibility:</dt>
        <dd>{{ (weatherData.visibility / 1000).toFixed(2) }}km</dd>
      </div>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 8px 16px;
  border-radius: 16px;
  box-shadow: var(--box-shadow);
}
.card__header {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.card__header-main {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
}
.card__img {
}
.card__temp {
}
dl {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  dd {
    margin: 0;
  }
  dt {
    font-weight: 600;
  }
}
</style>
