"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import * as _utils from "./utils";
import _styles from "./GutterBadge.module.css";

export function GutterBadge({
  as: _Component = _Builtin.Block,
  gttrBdg = true,
  pin = false,
  alarm = false,
  bookmark = false,
}) {
  return gttrBdg ? (
    <_Component className={_utils.cx(_styles, "gttr_bdg_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "gttr_bdg_main")} tag="div">
        <Icon icn={pin} icnSrc="Pin" icnSz="xxs" icnClr="in" />
        <Icon icn={alarm} icnSrc="Alarm" icnSz="xxs" icnClr="in" />
        <Icon icn={bookmark} icnSrc="Bookmark" icnSz="xxs" icnClr="in" />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
