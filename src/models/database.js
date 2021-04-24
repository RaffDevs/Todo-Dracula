import { LocalStorage } from 'quasar';

export default {

    groupModel : {

        getGroups() {

            return LocalStorage.getItem('groups');

        }
    }

}