"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./CellOption.module.css";

export function CellOption({
  as: _Component = _Builtin.Block,
  cell = true,
  id = "conf-opt",
  nameSrc = "Choice",
  cellSz = "m",
  cellStyl = "nl",
  cellActv = "false",
  cellDis = "false",
  cellClick = {},
}) {
  return cell ? (
    <_Component
      className={_utils.cx(_styles, "conf-cell")}
      tag="div"
      id={id}
      {...cellClick}
    >
      <Button
        btnTxtSrc={nameSrc}
        btnStyl={cellStyl}
        btnSz={cellSz}
        btnActive={cellActv}
        disabled={cellDis}
        lblSz="r4"
        btnIcn={false}
      />
    </_Component>
  ) : null;
}
