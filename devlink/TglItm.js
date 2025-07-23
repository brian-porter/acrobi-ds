"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SwitchCtrl } from "./SwitchCtrl";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./TglItm.module.css";

export function TglItm({
  as: _Component = _Builtin.Link,
  fbk = false,
  lblSrc = "Label",
  lblFor,
  tglId,
  tglName,
  tglValue,
  align = "l",
  fbkFbkTxt = true,
  fbkFbkIcn = true,
  fbkFbkTxtSrc = "Feedback message",
  fbkFbkIcnSrc = "act_clearcirc",
  fbkFbkClr = "fd500",
  tabOrder,
  tglClick = {},
  tglRowClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "toggle_wrap")}
      button={false}
      block="inline"
      options={{
        href: "#",
      }}
      {...tglRowClick}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "toggle_main")}
        tag="div"
        data-input-align={align}
      >
        <SwitchCtrl tabOrder={tabOrder} toglClick={tglClick} />
        <Label txtSrc={lblSrc} lblFor={lblFor} lblSz="r3" icn={false} />
        {fbk ? (
          <_Builtin.Block className={_utils.cx(_styles, "itm_fbk")} tag="div">
            <Label
              lblClr={fbkFbkClr}
              txtSrc={fbkFbkTxtSrc}
              icnSrc={fbkFbkIcnSrc}
              txt={fbkFbkTxt}
              icn={fbkFbkIcn}
              icnLoc="r"
              lblSz="r3"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
