"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./NavDesigner.module.css";

export function NavDesigner({
  as: _Component = _Builtin.Block,
  navDsg = true,
  baseBase = true,
  baseBaseAdj = true,
  baseBaseStyle = true,
  baseBaseAlt = true,
  baseBaseTrim = true,
  baseBaseOrn = true,
  baseBaseAdjClick = {},
  baseBaseStyleClick = {},
  baseBaseAltClick = {},
  baseBaseTrimClick = {},
  baseBaseOrnClick = {},
  adjAdj = false,
  adjAdjCrop = true,
  adjAdjRotate = true,
  adjAdjFlipH = true,
  adjAdjFlipV = true,
  adjAdjCropClick = {},
  adjAdjRotateClick = {},
  adjAdjFlipHClick = {},
  adjAdjFlipVClick = {},
  altAlt = false,
  altAltStyle = true,
  altAltExposure = true,
  altAltBrightness = true,
  altAltContrast = true,
  trimTrim = false,
  trimTrimTxt = true,
  trimTrimDraw = true,
  trimTrimLine = true,
  trimTrimBox = true,
  trimTrimCircle = true,
  trimTrimTxtClick = {},
  trimTrimDrawClick = {},
  trimTrimLineClick = {},
  trimTrimBoxClick = {},
  trimTrimCircleClick = {},
  styleStyle = false,
  styleStyleFrame = true,
  styleStyleColor = true,
  styleStyleFrameClick = {},
  styleStyleColorClick = {},
  ornOrn = false,
  ornOrnSticker = true,
  ornOrnStickerClick = {},
  altAltStyleClick = {},
  altAltExposureClick = {},
  altAltBrightnessClick = {},
  altAltContrastClick = {},
}) {
  return navDsg ? (
    <_Component className={_utils.cx(_styles, "g-dsg-nav")} tag="div">
      {baseBase ? (
        <_Builtin.Block className={_utils.cx(_styles, "dsgnav-base")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "toolbar-ss")}
            tag="div"
          >
            <Button
              btnClick={baseBaseAdjClick}
              btn={baseBaseAdj}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_adj"
              btnTxtSrc=""
              btnIcnLoc="t"
            />
            <Button
              btnClick={baseBaseStyleClick}
              btn={baseBaseStyle}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_style"
              btnTxtSrc="Style"
              btnIcnLoc="t"
            />
            <Button
              btnClick={baseBaseAltClick}
              btn={baseBaseAlt}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="design"
              btnIcnLoc="t"
              btnTxtSrc="Alter"
            />
            <Button
              btnClick={baseBaseTrimClick}
              btn={baseBaseTrim}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_trim"
              btnTxtSrc="Trim"
              btnIcnLoc="t"
            />
            <Button
              btnClick={baseBaseOrnClick}
              btn={baseBaseOrn}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_orn"
              btnTxtSrc="Ornament"
              btnIcnLoc="t"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {adjAdj ? (
        <_Builtin.Block className={_utils.cx(_styles, "dsgnav-adj")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "toolbar-ss")}
            tag="div"
          >
            <Button
              btnClick={adjAdjCropClick}
              btn={adjAdjCrop}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_mask"
              btnTxtSrc="Crop"
              btnIcnLoc="t"
            />
            <Button
              btnClick={adjAdjRotateClick}
              btn={adjAdjRotate}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_rotate"
              btnTxtSrc="Rotate"
              btnIcnLoc="t"
            />
            <Button
              btnClick={adjAdjFlipHClick}
              btn={adjAdjFlipH}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_flip_horz"
              btnTxtSrc="Flip Horz"
              btnIcnLoc="t"
            />
            <Button
              btnClick={adjAdjFlipVClick}
              btn={adjAdjFlipV}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_flip_vert"
              btnTxtSrc="Flip Vert"
              btnIcnLoc="t"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {styleStyle ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "dsgnav-style")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "toolbar-ss")}
            tag="div"
          >
            <Button
              btnClick={styleStyleFrameClick}
              btn={styleStyleFrame}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_frame_styles"
              btnTxtSrc="Frame"
              btnIcnLoc="t"
            />
            <Button
              btnClick={styleStyleColorClick}
              btn={styleStyleColor}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_color"
              btnTxtSrc="Color"
              btnIcnLoc="t"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {altAlt ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "dsgnav-alter")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "toolbar-ss")}
            tag="div"
          >
            <Button
              btnClick={altAltStyleClick}
              btn={altAltStyle}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_styles"
              btnTxtSrc="Style"
              btnIcnLoc="t"
            />
            <Button
              btnClick={altAltExposureClick}
              btn={altAltExposure}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_exposure"
              btnTxtSrc="Exposure"
              btnIcnLoc="t"
            />
            <Button
              btnClick={altAltBrightnessClick}
              btn={altAltBrightness}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_brightness"
              btnTxtSrc="Brightness"
              btnIcnLoc="t"
            />
            <Button
              btnClick={altAltContrastClick}
              btn={altAltContrast}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_contrast"
              btnTxtSrc="Contrast"
              btnIcnLoc="t"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {trimTrim ? (
        <_Builtin.Block className={_utils.cx(_styles, "dsgnav-trim")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "toolbar-ss")}
            tag="div"
          >
            <Button
              btnClick={trimTrimTxtClick}
              btn={trimTrimTxt}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_text_layout"
              btnTxtSrc="Text"
              btnIcnLoc="t"
            />
            <Button
              btnClick={trimTrimDrawClick}
              btn={trimTrimDraw}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_draw"
              btnTxtSrc="Draw"
              btnIcnLoc="t"
            />
            <Button
              btnClick={trimTrimLineClick}
              btn={trimTrimLine}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_line"
              btnTxtSrc="Line"
              btnIcnLoc="t"
            />
            <Button
              btnClick={trimTrimBoxClick}
              btn={trimTrimBox}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_box"
              btnTxtSrc="Box"
              btnIcnLoc="t"
            />
            <Button
              btnClick={trimTrimCircleClick}
              btn={trimTrimCircle}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_circle"
              btnTxtSrc="Circle"
              btnIcnLoc="t"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {ornOrn ? (
        <_Builtin.Block className={_utils.cx(_styles, "dsgnav-orn")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "toolbar-ss")}
            tag="div"
          >
            <Button
              btnClick={ornOrnStickerClick}
              btn={ornOrnSticker}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ed_sticker"
              btnTxtSrc="Sticker"
              btnIcnLoc="t"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
