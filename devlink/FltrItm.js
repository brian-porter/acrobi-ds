"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import { FltrCtrl } from "./FltrCtrl";
import * as _utils from "./utils";
import _styles from "./FltrItm.module.css";

export function FltrItm({
  as: _Component = _Builtin.DropdownWrapper,
  fltrItm = true,
  fltrTitleSrc = "FltrName",
  ctrlSearch = false,
  ctrlSecHead = false,
  ctrlChoice = false,
  ctrlSlider = false,
  ctrlClr = false,
  ctrlCbox = false,
  exampleExampleFltrSwatch = true,
  ctrlClrMap,
  exampleExampleCbox = true,
  ctrlCboxMap,
  ctrlClearClick = {},
  ctrlDoClick = {},
  exampleClrSrc = "n100",
  exampleClrName = "Color",
  exampleClrSelected = false,
  exampleCboxId,
  exampleCboxLblFor,
  exampleCboxLblSrc = "OptionName",
}) {
  return fltrItm ? (
    <_Component tag="div" delay={0} hover={false}>
      <_Builtin.DropdownToggle
        className={_utils.cx(_styles, "", "dropdown-toggle")}
        tag="div"
      >
        <_Builtin.Icon
          className={_utils.cx(_styles, "icon")}
          widget={{
            type: "icon",
            icon: "dropdown-toggle",
          }}
        />
        <Label
          txtSrc={fltrTitleSrc}
          lblSz="r3"
          icn={false}
          txt={true}
          icnSrc="default"
          lblClr="n500"
        />
      </_Builtin.DropdownToggle>
      <_Builtin.DropdownList
        className={_utils.cx(_styles, "dropdown-list")}
        tag="nav"
        data-bs="m"
      >
        <FltrCtrl
          search={ctrlSearch}
          secHead={ctrlSecHead}
          choice={ctrlChoice}
          slider={ctrlSlider}
          clr={ctrlClr}
          cbox={ctrlCbox}
          clrExampleFltrSwatch={exampleExampleFltrSwatch}
          clrClrMap={ctrlClrMap}
          cboxExampleCbox={exampleExampleCbox}
          cboxCboxMap={ctrlCboxMap}
          clearClick={ctrlClearClick}
          doClick={ctrlDoClick}
          exampleFltrSwatchClrSrc={exampleClrSrc}
          exampleFltrSwatchClrName={exampleClrName}
          exampleFltrSwatchClrSelected={exampleClrSelected}
          exampleCboxCboxId={exampleCboxId}
          exampleCboxCboxLblFor={exampleCboxLblFor}
          exampleCboxCboxLblSrc={exampleCboxLblSrc}
        />
      </_Builtin.DropdownList>
    </_Component>
  ) : null;
}
