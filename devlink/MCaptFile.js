"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Snackbar } from "./Snackbar";
import { Spacer } from "./Spacer";
import { UploadForm } from "./UploadForm";
import { Headline } from "./Headline";
import { Paragraph } from "./Paragraph";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MCaptFile.module.css";

export function MCaptFile({
  as: _Component = _Builtin.Block,
  diaTitleSrc = "Dialog Title",
  cancelClick = {},
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
  upldDzChange,
  upldDzClick = {},
  upldOpt = false,
  upldOptCamera = true,
  upldOptLib = true,
  upldOptUnsplash = true,
  upldOptUrl = false,
  upldOptCameraClick = {},
  upldOptLibClick = {},
  upldOptUnsplashClick = {},
  upldOptUrlClick = {},
  hlineTitleSrc = "Headline Title",
  subtxtSrc = "Subtext description of use of image being uploaded",
  fileGuide = "Guidance on dimensions and file size",
  doClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "m-img-edit")} tag="div">
      <SecHead
        titleSrc={diaTitleSrc}
        act1Click={cancelClick}
        sz="xl"
        titleSz="h4"
      />
      <Snackbar
        sb={false}
        sbTxtSrc="Snackbar message goes here and wraps to a second line with trucation"
        sbBtn={false}
        sbStyle="error"
      />
      <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
        <Spacer szDep="24" size="24" />
        <UploadForm
          upldDzClick={upldDzClick}
          upldOptCameraClick={upldOptCameraClick}
          upldOptLibClick={upldOptLibClick}
          upldOptUnsplashClick={upldOptUnsplashClick}
          upldDzIcn={upldDzIcn}
          upldDzImg={upldDzImg}
          upldDzAvtr={upldDzAvtr}
          upldDzIcnSrc={upldDzIcnSrc}
          upldDzIcnSz={upldDzIcnSz}
          upldDzImgSrc={upldDzImgSrc}
          upldDzImgAlt={upldDzImgAlt}
          upldDzAvtrSrc={upldDzAvtrSrc}
          upldDzAvtrAlt={upldDzAvtrAlt}
          upldDzTxtSrc={upldDzTxtSrc}
          upldDzChange={upldDzChange}
          upldOptCamera={upldOptCamera}
          upldOptLib={upldOptLib}
          upldOptUnsplash={upldOptUnsplash}
          upldOptUrl={upldOptUrl}
          upldOptUrlClick={upldOptUrlClick}
          upldOptions={upldOpt}
          lblTop={false}
          fldHelp={false}
          upldOpt={false}
          lblTopOpt={false}
        />
        <Spacer szDep="24" size="24" />
        <Headline
          subtxtSrc={subtxtSrc}
          titleSrc={hlineTitleSrc}
          sz="m"
          titleAlign="c"
          subtxtAlign="c"
        />
        <Spacer szDep="24" size="24" />
        <Paragraph bodySrc={fileGuide} align="c" fontClr="n700" />
        <ButtonPanel
          btn1Click={doClick}
          btn2={false}
          btn3={false}
          btn1TxtSrc="Done"
          btnPnlOri="h"
        />
      </_Builtin.Block>
    </_Component>
  );
}
