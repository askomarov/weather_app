<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { useLocationStore } from "@/store/LocationStore";

const locationsStore = useLocationStore();

export interface IProps {
  city: string
  id: number
}

withDefaults(defineProps<IProps>(), {
  city: 'London, UK',
})
</script>
<template>
  <div class="location-item">
    <button type="button" class="handle">
    <SvgIcon name="transfer"/>
    </button>
    <p class="location-item__city">
      {{ city }}
    </p>
    <button type="button" @click="locationsStore.deleteCity(id)">
    <SvgIcon name="basket"/>
    </button>
  </div>
</template>


<style scoped lang="scss">
.location-item{
  border-radius: 8px;
  padding: 4px 8px;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 8px;
  align-items: center;
  background: #747474;
  color: #fff;
}
.location-item__city{
  flex: 1 0 auto;
  margin: 0;
  text-align: left;
  font-size: 1.2rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
