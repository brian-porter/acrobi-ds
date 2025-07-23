"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./MenuLink.module.css";

export function MenuLink({
  as: _Component = _Builtin.Link,
  menuItm = true,
  menuIcn = false,
  menuIcnSrc = "default",
  menuTxtSrc = "MenuOption",
  menuClick = {},

  menuLink = {
    href: "#",
  },
}) {
  return menuItm ? (
    <_Component
      className={_utils.cx(_styles, "menulink")}
      button={false}
      block="inline"
      options={menuLink}
      {...menuClick}
    >
      <Label txtSrc={menuTxtSrc} icn={menuIcn} icnSrc={menuIcnSrc} />
    </_Component>
  ) : null;
}
