import * as React from "react";
import * as Types from "./types";

declare function PostMedia(props: {
  as?: React.ElementType;
  media?: Types.Visibility.VisibilityConditions;
  mediaMap?: Types.Devlink.Slot;
  mediaExample?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
