<template>
  <q-dialog v-model="show" position="right" @hide="show = false">
      <q-card class="bg-dark" style="width: 400px; height : 100%">
        <q-card-section class="text-center">
            <div class="text-h6 text-primary">
                Nova Tarefa
            </div>
        </q-card-section>

        <q-separator dark/>

        <q-card-section class="q-mt-lg">
            <q-input
            v-model="taskName"
            color="primary"
            filled
            label="Tarefa"
            label-color="primary"
            dark
            >
                <template v-slot:prepend>
                    <q-icon name="event" color="primary"/>
                </template>
            </q-input>
        </q-card-section>

        <q-card-section class="q-mt-xl flex justify-center">
            <q-btn
            color="positive"
            label="Salvar"
            @click="addTask"
            />
        </q-card-section>

      </q-card>
    </q-dialog>
</template>

<script>

import _tasks from './_tasks';

export default {

    created () {

        _tasks.$on('addTaskDialog', group => {

            this.show = true;

            this.taskGroup = group;

        });

    },

    data() {

        return {


            show : false,

            taskName : null,

            taskGroup : null

        }

    },

    methods : {

        addTask () {

            let taskList = this.$q.localStorage.getItem('tasks') || [];

            let taskObj = { 

                description : this.taskName, 
                
                completed : false, 
                
                group : this.taskGroup.description,

                id : new Date().getTime()

            };

            taskList.push(taskObj);

            this.$q.localStorage.set('tasks', taskList);

            _tasks.$emit('pushTask', taskObj);

            this.taskName = '';

            this.show = false;

        }

    }



}
</script>

<style>


</style>