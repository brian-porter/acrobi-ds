import * as React from "react";
import * as Types from "./types";

declare function MWaitlistConf(props: {
  as?: React.ElementType;
  linkFldClick?: Types.Devlink.RuntimeProps;
  tweetClick?: Types.Devlink.RuntimeProps;
  metaClick?: Types.Devlink.RuntimeProps;
  smsClick?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
