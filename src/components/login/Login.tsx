import { useState } from "react";
import Button from "../foundation/button/Button";
import classes from "./login.module.scss";

const Login = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("username", username);
  };

  return (
    <div className={classes.cmpLogin}>
      <h1 className={classes.cmpLoginTitle}>Memory Game</h1>
      <p className={classes.cmpLoginMessage}>
        Type your username to start playing
      </p>

      <form className={classes.cmpLoginForm} onSubmit={handleSubmit}>
        <label className={classes.cmpLoginFormLabel} htmlFor="login">
          Username
        </label>
        <input
          className={classes.cmpLoginFormInput}
          name="login"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button additionalCSS={classes.cmpLoginFormButton} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
