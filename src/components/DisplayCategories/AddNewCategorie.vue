<template>
  <q-dialog v-model="show" position="left" @hide="show = false">
      <q-card class="bg-dark" style="width: 400px; height : 100%">
        <q-card-section class="text-center">
            <div class="text-h6 text-primary">
                Nova Categoria
            </div>
        </q-card-section>

        <q-separator dark/>

        <q-card-section class="q-mt-lg">
            <q-input
            v-model="categoryName"
            color="primary"
            filled
            label="Categoria"
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
            @click="addCategory"
            />
        </q-card-section>

      </q-card>
    </q-dialog>
</template>

<script>

import _categories from './_categories';

export default {

    created () {

        _categories.$on('addCategoriesDialog', _ => {

            this.show = true;

        });

    },

    data() {

        return {


            show : false,

            categoryName : ''

        }

    },

    methods : {

        addCategory () {

            let listGroup = this.$q.localStorage.getItem('groups') || [];

            let category = {

                description : this.categoryName,

                id : new Date().getTime()

            };

            listGroup.push(category);
            
            this.$q.localStorage.set('groups', listGroup);

            _categories.$emit('pushCategory', category);

            this.categoryName = '';

            this.show = false;

        }

    }

}
</script>

<style>


</style>