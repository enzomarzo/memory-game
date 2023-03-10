import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../foundation/button/Button";
import classes from "./login.module.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) return;
    localStorage.setItem("username", username);
    navigate("/game");
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
          <input
            className={classes.cmpLoginFormInput}
            id="login"
            name="login"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <Button additionalCSS={classes.cmpLoginFormButton} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
