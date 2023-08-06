import { defineStore } from "pinia";
import { ref } from "vue";
import { useStorage } from "@vueuse/core";

const locations = useStorage("locations", <City[]>[]);

const stateNavigator = ref(0);

interface WeatherData {
  name: string;
  id: number;
  sys: {
    country: string;
  };
  visibility: number;
  weather: [
    {
      main: string;
      description: string;
      icon: string;
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
export interface City {
  name: string;
  id: number;
}

interface Data {
  weatherData: WeatherData[];
  cities: City[];
  currentUserCity: string;
}

const initialData: Data = {
  weatherData: [],
  cities: [],
  currentUserCity: "",
};

export const useLocationStore = defineStore("locationsStore", {
  state: () => ({
    data: initialData,
  }),
  actions: {
    setCitiesToLocalstorage() {
      locations.value = [];
      locations.value = this.data.cities;
    },
    addCity(cityName: string) {
      this.getWeatherDataByName(cityName);
      this.setCitiesToLocalstorage();
    },
    deleteCity(id: number) {
      this.data.cities = this.data.cities.filter((city) => city.id !== id);
      this.deleteWeatherDataById(id);
      this.setCitiesToLocalstorage();
    },
    deleteWeatherDataById(id: number) {
      this.data.weatherData = this.data.weatherData.filter(
        (data) => data.id !== id
      );
    },
    async getWeatherDataByName(cityName: string) {
      const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`;

      try {
        const response = await fetch(urlWeather);
        if (response.status == 404) {
          throw "Ciy no found";
        }
        const resJson = await response.json();
        const { id, name } = resJson;
        const city = {
          id,
          name,
        };

        let isUniqCity = this.data.cities.some((city) => city.id === id);
        if (!isUniqCity) {
          this.data.cities.push(city);
          this.data.weatherData.push(resJson);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async getCurrentUserCityName() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            )
              .then((response) => response.json())
              .then((data) => {
                const userCityName =
                  data.address.city ||
                  data.address.town ||
                  data.address.village ||
                  data.address.hamlet;
                this.data.currentUserCity = userCityName;
                this.addCity(userCityName);
              })
              .catch((error) =>
                console.error(error)
              );
          },
          (err) => {
            stateNavigator.value = err.code;
          }
        );
      } else {
        window.alert("Could not get location");
      }
    },

    updateCities(cities: City[]) {
      this.data.cities = cities;
      this.setCitiesToLocalstorage();
      this.sortWeatherDataByCities();
    },
    sortWeatherDataByCities() {
      return (this.data.weatherData = this.data.weatherData.sort((a, b) => {
        const indexA = this.data.cities.findIndex((item) => item.id === a.id);
        const indexB = this.data.cities.findIndex((item) => item.id === b.id);
        return indexA - indexB;
      }));
    },
  },
  getters: {
    getWeatherData(state) {
      return state.data.weatherData;
    },
    getCitiesData(state) {
      return state.data.cities;
    },
  },
});
