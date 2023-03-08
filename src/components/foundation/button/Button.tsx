import classes from "./button.module.scss";

interface IButtonProps {
  additionalCSS?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function Button(props: IButtonProps) {
  const { additionalCSS, children, type, onClick, ...buttonProps } = props;

  return (
    <button
      className={`${classes.cmpButton} ${additionalCSS || ""}`}
      type={type || "button"}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default Button;
