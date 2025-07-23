"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import { Badge } from "./Badge";
import { FltrCtrl } from "./FltrCtrl";
import * as _utils from "./utils";
import _styles from "./AcrdFltrItm.module.css";

export function AcrdFltrItm({
  as: _Component = _Builtin.Block,
  comp = true,
  fltrTitleSrc = "FilterName",
  active,
  fltrBdg = false,
  fltrBdgQty = "1",
  filterSearch = true,
  filterSlider = false,
  filterClr = false,
  filterChoice = false,
  filterCbox = false,
  filterExampleFltrSwatch = true,
  filterClrMap,
  filterExamleCbox = true,
  filterCboxMap,
  filterClearClick = {},
  filterDoClick = {},
}) {
  return comp ? (
    <_Component
      className={_utils.cx(_styles, "fltr-acrd_itm")}
      tag="div"
      fs-accordion-element="accordion"
      fs-accordion-active={active}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "acrd-itm_head")}
        tag="div"
        tabIndex="0"
        role="button"
        aria-controls="accordion-1-content-1"
        aria-expanded="true"
        fs-accordion-element="trigger"
      >
        <Label txtSrc={fltrTitleSrc} lblSz="r2" icn={false} />
        <_Builtin.Block
          className={_utils.cx(_styles, "fltr-acrd_right")}
          tag="div"
        >
          {fltrBdg ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "fltr-acrd_clear")}
              tag="div"
              {...filterClearClick}
            >
              <Label lblSz="r4" icn={false} txtSrc="clear" lblClr="n300" />
              <Badge
                bdgTxtSrc={fltrBdgQty}
                bdgLoc=""
                bdgClr="p500"
                bdgCont={true}
                bdg={true}
              />
            </_Builtin.Block>
          ) : null}
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "acrd_arrow-icon")}
            fs-accordion-element="arrow"
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22currentColor%22%3E%3Cpath%20d%3D%22M11.9999%2013.1714L16.9497%208.22168L18.3639%209.63589L11.9999%2015.9999L5.63599%209.63589L7.0502%208.22168L11.9999%2013.1714Z%22%2F%3E%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "acrd-itm_body")}
        tag="div"
        aria-labelledby="accordion-1-header-1"
        fs-accordion-element="content"
      >
        <FltrCtrl
          slider={filterSlider}
          search={filterSearch}
          clr={filterClr}
          cbox={filterCbox}
          cboxExampleCbox={filterExamleCbox}
          clrExampleFltrSwatch={filterExampleFltrSwatch}
          clrClrMap={filterClrMap}
          cboxCboxMap={filterCboxMap}
          clearClick={filterClearClick}
          doClick={filterDoClick}
          choice={filterChoice}
          secHead={false}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
