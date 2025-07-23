"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { CellConnect } from "./CellConnect";
import { InputWBtns } from "./InputWBtns";
import { Icon } from "./Icon";
import { MSend } from "./MSend";
import { MQrShow } from "./MQrShow";
import { MShake } from "./MShake";
import { EmptyCollection } from "./EmptyCollection";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./MFindFriends.module.css";

export function MFindFriends({
  as: _Component = _Builtin.Block,
  mbrCancelClick = {},
  mbrCardMap,
  mbrCellExample = true,
  mbrScanQrClick = {},
  mbrFltrClick = {},
  invtCancelClick = {},
  invtShakeClick = {},
  invtShakeCancelClick = {},
  invtShakeGroupClick = {},
  invtShakeFindClick = {},
  invtScanClick = {},
  invtScan = false,
  invtScanMap,
  invtScanCancelClick = {},
  invtScanQrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65b015732f23f6d0c4acb2d4_qr-peep-code.avif",
  invtSmsClick = {},
  invtEmailClick = {},
  contCancelClick = {},
  contEmpty = true,
  contCard = false,
  contCnctClick = {},
  contCardMap,
  fbCancelClick = {},
  fbEmpty = true,
  fbCard = false,
  fbCnctClick = {},
  fbCardMap,
  twitCancelClick = {},
  twitEmpty = true,
  twitCard = false,
  twitCnctClick = {},
  twitCardMap,
  invtEmail = false,
  invtEmailMap,
  invtEmailQrImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65b015749b9cf0a402a56cfe_qr-invite-code.avif",
  invtEmailFromTxtSrc = "Invitation from {FName LName}",
  invtEmailSendClick = {},
  invtSms = false,
  invtSmsMap,
  invtSmsQrImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65b015749b9cf0a402a56cfe_qr-invite-code.avif",
  invtSmsFromTxtSrc = "Invitation from {FName LName}",
  invtSmsSendClick = {},
  invtShake = true,
  invtShakeMap,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "m-findfriend")}
      tag="div"
      id="Move"
    >
      <_Builtin.TabsWrapper
        className={_utils.cx(_styles, "tabs")}
        data-duration-in="300"
        data-duration-out="100"
        tab-underline=""
        current="members"
        easing="ease-in-out"
        fadeIn={300}
        fadeOut={100}
      >
        <_Builtin.TabsContent
          className={_utils.cx(_styles, "tab-content")}
          tag="div"
        >
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail")}
            tag="div"
            data-w-tab="members"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "a-header")}
              tag="div"
            >
              <SecHead
                act1Click={mbrCancelClick}
                titleSrc="Find Friends"
                sz="xl"
                act1TxtSrc="Cancel"
                titleSz="h4"
              />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
              <_Builtin.Grid
                className={_utils.cx(_styles, "grid-12")}
                tag="div"
              >
                {mbrCardMap ?? <CellConnect cellExample={mbrCellExample} />}
              </_Builtin.Grid>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "a-footer")}
              tag="div"
              data-top-shadow="y"
            >
              <InputWBtns
                lLBtnClick={mbrScanQrClick}
                tTBtnClick={mbrFltrClick}
                tTBtn={true}
                fldFldLIcnSrc="Search"
                tTBtnIcnSrc="filter"
                tTBtnPad="n"
              />
            </_Builtin.Block>
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail")}
            tag="div"
            data-w-tab="invite"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "a-header")}
              tag="div"
            >
              <SecHead
                act1Click={invtCancelClick}
                titleSrc="Invite Friends"
                sz="xl"
                act1TxtSrc="Cancel"
                titleSz="h4"
              />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
              <_Builtin.Grid
                className={_utils.cx(_styles, "grid-13")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "card-invite")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_0b88cd03-09a1-47fb-3ece-c437ec4ce494-ec4ce460"
                  )}
                  tag="div"
                  data-corner-radius="8"
                  data-bs="xs"
                  {...invtEmailClick}
                >
                  <Icon icnClr="p500" icnSz="xl" icnSrc="email" />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "invite-headline-wrap")}
                    tag="div"
                    hl-size="xs"
                    obj-align="l"
                    obj-loc=""
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "headline")}
                      tag="div"
                      fs="h2"
                    >
                      {"Email"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "subtxt")}
                      tag="div"
                      lc="2"
                    >
                      {"Send anyone an email invite"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "card-invite")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_0b88cd03-09a1-47fb-3ece-c437ec4ce48c-ec4ce460"
                  )}
                  tag="div"
                  data-corner-radius="8"
                  data-bs="xs"
                  {...invtSmsClick}
                >
                  <Icon icnClr="p500" icnSz="xl" icnSrc="chat" />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "invite-headline-wrap")}
                    tag="div"
                    hl-size="xs"
                    obj-align="l"
                    obj-loc=""
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "headline")}
                      tag="div"
                      fs="h2"
                    >
                      {"SMS"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "subtxt")}
                      tag="div"
                      lc="2"
                    >
                      {"Invite someone using a text message"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "card-invite")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_0b88cd03-09a1-47fb-3ece-c437ec4ce484-ec4ce460"
                  )}
                  tag="div"
                  data-corner-radius="8"
                  data-bs="xs"
                  {...invtScanClick}
                >
                  <Icon icnClr="p500" icnSz="xl" icnSrc="qr" />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "invite-headline-wrap")}
                    tag="div"
                    hl-size="xs"
                    obj-align="l"
                    obj-loc=""
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "headline")}
                      tag="div"
                      fs="h2"
                    >
                      {"Scan to Connect"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "subtxt")}
                      tag="div"
                      lc="2"
                    >
                      {"Use your camera to scan and add people"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "card-invite")}
                  tag="div"
                  data-corner-radius="8"
                  data-bs="xs"
                  {...invtShakeClick}
                >
                  <Icon icnClr="p500" icnSz="xl" icnSrc="phone_vibrate" />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "invite-headline-wrap")}
                    tag="div"
                    hl-size="xs"
                    obj-align="l"
                    obj-loc=""
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "headline")}
                      tag="div"
                      fs="h2"
                    >
                      {"Group Shake"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "subtxt")}
                      tag="div"
                      lc="2"
                    >
                      {"Addlarge groups with a phone shake"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Grid>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "a-footer-empty")}
              tag="div"
              top-shadow="y"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "invt-options")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "m-ff-email")}
                tag="div"
              >
                {invtEmailMap ?? (
                  <MSend sendClick={invtEmailSendClick} send={invtEmail} />
                )}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "m-ff-sms")}
                tag="div"
              >
                {invtSmsMap ?? (
                  <MSend
                    sendClick={invtSmsSendClick}
                    send={invtSms}
                    subjFld={false}
                    secTitleSrc="Text Friends"
                  />
                )}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "m-ff-scan")}
                tag="div"
              >
                {invtScanMap ?? (
                  <MQrShow
                    cancelClick={invtScanCancelClick}
                    qrShow={invtScan}
                  />
                )}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail")}
            tag="div"
            data-w-tab="contacts"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "a-header")}
              tag="div"
            >
              <SecHead
                act1Click={contCancelClick}
                titleSrc="Contact Friends"
                sz="xl"
                act1TxtSrc="Cancel"
                titleSz="h4"
              />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
              <EmptyCollection
                empty={contEmpty}
                primeBtnClick={contCnctClick}
                icnSrc="contacts"
                headlineSrc="Connect To Contacts"
                subtxtSrc="Your friends and family are on BlueQueue. See what they're up to by connecting your contacts."
                primeBtnTxtSrc="Connect Securely"
              />
              {contCard ? (
                <_Builtin.Grid
                  className={_utils.cx(_styles, "grid-12")}
                  tag="div"
                >
                  {contCardMap ?? <CellConnect />}
                </_Builtin.Grid>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "a-footer-empty")}
              tag="div"
              top-shadow="y"
            />
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail")}
            tag="div"
            data-w-tab="facebook"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "a-header")}
              tag="div"
            >
              <SecHead
                act1Click={fbCancelClick}
                titleSrc="Facebook Friends"
                sz="xl"
                act1TxtSrc="Cancel"
                titleSz="h4"
              />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
              <EmptyCollection
                empty={fbEmpty}
                primeBtnClick={fbCnctClick}
                icnSrc="logo_facebook"
                headlineSrc="Connect To Facebook (Meta)"
                subtxtSrc="Find your Facebook friends on BlueQueue. Make the connection to see who's already here."
                primeBtnTxtSrc="Connect Securely"
              />
              {fbCard ? (
                <_Builtin.Grid
                  className={_utils.cx(_styles, "grid-12")}
                  tag="div"
                >
                  {fbCardMap ?? <CellConnect />}
                </_Builtin.Grid>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "a-footer-empty")}
              tag="div"
              top-shadow="y"
            />
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail")}
            tag="div"
            data-w-tab="twitter"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "a-header")}
              tag="div"
            >
              <SecHead
                act1Click={twitCancelClick}
                titleSrc="Twitter Friends"
                sz="xl"
                act1TxtSrc="Cancel"
                titleSz="h4"
              />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
              <EmptyCollection
                empty={twitEmpty}
                primeBtnClick={twitCnctClick}
                icnSrc="logo_twitter"
                headlineSrc="Connect To Twitter (X)"
                subtxtSrc="Find your Twitter followers on BlueQueue. Make the connection to see who's already here."
                primeBtnTxtSrc="Connect Securely"
              />
              {twitCard ? (
                <_Builtin.Grid
                  className={_utils.cx(_styles, "grid-12")}
                  tag="div"
                >
                  {twitCardMap ?? <CellConnect />}
                </_Builtin.Grid>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "a-footer-empty")}
              tag="div"
              top-shadow="y"
            />
          </_Builtin.TabsPane>
        </_Builtin.TabsContent>
        <_Builtin.TabsMenu
          className={_utils.cx(_styles, "tab-menu", "u-side-scroll")}
          tag="div"
          data-top-shadow="y"
        >
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link")}
            data-w-tab="members"
            block="inline"
          >
            <Label txtSrc="Members" icnSrc="members" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link")}
            data-w-tab="invite"
            block="inline"
          >
            <Label txtSrc="Invite" icnSrc="email_add" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link")}
            data-w-tab="contacts"
            block="inline"
          >
            <Label txtSrc="Contacts" icnSrc="contacts" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link")}
            data-w-tab="facebook"
            block="inline"
          >
            <Label txtSrc="Facebook" icnSrc="logo_facebook" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link")}
            data-w-tab="twitter"
            block="inline"
          >
            <Label txtSrc="Twitter" icnSrc="logo_twitter" />
          </_Builtin.TabsLink>
        </_Builtin.TabsMenu>
      </_Builtin.TabsWrapper>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "css-tab")}
        value="%3Cstyle%3E%0A%2F*%20Hide%20scrollbar%20for%20Chrome%2C%20Safari%20and%20Opera%20*%2F%0A.tab-bar%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A%2F*%20Hide%20scrollbar%20for%20IE%2C%20Edge%20and%20Firefox%20*%2F%0A.tab-bar%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%20%20%2F*%20IE%20and%20Edge%20*%2F%0A%20%20scrollbar-width%3A%20none%3B%20%20%2F*%20Firefox%20*%2F%0A%7D%0A%0A.tab-link.w--current%20.label%20.txt%20%7B%0A%09font-weight%3A%20bold%3B%0A%7D%0A.tab-link.w--current%20.label%20.icn%3A%3Afirst-letter%20%7B%0A%20%20%20%20text-transform%3A%20uppercase%3B%0A%7D%0A%5Btab-underline%3D%22y%22%5D%0A.tab-link.w--current%20%7B%0A%20%20%20%20border-bottom-style%3A%20solid%3B%0A%20%20%20%20border-bottom-width%3A%202px%3B%0A%20%20%20%20border-bottom-color%3A%20var(--theme--light--p500)%3B%0A%20%20%20%20color%3A%20var(--theme--light--p500)%3B%0A%20%20%20%20font-weight%3A%20700%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
