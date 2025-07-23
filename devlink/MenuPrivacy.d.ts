import * as React from "react";
import * as Types from "./types";

declare function MenuPrivacy(props: {
  as?: React.ElementType;
  menu?: Types.Visibility.VisibilityConditions;
  mini?: Types.Builtin.Text;
  popId?: Types.Basic.IdTextInput;
  anchorId?: Types.Builtin.Text;
  broadcast?: Types.Visibility.VisibilityConditions;
  broadcastOn?: Types.Visibility.VisibilityConditions;
  publicly?: Types.Visibility.VisibilityConditions;
  publiclyOn?: Types.Visibility.VisibilityConditions;
  privately?: Types.Visibility.VisibilityConditions;
  privatelyOn?: Types.Visibility.VisibilityConditions;
  confidential?: Types.Visibility.VisibilityConditions;
  confidentialOn?: Types.Visibility.VisibilityConditions;
  broadcastClick?: Types.Devlink.RuntimeProps;
  publiclyClick?: Types.Devlink.RuntimeProps;
  privatelyClick?: Types.Devlink.RuntimeProps;
  confidentialClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
