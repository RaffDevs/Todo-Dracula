<template>
  <div>
      <q-item clickable v-ripple @click="setTaskGroup">
        <q-item-section avatar>
            <q-icon color="primary" name="calendar_today" />
        </q-item-section>
        <q-item-section class="text-bold">
            {{ category.description }}
        </q-item-section>
        <q-badge class="badge" color="secondary" rounded text-color="white" :label="tasks.length" />
    </q-item>
<q-separator dark />
  </div>
</template>

<script>
export default {

    props : {

        category : Object

    },

    created () {

        this.getTasksByGroup();

        this.$root.$on('pushTask', task => {

            this.tasks.push(task);

        });

        this.$root.$on('updateTasksOnCategories', () => {

            this.getTasksByGroup();

        });
    },

    data() {

        return {

            tasks : []

        }

    },

    methods : {

        getTasksByGroup () {

            let taskGroup = this.$q.localStorage.getItem('tasks') || [];

            this.tasks = taskGroup
            .filter(task => task.group === this.category.description && task.completed === false);

        },

        setTaskGroup () {

            this.$root.$emit('setGroup', this.category);

        },

    },

}
</script>

<style>

    .badge {

        height : 20px;
        margin-top : 8px

    }

</style>