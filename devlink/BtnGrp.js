"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { BtnGrpItm } from "./BtnGrpItm";
import * as _utils from "./utils";
import _styles from "./BtnGrp.module.css";

export function BtnGrp({
  as: _Component = _Builtin.Block,
  btnGrp = true,
  btnLblSz = "r3",
  btnLblClr = "n9997",
  itmMap,
  example = true,
}) {
  return btnGrp ? (
    <_Component
      className={_utils.cx(_styles, "btn-grp_wrap")}
      id={_utils.cx(
        _styles,
        "w-node-_7f02c4cb-d14b-cf66-ee13-597b66659058-66659058"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "btn-grp_main")}
        id={_utils.cx(
          _styles,
          "w-node-_7f02c4cb-d14b-cf66-ee13-597b66659059-66659058"
        )}
        tag="div"
        role="group"
        aria-label="Pagination controls"
        data-fs={btnLblSz}
        data-clr={btnLblClr}
      >
        {itmMap ??
          (example ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "example-btngrp")}
              tag="div"
            >
              <BtnGrpItm
                btnTxtSrc="Prev"
                btnIcn={true}
                btnTxt={true}
                btnIcnSrc="nav_left"
                btnIcnLoc="l"
                btnLoc="l"
              />
              <BtnGrpItm />
              <BtnGrpItm btnTxtSrc="2" />
              <BtnGrpItm
                btnTxtSrc="More"
                btnIcn={true}
                btnTxt={false}
                btnIcnSrc="Moreh"
              />
              <BtnGrpItm
                btnTxtSrc="Next"
                btnIcn={true}
                btnTxt={true}
                btnIcnSrc="nav_right"
                btnIcnLoc="r"
                btnLoc="r"
              />
            </_Builtin.Block>
          ) : null)}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
