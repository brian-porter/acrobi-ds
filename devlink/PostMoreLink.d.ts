import * as React from "react";
import * as Types from "./types";

declare function PostMoreLink(props: {
  as?: React.ElementType;
  morePosts?: Types.Visibility.VisibilityConditions;
  morePostsClick?: Types.Devlink.RuntimeProps;
  morePostsQty?: React.ReactNode;
}): React.JSX.Element;
