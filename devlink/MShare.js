"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { SecPeep } from "./SecPeep";
import { SecGroup } from "./SecGroup";
import { SecSocial } from "./SecSocial";
import { SecOtherShare } from "./SecOtherShare";
import * as _utils from "./utils";
import _styles from "./MShare.module.css";

export function MShare({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  objImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  objImgAltTxt = "__wf_reserved_inherit",
  objTitleSrc = "{SharedObjectName}",
  objSubtxtSrc = "{OwnerName}'s {SubjectType}",
  peepSearchClick = {},
  peepExample = true,
  peepEmpty = false,
  peepEmptyClick = {},
  peepMap,
  groupSearchClick = {},
  groupExample = true,
  groupEmpty = false,
  groupEmptyClick = {},
  groupMap,
  socialAddClick = {},
  socialEmpty = false,
  socialEmptyClick = {},
  socialMap,
  smsClick = {},
  emailClick = {},
  qrClick = {},
  linkClick = {},
  printClick = {},
  sideFade = false,
  conMetaClick = {},
  conInstaClick = {},
  conTwitterClick = {},
  conPinterestClick = {},
  conSnapClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-share")} tag="div" id="Share">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          sz="xl"
          titleSrc="Share with"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <ListItmCtrl
          pPTitleSrc={objTitleSrc}
          pPSubtxtSrc={objSubtxtSrc}
          lLImgSrc={objImgSrc}
          lLImgAlt={objImgAltTxt}
          lLAvtr={false}
          lLImg={true}
        />
        <SecPeep
          secHeadAct1Click={peepSearchClick}
          conCellMap={peepMap}
          conExampleCell={peepExample}
          emptyEmpty={peepEmpty}
          emptyEmptyClick={peepEmptyClick}
          secHeadTitleSrc="People"
          secHeadTitleIcn={false}
          secHeadAct1TxtSrc="Search"
          secHeadAct1={true}
          exampleTitleSrc="FName"
          exampleCaptSubtxt={false}
          exampleBtn={false}
          stats={false}
          exampleCellSz="l"
          emptyEmptySubTxtSrc="Make a connection with people to share with them. Next time they'll show up here to choose from."
          emptyEmptyHlineSrc="Let's Make a Connection"
          emptyEmptyIcnSrc="peep_add"
          emptyEmptyCtaTxtSrc="Send Invite"
        />
        <SecGroup
          secHeadAct1Click={groupSearchClick}
          conCellMap={groupMap}
          secHeadAct1={true}
          secHeadAct1TxtSrc="Search"
          conSideFade={true}
          exampleCellSz="2xl"
          exampleRow1Lc="2"
        />
        <SecSocial
          conSocialAddClick={socialAddClick}
          conMetaClick={conMetaClick}
          conInstaClick={conInstaClick}
          conTwitterClick={conTwitterClick}
          conPinterestClick={conPinterestClick}
          conSnapClick={conSnapClick}
          conSocialEmpty={socialEmpty}
          conSocialEmptyClick={socialEmptyClick}
          conSideFade={sideFade}
        />
        <SecOtherShare
          conSmsClick={smsClick}
          conEmailClick={emailClick}
          conQrClick={qrClick}
          conLinkClick={linkClick}
          conPrintClick={printClick}
        />
      </_Builtin.Block>
    </_Component>
  );
}
