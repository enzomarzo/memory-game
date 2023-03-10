import classes from "./button.module.scss";

interface IButtonProps {
  additionalCSS?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  buttonAsLink?: boolean;
}

function Button(props: IButtonProps) {
  const {
    buttonAsLink,
    additionalCSS,
    children,
    type,
    onClick,
  } = props;

  return (
    <button
      className={`${
        buttonAsLink ? classes.cmpButtonAsLink : classes.cmpButton
      } ${additionalCSS || ""}`}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
