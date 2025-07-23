"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./BreadcrumbItem.module.css";

export function BreadcrumbItem({
  as: _Component = _Builtin.ListItem,
  itmClick = {},
  itmTxtSrc = "NodeName",
}) {
  return (
    <_Component className={_utils.cx(_styles, "brdcrm_itm")} {...itmClick}>
      <_Builtin.Block className={_utils.cx(_styles, "brdcrm_line")} tag="div" />
      <Label txtSrc={itmTxtSrc} icn={false} lblSz="in" />
    </_Component>
  );
}
