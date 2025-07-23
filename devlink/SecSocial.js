"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Cell } from "./Cell";
import { EmptyBar } from "./EmptyBar";
import * as _utils from "./utils";
import _styles from "./SecSocial.module.css";

export function SecSocial({
  as: _Component = _Builtin.Section,
  sec = true,
  secHeadTitleIcn = false,
  secHeadAct1 = true,
  secHeadTitleIcnSrc = "default",
  secHeadTitleSrc = "Socials",
  secHeadAct1TxtSrc = "Add",
  conSideFade = false,
  conSocialEmpty = false,
  conMetaClick = {},
  conInstaClick = {},
  conTwitterClick = {},
  conPinterestClick = {},
  conSnapClick = {},
  conSocialAddClick = {},
  conSocialEmptyClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "sec-social")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        act1Click={conSocialAddClick}
        act1TxtSrc={secHeadAct1TxtSrc}
        titleSrc={secHeadTitleSrc}
        titleIcn={secHeadTitleIcn}
        act1={secHeadAct1}
        titleIcnSrc={secHeadTitleIcnSrc}
      />
      <_Builtin.Block className={_utils.cx(_styles, "bar-ss")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "u-social-ss")}
          tag="div"
          data-pad=""
          id="image"
        >
          <Cell
            cellClick={conMetaClick}
            cellSz="xl"
            captionCapStk={true}
            capStkRow1Src="Meta"
            cell={true}
            caption={true}
            cellActv={false}
            imgImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65e8a2aeb88f9528875a7e29_facebook.avif"
            imgImgAlt="__wf_reserved_inherit"
            imgImgAct={false}
            captionPriceBdg={false}
            capStkRow2={false}
            vizImg={true}
            vizAdpt={false}
            vizAvtr={false}
            cellCard=""
            capStkRow2Src="Row2"
            captionCapLR={false}
            capLRLTxtSrc="left text"
            capLRRTxtSrc="right text"
            capStkRow1Lc="1"
            imgImgIcnBar={true}
            imgIcnBarR1={false}
            imgIcnBarR1Src="Clearcirc"
            imgImgSz=""
            avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
            avtrAvtrAlt="__wf_reserved_inherit"
            avtrAvtrSz="l"
            capStkRow1Sz="r3"
            capStkRow1Clr="n900"
            capStkRow2Sz="r4"
            capStkRow2Clr=""
            capLRLTxtClr="n700"
            capLRLTxtSz="r4"
            capLRRTxtClr="n700"
            capLRRTxtSz="r4"
            capStkRow2Lc="1"
            imgImgAsp="1-1"
            imgActClick={{}}
            imgImgBnr={false}
            imgImgBnrTxtSrc="ListName"
            imgImgBnrIcnSrc="Default"
            capStkRowsAlign="c"
            capStkRow2Align=""
            cellId="image"
          />
          <Cell
            cellClick={conInstaClick}
            cellSz="xl"
            captionCapStk={true}
            capStkRow1Src="Instagram"
            cell={true}
            caption={true}
            cellActv={false}
            imgImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65e8a2b8b56c909e47bf3c60_instagram.avif"
            imgImgAlt="__wf_reserved_inherit"
            imgImgAct={false}
            captionPriceBdg={false}
            capStkRow2={false}
            vizImg={true}
            vizAdpt={false}
            vizAvtr={false}
            cellCard=""
            capStkRow2Src="Row2"
            captionCapLR={false}
            capLRLTxtSrc="left text"
            capLRRTxtSrc="right text"
            capStkRow1Lc="1"
            imgImgIcnBar={true}
            imgIcnBarR1={false}
            imgIcnBarR1Src="Clearcirc"
            imgImgSz=""
            avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
            avtrAvtrAlt="__wf_reserved_inherit"
            avtrAvtrSz="l"
            capStkRow1Sz="r3"
            capStkRow1Clr="n900"
            capStkRow2Sz="r4"
            capStkRow2Clr=""
            capLRLTxtClr="n700"
            capLRLTxtSz="r4"
            capLRRTxtClr="n700"
            capLRRTxtSz="r4"
            capStkRow2Lc="1"
            imgImgAsp="1-1"
            imgActClick={{}}
            imgImgBnr={false}
            imgImgBnrTxtSrc="ListName"
            imgImgBnrIcnSrc="Default"
            capStkRowsAlign="c"
            capStkRow2Align=""
            cellId="image"
          />
          <Cell
            cellClick={conTwitterClick}
            cellSz="xl"
            captionCapStk={true}
            capStkRow1Src="Twitter (X)"
            cell={true}
            caption={true}
            cellActv={false}
            imgImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65e8a2b035981f2d8a325c02_twitter.avif"
            imgImgAlt="__wf_reserved_inherit"
            imgImgAct={false}
            captionPriceBdg={false}
            capStkRow2={false}
            vizImg={true}
            vizAdpt={false}
            vizAvtr={false}
            cellCard=""
            capStkRow2Src="Row2"
            captionCapLR={false}
            capLRLTxtSrc="left text"
            capLRRTxtSrc="right text"
            capStkRow1Lc="1"
            imgImgIcnBar={true}
            imgIcnBarR1={false}
            imgIcnBarR1Src="Clearcirc"
            imgImgSz=""
            avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
            avtrAvtrAlt="__wf_reserved_inherit"
            avtrAvtrSz="l"
            capStkRow1Sz="r3"
            capStkRow1Clr="n900"
            capStkRow2Sz="r4"
            capStkRow2Clr=""
            capLRLTxtClr="n700"
            capLRLTxtSz="r4"
            capLRRTxtClr="n700"
            capLRRTxtSz="r4"
            capStkRow2Lc="1"
            imgImgAsp="1-1"
            imgActClick={{}}
            imgImgBnr={false}
            imgImgBnrTxtSrc="ListName"
            imgImgBnrIcnSrc="Default"
            capStkRowsAlign="c"
            capStkRow2Align=""
            cellId="image"
          />
          <Cell
            cellClick={conPinterestClick}
            cellSz="xl"
            captionCapStk={true}
            capStkRow1Src="Pinterest"
            cell={true}
            caption={true}
            cellActv={false}
            imgImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65e8a2c865eac401d8aff774_pinterest.avif"
            imgImgAlt="__wf_reserved_inherit"
            imgImgAct={false}
            captionPriceBdg={false}
            capStkRow2={false}
            vizImg={true}
            vizAdpt={false}
            vizAvtr={false}
            cellCard=""
            capStkRow2Src="Row2"
            captionCapLR={false}
            capLRLTxtSrc="left text"
            capLRRTxtSrc="right text"
            capStkRow1Lc="1"
            imgImgIcnBar={true}
            imgIcnBarR1={false}
            imgIcnBarR1Src="Clearcirc"
            imgImgSz=""
            avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
            avtrAvtrAlt="__wf_reserved_inherit"
            avtrAvtrSz="l"
            capStkRow1Sz="r3"
            capStkRow1Clr="n900"
            capStkRow2Sz="r4"
            capStkRow2Clr=""
            capLRLTxtClr="n700"
            capLRLTxtSz="r4"
            capLRRTxtClr="n700"
            capLRRTxtSz="r4"
            capStkRow2Lc="1"
            imgImgAsp="1-1"
            imgActClick={{}}
            imgImgBnr={false}
            imgImgBnrTxtSrc="ListName"
            imgImgBnrIcnSrc="Default"
            capStkRowsAlign="c"
            capStkRow2Align=""
            cellId="image"
          />
          <Cell
            cellClick={conSnapClick}
            cellSz="xl"
            captionCapStk={true}
            capStkRow1Src="Snapchat"
            cell={true}
            caption={true}
            cellActv={false}
            imgImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65e8a2b0e7b17a4312081de2_snap.avif"
            imgImgAlt="__wf_reserved_inherit"
            imgImgAct={false}
            captionPriceBdg={false}
            capStkRow2={false}
            vizImg={true}
            vizAdpt={false}
            vizAvtr={false}
            cellCard=""
            capStkRow2Src="Row2"
            captionCapLR={false}
            capLRLTxtSrc="left text"
            capLRRTxtSrc="right text"
            capStkRow1Lc="1"
            imgImgIcnBar={true}
            imgIcnBarR1={false}
            imgIcnBarR1Src="Clearcirc"
            imgImgSz=""
            avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
            avtrAvtrAlt="__wf_reserved_inherit"
            avtrAvtrSz="l"
            capStkRow1Sz="r3"
            capStkRow1Clr="n900"
            capStkRow2Sz="r4"
            capStkRow2Clr=""
            capLRLTxtClr="n700"
            capLRLTxtSz="r4"
            capLRRTxtClr="n700"
            capLRRTxtSz="r4"
            capStkRow2Lc="1"
            imgImgAsp="1-1"
            imgActClick={{}}
            imgImgBnr={false}
            imgImgBnrTxtSrc="ListName"
            imgImgBnrIcnSrc="Default"
            capStkRowsAlign="c"
            capStkRow2Align=""
            cellId="image"
          />
          <EmptyBar
            empty={conSocialEmpty}
            click={conSocialEmptyClick}
            icnSrc="ed_share"
            hlineSrc="Link Your Apps"
            subTxtSrc="No social apps are connected to your account Add them and next time they'll show up here to choose from."
            ctaTxtSrc="Add Apps"
          />
        </_Builtin.Block>
        {conSideFade ? (
          <_Builtin.Block className={_utils.cx(_styles, "side-fade")} tag="div">
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
    </_Component>
  ) : null;
}
