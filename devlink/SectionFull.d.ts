import * as React from "react";
import * as Types from "./types";

declare function SectionFull(props: {
  as?: React.ElementType;
  theme?: "Inherit" | "Light" | "Dark";
  paddingTop?: "None" | "Even" | "Small" | "Main" | "Large" | "Page Top";
  paddingBottom?: "None" | "Even" | "Small" | "Main" | "Large" | "Page Top";
  eyebrowEyebrowVisibility?: Types.Visibility.VisibilityConditions;
  eyebrowEyebrowText?: Types.Basic.RichTextChildren;
  globalHeadingHeadingText?: Types.Basic.RichTextChildren;
  globalParagraphParagraphVisibility?: Types.Visibility.VisibilityConditions;
  globalParagraphParagraphText?: Types.Basic.RichTextChildren;
  globalButtonGroupGroupVisibility?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
