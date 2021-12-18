import { Auth } from 'aws-amplify';
import { reactive, ref, } from 'vue';
// provide
import router from '@/router';
import {useStore} from 'vuex';

export default function () {
  const store = useStore();

  const error = ref('');
  const state = ref('');
  const user = ref('');
  const company = ref('Coolaquas');

  const form = reactive({
    email: '',
    password: '',
    code: '',
    company: company.value,
  });

  // Sign In
  const signIn = async () => {
    error.value = '';
    try {
      const { email, password } = form;
      const loginAuth = await Auth.signIn(email, password);
      console.log('success! :', loginAuth.attributes.email);
      store.dispatch('general/setLoggedInUser',loginAuth.attributes.email)
      router.push({ name: 'Home' });
    } catch (err) {
      error.value = err.message;
    }
  };

  //Sign Up
  const signUp = async () => {
    error.value = '';
    try {
      // company? 
      const { email, password, company} = form;
      await Auth.signUp({
        'username': email,
        'password':password,
        'attributes': { 'custom:company':company },
      }).then((res) => {
        console.log('res user: ', res.user.username);
        console.log('res :', res);
        if (res.userSub) {
          form.email = '';
          form.password = '';
        }
      });
    } catch (err) {
      console.log("signUp error ",err)
      error.value = err.message;
    }
  };

  //  Confirm Sign Up
  const confirmSignUp = async () => {
    error.value = '';
    try {
      const { email, code } = form;
      await Auth.confirmSignUp(email, code);      
      router.push({ name: 'Signin' });
    } catch (err) {
      error.value = err.message;
    }
  };

  //Resend verification code
  const resendSignUp = async () => {
    error.value = ''
    try {
      const {email} = form
      await Auth.resendSignUp(email)
    } catch (err) {
      error.value = err.message
    }
  }


  // Sign Out
  const signOut = async () => {
    error.value = ''
    try {
       await Auth.signOut() 
      store.dispatch('general/setLoggedInUser', '');       
    } catch (err) {
      error.value = err.message
    }
  }
  // Recover Password Code
  const forgotPassword = async () => {
    error.value = '';
    try {
      const { email } = form;
      await Auth.forgotPassword(email);
    } catch (err) {
      error.value = err.message;
    }
  };
  // Recover Password - Submit new Password
  const forgotPasswordSubmit = async () => {
    error.value = '';
    try {
      const { email,code,password } = form;
      await Auth.forgotPasswordSubmit(email,code,password);
      router.push({ name: 'Signin' });
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    form,
    company,
    error,
    state,
    user,
    signIn,
    signUp,
    confirmSignUp,
    resendSignUp,
    forgotPassword,
    forgotPasswordSubmit,
    signOut,
  };
}