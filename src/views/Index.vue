<template>
  <div>
    Index page {{ store.state }}
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { key } from '@/store';

const store = useStore(key);
</script>

<style scoped>

</style>