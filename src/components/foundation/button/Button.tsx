import classes from "./button.module.scss";

interface IButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

function Button(props: IButtonProps) {
  const { children, type = "button", ...buttonProps } = props;

  return (
    <button className={classes.cmpButton} type={type} {...buttonProps}>
      {children}
    </button>
  );
}

export default Button;
