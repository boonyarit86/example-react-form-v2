import React, { useState } from "react";
import styled from "styled-components";
import FormSignup from "./FormSignup";
import FormSuccess from "./FormSuccess";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <>
      <FormContainer>
        <ButtonClose>x</ButtonClose>
        <FormContentLeft>
          <FormImg src="img/img-2.svg" alt="spaceship" />
        </FormContentLeft>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </FormContainer>
    </>
  );
};

export default Form;

const FormContainer = styled.div`
  margin: 100px auto;
  width: 1000px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 10px;
  height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ButtonClose = styled.span`
  position: absolute;
  top: 2%;
  right: 3%;
  font-size: 1.5rem;
  z-index: 1;
  color: #fff;
  cursor: pointer;
`;

const FormContentLeft = styled.div`
   background: linear-gradient(
    90deg,
    rgb(39, 176, 255) 0%,
    rgb(0, 232, 236) 100%
  );
  border-radius: 10px 0 0 10px;
  position: relative;
`;

const FormImg = styled.img`
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
