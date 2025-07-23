"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Img } from "./Img";
import { Avatar } from "./Avatar";
import { Rating } from "./Rating";
import { Icon } from "./Icon";
import { SecHead } from "./SecHead";
import { ImgSs } from "./ImgSs";
import { Label } from "./Label";
import { InputStepper } from "./InputStepper";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./MCaptResult.module.css";

export function MCaptResult({
  as: _Component = _Builtin.Block,
  result = true,
  img = true,
  avtr = false,
  imgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  imgAlt = "__wf_reserved_inherit",
  avtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  avtrAlt = "__wf_reserved_inherit",
  itmTitleSrc = "ItemTitle",
  itmDescSrc = "Description here this is longer and wraps to a second line with truncation at the second line like this",
  itmPriceSrc = "$00.00",
  itmPrice = false,
  itmRate = false,
  itmRateSrc = "0",
  itmClick = {},
  itmAddClick = {},
  itmStep = false,
  itmStepMoreClick = {},
  itmStepQty = "0",
  itmStepLessClick = {},
  btn = false,
  btnTxtSrc = "Cancel",
  btnStyl = "nf",
  btnClick = {},
  addtoSrc = "{ContainerName}",
  addtoClick = {},
  more = true,
  moreClick = {},
  dtl = false,
  dtlTitleSrc = "{DetailName}",
  dtlCellMap,
  dtlCellExample = true,
}) {
  return result ? (
    <_Component
      className={_utils.cx(_styles, "capt_result")}
      tag="div"
      data-bs="xl"
    >
      <_Builtin.Block className={_utils.cx(_styles, "capt_itm")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "capt_result-info")}
          tag="div"
          {...itmClick}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "capt_info-lead")}
            tag="div"
          >
            <Img
              imgSrc={imgSrc}
              img={img}
              imgAlt={imgAlt}
              imgSz="xl"
              imgShape="r"
            />
            <Avatar
              avtr={avtr}
              avtrSrc={avtrSrc}
              avtrAlt={avtrAlt}
              avtrSz="xl"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "capt_info-prime")}
            tag="div"
            data-btm-brdr="n"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "capt_info-row1")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "capt_info-title")}
                tag="div"
                data-lbl-size="r3"
                data-icn-loc="l"
                data-clr="in"
                data-lbl-gap="8"
                data-ts="n"
                data-for=""
                data-lc="2"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "capt_info-title-txt")}
                  tag="div"
                >
                  {itmTitleSrc}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "capt_info-row2")}
              tag="div"
              data-lbl-size="r4"
              data-clr="n700"
              data-lc="2"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "capt_info-disc")}
                tag="div"
              >
                {itmDescSrc}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "capt_info-row3")}
              tag="div"
              data-lbl-size="r4"
              data-clr="n999"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "capt_info-price")}
                tag="div"
                data-lbl-size="r3b"
                data-icn-loc="l"
                data-clr="in"
                data-lbl-gap="8"
                data-ts="n"
                data-for=""
                data-lc="2"
              >
                {itmPrice ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "capt_info-price-txt")}
                    tag="div"
                  >
                    {itmPriceSrc}
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
              <Rating
                rating={itmRate}
                valueSrc={itmRateSrc}
                qty={false}
                value={false}
                r1Full={true}
                r2Full={true}
                r3Full={true}
                r4Half={true}
                sz="xs"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "capt_result-itmadd")}
          tag="div"
          {...itmAddClick}
        >
          <Icon icnSz="sm" icnSrc="addcirc" />
        </_Builtin.Block>
      </_Builtin.Block>
      {dtl ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "capt_result-dtl")}
          tag="div"
        >
          <SecHead titleSrc={dtlTitleSrc} act1={false} titleSz="r4" sz="xs" />
          <ImgSs
            cellMap={dtlCellMap}
            cellExample={dtlCellExample}
            sideFade={false}
            cellSz="l"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "capt_result-ext")}
        tag="div"
      >
        <_Builtin.Link
          className={_utils.cx(_styles, "capt_result-ext-addto")}
          button={false}
          block="inline"
          options={{
            href: "#",
          }}
          {...addtoClick}
        >
          <Label lblClr="f500" icn={false} txtSrc="Add to" lblSz="r4" />
          <Label txtSrc={addtoSrc} lblClr="n700" icn={false} lblSz="r4" />
        </_Builtin.Link>
        {more ? (
          <_Builtin.Link
            className={_utils.cx(_styles, "capt_result-itm-more")}
            button={false}
            block="inline"
            options={{
              href: "#",
            }}
            {...moreClick}
          >
            <Label
              lblSz="r4"
              icnLoc="r"
              icn={true}
              txtSrc="more"
              icnSrc="select_arrrow"
              lblGap="4"
              lblClr="n300"
            />
          </_Builtin.Link>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "capt_stepper")} tag="div">
        <InputStepper
          inptStep={itmStep}
          moreClick={itmStepMoreClick}
          lessClick={itmStepLessClick}
          qty={itmStepQty}
          inptStepOri="h"
        />
        <Button
          btnTxtSrc={btnTxtSrc}
          btnStyl={btnStyl}
          btn={btn}
          btnClick={btnClick}
          btnSz="s"
          btnIcn={false}
          btnShdw="xl"
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
