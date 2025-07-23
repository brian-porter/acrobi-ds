import * as React from "react";
import * as Types from "./types";

declare function BentoHero(props: {
  as?: React.ElementType;
  bentoImg?: Types.Asset.Image;
  hlineTitleSrc?: React.ReactNode;
  hlineAlign?: Types.Builtin.Text;
}): React.JSX.Element;
