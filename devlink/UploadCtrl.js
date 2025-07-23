"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FileDrop } from "./FileDrop";
import { ImgSs } from "./ImgSs";
import { Button } from "./Button";
import { TextfieldForm } from "./TextfieldForm";
import * as _utils from "./utils";
import _styles from "./UploadCtrl.module.css";

export function UploadCtrl({
  as: _Component = _Builtin.Block,
  upldDzIcn = true,
  upldDzAvtr = false,
  upldDzImg = false,
  upldDzIcnSrc = "Pic_upload",
  upldDzIcnSz = "2xl",
  upldDzImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  upldDzImgAlt = "__wf_reserved_inherit",
  upldDzAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  upldDzAvtrAlt = "__wf_reserved_inherit",
  upldDzTxtSrc = "Tap to add or drop a file here",
  upldDzChange,
  upldDzClick = {},
  upldFileMap,
  upldExampleFile = true,
  upldFileImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  upldFileImgAlt = "__wf_reserved_inherit",
  upldFileCapt = false,
  upldFileTitleSrc = "DocName",
  upldFileClick = {},
  optOptCamera = true,
  optOptLib = true,
  optOptUnsplash = false,
  optOptUrl = false,
  optUrlModal = false,
  optOptCameraClick = {},
  optOptLibClick = {},
  optOptUnsplashClick = {},
  optOptUrlClick = {},
  optUrlFldChange,
  optUrlFldClick = {},
  optUrlGetClick = {},
  optUrlCloseClick = {},
  fileBar = false,
  upldOpt = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "upload_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "upload_main")} tag="div">
        <FileDrop
          dzClick={upldDzClick}
          dzChange={upldDzChange}
          dzIcnSz={upldDzIcnSz}
          dzIcnSrc={upldDzIcnSrc}
          dzTxtSrc={upldDzTxtSrc}
          dzIcn={upldDzIcn}
          dzImg={upldDzImg}
          dzAvtr={upldDzAvtr}
          dzImgSrc={upldDzImgSrc}
          dzImgAlt={upldDzImgAlt}
          dzAvtrSrc={upldDzAvtrSrc}
          dzAvtrAlt={upldDzAvtrAlt}
          dz={true}
        />
        <ImgSs
          cellMap={upldFileMap}
          cellExample={upldExampleFile}
          vizImgSrc={upldFileImgSrc}
          vizImgAlt={upldFileImgAlt}
          captionCapStkRow1Src={upldFileTitleSrc}
          imgBar={fileBar}
          cellCellClick={upldFileClick}
          cellCaption={upldFileCapt}
          vizImgClear={true}
        />
      </_Builtin.Block>
      {upldOpt ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "upload_opt")}
          tag="div"
          data-btnpan-ori="h"
        >
          <Button
            btn={optOptCamera}
            btnClick={optOptCameraClick}
            btnIcn={true}
            btnTxtSrc="Camera"
            btnIcnLoc="l"
            btnIcnSrc="photo"
            btnTxt={true}
            btnStyl="nl"
            btnSz="m"
            btnId="Btn1"
            disabled="false"
            btnLink={{
              href: "#",
            }}
            lblGap="4"
          />
          <Button
            btn={optOptLib}
            btnClick={optOptLibClick}
            btnSz="m"
            btnStyl="nl"
            btnIcn={true}
            btnTxtSrc="Library"
            btnIcnLoc="l"
            btnIcnSrc="gal"
            btnTxt={true}
            btnId="Btn2"
            disabled="false"
            btnLink={{
              href: "#",
            }}
            lblGap="4"
          />
          <Button
            btn={optOptUnsplash}
            btnClick={optOptUnsplashClick}
            btnSz="m"
            btnStyl="nl"
            btnIcn={true}
            btnTxtSrc="Unsplash"
            btnIcnLoc="l"
            btnIcnSrc="img"
            btnTxt={true}
            btnId="Btn3"
            disabled="false"
            btnLink={{
              href: "#",
            }}
            lblGap="4"
          />
          <Button
            btn={optOptUrl}
            btnClick={optOptUrlClick}
            btnSz="m"
            btnStyl="nl"
            btnIcn={true}
            btnTxtSrc="URL"
            btnIcnLoc="l"
            btnIcnSrc="link"
            btnTxt={true}
            btnId="Btn3"
            disabled="false"
            btnLink={{
              href: "#",
            }}
            lblGap="4"
          />
        </_Builtin.Block>
      ) : null}
      {optUrlModal ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "upld_opt-url")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "upld_url-modal")}
            tag="div"
            data-bs="s"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "upld_url-close")}
              tag="div"
            >
              <Button
                btnClick={optUrlCloseClick}
                btnIcnSrc="Close"
                btnTxtSrc="Close"
                btnStyl="nt"
                btnIcn={true}
                btnHug=""
                btnSz="xs"
                btnIcnLoc="r"
                btnTxt={false}
                lblSz="r4"
                lblClr="n500"
              />
            </_Builtin.Block>
            <TextfieldForm
              fieldOnChange={optUrlFldChange}
              fieldFldClick={optUrlFldClick}
              lblTopLblSrc="URL Link"
              fldHelp={true}
              fieldTabOrder="0"
              fld={true}
              fldHelpHelpR={false}
              fldHelpHelpLSrc="Link to the file"
              fldHelpHelpRSrc="0/50"
              lblTopOpt={false}
              lblTopOptSrc="required"
              fieldFldPlaceholderSrc="https://"
              fieldFldBtn={false}
              fieldFldName="url"
              lblTopLblFor="url"
              fieldFldIcn={true}
              fieldFldIcnSrc="link"
              fieldFldIcnDisp="y"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "upld_url-btn-shift")}
              tag="div"
            >
              <Button
                btnClick={optUrlGetClick}
                btnIcnSrc="Send"
                btnTxtSrc="Get It"
                btnStyl="pf"
                btnIcn={false}
                btnHug=""
                btnSz="m"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
