import React from "react";

export interface IconProps {
  /**
   * The SVG React Component to render.
   * e.g., import { EyeIcon } from '@/assets/icons';
   * then pass: <Icon As={EyeIcon} className="w-5 h-5" title="Some title" />
   * The 'As' component is responsible for rendering the <title> tag if needed.
   */
  As: React.ElementType<React.SVGProps<SVGSVGElement> & { title?: string }>; // Allow title prop on As
  /**
   * Additional classes for styling the icon.
   */
  className?: string;
  /**
   * Title for accessibility - will be passed to the 'As' component.
   */
  title?: string;
  // Allow any other SVG-compatible props to be passed through
  [key: string]: any;
}

const Icon = ({ As, className, title, ...rest }: IconProps) => {
  // The 'As' component (e.g., EyeIcon) should handle the title prop
  // to render an SVG <title> element for accessibility.
  return <As className={className} title={title} {...rest} />;
};

export default Icon;
