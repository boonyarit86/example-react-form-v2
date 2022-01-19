import React, { useState } from "react";
import styled from "styled-components";
import Input from "./components/Input";
import { useForm } from "./hooks/form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "./utils/validators";
import "./Form.css";

const FormSignup = ({ submitForm }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          username: undefined,
          password2: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          username: {
            value: "",
            isValid: false,
          },
          password2: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div className="form-content-right">
      <Form onSubmit={submitForm}>
        <h1>
          Get Started with us today! {!isLoginMode ? "Create" : "Login"} your
          account by filling out the information below.
        </h1>
        {!isLoginMode && (
          <Input
            id="username"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please fill your username"
            onInput={inputHandler}
            type="text"
            placeholder="Enter your username"
            label="Username"
            required
          />
        )}
        <Input
          id="email"
          element="input"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please fill your email"
          onInput={inputHandler}
          type="emaill"
          placeholder="Enter your email"
          label="Email"
          required
        />
        <Input
          id="password"
          element="input"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please fill this input at least 6 characters"
          onInput={inputHandler}
          type="password"
          placeholder="Enter your password"
          label="Password"
          required
        />
        {!isLoginMode && (
          <Input
            id="password2"
            element="input"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please fill this input at least 6 characters"
            onInput={inputHandler}
            type="password"
            placeholder="Enter your password"
            label="Confirm Password"
            required
          />
        )}
        <ButtonFormInput type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Login" : "Sign up"}
        </ButtonFormInput>
        <FormInputLogin>
          {!isLoginMode
            ? "Already has an account ? Login"
            : "Has an account yet? Sign up"}
          <span onClick={switchModeHandler}>here</span>
        </FormInputLogin>
      </Form>
    </div>
  );
};

export default FormSignup;

const Form = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 1rem;
    text-align: start;
    width: 80%;
    margin-bottom: 1rem;
    color: #fff;
  }
`;
const ButtonFormInput = styled.button`
  width: 80%;
  height: 50px;
  margin-top: 10px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    rgb(39, 176, 255) 0%,
    rgb(0, 232, 236) 100%
  );
  outline: none;
  border: none;
  color: #fff;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    background: linear-gradient(
      90deg,
      rgb(39, 143, 255) 0%,
      rgb(12, 99, 250) 100%
    );
    transition: all 0.4s ease-out;
  }

  &:disabled {
    background: #ccc;
  }
`;
const FormInputLogin = styled.span`
  font-size: 0.8rem;
  margin-top: 10px;
  color: #fff;
  width: 80%;
  text-align: center;

  span {
    color: #27cdff;
    font-weight: 600;
    margin-left: 5px;
    cursor: pointer;
  }
`;
