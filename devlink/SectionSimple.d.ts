import * as React from "react";

declare function SectionSimple(props: {
  as?: React.ElementType;
  styleTheme?: "Inherit" | "Light" | "Dark";
  stylePaddingTop?: "None" | "Even" | "Small" | "Main" | "Large" | "Page Top";
  stylePaddingBottom?:
    | "None"
    | "Even"
    | "Small"
    | "Main"
    | "Large"
    | "Page Top";
}): React.JSX.Element;
