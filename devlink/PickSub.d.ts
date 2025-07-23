import * as React from "react";
import * as Types from "./types";

declare function PickSub(props: {
  as?: React.ElementType;
  cell1Src?: React.ReactNode;
  cell2Src?: React.ReactNode;
  cell3Src?: React.ReactNode;
  cell4Src?: React.ReactNode;
  cell5Src?: React.ReactNode;
  cell6Src?: React.ReactNode;
  cell7Src?: React.ReactNode;
  cell1Click?: Types.Devlink.RuntimeProps;
  cell2Click?: Types.Devlink.RuntimeProps;
  cell3Click?: Types.Devlink.RuntimeProps;
  cell4Click?: Types.Devlink.RuntimeProps;
  cell5Click?: Types.Devlink.RuntimeProps;
  cell6Click?: Types.Devlink.RuntimeProps;
  cell7Click?: Types.Devlink.RuntimeProps;
  cell1Link?: Types.Basic.Link;
  cell2Link?: Types.Basic.Link;
  cell3Link?: Types.Basic.Link;
  cell4Link?: Types.Basic.Link;
  cell5Link?: Types.Basic.Link;
  cell6Link?: Types.Basic.Link;
  cell7Link?: Types.Basic.Link;
}): React.JSX.Element;
