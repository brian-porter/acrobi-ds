import * as React from "react";
import * as Types from "./types";

declare function MFeedbackMarket(props: {
  as?: React.ElementType;
  cancelClick?: Types.Devlink.RuntimeProps;
  priceValue?: Types.Builtin.Text;
  valueValue?: Types.Builtin.Text;
  compValue?: Types.Builtin.Text;
  payChange?: Types.Builtin.Text;
  altsChange?: Types.Builtin.Text;
  altsCount?: React.ReactNode;
  findChange?: Types.Builtin.Text;
  findCount?: React.ReactNode;
  sugChange?: Types.Builtin.Text;
  sugCount?: React.ReactNode;
  doClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
