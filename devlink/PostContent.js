"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Rating } from "./Rating";
import { Label } from "./Label";
import { Spacer } from "./Spacer";
import { Button } from "./Button";
import { InputStepper } from "./InputStepper";
import * as _utils from "./utils";
import _styles from "./PostContent.module.css";

export function PostContent({
  as: _Component = _Builtin.Block,
  title = true,
  titleSrc = "Post Title goes here and line wraps",
  rating = false,
  ratingSrc = "3.5",
  bodySrc = "Body of the note goes in this location with any media attachments below text copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  bodyClamp,
  titleClr,
  bodyClr,
  acrd = false,
  acrdClick = {},
  acrdTxtSrc = "more",
  acrdIcnSrc = "nav_down",
  aside = false,
  postMoreClick = {},
  postTime = "5d",
  rank = false,
  rankMoreClick = {},
  rankQty = "0",
  rankLessClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "post-content")} tag="div">
      {title ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "post-titlecopy")}
          tag="div"
          data-clr={titleClr}
        >
          {titleSrc}
        </_Builtin.Block>
      ) : null}
      <Rating qtySrc={ratingSrc} rating={rating} />
      <_Builtin.Block className={_utils.cx(_styles, "post-body")} tag="div">
        <_Builtin.Paragraph
          className={_utils.cx(_styles, "post-copy")}
          data-lc={bodyClamp}
          data-clr={bodyClr}
        >
          {bodySrc}
        </_Builtin.Paragraph>
      </_Builtin.Block>
      {acrd ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "post-acrd")}
          tag="div"
          {...acrdClick}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "acrd-fade-btm")}
            tag="div"
          />
          <Label
            txtSrc={acrdTxtSrc}
            icnSrc={acrdIcnSrc}
            lblSz="r3"
            icnLoc="r"
            lblGap="4"
            lblClr="f500"
          />
          <Spacer szDep="8" size="8" />
        </_Builtin.Block>
      ) : null}
      {aside ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "post-detail-aside")}
          tag="div"
        >
          <Button
            btnClick={postMoreClick}
            btnStyl="nt"
            btnTxt={false}
            btnIcnSrc="Moreh"
            lblClr="n300"
          />
          <_Builtin.Block className={_utils.cx(_styles, "post-time")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "atrb-time")}
              tag="div"
            >
              {postTime}
            </_Builtin.Block>
          </_Builtin.Block>
          <InputStepper
            inptStep={rank}
            qty={rankQty}
            moreClick={rankMoreClick}
            lessClick={rankLessClick}
            inpstepBg="n100"
            inptStepIcnClr="n300"
            valueTxtClr="n"
            inptStepOri="v"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
