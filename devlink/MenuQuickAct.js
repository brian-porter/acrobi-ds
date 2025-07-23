"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { Img } from "./Img";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./MenuQuickAct.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-673":{"id":"e-673","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-674"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7db844a3-8dda-9567-993e-cf940e289bcd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7db844a3-8dda-9567-993e-cf940e289bcd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1704496210252}},"actionLists":{"a-21":{"id":"a-21","title":"Modal - Close","actionItemGroups":[{"actionItems":[{"id":"a-21-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":250,"target":{},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-21-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1663936524957}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function MenuQuickAct({
  as: _Component = _Builtin.Block,
  menu = true,
  popId,
  anchorId,
  qrMap,
  sampleQr = true,
  objImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65b015749b9cf0a402a56cfe_qr-invite-code.avif",
  objImgAltTxt = "__wf_reserved_inherit",
  objTxtSrc = "ObjectName",
  pin = true,
  setting = true,
  attrib = false,
  btn4 = false,
  share = true,
  copy = true,
  print = true,
  addPeep = true,
  broadcast = true,
  comment = true,
  block = false,
  msg = false,
  report = false,
  search = false,
  alert = false,
  pinSrc = "Pin",
  pinClick = {},
  attribClick = {},
  settingClick = {},
  shareClick = {},
  shareDis = "true",
  blockClick = {},
  blockDis = "false",
  copyClick = {},
  copyDis = "false",
  printClick = {},
  printDis = "false",
  searchClick = {},
  searchDis = "false",
  addPeepClick = {},
  addPeepDis = "false",
  alertClick = {},
  alertDisabled = "false",
  broadcastClick = {},
  broadcastDis = "false",
  commentClick = {},
  commentDis = "false",
  messageClick = {},
  messageDis = "false",
  reportClick = {},
  reportDis = "false",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return menu ? (
    <_Component
      className={_utils.cx(_styles, "quickact_wrap")}
      tag="nav"
      data-bs="xl"
      popover2=""
      anchor={anchorId}
      id={popId}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "quickact-main")}
        id={_utils.cx(
          _styles,
          "w-node-_7db844a3-8dda-9567-993e-cf940e289bcf-0e289bcc"
        )}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "qa-col-top")} tag="div">
          <Button
            btnClick={pinClick}
            btnIcnSrc={pinSrc}
            btn={pin}
            btnTxt={false}
            btnStyl="nt"
            btnSz="l"
            btnTxtSrc="Chat"
            lblShad="on"
            lblClr="n700"
          />
          <Button
            btn={attrib}
            btnClick={attribClick}
            btnTxt={false}
            btnStyl="nt"
            btnSz="l"
            btnTxtSrc="Chat"
            btnIcnSrc="Design"
            lblShad="on"
            lblClr="n700"
          />
        </_Builtin.Block>
        <_Builtin.Link
          className={_utils.cx(_styles, "mqa-main-link")}
          button={false}
          block="inline"
          options={{
            href: "#",
          }}
        >
          <_Builtin.Block className={_utils.cx(_styles, "qa-code")} tag="div">
            {qrMap ?? (
              <Img
                imgSrc={objImgSrc}
                imgAlt={objImgAltTxt}
                img={sampleQr}
                imgSz="3xl"
                imgShape="r"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "qa-objname")}
            tag="div"
          >
            <Label
              txtSrc={objTxtSrc}
              lblSz="r3"
              icn={false}
              lblClr="n700"
              lblShad="on"
            />
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Block className={_utils.cx(_styles, "qa-col-top")} tag="div">
          <Button
            btnClick={settingClick}
            btn={setting}
            btnTxt={false}
            btnStyl="nt"
            btnSz="l"
            btnTxtSrc="More"
            btnIcnSrc="Setting"
            lblShad="on"
            lblClr="n700"
          />
          <Button
            btn={btn4}
            btnTxt={false}
            btnStyl="nt"
            btnSz="l"
            btnIcnSrc="Default"
            lblShad="on"
            lblClr="n700"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "quickact-main")}
        id={_utils.cx(
          _styles,
          "w-node-_7db844a3-8dda-9567-993e-cf940e289bda-0e289bcc"
        )}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "qa-col-btm")} tag="div">
          {share ? (
            <_Builtin.Block className={_utils.cx(_styles, "qa-divl")} tag="div">
              <Button
                btnClick={shareClick}
                disabled={shareDis}
                btnTxt={true}
                btnStyl="nt"
                btnSz="l"
                btnTxtSrc="Share"
                btnIcnSrc="Share"
                lblShad="on"
                lblClr="n700"
                btnShdw="n"
              />
            </_Builtin.Block>
          ) : null}
          {block ? (
            <_Builtin.Block className={_utils.cx(_styles, "qa-divl")} tag="div">
              <Button
                btnClick={blockClick}
                disabled={blockDis}
                btnTxt={true}
                btnStyl="nt"
                btnSz="l"
                btnTxtSrc="Block"
                btnIcnSrc="Peep_block"
                lblShad="on"
                lblClr="n700"
              />
            </_Builtin.Block>
          ) : null}
          {copy ? (
            <_Builtin.Block className={_utils.cx(_styles, "qa-divl")} tag="div">
              <Button
                btnClick={copyClick}
                disabled={copyDis}
                btnTxt={true}
                btnStyl="nt"
                btnSz="l"
                btnTxtSrc="Copy"
                btnIcnSrc="Copy"
                lblShad="on"
                lblClr="n700"
              />
            </_Builtin.Block>
          ) : null}
          {print ? (
            <_Builtin.Block className={_utils.cx(_styles, "qa-divl")} tag="div">
              <Button
                btnClick={printClick}
                disabled={printDis}
                btnTxt={true}
                btnStyl="nt"
                btnSz="l"
                btnTxtSrc="Print"
                btnIcnSrc="Print"
                lblShad="on"
                lblClr="n700"
              />
            </_Builtin.Block>
          ) : null}
          {search ? (
            <_Builtin.Block className={_utils.cx(_styles, "qa-divl")} tag="div">
              <Button
                btnClick={searchClick}
                disabled={searchDis}
                btnTxt={true}
                btnStyl="nt"
                btnSz="l"
                btnTxtSrc="Search"
                btnIcnSrc="Search"
                lblShad="on"
                lblClr="n700"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "qa-col-btm")} tag="div">
          {addPeep ? (
            <_Builtin.Block className={_utils.cx(_styles, "qa-div")} tag="div">
              <Button
                btnClick={addPeepClick}
                disabled={addPeepDis}
                btnTxt={true}
                btnStyl="nt"
                btnSz="l"
                btnTxtSrc="Add People"
                btnIcnSrc="Assign"
                lblShad="on"
                lblClr="n700"
              />
            </_Builtin.Block>
          ) : null}
          {alert ? (
            <_Builtin.Block className={_utils.cx(_styles, "qa-div")} tag="div">
              <Button
                btnClick={alertClick}
                disabled={alertDisabled}
                btnTxt={true}
                btnStyl="nt"
                btnSz="l"
                btnTxtSrc="Alerts"
                btnIcnSrc="Alarm"
                lblShad="on"
                lblClr="n700"
              />
            </_Builtin.Block>
          ) : null}
          {broadcast ? (
            <_Builtin.Block className={_utils.cx(_styles, "qa-div")} tag="div">
              <Button
                btnClick={broadcastClick}
                disabled={broadcastDis}
                btnTxt={true}
                btnStyl="nt"
                btnSz="l"
                btnTxtSrc="Broadcast"
                btnIcnSrc="Broadcast"
                lblShad="on"
                lblClr="n700"
              />
            </_Builtin.Block>
          ) : null}
          {comment ? (
            <_Builtin.Block className={_utils.cx(_styles, "qa-div")} tag="div">
              <Button
                btnClick={commentClick}
                disabled={commentDis}
                btnTxt={true}
                btnStyl="nt"
                btnSz="l"
                btnTxtSrc="Comment"
                btnIcnSrc="Chat"
                lblShad="on"
                lblClr="n700"
              />
            </_Builtin.Block>
          ) : null}
          {msg ? (
            <_Builtin.Block className={_utils.cx(_styles, "qa-div")} tag="div">
              <Button
                btnClick={messageClick}
                disabled={messageDis}
                btnTxt={true}
                btnStyl="nt"
                btnSz="l"
                btnTxtSrc="Message"
                btnIcnSrc="Chat_convo"
                lblShad="on"
                lblClr="n700"
              />
            </_Builtin.Block>
          ) : null}
          {report ? (
            <_Builtin.Block className={_utils.cx(_styles, "qa-div")} tag="div">
              <Button
                btnClick={reportClick}
                disabled={reportDis}
                btnTxt={true}
                btnStyl="nt"
                btnSz="l"
                btnTxtSrc="Report"
                btnIcnSrc="Report"
                lblShad="on"
                lblClr="n700"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
