import { Auth } from 'aws-amplify';
import { reactive, ref, } from 'vue';
// provide
import router from '@/router';

export default function () {
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
      router.push({ name: 'Home' });
    } catch (err) {
      error.value = err.message;
    }
  };

  //Sign Up
  const signUp = async () => {
    error.value = '';
    localStorage.setItem('loggedIn', JSON.stringify(false));
    localStorage.removeItem('user');
    try {
      // company? 
      const { email, password,} = form;
      await Auth.signUp(email, password, ).then((res) => {
        // username = res.user.username;
        // userConfirmed = res.userConfirmed
        console.log('res user: ', res.user.username);
        console.log('res :', res);
        // localStorage.setItem('user', JSON.stringify(res.user.username));
        // provide('logedInUser', res.user.username);
        if (res.userSub) {
          form.email = '';
          form.password = '';
        }
      });
      // router.push({ name: 'Home' });
      // 
      // redirect to Verify Code component!
      // 
    } catch (err) {
      error.value = err.message;
      console.log('error! :', err.message);
      console.log('error 2! :', error.value);
    }
  };

  //  Confirm Sign Up
  const confirmSignUp = async () => {
    error.value = '';
    try {
      const { email, code } = form;
      await Auth.confirmSignUp(email, code);      
      router.push({ name: 'Signin' });
      // router.push({ name: 'Home' })
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