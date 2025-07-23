"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AcrdSec } from "./AcrdSec";
import * as _utils from "./utils";
import _styles from "./MenuAcrd.module.css";

export function MenuAcrd({
  as: _Component = _Builtin.Block,
  acrd = true,
  acrdSecMap,
  exampleAcrdSec = false,
}) {
  return acrd ? (
    <_Component
      className={_utils.cx(_styles, "acrd-menu_wrap")}
      tag="div"
      id="menu"
    >
      {acrdSecMap ?? <AcrdSec acrdSec={exampleAcrdSec} />}
    </_Component>
  ) : null;
}
