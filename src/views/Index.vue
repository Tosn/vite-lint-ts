<template>
  <div>
    Index page {{ store.state }}
    <h3 ref="titleRef" class="test info">This is a title</h3>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, nextTick } from 'vue';
import { key } from '@/store';

const store = useStore(key);

const titleRef = ref(null);
nextTick(() => {
  const t: unknown = titleRef.value;
  const text = (t as HTMLElement).innerHTML;
  console.log(text);
});

</script>

<style scoped>

</style>
