"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { InputWBtns } from "./InputWBtns";
import { SecHead } from "./SecHead";
import { Spacer } from "./Spacer";
import { SegBtnForm } from "./SegBtnForm";
import { SliderForm } from "./SliderForm";
import { FltrSwatch } from "./FltrSwatch";
import { CboxCtrl } from "./CboxCtrl";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./FltrCtrl.module.css";

export function FltrCtrl({
  as: _Component = _Builtin.Block,
  search = false,
  secHead = false,
  choice = false,
  slider = false,
  clr = false,
  cbox = false,
  clrExampleFltrSwatch = true,
  clrClrMap,
  exampleFltrSwatchClrSrc = "n100",
  exampleFltrSwatchClrName = "Color",
  exampleFltrSwatchClrSelected = false,
  cboxExampleCbox = true,
  cboxCboxMap,
  exampleCboxCboxId,
  exampleCboxCboxLblFor,
  exampleCboxCboxLblSrc = "FilterName",
  clearClick = {},
  doClick = {},
  headFldTBtn = false,
  headFldPholdSrc = "Search {Type}",
  headFldTBtnClick = {},
  headFldClick = {},
  headTitleSrc = "FilterTitle",
}) {
  return (
    <_Component className={_utils.cx(_styles, "filter-ctrl")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "filter-ctrl_head")}
        tag="div"
      >
        {search ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "filter-search")}
            tag="div"
          >
            <InputWBtns
              fldFldPholdSrc={headFldPholdSrc}
              fldFldClick={headFldClick}
              fldFldTBtn={headFldTBtn}
              fldFldTBtnClick={headFldTBtnClick}
              lLBtnIcn={true}
              lLBtn={false}
              tTBtnTxtSrc="Clear"
              tTBtnTxt={true}
              tTBtnIcn={false}
              tTBtnStyle="ft"
              tTBtnPad="n"
              tTBtn={false}
              comp={true}
            />
          </_Builtin.Block>
        ) : null}
        <SecHead secHead={secHead} titleSrc={headTitleSrc} act1={false} />
      </_Builtin.Block>
      <_Builtin.FormWrapper className={_utils.cx(_styles, "filter-ctrl_form")}>
        <_Builtin.FormForm
          name="wf-form-Filters"
          data-name="Filters"
          method="get"
          id="wf-form-Filters"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "filter-ctrl_body")}
            tag="div"
          >
            {choice ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "filter-choice")}
                tag="div"
              >
                <Spacer size="16" />
                <SegBtnForm lblTop={false} />
              </_Builtin.Block>
            ) : null}
            {slider ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "filter-slider")}
                tag="div"
              >
                <Spacer size="16" />
                <SliderForm
                  lblTop={false}
                  fieldSingleSlide={false}
                  fieldDualSlide={true}
                />
              </_Builtin.Block>
            ) : null}
            {clr ? (
              <_Builtin.Grid
                className={_utils.cx(_styles, "filter-color-grid")}
                tag="div"
              >
                {clrClrMap ?? (
                  <>
                    <FltrSwatch
                      comp={clrExampleFltrSwatch}
                      clrSrc={exampleFltrSwatchClrSrc}
                      clrName={exampleFltrSwatchClrName}
                      selected={exampleFltrSwatchClrSelected}
                    />
                    <FltrSwatch
                      comp={clrExampleFltrSwatch}
                      clrSrc={exampleFltrSwatchClrSrc}
                      clrName={exampleFltrSwatchClrName}
                      selected={exampleFltrSwatchClrSelected}
                    />
                    <FltrSwatch
                      comp={clrExampleFltrSwatch}
                      clrSrc={exampleFltrSwatchClrSrc}
                      clrName={exampleFltrSwatchClrName}
                      selected={exampleFltrSwatchClrSelected}
                    />
                    <FltrSwatch
                      comp={clrExampleFltrSwatch}
                      clrSrc={exampleFltrSwatchClrSrc}
                      clrName={exampleFltrSwatchClrName}
                      selected={exampleFltrSwatchClrSelected}
                    />
                    <FltrSwatch
                      comp={clrExampleFltrSwatch}
                      clrSrc={exampleFltrSwatchClrSrc}
                      clrName={exampleFltrSwatchClrName}
                      selected={exampleFltrSwatchClrSelected}
                    />
                    <FltrSwatch
                      comp={clrExampleFltrSwatch}
                      clrSrc={exampleFltrSwatchClrSrc}
                      clrName={exampleFltrSwatchClrName}
                      selected={exampleFltrSwatchClrSelected}
                    />
                    <FltrSwatch
                      comp={clrExampleFltrSwatch}
                      clrSrc={exampleFltrSwatchClrSrc}
                      clrName={exampleFltrSwatchClrName}
                      selected={exampleFltrSwatchClrSelected}
                    />
                  </>
                )}
              </_Builtin.Grid>
            ) : null}
            {cbox ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "filter-cbox")}
                tag="div"
              >
                {cboxCboxMap ?? (
                  <>
                    <Spacer size="16" />
                    <CboxCtrl
                      itmLblSrc={exampleCboxCboxLblSrc}
                      comp={cboxExampleCbox}
                      lblFor={exampleCboxCboxLblFor}
                      id={exampleCboxCboxId}
                    />
                    <CboxCtrl
                      itmLblSrc={exampleCboxCboxLblSrc}
                      comp={cboxExampleCbox}
                      lblFor={exampleCboxCboxLblFor}
                      id={exampleCboxCboxId}
                    />
                    <CboxCtrl
                      itmLblSrc={exampleCboxCboxLblSrc}
                      comp={cboxExampleCbox}
                      lblFor={exampleCboxCboxLblFor}
                      id={exampleCboxCboxId}
                    />
                  </>
                )}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <ButtonPanel
            btn1Click={clearClick}
            btn2Click={doClick}
            btn3={false}
            btnPnlOri="h"
            btn1Styl="nl"
            btn1TxtSrc="Clear"
            btn1Sz="m"
            btn2Styl="pf"
            btn2Sz="m"
            btn2TxtSrc="Done"
          />
          <Spacer size="8" />
        </_Builtin.FormForm>
        <_Builtin.FormSuccessMessage />
        <_Builtin.FormErrorMessage />
      </_Builtin.FormWrapper>
    </_Component>
  );
}
