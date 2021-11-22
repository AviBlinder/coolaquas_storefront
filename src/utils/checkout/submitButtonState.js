import { computed, ref } from 'vue';

const disableButton = ref(true)

export default function SubmitButtonState(user, error) {
  const isSignupButtonDisabled = computed(() => {
    let disabled = true;
    for (let prop in user) {
      // if the field does not exist on user's object or
      //  there is an error on that field
      // then disable the button
      if (!user[prop] || error[prop]) {
        disabled = true;
        disableButton.value = true
        break;
      }
      disabled = false;
      disableButton.value = false
    }
    return disabled;
  });

  return { isSignupButtonDisabled, disableButton };
}
