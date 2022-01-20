import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        // *** This Example starts processing when change mode or click "Already has an account ? Login here" 
        // from Register page to Login page and You only fill email input(Test@gmail.com).  ***

        // state.inputs: [{username: undefined, email: {value: "", isValid: false}, password: {value: "", isValid: false}, password2: undefined}]
        // state.isValid: false
        // action: {isValid: true, inputId: "email", value: "Test@gmail.com"}

        // Loop 1: 1. inputId = username | 2. state.inputs[username] => !undefined = true
        // Loop 2: 1. inputId = email | 2. state.inputs[email] => {value: "", isValid: false} = false
        // Loop 3: 1. inputId = password | 2. state.inputs[password] => {value: "", isValid: false} = false
        // Loop 4: 1. inputId = password2 | 2. state.inputs[password2] => !undefined = true

        if (!state.inputs[inputId]) {
          // Loop 1: 3. Start next loop => email
          // Loop 4: 3. End loop
          continue;
        }
        // Loop 2: 3. inputId = email | 4. email === action.inputId(email) = true
        // Loop 3: 4. inputId = password | 5. password === action.inputId(email) = false
        if (inputId === action.inputId) {
          // Loop 2: 5. formIsvalid(true) && action.isValid(true) | 6. formIsValid = true | 7. Start next loop => password
          formIsValid = formIsValid && action.isValid;
        } else {
          // Loop 3: 6. formIsvalid(true) && state.inputs[password].isValid(false) | 7. formIsValid = false | 8. Start next loop => password2
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      // After Loop 4 ended => formIsValid: false

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
      // Then return new "state.inputs" and "state.isValid" variable to be ...
      // state.inputs: [{username: undefined, email: {value: "Test@gmail.com", isValid: true}, password: {value: "", isValid: false}, password2: undefined}]
      // state.isValid: formIsValid(false)

      // If "state.isValid" variable equals "false", The button named "Login" or "Register" will be disabled or cann't click
      
      // *** So if "state.isValid" variable equals "true", The button named "Login" must have 
      // the value of state.inputs[{email:{isVaid: true}}, {password: {isValid: true}}] so as to can click, and
      // The button named "Register" must have the value of 
      // state.inputs[{username: {isValid: true}}, {email:{isVaid: true}}, {password: {isValid: true}}, 
      // {password2: {isValid: true}}] so as to can click. ***

    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
