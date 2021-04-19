import { defineComponent, reactive, ref } from 'vue';
import { auth } from '@/service';

export default defineComponent({
    setup() {
        const regForm = reactive({
            account: '',
            password: '',
        });

        const register = () => {
            auth.register(regForm.account, regForm.password);
        };

        return {
            regForm,

            register,
        };
    },
});