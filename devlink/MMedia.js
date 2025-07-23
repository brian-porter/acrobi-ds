"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MMediaList } from "./MMediaList";
import { MCapt } from "./MCapt";
import { SecHead } from "./SecHead";
import { Spacer } from "./Spacer";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./MMedia.module.css";

export function MMedia({
  as: _Component = _Builtin.Block,
  gallery = false,
  capture = true,
  video = false,
  image = false,
  gif = false,
  galMap,
  captMap,
  vidMap,
  imageMap,
  gifMap,
  backBtnSrc = "stepper_down",
  backBtnClick = {},
  galBtn = true,
  galIcnSrc = "gal",
  galBtnClick = {},
  captBtn = true,
  captIcnSrc = "Photo",
  captClick = {},
  vidBtn = true,
  vidIcnSrc = "yt",
  vidClick = {},
  imgBtn = true,
  imgIcnSrc = "ed_graphic",
  imgClick = {},
  gifBtn = true,
  gifIcnSrc = "ed_gif",
  gifClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "m-edmedia")} tag="div">
      {gallery ? (
        <_Builtin.Block className={_utils.cx(_styles, "m-gal")} tag="div">
          {galMap ?? <MMediaList />}
        </_Builtin.Block>
      ) : null}
      {capture ? (
        <_Builtin.Block className={_utils.cx(_styles, "m-capt")} tag="div">
          {captMap ?? <MCapt />}
        </_Builtin.Block>
      ) : null}
      {video ? (
        <_Builtin.Block className={_utils.cx(_styles, "m-vid")} tag="div">
          {vidMap ?? (
            <>
              <_Builtin.Block
                className={_utils.cx(_styles, "a-header")}
                tag="div"
              >
                <SecHead
                  titleSz="h4"
                  titleSrc="YouTube"
                  act1Click={{}}
                  titleIcn={false}
                  titleIcnSrc="nav_down"
                  act1TxtSrc="Select"
                  titleClr="n000"
                  act1={false}
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "a-body")}
                tag="div"
              >
                <_Builtin.Grid
                  className={_utils.cx(_styles, "vid-grid")}
                  tag="div"
                >
                  {vidMap}
                </_Builtin.Grid>
              </_Builtin.Block>
            </>
          )}
        </_Builtin.Block>
      ) : null}
      {image ? (
        <_Builtin.Block className={_utils.cx(_styles, "m-img")} tag="div">
          {imageMap ?? <MMediaList />}
        </_Builtin.Block>
      ) : null}
      {gif ? (
        <_Builtin.Block className={_utils.cx(_styles, "m-gif")} tag="div">
          {gifMap ?? <MMediaList />}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "g-editor-btm")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ednav-media", "cc-scan")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "toolbar-ss")}
            tag="div"
          >
            <Spacer szDep="8" size="8" />
            <Button
              btnIcnSrc={backBtnSrc}
              btnClick={backBtnClick}
              btnSz="m"
              btnTxt={false}
              btnStyl="ll"
            />
            <Button
              btnIcnSrc={galIcnSrc}
              btnClick={galBtnClick}
              btn={galBtn}
              btnSz="l"
              btnTxt={false}
              btnStyl="lt"
              disabled="true"
              btnTxtSrc=""
            />
            <Button
              btnIcnSrc={captIcnSrc}
              btnClick={captClick}
              btn={captBtn}
              btnSz="l"
              btnTxt={false}
              btnStyl="pt"
            />
            <Button
              btnIcnSrc={vidIcnSrc}
              btnClick={vidClick}
              btn={vidBtn}
              btnSz="l"
              btnTxt={false}
              btnStyl="lt"
              disabled="true"
              btnTxtSrc="Video"
            />
            <Button
              btnIcnSrc={imgIcnSrc}
              btnClick={imgClick}
              btn={imgBtn}
              btnSz="l"
              btnTxt={false}
              btnStyl="lt"
              disabled="true"
              btnTxtSrc="Images"
            />
            <Button
              btnIcnSrc={gifIcnSrc}
              btnClick={gifClick}
              btn={gifBtn}
              btnSz="l"
              btnTxt={false}
              btnStyl="lt"
              disabled="true"
              btnTxtSrc="Gif"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
