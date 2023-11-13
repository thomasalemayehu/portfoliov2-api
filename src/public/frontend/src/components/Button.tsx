import buttonStyles from "../assets/styles/component/Button.module.css";

interface ButtonInformation {
  label: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function;
}
function Button({ label, callback }: ButtonInformation) {
  return (
    <button
      className={buttonStyles.button}
      onClick={() => {
        callback();
      }}
    >
      {label}
    </button>
  );
}

export default Button;
