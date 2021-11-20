import { reactive } from '@vue/reactivity';
import fieldValidators from './Validators.js';

const error = reactive({});
const { isEmpty, minLength, isEmail, isNum } = fieldValidators();

export default function FormValidation() {
  const validateNameField = (fieldName, fieldValue) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 4);
  };

  const validateEmailField = (fieldName, fieldValue) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isEmail(fieldName, fieldValue);
  };

  const validatePhoneField = (fieldName, fieldValue) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isNum(fieldName, fieldValue);
  };

  const validatePasswordField = (fieldName, fieldValue) => {
    error[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 8);
  };
  return {
    error,
    validateNameField,
    validateEmailField,
    validatePhoneField,
    validatePasswordField,
  };
}
