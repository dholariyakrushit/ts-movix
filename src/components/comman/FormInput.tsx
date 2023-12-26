// import React, { forwardRef, ForwardedRef } from "react";
// import { Form } from "react-bootstrap";

// interface FormInputProps {
//   type: string;
//   placeholder: string;
//   name: string;
//   ref?: ForwardedRef<HTMLInputElement>;
// }

// const FormInput: React.FC<FormInputProps> = forwardRef(
//   ({ type, placeholder, name }, ref) => {
//     return (
//       <Form.Control type={type} placeholder={placeholder} name={name} ref={ref} />
//     );
//   }
// );

// export default FormInput;

import React from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister } from "react-hook-form";


interface FormInputProps {
  type: string;
  name: string;
  placeholder:string;
  register: UseFormRegister<any>;
  rules?: Object;
}

const FormInput: React.FC<FormInputProps> = ({
 
  type,
  name,
  placeholder,
  register,
  rules,
}) => {
  return (
    <div>
      <Form.Control type={type} placeholder={placeholder} {...register(name, rules)} />
    </div>
  );
};

export default FormInput;
