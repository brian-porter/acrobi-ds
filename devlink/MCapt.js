"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MCaptResult } from "./MCaptResult";
import { Img } from "./Img";
import { Headline } from "./Headline";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Paragraph } from "./Paragraph";
import * as _utils from "./utils";
import _styles from "./MCapt.module.css";

export function MCapt({
  as: _Component = _Builtin.Block,
  viewMap,
  linkQr = false,
  linkQrMap,
  linkQrExample = true,
  captResultBar = false,
  captResultMap,
  captResultExample = true,
  scrimLast = false,
  scrimLastClick = {},
  scrimLastImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  flashIconSrc = "Flash_off",
  flashClick = {},
  captBtnClr = "n9993",
  captBtnClick = {},
  camFlipClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "m-capture")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "m-capt-result")} tag="div">
        {captResultBar ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "capt_result-sidescroll")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "u-barscangap-ss")}
              tag="div"
            >
              {captResultMap ?? (
                <MCaptResult result={captResultExample} itmPrice={false} />
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {linkQr ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "capt_desktop")}
          tag="div"
          data-bg-clr="grey-900"
        >
          <_Builtin.Block className={_utils.cx(_styles, "capt_qr")} tag="div">
            {linkQrMap ?? (
              <Img
                img={linkQrExample}
                imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65b015749b9cf0a402a56cfe_qr-invite-code.avif"
              />
            )}
          </_Builtin.Block>
          <Headline
            titleSrc="Scan to Connect"
            subtxtSrc="Use your phone or tablet to scan barcodes & QR codes"
            titleClr="n000"
            subtxtClr="n500"
            align="c"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "capt_view")}
        tag="div"
        data-bg-clr="grey-900"
      >
        {viewMap}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "capt_bottom")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "capt_scrim")} tag="div">
          {scrimLast ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "capt_lead")}
              tag="div"
              {...scrimLastClick}
            >
              <Img imgSrc={scrimLastImgSrc} imgShape="r" imgSz="xl" />
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block className={_utils.cx(_styles, "capt_btns")} tag="div">
            <Button
              btnIcnSrc={flashIconSrc}
              btnClick={flashClick}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnShdw="y"
              lblClr="grey-300"
              btnTxtSrc="Flash"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "capture")}
              tag="div"
              {...captBtnClick}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "capt_btn-cntl")}
                tag="div"
                data-clr="n100"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "capt_btn-center")}
                  tag="div"
                  data-bg-clr={captBtnClr}
                >
                  <Icon icnClr="grey-300" icnSz="s" icnSrc="scan_qr" />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <Button
              btnClick={camFlipClick}
              btnStyl="nt"
              btnTxt={false}
              btnSz="l"
              btnShdw="y"
              lblClr="grey-300"
              btnTxtSrc="Flip"
              btnIcnSrc="Cam_flip"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "capt_tip")}
          tag="div"
          data-bg-clr=""
        >
          <Paragraph
            align="c"
            bodySrc="Hold for video, tap for photo, auto scan QR & barcodes"
            fontClr="grey-700"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
