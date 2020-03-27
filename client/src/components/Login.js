import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label, Spinner } from "reactstrap";

function LoginForm(props) {
  const [loading, setLoading] = useState(false);
  const { history } = props;
  const { handleSubmit, register, errors, setError } = useForm();

  const onSubmit = values => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/login", values)
      .then(({ data }) => {
        localStorage.setItem("token", data.payload);
        history.push("/bubbles");
      })
      .catch(err => {
        setLoading(false);
        setError("response", "response", err.response.data.error);
        console.dir(err);
      });
  };

  return (
    <div className="login">
      <form className="form auth-form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="username">Username</Label>
          <input
            className="form-control"
            name="username"
            type="text"
            id="username"
            ref={register({
              required: "Required"
            })}
          />
          <span className="error">{errors.email && errors.email.message}</span>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            ref={register({
              required: "Required"
            })}
          />
          <span className="error">
            {errors.password && errors.password.message}
          </span>
        </FormGroup>

        {!loading && (
          <>
            <Button type="submit" color="primary" size="lg" block>
              Login
            </Button>
            <span className="error">
              {errors.response && errors.response.message}
            </span>
          </>
        )}
      </form>
      {loading && <Spinner color="primary" />}
    </div>
  );
}

export default LoginForm;
