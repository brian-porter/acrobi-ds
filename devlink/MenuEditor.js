"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MenuEditor.module.css";

export function MenuEditor({
  as: _Component = _Builtin.Block,
  txtSz = false,
  szHClick = {},
  szLClick = {},
  szMClick = {},
  szSClick = {},
  szTClick = {},
  txtAlign = false,
  alignLClick = {},
  alignCClick = {},
  alignRClick = {},
  alignJClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "menu_wrap")}
      tag="nav"
      data-mini=""
      data-bs="xs"
      id="menu"
    >
      {txtSz ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "menu-txtsize")}
          tag="div"
        >
          <MenuItem menuItmClick={szHClick} pTitleSrc="Huge" />
          <MenuItem menuItmClick={szLClick} pTitleSrc="Large" />
          <MenuItem menuItmClick={szMClick} pTitleSrc="Medium" />
          <MenuItem menuItmClick={szSClick} pTitleSrc="Small" />
          <MenuItem menuItmClick={szTClick} pTitleSrc="Tiny" />
        </_Builtin.Block>
      ) : null}
      {txtAlign ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "menu-txtalign")}
          tag="div"
        >
          <MenuItem
            menuItmClick={alignLClick}
            pTitleSrc="Left"
            lIcn={true}
            lIcnSrc="align_left"
            lIcnClr="n700"
          />
          <MenuItem
            menuItmClick={alignCClick}
            pTitleSrc="Center"
            lIcn={true}
            lIcnSrc="align_center"
            lIcnClr="n700"
          />
          <MenuItem
            menuItmClick={alignRClick}
            pTitleSrc="Right"
            lIcn={true}
            lIcnSrc="align_right"
            lIcnClr="n700"
          />
          <MenuItem
            menuItmClick={alignJClick}
            pTitleSrc="Justified"
            lIcn={true}
            lIcnSrc="align_justify"
            lIcnClr="n700"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
