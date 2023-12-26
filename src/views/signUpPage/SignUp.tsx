import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import FormInput from "../../components/comman/FormInput";
import FormButton from "../../components/comman/FormButton";
import "./signup.scss";
import { signUp_schema } from "../../validation";
import { Link } from "react-router-dom";

interface IFormInput {
  userName: string;
  email: string;
  password: string;
  confirm_password: string;
}

const SignUp = () => {
  const [passwordType, setPasswordType] = useState<string>("password");
  const [passwordConfirmType, setPasswordConfirmType] =
    useState<string>("password");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(signUp_schema) });
  // { resolver: yupResolver(signUp_schema) }

  const hanldeGoogleSignIn = async () => {
    const google_provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, google_provider);
      console.log(result);
      const { user } = result;

      // if (additionalUserInfo?.isNewUser) {
      await setDoc(doc(db, "users", user?.uid), {
        email: user?.email,
        userName: user?.displayName,
      });
      // }
    } catch (error) {
      // Handle any errors that occur during sign-in
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { userName, email, password } = data;

    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", user?.uid), {
      userName: userName,
      email: email,
    });
    alert("data added");
  };

  const togglePassword = (): void => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const confirmPass = (): void => {
    if (passwordConfirmType === "password") {
      setPasswordConfirmType("text");
      return;
    }
    setPasswordConfirmType("password");
  };
  return (
    <>
      {" "}
      <Form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center">SignUp</h2>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label> UserName</Form.Label>
          <FormInput
            type="text"
            placeholder="Enter UserName"
            name="userName"
            register={register}
          />
          <Form.Text className="text-muted">
            {errors.email && <span>{errors.email.message}</span>}
          </Form.Text>
        </Form.Group>
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

        <Form.Group
          className="mb-3 possword-feild"
          controlId="formBasicPassword"
        >
          <Form.Label>Confirm Password</Form.Label>
          <FormInput
            placeholder="Confirm Password"
            type={passwordConfirmType}
            name="confirm_password"
            register={register}
            rules={{ required: true, maxLength: 20 }}
          />
          <div className="pass-group-btn">
            <Button variant="light" onClick={confirmPass}>
              {passwordConfirmType === "password" ? (
                <BsFillEyeSlashFill />
              ) : (
                <BsFillEyeFill />
              )}
            </Button>
          </div>
          <Form.Text className="text-muted">
            {errors.confirm_password && (
              <span>{errors.confirm_password.message}</span>
            )}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <p className="text-center">
          Already a user? <Link to={"/login"}>Login</Link>
        </p>
        <FormButton variant="primary" type="submit" label="submit" />
        <Button variant="info" onClick={hanldeGoogleSignIn}>
          signin with google
        </Button>
      </Form>
    </>
  );
};

export default SignUp;
