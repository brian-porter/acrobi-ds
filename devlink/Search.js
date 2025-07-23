"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { InputWBtns } from "./InputWBtns";
import { Chip } from "./Chip";
import * as _utils from "./utils";
import _styles from "./Search.module.css";

export function Search({
  as: _Component = _Builtin.Block,
  search = true,
  scanBtn = false,
  fltrBtn = false,
  scanBtnClick = {},
  searchFldClick = {},
  fltrBtnClick = {},
  fltrSideFade = true,
  fltrCellMap,
  fltrExampleFilterChips = true,
  filter = true,
}) {
  return search ? (
    <_Component className={_utils.cx(_styles, "search-field")} tag="div">
      <InputWBtns
        fldFldClick={searchFldClick}
        lLBtn={scanBtn}
        tTBtn={fltrBtn}
        tTBtnClick={fltrBtnClick}
        lLBtnClick={scanBtnClick}
        tTBtnIcnSrc="act_filter"
        tTBtnPad="n"
        fldFldTBtn={false}
        fldFldOnChange=""
        fldFldPholdSrc="Search for a seller"
      />
      {filter ? (
        <_Builtin.Block className={_utils.cx(_styles, "filter-ss")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "u-bargap-ss")}
            tag="div"
          >
            {fltrCellMap ??
              (fltrExampleFilterChips ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "example-map")}
                  tag="div"
                >
                  <Chip
                    chip={true}
                    base={true}
                    avtrTxtSrc="Admin"
                    chipTxtSrc="All"
                    chipIcn={false}
                    chipActive="true"
                  />
                  <Chip
                    chipIcnSrc="store"
                    chip={true}
                    base={true}
                    avtrTxtSrc="Admin"
                    chipTxtSrc="Retailers"
                  />
                  <Chip
                    chipIcnSrc="brand"
                    chip={true}
                    base={true}
                    avtrTxtSrc="Admin"
                    chipTxtSrc="Brands"
                  />
                  <Chip
                    chipIcnSrc="peep"
                    chip={true}
                    base={true}
                    avtrTxtSrc="Admin"
                    chipTxtSrc="2nd Hand"
                  />
                </_Builtin.Block>
              ) : null)}
          </_Builtin.Block>
          {fltrSideFade ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "side-fade")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "side-fade-l")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "side-fade-r")}
                tag="div"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
