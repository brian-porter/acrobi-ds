"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import { Icon } from "./Icon";
import { Paragraph } from "./Paragraph";
import * as _utils from "./utils";
import _styles from "./Message.module.css";

export function Message({
  as: _Component = _Builtin.Block,
  lbl = true,
  titleSrc = "The title for this message goes here",
  icn = true,
  icnSrc = "Default",
  icnSz = "ml",
  icnClr = "n700",
  bodySrc = "Body copy for the message being shown, try to keep this content to two lines of text at most to keep it short and to the point.",
  bodySz = "r4",
  bodyClr = "n999",
}) {
  return (
    <_Component className={_utils.cx(_styles, "mess-warn")} tag="div">
      <Label txtSrc={titleSrc} lbl={lbl} icn={false} lblSz="r4b" />
      <_Builtin.Block className={_utils.cx(_styles, "mess-bullet")} tag="div">
        {icn ? (
          <_Builtin.Block className={_utils.cx(_styles, "mess-icn")} tag="div">
            <Icon icnSrc={icnSrc} icnClr={icnClr} icnSz={icnSz} />
          </_Builtin.Block>
        ) : null}
        <Paragraph bodySrc={bodySrc} fontSz={bodySz} fontClr={bodyClr} />
      </_Builtin.Block>
    </_Component>
  );
}
