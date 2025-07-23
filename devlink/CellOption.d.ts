import * as React from "react";
import * as Types from "./types";

declare function CellOption(props: {
  as?: React.ElementType;
  cell?: Types.Visibility.VisibilityConditions;
  id?: Types.Basic.IdTextInput;
  nameSrc?: React.ReactNode;
  cellSz?: Types.Builtin.Text;
  cellStyl?: Types.Builtin.Text;
  cellActv?: Types.Builtin.Text;
  cellDis?: Types.Builtin.Text;
  cellClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
