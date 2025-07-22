import React from "react";

export interface IconProps {
  /**
   * The SVG icon component to render (e.g., EyeIcon, EyeSlashIcon).
   */
  As: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /**
   * Optional CSS class name for styling.
   */
  className?: string;
  /**
   * Optional title for accessibility.
   */
  title?: string;
}

const Icon = ({
  As,
  className,
  ...rest
}: IconProps & Omit<React.SVGProps<SVGSVGElement>, "title">) => {
  // The 'As' component (e.g., EyeIcon) should handle the title prop
  // to render an SVG <title> element for accessibility.
  return <As className={className} {...rest} />;
};

export default Icon;
