<template>
    <div class="col-9 column  display">
      <AddNewTask />
      <div v-if="taskGroup">
        <div class="header flex justify-between shadow-1">
          <q-img
          class="dracula-img shadow-3"
          src="../../../public/images/dracula.png" />
            <q-btn-dropdown flat color="primary" :label="taskGroup.description">
              <q-list class="bg-dark">
                <q-item clickable v-close-popup @click="deleteGroup">
                  <q-item-section class="text-negative">
                    <q-item-label>Deletar</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn icon="add" round color="positive" @click="addTask"/>
        </div> 

        <div class="todo-list" v-if="taskList.length > 0">    
          <q-list bordered padding class="shadow-1">

            <template v-for="(task, index) in taskList">
              <TaskItem :task="task" :key="index"/>
            </template>

          </q-list>
        </div>
      </div>
      

    </div>
</template>

<script>

import TaskItem from './TaskItem';

import AddNewTask from './AddNewTask';

import _tasks from './_tasks';

import path from 'path'

export default{

  components : {

    TaskItem,

    AddNewTask

  },

  created() {

    this.$root.$on('setGroup', data => {

      console.log(data);

      this.taskGroup = data;

      this.getTasksByGroup(data);

    });

    _tasks.$on('pushTask', task => {

      this.taskList.push(task);

      this.$root.$emit('pushTask', task);

    });

    _tasks.$on('deleteTask', id => {

      this.deleteTask(id);

      this.$root.$emit('updateTasksOnCategories')

    });

  },
    
  data() {

    return {

      toggle : true,

      taskGroup : null,

      taskList : null,

    }

  },

  methods : {

    getTasksByGroup (data) {

      if (this.$q.localStorage.has('tasks')) {

        this.taskList = this.$q.localStorage.getItem('tasks').filter(task => task.group === data.description);

        console.log('LISTA',this.taskList);

      } else {

        this.taskList = []

      }

    },
    
    addTask () {

      _tasks.$emit('addTaskDialog', this.taskGroup);

    },

    deleteTask (id) {

      this.taskList = this.taskList.filter(task => task.id !== id);

      this.$q.localStorage.set('tasks', this.taskList);

    },

    deleteGroup () {

      let confirmDelete = confirm('Deseje deletar essa categoria?');

      if (confirmDelete) {

        this.$parent.$emit('deleteGroup', this.taskGroup);

      }


    },

  }

}
</script>

<style scoped>

    .display {

      background-color : #282A36;

      color : #f8f8f2;

    }

    .header {

      padding : 20px 20px;

    }

    .todo-list {

      margin : 20px auto;

      width : 90%;

    }

    .dracula-img {

      width: 40px;

      height: 40px;

      border-radius: 20px;


    }


</style>

