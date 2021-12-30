import { Auth } from 'aws-amplify';
import { reactive, ref, } from 'vue';
// provide
import router from '@/router';
import {useStore} from 'vuex';
// Amplify
import { API } from 'aws-amplify';
// import * as queries from '@/graphql/queries';
import * as mutations from '@/graphql/mutations';


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
      store.dispatch('general/setLoggedInUser', 
      loginAuth.attributes.email);
      
      router.push({ name: 'Home' })    

      // 
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
        username: email,
        password: password,
        attributes: { 'custom:company': company },
      }).then((res) => {
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

  const createNewUser = async (res,userDetails) => {
    // let currentUser = {}
    try {
      // currentUser = await Auth.currentUserInfo();
      // userDetails.owner = currentUser.username;
    userDetails.owner = 'temp';
    if(res === 'SUCCESS'){
      const newUser =  API.graphql({
        query: mutations.createUser,
        variables: { input: userDetails },
      })
      await newUser
    }
      else {
        throw new Error('Error in validation process')
      }
    }
    catch (error) {
      console.log('error: ', error);
    }
  }
  
  //  Confirm Sign Up
  const confirmSignUp = async () => {
    error.value = '';
    const { email, code } = form;
    const userDetails = {
      username: email,
    };
    try {
      const confirmedUser = await Auth.confirmSignUp(email, code)      
      await createNewUser(confirmedUser, userDetails).then( () => {
        router.push({ name: 'Signin' })
      })
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
      await Auth.forgotPasswordSubmit(email,code,password)
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