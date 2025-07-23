"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { BtnGrp } from "./BtnGrp";
import * as _utils from "./utils";
import _styles from "./SecPaginate.module.css";

export function SecPaginate({
  as: _Component = _Builtin.Section,
  sec = true,
  conBtnLblSz = "r3",
  conBtnLblClr = "n9997",
  conItmMap,
  conExample = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "paginate_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.Block className={_utils.cx(_styles, "paginate_main")} tag="div">
        <BtnGrp
          example={conExample}
          btnLblSz={conBtnLblSz}
          btnLblClr={conBtnLblClr}
          itmMap={conItmMap}
          btnGrp={true}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
