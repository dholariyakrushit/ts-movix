import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/comman/FormInput";
import FormButton from "../../components/comman/FormButton";
import { auth } from "../../config/Firebase";
import { signUp_schema } from "../../validation";

interface IFormInput {
  email: string;
  password: string;
}
const LogInPage: React.FC = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState<string>("password");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(signUp_schema) });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { email, password } = data;

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        navigate("/home");
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  const togglePassword = (): void => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <>
      <>
        {" "}
        <Form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-center">SignIn</h2>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Email address</Form.Label>
            <FormInput
              type="email"
              placeholder="Enter email"
              name="email"
              register={register}
            />
            <Form.Text className="text-muted">
              {errors.email && <span>{errors.email.message}</span>}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3 possword-feild" controlId="password">
            <Form.Label> Password</Form.Label>
            <FormInput
              type={passwordType}
              name="password"
              placeholder="Enter Password"
              register={register}
            />
            <div className="pass-group-btn">
              <Button variant="light" onClick={togglePassword}>
                {passwordType === "password" ? (
                  <BsFillEyeSlashFill />
                ) : (
                  <BsFillEyeFill />
                )}
              </Button>
            </div>
            <Form.Text className="text-muted">
              {errors.password && <span>{errors.password.message}</span>}
            </Form.Text>
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

          <FormButton variant="primary" type="submit" label="submit" />
          {/* <Button variant="info" onClick={signGoogle}>
            signin with google
          </Button> */}
        </Form>
      </>
    </>
  );
};

export default LogInPage;
