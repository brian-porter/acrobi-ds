"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OlTag } from "./OlTag";
import { Label } from "./Label";
import { Icon } from "./Icon";
import * as _utils from "./utils";
import _styles from "./ButtonDub.module.css";

export function ButtonDub({
  as: _Component = _Builtin.Block,
  btn1IcnSrc = "Cart",
  btn1LblSrc = "Add",
  btn1Tag = false,
  btn1TagQty = "1",
  btn1Click = {},
  btn2IcnSrc = "List",
  btn2Click = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "btn-dub")} tag="div">
      <_Builtin.Link
        className={_utils.cx(_styles, "btn-ldl")}
        editable={false}
        button={false}
        role="button"
        block="inline"
        options={{
          href: "#",
        }}
        {...btn1Click}
      >
        <OlTag tag={btn1Tag} tagTxtSrc={btn1TagQty} tagLoc="tl" tagClr="p700" />
        <Label txtSrc={btn1LblSrc} icnSrc={btn1IcnSrc} lblSz="r1" />
      </_Builtin.Link>
      <_Builtin.Block className={_utils.cx(_styles, "btn-div")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "btn-div-line")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Link
        className={_utils.cx(_styles, "btn-ldt")}
        editable={false}
        button={false}
        role="button"
        block="inline"
        options={{
          href: "#",
        }}
        {...btn2Click}
      >
        <Label icnSrc={btn2IcnSrc} txtSrc="" txt={false} lblSz="r1" />
        <Icon icnSrc="Nav_down" icnSz="xxs" />
      </_Builtin.Link>
    </_Component>
  );
}
