import classes from "./button.module.scss";

interface IButtonProps {
  additionalCSS?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

function Button(props: IButtonProps) {
  const { additionalCSS, children, type, ...buttonProps } = props;

  return (
    <button
      className={`${classes.cmpButton} ${additionalCSS || ""}`}
      type={type || "button"}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default Button;
