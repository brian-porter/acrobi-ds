"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./NavEditor.module.css";

export function NavEditor({
  as: _Component = _Builtin.Block,
  baseBase = true,
  baseBaseBack = true,
  baseBaseBackBtnStyl = "nt",
  baseBaseTxt = true,
  baseBaseMedia = true,
  baseBaseAtch = true,
  baseBaseTag = true,
  baseBaseShare = true,
  baseBaseAdminMsg = false,
  baseBaseMbr = false,
  baseBaseBackClick = {},
  baseBaseTxtClick = {},
  baseBaseMediaClick = {},
  baseBaseAtchClick = {},
  baseBaseTagClick = {},
  baseBaseShareClick = {},
  baseBaseAdminMsgClick = {},
  baseBaseMbrClick = {},
  baseBaseTxtDis = "false",
  baseBaseMediaDis = "false",
  baseBaseAtchDis = "false",
  baseBaseTagDis = "false",
  baseBaseShareDis = "false",
  txtTxt = false,
  txtTxtBackClick = {},
  txtTxtSzClick = {},
  txtTxtBoldClick = {},
  txtTxtItalicClick = {},
  txtTxtUlineClick = {},
  txtTxtStrikeClick = {},
  txtTxtLinkClick = {},
  txtTxtClrClick = {},
  txtTxtBgClick = {},
  txtTxtListbClick = {},
  txtTxtListnClick = {},
  txtTxtAlignClick = {},
  txtTxtAlignSrc = "ed_align_left",
  txtTxtIndentLClick = {},
  txtTxtIndentRClick = {},
  txtTxtQuoteClick = {},
  txtTxtEraseClick = {},
  mediaMedia = false,
  mediaMediaBack = true,
  mediaMediaGal = true,
  mediaMediaCapt = true,
  mediaMediaYt = true,
  mediaMediaImg = true,
  mediaMediaGif = true,
  mediaMediaBackClick = {},
  mediaMediaGalClick = {},
  mediaMediaCaptClick = {},
  mediaMediaYtClick = {},
  mediaMediaImgClick = {},
  mediaMediaGifClick = {},
  atchAtch = false,
  atchAtchBack = true,
  atchAtchList = true,
  atchAtchProd = true,
  atchAtchPlace = true,
  atchAtchFile = true,
  atchAtchPoll = true,
  tagTag = false,
  tagTagBack = true,
  tagTagPeep = true,
  tagTagProd = true,
  tagTagPlace = true,
  tagTagBrand = true,
  tagTagBackClick = {},
  tagTagPeepClick = {},
  tagTagProdClick = {},
  tagTagPlaceClick = {},
  tagTagBrandClick = {},
  shareShare = false,
  shareShareBack = true,
  shareSharePeep = true,
  shareShareGroup = true,
  shareShareMeta = true,
  shareShareX = true,
  shareSharePin = true,
  shareShareWhat = true,
  shareShareLinked = true,
  shareShareEmail = true,
  shareShareSms = true,
  shareShareLink = true,
  shareShareBackClick = {},
  shareSharePeepClick = {},
  shareShareGroupClick = {},
  shareShareMetaClick = {},
  shareShareXClick = {},
  shareSharePinClick = {},
  shareShareWhatClick = {},
  shareShareLinkedClick = {},
  shareShareEmailClick = {},
  shareShareSmsClick = {},
  shareShareLinkClick = {},
  msgAdmin = false,
  msgAdminBack = true,
  msgAdminAnc = true,
  msgAdminSec = true,
  msgAdminRm = true,
  msgAdminMedia = true,
  msgAdminPeep = true,
  msgAdminEvent = true,
  navEditor = true,
  bgClr,
  atchAtchBackClick = {},
  atchAtchListClick = {},
  atchAtchProdClick = {},
  atchAtchPlaceClick = {},
  atchAtchFileClick = {},
  atchAtchPollClick = {},
  msgAdminBackClick = {},
  msgAdminAncClick = {},
  msgAdminSecClick = {},
  msgAdminRmClick = {},
  msgAdminMediaClick = {},
  msgAdminPeepClick = {},
  msgAdminEventClick = {},
}) {
  return navEditor ? (
    <_Component
      className={_utils.cx(_styles, "g-edtools")}
      tag="div"
      bg-clr={bgClr}
    >
      {baseBase ? (
        <_Builtin.Block className={_utils.cx(_styles, "ednav-base")} tag="div">
          {baseBaseBack ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "bar-lead-btn")}
              tag="div"
            >
              <Button
                btnClick={baseBaseBackClick}
                btnStyl={baseBaseBackBtnStyl}
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="Nav_left"
                btnTxtSrc="Back"
                btnIcnLoc="t"
              />
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "ednav-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "toolbar-ss")}
              tag="div"
            >
              <Button
                btnClick={baseBaseTxtClick}
                btn={baseBaseTxt}
                disabled={baseBaseTxtDis}
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_txt"
                btnTxtSrc=""
                btnIcnLoc="t"
              />
              <Button
                btnClick={baseBaseMediaClick}
                disabled={baseBaseMediaDis}
                btn={baseBaseMedia}
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_img"
                btnTxtSrc="Media"
                btnIcnLoc="t"
              />
              <Button
                btnClick={baseBaseAtchClick}
                disabled={baseBaseAtchDis}
                btn={baseBaseAtch}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_attach"
                btnTxtSrc="Attachment"
                btnIcnLoc="t"
              />
              <Button
                btnClick={baseBaseTagClick}
                disabled={baseBaseTagDis}
                btn={baseBaseTag}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="act_tag"
                btnTxtSrc="Tag"
                btnIcnLoc="t"
              />
              <Button
                btnClick={baseBaseShareClick}
                disabled={baseBaseShareDis}
                btn={baseBaseShare}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_share"
                btnTxtSrc="Share"
                btnIcnLoc="t"
              />
              <Button
                btnClick={baseBaseAdminMsgClick}
                btn={baseBaseAdminMsg}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="admin"
                disabled="false"
                btnTxtSrc="Admin"
                btnIcnLoc="t"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          {baseBaseMbr ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "bar-trailing-btn")}
              tag="div"
            >
              <Button
                btnClick={baseBaseMbrClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="member"
                btnTxtSrc="Members"
                btnIcnLoc="t"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      {txtTxt ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ednav-txt-edit")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "bar-lead-btn")}
            tag="div"
          >
            <Button
              btnClick={txtTxtBackClick}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="Ednav_txt"
              btnTxtSrc="Back"
              btnIcnLoc="t"
              lblClr="p500"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ednav-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "toolbar-ss")}
              tag="div"
            >
              <Button
                btnClick={txtTxtSzClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_font_size"
                btnTxtSrc="Font Size"
                btnIcnLoc="t"
              />
              <Button
                btnClick={txtTxtBoldClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_bold"
                btnTxtSrc="Bold"
                btnIcnLoc="t"
              />
              <Button
                btnClick={txtTxtItalicClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_italic"
                btnTxtSrc="Italic"
                btnIcnLoc="t"
              />
              <Button
                btnClick={txtTxtUlineClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_underline"
                btnTxtSrc="Underscore"
                btnIcnLoc="t"
              />
              <Button
                btnClick={txtTxtStrikeClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_strikethrough"
                btnIcnLoc="t"
                btnTxtSrc="Strike"
              />
              <Button
                btnClick={txtTxtLinkClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="act_link"
                btnIcnLoc="t"
                btnTxtSrc="Link"
              />
              <Button
                btnClick={txtTxtClrClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_font_color"
                btnIcnLoc="t"
                btnTxtSrc="Font Color"
              />
              <Button
                btnClick={txtTxtBgClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_highlight"
                btnTxtSrc="Highlight"
                btnIcnLoc="t"
              />
              <Button
                btnClick={txtTxtListbClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_list_bullet"
                btnTxtSrc="Bullet"
                btnIcnLoc="t"
              />
              <Button
                btnClick={txtTxtListnClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_list_number"
                btnTxtSrc="Numeric"
                btnIcnLoc="t"
              />
              <Button
                btnClick={txtTxtAlignClick}
                btnIcnSrc={txtTxtAlignSrc}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnTxtSrc="Align"
                btnIcnLoc="t"
              />
              <Button
                btnClick={txtTxtIndentLClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_indent_left"
                btnTxtSrc="Indent Left"
                btnIcnLoc="t"
              />
              <Button
                btnClick={txtTxtIndentRClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_indent_right"
                btnTxtSrc="Indent Right"
                btnIcnLoc="t"
              />
              <Button
                btnClick={txtTxtQuoteClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_quote"
                btnTxtSrc="Quote"
                btnIcnLoc="t"
              />
              <Button
                btnClick={txtTxtEraseClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_erase"
                btnTxtSrc="Erase"
                btnIcnLoc="t"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {mediaMedia ? (
        <_Builtin.Block className={_utils.cx(_styles, "ednav-media")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "bar-lead-btn")}
            tag="div"
          >
            <Button
              btnClick={mediaMediaBackClick}
              btn={mediaMediaBack}
              btnStyl="nt"
              btnTxt={false}
              btnIcnSrc="Ednav_img"
              btnSz="l"
              btnTxtSrc="Back"
              btnIcnLoc="t"
              lblClr="p500"
              btnId="Back"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ednav-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "toolbar-ss")}
              tag="div"
            >
              <Button
                btnClick={mediaMediaGalClick}
                btn={mediaMediaGal}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_gal"
                btnTxtSrc="Gallery"
                btnIcnLoc="t"
              />
              <Button
                btnClick={mediaMediaCaptClick}
                btn={mediaMediaCapt}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_photo"
                btnTxtSrc="Camera"
                btnIcnLoc="t"
              />
              <Button
                btnClick={mediaMediaYtClick}
                btn={mediaMediaYt}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="yt"
                btnIcnLoc="t"
                btnTxtSrc="YouTube"
              />
              <Button
                btnClick={mediaMediaImgClick}
                btn={mediaMediaImg}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_graphic"
                btnIcnLoc="t"
                btnTxtSrc="Images"
              />
              <Button
                btnClick={mediaMediaGifClick}
                btn={mediaMediaGif}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_gif"
                btnIcnLoc="t"
                btnTxtSrc="Gifs"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {atchAtch ? (
        <_Builtin.Block className={_utils.cx(_styles, "ednav-atch")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "bar-lead-btn")}
            tag="div"
          >
            <Button
              btn={atchAtchBack}
              btnClick={atchAtchBackClick}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="Ednav_att"
              btnTxtSrc="Back"
              btnIcnLoc="t"
              lblClr="p500"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ednav-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "toolbar-ss")}
              tag="div"
            >
              <Button
                btn={atchAtchList}
                btnClick={atchAtchListClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="list"
                btnTxtSrc="List"
                btnIcnLoc="t"
              />
              <Button
                btn={atchAtchProd}
                btnClick={atchAtchProdClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="prod"
                btnTxtSrc="Products"
                btnIcnLoc="t"
              />
              <Button
                btn={atchAtchPlace}
                btnClick={atchAtchPlaceClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="place"
                btnTxtSrc="Places"
                btnIcnLoc="t"
              />
              <Button
                btn={atchAtchFile}
                btnClick={atchAtchFileClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_file"
                btnTxtSrc="Files"
                btnIcnLoc="t"
              />
              <Button
                btn={atchAtchPoll}
                btnClick={atchAtchPollClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_poll"
                btnTxtSrc="Poll"
                btnIcnLoc="t"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {tagTag ? (
        <_Builtin.Block className={_utils.cx(_styles, "ednav-tag")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "bar-lead-btn")}
            tag="div"
          >
            <Button
              btnClick={tagTagBackClick}
              btn={tagTagBack}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="Ednav_tag"
              btnTxtSrc="Back"
              btnIcnLoc="t"
              lblClr="p500"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ednav-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "toolbar-ss")}
              tag="div"
            >
              <Button
                btnClick={tagTagPeepClick}
                btn={tagTagPeep}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="ed_people"
                btnTxtSrc="People"
                btnIcnLoc="t"
              />
              <Button
                btnClick={tagTagProdClick}
                btn={tagTagProd}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="prod"
                btnTxtSrc="Product"
                btnIcnLoc="t"
              />
              <Button
                btnClick={tagTagPlaceClick}
                btn={tagTagPlace}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="place"
                btnTxtSrc="Place"
                btnIcnLoc="t"
              />
              <Button
                btnClick={tagTagBrandClick}
                btn={tagTagBrand}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="gt_brand"
                btnTxtSrc="Brand"
                btnIcnLoc="t"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {shareShare ? (
        <_Builtin.Block className={_utils.cx(_styles, "ednav-share")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "bar-lead-btn")}
            tag="div"
          >
            <Button
              btn={shareShareBack}
              btnClick={shareShareBackClick}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnIcnSrc="ednav_share"
              lblClr="p500"
              btnIcnLoc="t"
              btnTxtSrc="Back"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ednav-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "toolbar-ss")}
              tag="div"
            >
              <Button
                btn={shareSharePeep}
                btnClick={shareSharePeepClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="people"
                btnTxtSrc="People"
                btnIcnLoc="t"
              />
              <Button
                btn={shareShareGroup}
                btnClick={shareShareGroupClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="group"
                btnTxtSrc="Group"
                btnIcnLoc="t"
              />
              <Button
                btn={shareShareMeta}
                btnClick={shareShareMetaClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="logo_facebook"
                btnTxtSrc="Facebook"
                btnIcnLoc="t"
              />
              <Button
                btn={shareShareX}
                btnClick={shareShareXClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="logo_twitter"
                btnTxtSrc="Twitter"
                btnIcnLoc="t"
              />
              <Button
                btn={shareSharePin}
                btnClick={shareSharePinClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="logo_pinterest"
                btnTxtSrc="Pinterest"
                btnIcnLoc="t"
              />
              <Button
                btn={shareShareWhat}
                btnClick={shareShareWhatClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="logo_whatsapp"
                btnTxtSrc="WhatsApp"
                btnIcnLoc="t"
              />
              <Button
                btn={shareShareLinked}
                btnClick={shareShareLinkedClick}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="logo_linkedin"
                btnTxtSrc="LinkedIn"
                btnIcnLoc="t"
              />
              <Button
                btnClick={shareShareEmailClick}
                btn={shareShareEmail}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="com_email"
                btnTxtSrc=""
                btnIcnLoc="t"
              />
              <Button
                btnClick={shareShareSmsClick}
                btn={shareShareSms}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="chat"
                btnTxtSrc="SMS"
                btnIcnLoc="t"
              />
              <Button
                btnClick={shareShareLinkClick}
                btn={shareShareLink}
                btnStyl="nt"
                btnTxt={false}
                btnSz="l"
                btnIcnSrc="act_link"
                btnTxtSrc="Link"
                btnIcnLoc="t"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {msgAdmin ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ednav-admin-msg")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "bar-lead-btn")}
            tag="div"
          >
            <Button
              btn={msgAdminBack}
              btnClick={msgAdminBackClick}
              btnStyl="nt"
              btnTxt={false}
              btnIcnSrc="Admin"
              btnSz="l"
              btnTxtSrc="Back"
              lblClr="p500"
              btnIcnLoc="t"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ednav-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "toolbar-ss")}
              tag="div"
            >
              <Button
                btn={msgAdminAnc}
                btnClick={msgAdminAncClick}
                btnStyl="nt"
                btnTxt={false}
                btnIcnSrc="annouce"
                btnSz="l"
                btnTxtSrc="Announcement"
                btnIcnLoc="t"
              />
              <Button
                btn={msgAdminSec}
                btnClick={msgAdminSecClick}
                btnStyl="nt"
                btnTxt={false}
                btnIcnSrc="peep_sec"
                btnSz="l"
                btnTxtSrc="Section"
                btnIcnLoc="t"
              />
              <Button
                btn={msgAdminRm}
                btnClick={msgAdminRmClick}
                btnStyl="nt"
                btnTxt={false}
                btnIcnSrc="room"
                btnSz="l"
                btnTxtSrc="Room"
                btnIcnLoc="t"
              />
              <Button
                btn={msgAdminMedia}
                btnClick={msgAdminMediaClick}
                btnStyl="nt"
                btnTxt={false}
                btnIcnSrc="graphic"
                btnSz="l"
                btnTxtSrc="Media"
                btnIcnLoc="t"
              />
              <Button
                btn={msgAdminPeep}
                btnClick={msgAdminPeepClick}
                btnStyl="nt"
                btnTxt={false}
                btnIcnSrc="members"
                btnSz="l"
                btnTxtSrc="Members"
                btnIcnLoc="t"
              />
              <Button
                btn={msgAdminEvent}
                btnClick={msgAdminEventClick}
                btnStyl="nt"
                btnTxt={false}
                btnIcnSrc="cal"
                btnSz="l"
                btnTxtSrc="Event"
                disabled="true"
                btnIcnLoc="t"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.g-editor%5Beditor-clr%3D%22light%22%5D%20%7B%0A%09background%3A%20rgba(var(--n000)%2C%201)%3B%0A%20%20color%3A%20rgba(var(--n900)%2C%201)%3B%0A%7D%0A.g-editor%5Beditor-clr%3D%22dark%22%5D%20%7B%0A%09background%3A%20rgba(var(--n999)%2C%201)%3B%0A%20%20color%3A%20rgba(var(--n000)%2C%201)%3B%0A%7D%0A.g-editor%5Beditor-clr%3D%22black%22%5D%20%7B%0A%09background%3A%20rgba(var(--n999)%2C%201)%3B%0A%20%20color%3A%20rgba(var(--n000)%2C%201)%3B%0A%7D%0A.g-edtools%5Bbg-clr%3D%22black%22%5D%20%7B%0A%20%20background-color%3A%20black%3B%0A%20%20border-color%3A%20rgba(var(--n999)%2C%201)%3B%0A%7D%0A.g-edtools%5Bbg-clr%3D%22black%22%5D%20*%20.toolbar-ss%20*%20.label%20%7B%0A%20%20color%3A%20rgba(var(--n000)%2C%201)%3B%0A%7D%0A%2F*%20Back%20Button%20Size*%2F%0A.g-edtools%20*%20.btn-link%20%7B%0A%09width%3A%2056px%3B%0A%7D%0A%2F*%20Toolbar%20Button%20Size*%2F%0A.g-edtools%20*%20.toolbar-ss%20.btn-link%20%7B%0A%09width%3A%2056px%3B%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  ) : null;
}
