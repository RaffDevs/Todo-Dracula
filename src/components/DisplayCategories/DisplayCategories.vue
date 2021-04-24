<template>
<div class="col-3 column justify-start menu">
    <AddNewCategorie  />
    <div class="add-button-container flex justify-center">
        <q-btn
        class="add-button"
        icon="add"
        round
        color="positive"
        @click="showDialogCategorie"
        />
    </div>

    <div>
        <q-list padding>
            <q-scroll-area style="height : 400px">

                <q-item-label 
                header 
                v-if="listCategories.length > 0"
                >
                    Categorias
                </q-item-label>

                <q-item-label
                header 
                v-else
                >
                    Nenhuma categoria cadastrada
                </q-item-label>

                <template v-for="(item, index) in listCategories">
                    <CategoryItem :category="item" :key="index"/>
                </template>
               
            </q-scroll-area>
        </q-list>
    </div>

</div>
</template>

<script>

import _categories from './_categories';

import AddNewCategorie from './AddNewCategorie';

import CategoryItem from './CategoryItem';

export default {

    components : {

        AddNewCategorie,

        CategoryItem

    },

    created() {

        this.$parent.$on('deleteGroup', group => {

            this.deleteGroup(group);

        })

        _categories.$on('pushCategory', data => {

            this.listCategories.push(data);

        });

        this.listCategories = this.$q.localStorage.getItem('groups') || [];

        console.log(this.listCategories);
    },

    data() {

        return {

            dialogCategorie : false,

            listCategories : [],

        }

    },

    methods : {

        showDialogCategorie () {

            _categories.$emit('addCategoriesDialog');

        },

        deleteGroup (groupObj) {

            this.listCategories = this.listCategories.filter(group => group.id !== groupObj.id);

            let listGroup = this.$q.localStorage.getItem('groups').filter(group => group.id !== groupObj.id);

            this.$q.localStorage.set('groups', listGroup);

            if (this.listCategories.length > 0) {

                this.$root.$emit('setGroup', this.listCategories[0]);

            } else {

                this.$root.$emit('setGroup', null);

            }

        },

    },
    
}
</script>

<style scoped>

    .debug {
    
        border : 1px solid red;

    }

    .menu {
    
        background-color : #383A59;

        color : #f8f8f2;


    }

    .add-button-container {

        margin : 100px 0;


    }

    

</style>

