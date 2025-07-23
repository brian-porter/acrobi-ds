"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import { Img } from "./Img";
import { AdaptIcon } from "./AdaptIcon";
import { AvatarGroup } from "./AvatarGroup";
import * as _utils from "./utils";
import _styles from "./LicLead.module.css";

export function LicLead({
  as: _Component = _Builtin.Block,
  icn = true,
  img = true,
  avtr = true,
  adptIcn = true,
  rdio = false,
  icnSrc = "default",
  icnClr = "p500",
  icnSz = "s",
  isSecHead,
  imgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  imgAlt = "__wf_reserved_inherit",
  imgSz = "l",
  avtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtrAlt = "__wf_reserved_inherit",
  avtrShape = "c",
  avtrBdg = false,
  avtrBdgClr = "fd500",
  avtrSz = "m",
  avtrBdgSz = "m",
  avtr2 = false,
  avtr3 = false,
  avtr4 = false,
  avtr5 = false,
  avtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  avtr2Alt = "__wf_reserved_inherit",
  avtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  avtr3Alt = "__wf_reserved_inherit",
  avtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  avtr4Alt = "__wf_reserved_inherit",
  avtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  avtr5Alt = "__wf_reserved_inherit",
  adptIcnSrc = "Default",
  adptSz = "m",
  adptBgClr = "n500",
  rdioIcn = "rdio_off",
  rdioClr = "n300",
  rdioSz = "m",
  rdioClick = {},
  leadDiv,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "li_lead_main")}
      tag="div"
      data-div={leadDiv}
    >
      {icn ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "li-lead-icn")}
          tag="div"
          data-sechead={isSecHead}
        >
          <Icon icnSrc={icnSrc} icnClr={icnClr} icnSz={icnSz} />
        </_Builtin.Block>
      ) : null}
      {img ? (
        <_Builtin.Block className={_utils.cx(_styles, "li-lead-img")} tag="div">
          <Img imgSrc={imgSrc} imgSz={imgSz} imgAlt={imgAlt} imgShape="r" />
        </_Builtin.Block>
      ) : null}
      {adptIcn ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "li-lead-adpt")}
          tag="div"
        >
          <AdaptIcon
            icnSrc={adptIcnSrc}
            adptBgClr={adptBgClr}
            adptSz={adptSz}
          />
        </_Builtin.Block>
      ) : null}
      {avtr ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "li-lead-avtr")}
          tag="div"
        >
          <AvatarGroup
            avtrSz={avtrSz}
            avtr1Src={avtrSrc}
            avtr1Alt={avtrAlt}
            avtr1Bdg={avtrBdg}
            avtr1BdgClr={avtrBdgClr}
            avtr2={avtr2}
            avtr3={avtr3}
            avtr4={avtr4}
            avtr5={avtr5}
            avtr2Src={avtr2Src}
            avtr2Alt={avtr2Alt}
            avtr3Src={avtr3Src}
            avtr3Alt={avtr3Alt}
            avtr4Src={avtr4Src}
            avtr4Alt={avtr4Alt}
            avtr5Src={avtr5Src}
            avtr5Alt={avtr5Alt}
            avtr1BdgSz={avtrBdgSz}
            avtr1Shape={avtrShape}
          />
        </_Builtin.Block>
      ) : null}
      {rdio ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "li-lead-rdio")}
          tag="div"
          {...rdioClick}
        >
          <Icon icnSrc={rdioIcn} icnClr={rdioClr} icnSz={rdioSz} />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
