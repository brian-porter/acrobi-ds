"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FieldLabel } from "./FieldLabel";
import { UploadCtrl } from "./UploadCtrl";
import { FieldHelper } from "./FieldHelper";
import * as _utils from "./utils";
import _styles from "./UploadForm.module.css";

export function UploadForm({
  as: _Component = _Builtin.Block,
  fld = true,
  lblTop = true,
  lblTopLblSrc = "Label",
  fldHelp = false,
  upldDzIcn = true,
  upldDzImg = false,
  upldDzAvtr = false,
  upldDzIcnSrc = "Pic_upload",
  upldDzIcnSz = "2xl",
  upldDzImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  upldDzImgAlt = "__wf_reserved_inherit",
  upldDzAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  upldDzAvtrAlt = "__wf_reserved_inherit",
  upldDzTxtSrc = "Tap to add or drop a file here",
  upldFileCapt = true,
  upldDzChange,
  upldDzClick = {},
  fldHelpHelpL = true,
  fldHelpHelpR = false,
  fldHelpHelpLSrc = "helper copy",
  fldHelpHelpRSrc = "0/200",
  upldClick = {},
  upldOpt = true,
  lblTopLblFor,
  lblTopLblSz = "r4",
  lblTopLblClr = "n900",
  lblTopLblShdw,
  lblTopOpt = false,
  lblTopOptSrc = "required",
  lblTopOptSz = "r4",
  lblTopOptClr = "n300",
  fldHelpHelpShdw,
  upldFileBar = false,
  upldFileMap,
  upldExampleFile = false,
  upldFileImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  upldFileImgAlt = "__wf_reserved_inherit",
  upldFileTitleSrc = "DocName",
  upldOptions = false,
  upldUrlModal = false,
  upldOptCamera = true,
  upldOptLib = true,
  upldOptUnsplash = false,
  upldOptUrl = false,
  upldOptCameraClick = {},
  upldOptLibClick = {},
  upldOptUnsplashClick = {},
  upldOptUrlClick = {},
  upldUrlFldChange,
  upldUrlFldClick = {},
  upldUrlGetClick = {},
  upldCloseClick = {},
}) {
  return fld ? (
    <_Component className={_utils.cx(_styles, "form_itm_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "form_main")} tag="div">
        <FieldLabel
          fldLblTop={lblTop}
          optSrc={lblTopOptSrc}
          opt={lblTopOpt}
          lblSrc={lblTopLblSrc}
          lblFor={lblTopLblFor}
          lblSz={lblTopLblSz}
          lblClr={lblTopLblClr}
          lblShdw={lblTopLblShdw}
          optSz={lblTopOptSz}
          optClr={lblTopOptClr}
        />
        <UploadCtrl
          upldDzClick={upldDzClick}
          upldDzChange={upldDzChange}
          optOptCameraClick={upldOptCameraClick}
          optOptLibClick={upldOptLibClick}
          optOptUnsplashClick={upldOptUnsplashClick}
          upldDzIcnSz={upldDzIcnSz}
          upldDzIcnSrc={upldDzIcnSrc}
          upldDzTxtSrc={upldDzTxtSrc}
          upldDzIcn={upldDzIcn}
          upldDzImg={upldDzImg}
          upldDzAvtr={upldDzAvtr}
          upldDzImgSrc={upldDzImgSrc}
          upldDzImgAlt={upldDzImgAlt}
          upldDzAvtrSrc={upldDzAvtrSrc}
          upldDzAvtrAlt={upldDzAvtrAlt}
          optOptCamera={upldOptCamera}
          optOptLib={upldOptLib}
          optOptUnsplash={upldOptUnsplash}
          optOptUrl={upldOptUrl}
          optOptUrlClick={upldOptUrlClick}
          upldFileMap={upldFileMap}
          upldExampleFile={upldExampleFile}
          upldFileImgAlt={upldFileImgAlt}
          upldFileTitleSrc={upldFileTitleSrc}
          fileBar={upldFileBar}
          upldFileClick={upldClick}
          upldFileCapt={upldFileCapt}
          optUrlModal={upldUrlModal}
          optUrlCloseClick={upldCloseClick}
          optUrlFldChange={upldUrlFldChange}
          optUrlFldClick={upldUrlFldClick}
          optUrlGetClick={upldUrlGetClick}
          upldOpt={upldOptions}
          upldFileImgSrc={upldFileImgSrc}
        />
        <FieldHelper
          fldHelp={fldHelp}
          helpR={fldHelpHelpR}
          helpL={fldHelpHelpL}
          helpLSrc={fldHelpHelpLSrc}
          helpRSrc={fldHelpHelpRSrc}
          helpShdw={fldHelpHelpShdw}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
