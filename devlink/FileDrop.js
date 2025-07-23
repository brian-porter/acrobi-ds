"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import { Avatar } from "./Avatar";
import { Img } from "./Img";
import { Spacer } from "./Spacer";
import { Paragraph } from "./Paragraph";
import * as _utils from "./utils";
import _styles from "./FileDrop.module.css";

export function FileDrop({
  as: _Component = _Builtin.Block,
  dz = true,
  dzIcn = true,
  dzImg = false,
  dzAvtr = false,
  dzIcnSrc = "Pic_upload",
  dzIcnSz = "2xl",
  dzImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  dzImgAlt = "__wf_reserved_inherit",
  dzImgSz = "2xl",
  dzAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  dzAvtrAlt = "__wf_reserved_inherit",
  dzAvtrSz = "xl",
  dzTxtSrc = "Tap to add or drop a file here",
  dzChange,
  dzClick = {},
}) {
  return dz ? (
    <_Component className={_utils.cx(_styles, "filedrop_wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "filedrop_main")}
        tag="div"
        onchange={dzChange}
        {...dzClick}
      >
        <Icon
          icnSz={dzIcnSz}
          icnSrc={dzIcnSrc}
          icn={dzIcn}
          icnClr="n300"
          icnDrpShdw="n"
        />
        <Avatar
          avtr={dzAvtr}
          avtrSz={dzAvtrSz}
          avtrSrc={dzAvtrSrc}
          avtrAlt={dzAvtrAlt}
        />
        <Img
          img={dzImg}
          imgSz={dzImgSz}
          imgSrc={dzImgSrc}
          imgAlt={dzImgAlt}
          imgAsp=""
        />
        <Spacer szDep="8" size="8" />
        <Paragraph bodySrc={dzTxtSrc} align="c" fontClr="n500" />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
