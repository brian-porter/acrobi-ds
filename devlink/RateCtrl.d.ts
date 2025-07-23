import * as React from "react";
import * as Types from "./types";

declare function RateCtrl(props: {
  as?: React.ElementType;
  value?: React.ReactNode;
  rateId?: Types.Basic.IdTextInput;
  rate1?: Types.Visibility.VisibilityConditions;
  rate1State?: React.ReactNode;
  rate1Over?: Types.Devlink.RuntimeProps;
  rate2?: Types.Visibility.VisibilityConditions;
  rate2State?: React.ReactNode;
  rate2Over?: Types.Devlink.RuntimeProps;
  rate3?: Types.Visibility.VisibilityConditions;
  rate3State?: React.ReactNode;
  rate3Over?: Types.Devlink.RuntimeProps;
  rate4?: Types.Visibility.VisibilityConditions;
  rate4State?: React.ReactNode;
  rate4Over?: Types.Devlink.RuntimeProps;
  rate5?: Types.Visibility.VisibilityConditions;
  rate5State?: React.ReactNode;
  rate5Over?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
