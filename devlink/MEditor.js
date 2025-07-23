"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { InputWBtns } from "./InputWBtns";
import { MLinkAdd } from "./MLinkAdd";
import { NavEditor } from "./NavEditor";
import { ColorPalette } from "./ColorPalette";
import * as _utils from "./utils";
import _styles from "./MEditor.module.css";

export function MEditor({
  as: _Component = _Builtin.Block,
  headHeader = false,
  headTitleSrc = "Title",
  headCancelClick = {},
  bodyContentMap,
  inputBaseInpt = true,
  inputBaseLIcnSrc = "emj",
  inputBaseLIcnClick = {},
  inputBaseFldClick = {},
  inputBaseFldChange,
  inputBaseSendClick = {},
  inputMediaInpt = false,
  inputMediaLIcnSrc = "search",
  inputMediaLIcnClick = {},
  inputMediaSegBtnAllAct = "true",
  inputMediaSegBtnAllClick = {},
  inputMediaSegBtnImgAct,
  inputMediaSegBtnImgClick = {},
  inputMediaSegBtnScanAct,
  inputMediaSegBtnScanClick = {},
  inputMediaSegBtnBkmrkAct,
  inputMediaSegBtnBkmrkClick = {},
  inputAddInpt = false,
  inputAddClick = {},
  inputAddFldClick = {},
  inputScanInpt = false,
  inputScanClick = {},
  inputScanFldClick = {},
  navNavMap,
  navExampleEditorNav = true,
  navBack = true,
  navTxt = true,
  navMedia = true,
  navAtch = true,
  navTag = true,
  navShare = true,
  navAdminMsg = false,
  navMbr = false,
  navBackClick = {},
  navTxtClick = {},
  navMediaClick = {},
  navAtchClick = {},
  navTagClick = {},
  navShareClick = {},
  navAdminMsgClick = {},
  navMbrClick = {},
  panelEmoji = false,
  panelEmojiMap,
  panelColor = false,
  panelColorMap,
  panelColorPaletteExample = false,
  editor = true,
  edClr,
  sheet = false,
  sheetMap,
  linkAdd = false,
}) {
  return editor ? (
    <_Component
      className={_utils.cx(_styles, "g-editor")}
      tag="div"
      data-editor-clr={edClr}
    >
      {headHeader ? (
        <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
          <SecHead
            act1Click={headCancelClick}
            titleSrc={headTitleSrc}
            sz="m"
            titleSz="r1"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        {bodyContentMap ??
          (sheet ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "sheet_bg")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sheet-content")}
                tag="div"
                data-bs="l"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sheet-grab")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "sheet-slot")}
                  tag="div"
                >
                  {sheetMap ?? <MLinkAdd linkAdd={linkAdd} />}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null)}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "g-editor-btm")}
        tag="div"
        data-bs="xs"
      >
        {inputBaseInpt ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "g-edinput-base")}
            tag="div"
          >
            <InputWBtns
              lLBtnIcnSrc={inputBaseLIcnSrc}
              lLBtnClick={inputBaseLIcnClick}
              fldFldClick={inputBaseFldClick}
              tTBtnClick={inputBaseSendClick}
              fldFldOnChange={inputBaseFldChange}
              tTBtnIcnSrc="Send"
              tTBtn={true}
              tTBtnStyle="pf"
              fldFldLIcnSrc="chat_convo"
              pPFld={true}
              fldFldTBtn={false}
              tTBtnPad="n"
            />
          </_Builtin.Block>
        ) : null}
        {inputMediaInpt ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "g-edinput-media")}
            tag="div"
          >
            <InputWBtns
              lLBtnIcnSrc={inputMediaLIcnSrc}
              lLBtnClick={inputMediaLIcnClick}
              segSegBtn1Act={inputMediaSegBtnAllAct}
              segSegBtn1Click={inputMediaSegBtnAllClick}
              segSegBtn2Act={inputMediaSegBtnImgAct}
              segSegBtn2Click={inputMediaSegBtnImgClick}
              segSegBtn3Act={inputMediaSegBtnScanAct}
              segSegBtn3Click={inputMediaSegBtnScanClick}
              segSegBtn4Act={inputMediaSegBtnBkmrkAct}
              segSegBtn4Click={inputMediaSegBtnBkmrkClick}
              lLBtnLblClr="n000"
              pPFld={false}
              pPSegBtn={true}
              tTBtn={false}
            />
          </_Builtin.Block>
        ) : null}
        {inputAddInpt ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "g-edinput-add")}
            tag="div"
          >
            <InputWBtns
              lLBtnClick={inputAddClick}
              fldFldClick={inputAddFldClick}
              tTBtnIcnSrc="act_filter"
              lLBtnIcnSrc="add"
              fldFldTBtn={false}
              tTBtnPad="n"
            />
          </_Builtin.Block>
        ) : null}
        {inputScanInpt ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "g-edinput-scan")}
            tag="div"
          >
            <InputWBtns
              lLBtnClick={inputScanClick}
              fldFldClick={inputScanFldClick}
              tTBtnIcnSrc="Send"
              tTBtnStyle="pf"
              fldFldTBtn={false}
              tTBtn={false}
            />
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block className={_utils.cx(_styles, "g-ednav")} tag="div">
          {navNavMap ?? (
            <NavEditor
              baseBaseBack={navBack}
              baseBaseTxt={navTxt}
              baseBaseMedia={navMedia}
              baseBaseAtch={navAtch}
              baseBaseTag={navTag}
              baseBaseShare={navShare}
              baseBaseAdminMsg={navAdminMsg}
              baseBaseMbr={navMbr}
              baseBaseBackClick={navBackClick}
              baseBaseTxtClick={navTxtClick}
              baseBaseMediaClick={navMediaClick}
              baseBaseAtchClick={navAtchClick}
              baseBaseTagClick={navTagClick}
              baseBaseShareClick={navShareClick}
              navEditor={navExampleEditorNav}
              baseBaseAdminMsgClick={navAdminMsgClick}
              baseBaseMbrClick={navMbrClick}
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "g-edpanel")} tag="div">
          {panelEmoji ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "edpanel-emoji")}
              tag="div"
            >
              {panelEmojiMap}
            </_Builtin.Block>
          ) : null}
          {panelColor ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "edpanel-color")}
              tag="div"
            >
              {panelColorMap ?? (
                <ColorPalette colorPalette={panelColorPaletteExample} />
              )}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
