"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./Label.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-711":{"id":"e-711","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-130","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-712"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f1b8|634593a4-0825-53cd-12e2-c1b8a325db40","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f1b8|634593a4-0825-53cd-12e2-c1b8a325db40","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705035683176},"e-712":{"id":"e-712","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-131","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-711"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f1b8|634593a4-0825-53cd-12e2-c1b8a325db40","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f1b8|634593a4-0825-53cd-12e2-c1b8a325db40","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":false},"createdOn":1705035683177}},"actionLists":{"a-130":{"id":"a-130","title":"BBC-ShowFind","actionItemGroups":[{"actionItems":[{"id":"a-130-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"block"}},{"id":"a-130-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".label_wrap","selectorGuids":["579a7b8f-3b84-cc06-ebf3-0daa8d9e31ee"]},"value":"none"}}]},{"actionItems":[{"id":"a-130-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"block"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705035718968},"a-131":{"id":"a-131","title":"BBC-HideFind","actionItemGroups":[{"actionItems":[{"id":"a-131-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705036399025}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function Label({
  as: _Component = _Builtin.Block,
  lbl = true,
  txt = true,
  icn = true,
  txtSrc = "Label",
  icnSrc = "default",
  icnLoc = "l",
  lblSz = "r2",
  lblClr = "in",
  lblShad,
  lblGap = "8",
  lblLc,
  id,
  lblFor,
  icnClr,
  anchor,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return lbl ? (
    <_Component
      className={_utils.cx(_styles, "label_wrap")}
      tag="div"
      data-lbl-size={lblSz}
      data-loc={icnLoc}
      data-clr={lblClr}
      data-gap={lblGap}
      data-ts={lblShad}
      htmlFor={lblFor}
      data-lc={lblLc}
      anchor-name={anchor}
      id={id}
    >
      {icn ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "icn")}
          tag="div"
          data-clr={icnClr}
        >
          {icnSrc}
        </_Builtin.Block>
      ) : null}
      {txt ? (
        <_Builtin.Block className={_utils.cx(_styles, "txt")} tag="div">
          {txtSrc}
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
