"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./NavItm.module.css";

export function NavItm({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "g-nav-itm")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "nav-back")} tag="div">
        <Button
          btnTxt={false}
          btnIcnSrc="Nav_left"
          btnClick={{}}
          btn={true}
          btnTxtSrc="Back"
          disabled="false"
          btnSz="l"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "nav-content")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "navbar-ss")} tag="div">
          <Button
            btnStyl="nt"
            btnTxt={true}
            btnIcnSrc="vid"
            btnClick={{}}
            disabled="false"
            btn={true}
            btnTxtSrc="Videos"
            btnSz="l"
          />
          <Button
            btnStyl="nt"
            btnTxt={true}
            btnIcnSrc="library"
            btnClick={{}}
            disabled="false"
            btnTxtSrc="Library"
            btnSz="l"
          />
          <Button
            btnStyl="nt"
            btnTxt={true}
            btnIcnSrc="group"
            btnClick={{}}
            disabled="false"
            btnTxtSrc="Groups"
            btnSz="l"
          />
          <Button
            btnStyl="nt"
            btnTxt={true}
            btnIcnSrc="chat"
            btnClick={{}}
            disabled="false"
            btnTxtSrc="Talk"
            btnSz="l"
          />
          <Button
            btnStyl="nt"
            btnTxt={true}
            btnIcnSrc="notes"
            btnClick={{}}
            disabled="false"
            btnTxtSrc="Notes"
            btnSz="l"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
