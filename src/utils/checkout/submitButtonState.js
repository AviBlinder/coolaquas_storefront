import { computed } from 'vue';

export default function SubmitButtonState(user, error) {
  const isSignupButtonDisabled = computed(() => {
    let disabled = true;
    for (let prop in user) {
      if (!user[prop] || error[prop]) {
        disabled = true;
        break;
      }
      disabled = false;
    }
    return disabled;
  });

  return { isSignupButtonDisabled };
}
