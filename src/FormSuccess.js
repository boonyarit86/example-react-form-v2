import React from "react";
import styled from "styled-components";
import "./Form.css";

const FormSuccess = () => {
  return (
    <div className="form-content-right">
      <Form>We have received your request!</Form>
      <img src="img/img-3.svg" className="form-img-2" alt="success-image" />
    </div>
  );
};

export default FormSuccess;

const Form = styled.div`
  text-align: center;
  font-size: 24px;
  margin-top: 80px;
  color: #fff;
`;
