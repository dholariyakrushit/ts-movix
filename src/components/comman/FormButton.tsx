import React from "react";
import { Button } from "react-bootstrap";

interface buttonType {
  variant: string;
  type?: "button" | "submit" | "reset" | undefined;
  label: string;
}
const FormButton:React.FC<buttonType>=({ variant, type, label })=> {
  return (
    <>
      <Button variant={variant} type={type}>
        {label}
      </Button>
    </>
  );
}

export default FormButton;
