"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import { BreadcrumbItem } from "./BreadcrumbItem";
import * as _utils from "./utils";
import _styles from "./Breadcrumb.module.css";

export function Breadcrumb({
  as: _Component = _Builtin.Block,
  breadcrumb = false,
  homeClick = {},
  itmMap,
  itmClr = "n700",
  itmSz = "r3",
}) {
  return breadcrumb ? (
    <_Component
      className={_utils.cx(_styles, "brdcrm_wrap")}
      tag="nav"
      aria-label="breadcrumb"
    >
      <_Builtin.List
        className={_utils.cx(_styles, "brdcrm_list")}
        tag="ul"
        data-clr={itmClr}
        data-fs={itmSz}
        unstyled={true}
      >
        {itmMap ?? (
          <>
            <_Builtin.ListItem
              className={_utils.cx(_styles, "brdcrm_itm1")}
              {...homeClick}
            >
              <Label txtSrc="Home" lblSz="in" icnSrc="home2" />
            </_Builtin.ListItem>
            <BreadcrumbItem />
            <BreadcrumbItem />
          </>
        )}
      </_Builtin.List>
    </_Component>
  ) : null;
}
