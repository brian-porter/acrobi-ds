"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MGrpMngDetail } from "./MGrpMngDetail";
import { MGrpMngMember } from "./MGrpMngMember";
import { MGrpMngRooms } from "./MGrpMngRooms";
import { MGrpMngViz } from "./MGrpMngViz";
import { Label } from "./Label";
import { Button } from "./Button";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MGroupAdd.module.css";

export function MGroupAdd({
  as: _Component = _Builtin.Block,
  dDCancelClick = {},
  dTypePHoldSrc = "Choose a Group Type",
  dTypePHoldClr = "n500",
  dTypeFldValue,
  dTypeSelectDrpHide = false,
  dTypeMap,
  dNameChange,
  dHandleChange,
  dDescChange,
  dLocationChange,
  dLocationFindClick = {},
  dPrivacyPHoldSrc = "Private",
  dPrivacyPHoldClr = "n500",
  dPrivacyFldValue,
  dPrivacySelectDrpHide = false,
  dPrivacyMap,
  dRulesChange,
  dRulesAddClick = {},
  dRolesMap,
  dRolesExample = true,
  dRolesAddClick = {},
  dAdminMap,
  dAdminExample = true,
  dAdminAddClick = {},
  dMbrInvtClick = {},
  dGalPostClick = {},
  dPostApproveClick = {},
  dEraseClick = {},
  mMCancelClick = {},
  mMEmpty = true,
  mMEmptyInviteClick = {},
  mMAcrd = false,
  mMAcrdSecMap,
  mMAddClick = {},
  mMSearchClick = {},
  mMSearchChange,
  mMAssignClick = {},
  rRCancelClick = {},
  rREmpty = true,
  rREmptyAddClick = {},
  rRAcrd = false,
  rRAcrdSecMap,
  rRAcrdSecIcn = "default",
  rRAcrdSecName = "SectionName",
  rRAcrdSecClick = {},
  rRAcrdSecSubMap,
  rRAddClick = {},
  rRSearchClick = {},
  rRSearchChange,
  rRSectionClick = {},
  vVCancelClick = {},
  vVLogoEditClick = {},
  vVCoverEditClick = {},
  actTxtSrc = "Next",
  actDisabled = "true",
  actClick = {},
  dDetailMap,
  mMbrMap,
  rRoomMap,
  vVizMap,
  dTypeOnChange,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "m-add-group")}
      tag="div"
      id="Move"
    >
      <_Builtin.TabsWrapper
        className={_utils.cx(_styles, "tabs")}
        data-duration-in="300"
        data-duration-out="100"
        tab-underline=""
        current="details"
        easing="ease-in-out"
        fadeIn={300}
        fadeOut={100}
      >
        <_Builtin.TabsContent
          className={_utils.cx(_styles, "tab-content-default")}
          tag="div"
        >
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail-default")}
            tag="div"
            data-w-tab="details"
          >
            {dDetailMap ?? (
              <MGrpMngDetail
                dDCancelClick={dDCancelClick}
                dTypeMap={dTypeMap}
                dNameChange={dNameChange}
                dHandleChange={dHandleChange}
                dDescChange={dDescChange}
                dLocationChange={dLocationChange}
                dLocationFindClick={dLocationFindClick}
                dPrivacyMap={dPrivacyMap}
                dRulesChange={dRulesChange}
                dRulesAddClick={dRulesAddClick}
                dRolesMap={dRolesMap}
                dRolesExample={dRolesExample}
                dRolesAddClick={dRolesAddClick}
                dAdminMap={dAdminMap}
                dAdminExample={dAdminExample}
                dAdminAddClick={dAdminAddClick}
                dMbrInvtClick={dMbrInvtClick}
                dGalPostClick={dGalPostClick}
                dPostApproveClick={dPostApproveClick}
                dEraseClick={dEraseClick}
                dTypePHoldSrc={dTypePHoldSrc}
                dTypePHoldClr={dTypePHoldClr}
                dTypeFldValue={dTypeFldValue}
                dPrivacyPHoldSrc={dPrivacyPHoldSrc}
                dPrivacyPHoldClr={dPrivacyPHoldClr}
                dPrivacyFldValue={dPrivacyFldValue}
                dTypeSelectDrpHide={dTypeSelectDrpHide}
                dPrivacySelectDrpHide={dPrivacySelectDrpHide}
                dTypeOnChange={dTypeOnChange}
                dTypeFldId="type"
              />
            )}
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail")}
            tag="div"
            data-w-tab="members"
          >
            {mMbrMap ?? (
              <MGrpMngMember
                mMCancelClick={mMCancelClick}
                mMEmptyInviteClick={mMEmptyInviteClick}
                mMEmpty={mMEmpty}
                mMAcrd={mMAcrd}
                mMAcrdSecMap={mMAcrdSecMap}
                mMAddClick={mMAddClick}
                mMSearchClick={mMSearchClick}
                mMSearchChange={mMSearchChange}
                mMAssignClick={mMAssignClick}
              />
            )}
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail")}
            tag="div"
            data-w-tab="rooms"
          >
            {rRoomMap ?? (
              <MGrpMngRooms
                rRCancelClick={rRCancelClick}
                rREmpty={rREmpty}
                rREmptyAddClick={rREmptyAddClick}
                rRAcrdSecMap={rRAcrdSecMap}
                rRAcrd={rRAcrd}
                rRAcrdSecIcn={rRAcrdSecIcn}
                rRAcrdSecName={rRAcrdSecName}
                rRAcrdSecClick={rRAcrdSecClick}
                rRAcrdSecSubMap={rRAcrdSecSubMap}
                rRAddClick={rRAddClick}
                rRSearchClick={rRSearchClick}
                rRSearchChange={rRSearchChange}
                rRSectionClick={rRSectionClick}
              />
            )}
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail")}
            tag="div"
            data-w-tab="visuals"
          >
            {vVizMap ?? (
              <MGrpMngViz
                vVCancelClick={vVCancelClick}
                vVLogoEditClick={vVLogoEditClick}
                vVCoverEditClick={vVCoverEditClick}
              />
            )}
          </_Builtin.TabsPane>
        </_Builtin.TabsContent>
        <_Builtin.TabsMenu
          className={_utils.cx(_styles, "tab-menu-default")}
          tag="div"
        >
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link-default")}
            data-w-tab="details"
            block="inline"
          >
            <Label txtSrc="Details" icnSrc="snip" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link-default")}
            data-w-tab="members"
            block="inline"
          >
            <Label txtSrc="Members" icnSrc="member" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link-default")}
            data-w-tab="rooms"
            block="inline"
          >
            <Label txtSrc="Rooms" icnSrc="room" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link-default")}
            data-w-tab="visuals"
            block="inline"
          >
            <Label txtSrc="Visuals" icnSrc="ed_img" />
          </_Builtin.TabsLink>
        </_Builtin.TabsMenu>
      </_Builtin.TabsWrapper>
      <_Builtin.Block className={_utils.cx(_styles, "action-block")} tag="div">
        <Button
          btnTxtSrc={actTxtSrc}
          disabled={actDisabled}
          btnClick={actClick}
          btnStyl="pf"
          btnIcn={false}
          btnSz="m"
        />
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "css-tab")}
        value="%3Cstyle%3E%0A%2F*%20Hide%20scrollbar%20for%20Chrome%2C%20Safari%20and%20Opera%20*%2F%0A.tab-bar%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A%2F*%20Hide%20scrollbar%20for%20IE%2C%20Edge%20and%20Firefox%20*%2F%0A.tab-bar%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%20%20%2F*%20IE%20and%20Edge%20*%2F%0A%20%20scrollbar-width%3A%20none%3B%20%20%2F*%20Firefox%20*%2F%0A%7D%0A%0A.tab-link.w--current%20.label%20.txt%20%7B%0A%09font-weight%3A%20bold%3B%0A%7D%0A.tab-link.w--current%20.label%20.icn%3A%3Afirst-letter%20%7B%0A%20%20%20%20text-transform%3A%20uppercase%3B%0A%7D%0A%5Bdata-tab-underline%3D%22y%22%5D%0A.tab-link.w--current%20%7B%0A%20%20%20%20border-bottom-style%3A%20solid%3B%0A%20%20%20%20border-bottom-width%3A%202px%3B%0A%20%20%20%20border-bottom-color%3A%20var(--theme--light--p500)%3B%0A%20%20%20%20color%3A%20var(--theme--light--p500)%3B%0A%20%20%20%20font-weight%3A%20700%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
      />
      <Spacer size="16" />
    </_Component>
  );
}
