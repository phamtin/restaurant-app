import type { ReactNode } from "react";
import styles from "./page.module.scss";

export type IconProps = {
  icon?: ReactNode;
  text?: string;
  size?: "small" | "medium" | "large";
  border?: boolean;
  background?: boolean;
  color?: string;
};

const Icon = (props: IconProps) => {
  const {
    size = "medium",
    border = false,
    background = true,
    color = "#1a45e0", // random color ^^
    icon,
  } = props;

  const wrapperClasses = [
    styles.wrapper,
    styles[`wrapper--${size}`], // Size modifier (e.g., wrapper--small)
    border ? styles["wrapper--border"] : "", // Border modifier
    background ? styles["wrapper--background"] : "", // Background modifier
  ]
    .filter(Boolean) // Remove falsy values (e.g., "")
    .join(" ");

  return (
    <div
      className={wrapperClasses}
      style={{ "--icon-color": color } as React.CSSProperties} // Pass color as custom property
    >
      {icon}
    </div>
  );
};

export default Icon;
