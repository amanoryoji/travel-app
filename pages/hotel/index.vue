<script lang="ts" setup>
import { onMounted } from "vue";

const router = useRoute();

const { getHotel, targetVacantHotel } = useTravelApi();

onMounted(async () => {
  await targetVacantHotel(Number(router.query.hotelNo));
});
</script>

<template>
  <div v-if="getHotel">
    <pre>
    {{ getHotel }}
  </pre
    >
  </div>
</template>
