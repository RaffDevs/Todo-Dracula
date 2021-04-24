<template>
  <q-page>
      <div class="row window-height">
          <DisplayCategories/>
          <DisplayTasks/>
      </div>
  </q-page>
</template>

<script>

import DisplayCategories from '../components/DisplayCategories/DisplayCategories';

import DisplayTasks from '../components/DisplayTasks/DisplayTasks.vue';



export default {

    components : {

        DisplayCategories,

        DisplayTasks

    },

}

</script>

<style scoped>


</style>
