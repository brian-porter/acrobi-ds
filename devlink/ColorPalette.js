"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PickSwatch } from "./PickSwatch";
import * as _utils from "./utils";
import _styles from "./ColorPalette.module.css";

export function ColorPalette({
  as: _Component = _Builtin.Block,
  colorPalette = true,
  blackOn = false,
  grey800On = false,
  grey700On = false,
  grey600On = false,
  whiteOn = false,
  grey200On = false,
  grey400On = false,
  grey500On = false,
  red700On = false,
  red500On = false,
  red300On = false,
  red100On = false,
  pink700On = false,
  pink500On = false,
  pink300On = false,
  pink100On = false,
  purple700On = false,
  purple500On = false,
  purple300On = false,
  purple100On = false,
  indigo700On = false,
  indigo500On = false,
  indigo300On = false,
  indigo100On = false,
  blue700On = false,
  blue500On = false,
  blue300On = false,
  blue100On = false,
  cyan700On = false,
  cyan500On = false,
  cyan300On = false,
  cyan100On = false,
  teal700On = false,
  teal500On = false,
  teal300On = false,
  teal100On = false,
  green700On = false,
  green500On = false,
  green300On = false,
  green100On = false,
  yellow700On = false,
  yellow500On = false,
  yellow300On = false,
  yellow100On = false,
  amber700On = false,
  amber500On = false,
  amber300On = false,
  amber100On = false,
  orange700On = false,
  orange500On = false,
  orange300On = false,
  orange100On = false,
  deepOrange700On = false,
  deepOrange500On = false,
  deepOrange300On = false,
  deepOrange100On = false,
  brown700On = false,
  brown500On = false,
  brown300On = false,
  brown100On = false,
  blackClick = {},
  grey800Click = {},
  grey700Click = {},
  grey600Click = {},
  whiteClick = {},
  grey200Click = {},
  grey400Click = {},
  grey500Click = {},
  red700Click = {},
  red500Click = {},
  red300Click = {},
  red100Click = {},
  pink700Click = {},
  pink500Click = {},
  pink300Click = {},
  pink100Click = {},
  purple700Click = {},
  purple500Click = {},
  purple300Click = {},
  purple100Click = {},
  indigo700Click = {},
  indigo500Click = {},
  indigo300Click = {},
  indigo100Click = {},
  blue700Click = {},
  blue500Click = {},
  blue300Click = {},
  blue100Click = {},
  cyan700Click = {},
  cyan500Click = {},
  cyan300Click = {},
  cyan100Click = {},
  teal700Click = {},
  teal500Click = {},
  teal300Click = {},
  teal100Click = {},
  green700Click = {},
  green500Click = {},
  green300Click = {},
  green100Click = {},
  yellow700Click = {},
  yellow500Click = {},
  yellow300Click = {},
  yellow100Click = {},
  amber700Click = {},
  amber500Click = {},
  amber300Click = {},
  amber100Click = {},
  orange700Click = {},
  orange500Click = {},
  orange300Click = {},
  orange100Click = {},
  deepOrange700Click = {},
  deepOrange500Click = {},
  deepOrange300Click = {},
  deepOrange100Click = {},
  brown700Click = {},
  brown500Click = {},
  brown300Click = {},
  brown100Click = {},
}) {
  return colorPalette ? (
    <_Component className={_utils.cx(_styles, "color-palette")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "toolbar-ss")} tag="div">
        <_Builtin.Grid className={_utils.cx(_styles, "color-grid")} tag="div">
          <PickSwatch
            swatchActive={blackOn}
            swatchClick={blackClick}
            swatchClr="black"
          />
          <PickSwatch
            swatchActive={grey800On}
            swatchClick={grey800Click}
            swatchClr="grey-800"
          />
          <PickSwatch
            swatchActive={grey700On}
            swatchClick={grey700Click}
            swatchClr="grey-700"
          />
          <PickSwatch
            swatchActive={grey600On}
            swatchClick={grey600Click}
            swatchClr="grey-600"
          />
          <PickSwatch
            swatchActive={whiteOn}
            swatchClick={whiteClick}
            swatchClr="grey-50"
          />
          <PickSwatch
            swatchActive={grey200On}
            swatchClick={grey200Click}
            swatchClr="grey-200"
          />
          <PickSwatch
            swatchActive={grey400On}
            swatchClick={grey400Click}
            swatchClr="grey-400"
          />
          <PickSwatch
            swatchActive={grey500On}
            swatchClick={grey500Click}
            swatchClr="grey-500"
          />
          <PickSwatch
            swatchActive={red700On}
            swatchClick={red700Click}
            swatchClr="red-700"
          />
          <PickSwatch
            swatchActive={red500On}
            swatchClick={red500Click}
            swatchClr="red-500"
          />
          <PickSwatch
            swatchActive={red300On}
            swatchClick={red300Click}
            swatchClr="red-300"
          />
          <PickSwatch
            swatchActive={red100On}
            swatchClick={red100Click}
            swatchClr="red-100"
          />
          <PickSwatch
            swatchActive={pink700On}
            swatchClick={pink700Click}
            swatchClr="pink-700"
          />
          <PickSwatch
            swatchActive={pink500On}
            swatchClick={pink500Click}
            swatchClr="pink-500"
          />
          <PickSwatch
            swatchActive={pink300On}
            swatchClick={pink300Click}
            swatchClr="pink-300"
          />
          <PickSwatch
            swatchActive={pink100On}
            swatchClick={pink100Click}
            swatchClr="pink-100"
          />
          <PickSwatch
            swatchActive={purple700On}
            swatchClick={purple700Click}
            swatchClr="purple-700"
          />
          <PickSwatch
            swatchActive={purple500On}
            swatchClick={purple500Click}
            swatchClr="purple-500"
          />
          <PickSwatch
            swatchActive={purple300On}
            swatchClick={purple300Click}
            swatchClr="purple-300"
          />
          <PickSwatch
            swatchActive={purple100On}
            swatchClick={purple100Click}
            swatchClr="purple-100"
          />
          <PickSwatch
            swatchActive={indigo700On}
            swatchClick={indigo700Click}
            swatchClr="indigo-700"
          />
          <PickSwatch
            swatchActive={indigo500On}
            swatchClick={indigo500Click}
            swatchClr="indigo-500"
          />
          <PickSwatch
            swatchActive={indigo300On}
            swatchClick={indigo300Click}
            swatchClr="indigo-300"
          />
          <PickSwatch
            swatchActive={indigo100On}
            swatchClick={indigo100Click}
            swatchClr="indigo-100"
          />
          <PickSwatch
            swatchActive={blue700On}
            swatchClick={blue700Click}
            swatchClr="blue-700"
          />
          <PickSwatch
            swatchActive={blue500On}
            swatchClick={blue500Click}
            swatchClr="blue-500"
          />
          <PickSwatch
            swatchActive={blue300On}
            swatchClick={blue300Click}
            swatchClr="blue-300"
          />
          <PickSwatch
            swatchActive={blue100On}
            swatchClick={blue100Click}
            swatchClr="blue-100"
          />
          <PickSwatch
            swatchActive={cyan700On}
            swatchClick={cyan700Click}
            swatchClr="cyan-700"
          />
          <PickSwatch
            swatchActive={cyan500On}
            swatchClick={cyan500Click}
            swatchClr="cyan-500"
          />
          <PickSwatch
            swatchActive={cyan300On}
            swatchClick={cyan300Click}
            swatchClr="cyan-300"
          />
          <PickSwatch
            swatchActive={cyan100On}
            swatchClick={cyan100Click}
            swatchClr="cyan-100"
          />
          <PickSwatch
            swatchActive={teal700On}
            swatchClick={teal700Click}
            swatchClr="teal-700"
          />
          <PickSwatch
            swatchActive={teal500On}
            swatchClick={teal500Click}
            swatchClr="teal-500"
          />
          <PickSwatch
            swatchActive={teal300On}
            swatchClick={teal300Click}
            swatchClr="teal-300"
          />
          <PickSwatch
            swatchActive={teal100On}
            swatchClick={teal100Click}
            swatchClr="teal-100"
          />
          <PickSwatch
            swatchActive={green700On}
            swatchClick={green700Click}
            swatchClr="green-700"
          />
          <PickSwatch
            swatchActive={green500On}
            swatchClick={green500Click}
            swatchClr="green-500"
          />
          <PickSwatch
            swatchActive={green300On}
            swatchClick={green300Click}
            swatchClr="green-300"
          />
          <PickSwatch
            swatchActive={green100On}
            swatchClick={green100Click}
            swatchClr="green-100"
          />
          <PickSwatch
            swatchActive={yellow700On}
            swatchClick={yellow700Click}
            swatchClr="yellow-700"
          />
          <PickSwatch
            swatchActive={yellow500On}
            swatchClick={yellow500Click}
            swatchClr="yellow-500"
          />
          <PickSwatch
            swatchActive={yellow300On}
            swatchClick={yellow300Click}
            swatchClr="yellow-300"
          />
          <PickSwatch
            swatchActive={yellow100On}
            swatchClick={yellow100Click}
            swatchClr="yellow-100"
          />
          <PickSwatch
            swatchActive={amber700On}
            swatchClick={amber700Click}
            swatchClr="amber-700"
          />
          <PickSwatch
            swatchActive={amber500On}
            swatchClick={amber500Click}
            swatchClr="amber-500"
          />
          <PickSwatch
            swatchActive={amber300On}
            swatchClick={amber300Click}
            swatchClr="amber-300"
          />
          <PickSwatch
            swatchActive={amber100On}
            swatchClick={amber100Click}
            swatchClr="amber-100"
          />
          <PickSwatch
            swatchActive={orange700On}
            swatchClick={orange700Click}
            swatchClr="orange-700"
          />
          <PickSwatch
            swatchActive={orange500On}
            swatchClick={orange500Click}
            swatchClr="orange-500"
          />
          <PickSwatch
            swatchActive={orange300On}
            swatchClick={orange300Click}
            swatchClr="orange-300"
          />
          <PickSwatch
            swatchActive={orange100On}
            swatchClick={orange100Click}
            swatchClr="orange-100"
          />
          <PickSwatch
            swatchActive={deepOrange700On}
            swatchClick={deepOrange700Click}
            swatchClr="deep-orange-700"
          />
          <PickSwatch
            swatchActive={deepOrange500On}
            swatchClick={deepOrange500Click}
            swatchClr="deep-orange-500"
          />
          <PickSwatch
            swatchActive={deepOrange300On}
            swatchClick={deepOrange300Click}
            swatchClr="deep-orange-300"
          />
          <PickSwatch
            swatchActive={deepOrange100On}
            swatchClick={deepOrange100Click}
            swatchClr="deep-orange-100"
          />
          <PickSwatch
            swatchActive={brown700On}
            swatchClick={brown700Click}
            swatchClr="brown-700"
          />
          <PickSwatch
            swatchActive={brown500On}
            swatchClick={brown500Click}
            swatchClr="brown-500"
          />
          <PickSwatch
            swatchActive={brown300On}
            swatchClick={brown300Click}
            swatchClr="brown-300"
          />
          <PickSwatch
            swatchActive={brown100On}
            swatchClick={brown100Click}
            swatchClr="brown-100"
          />
        </_Builtin.Grid>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
