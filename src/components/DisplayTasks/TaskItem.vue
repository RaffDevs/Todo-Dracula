<template>
    <div>
        <q-item tag="label" v-ripple >
            <q-item-section>
                <q-item-label 
                :class="{ 'text-strike' : taskData.completed}"
                >
                    {{ task.description }}
                </q-item-label>
            </q-item-section>
            <q-item-section side top>
                <q-checkbox v-model="taskData.completed"  color="positive" />
            </q-item-section>
            <q-item-section side top>
                <q-btn flat
                round 
                icon="delete" 
                text-color="negative"
                @click="deleteTask"
                />
            </q-item-section>
        </q-item>
        <q-separator />
    </div>
</template>

<script>

import _tasks from './_tasks';

export default {

    props : {

        task : Object

    },

    data () {

        return {

            taskData : this.task,

        }

    },

    methods : {

        deleteTask() {

            let confirmDelete = confirm('Deseja deletar esta tarefa?');

            if (confirmDelete) {

                _tasks.$emit('deleteTask', this.taskData.id);

            }

        }

    },

    watch : {

        'taskData.completed' : function (recent, old) {

            let storageTasks = this.$q.localStorage.getItem('tasks');

            let task = storageTasks.find(task => this.taskData.id === task.id);

            let taskIndex = storageTasks.indexOf(task);

            task.completed = recent;

            storageTasks.splice(taskIndex, 1, task);

            this.taskData.completed = recent;

            this.$q.localStorage.set('tasks', storageTasks);

            this.$root.$emit('updateTasksOnCategories')

        },

    }

}
</script>

<style>

</style>