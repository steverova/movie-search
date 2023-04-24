
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object({
  searchValue: yup.string().required("This field is required"),
});

export const useValidate = (data) => {

  const [errors, setErrors] = useState("");
  const [valid, setValid] = useState(false)

  schema
    .validate(data)
    .then((valid) => {
      console.log(valid);
      setValid(true);
    })
    .catch((err) => {
        setErrors(err);
        setValid(false);
    });

    return {errors, valid};
};
