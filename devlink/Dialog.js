"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./Dialog.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-5":{"id":"e-5","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-6"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".fs_modal-1_button","originalId":"65f7b7d0-ce13-f63a-1a30-4df7265835e3","appliesTo":"CLASS"},"targets":[{"selector":".fs_modal-1_button","originalId":"65f7b7d0-ce13-f63a-1a30-4df7265835e3","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1667592839516},"e-912":{"id":"e-912","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-195","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-913"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"35d7a437-a090-7000-c8d7-cd6b6a4f9615","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"35d7a437-a090-7000-c8d7-cd6b6a4f9615","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1748548288429}},"actionLists":{"a":{"id":"a","title":"Modal 1 - Popup open","actionItemGroups":[{"actionItems":[{"id":"a-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".dialog_wrap","selectorGuids":["a6ebbe5f-a6ca-c031-bf3b-7210acec600b"]},"value":"none"}},{"id":"a-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".dialog_wrap","selectorGuids":["a6ebbe5f-a6ca-c031-bf3b-7210acec600b"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".dialog_wrap","selectorGuids":["a6ebbe5f-a6ca-c031-bf3b-7210acec600b"]},"value":"flex"}},{"id":"a-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":250,"target":{"selector":".dialog_wrap","selectorGuids":["a6ebbe5f-a6ca-c031-bf3b-7210acec600b"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1663936524957},"a-195":{"id":"a-195","title":"BQ-Dialog-Open","actionItemGroups":[{"actionItems":[{"id":"a-195-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"cd25656a-27bc-2427-e81d-4e8f34f13922"},"value":0,"unit":""}},{"id":"a-195-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"id":"cd25656a-27bc-2427-e81d-4e8f34f13922"},"value":"none"}}]},{"actionItems":[{"id":"a-195-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuad","duration":200,"target":{"id":"cd25656a-27bc-2427-e81d-4e8f34f13922"},"value":1,"unit":""}},{"id":"a-195-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"id":"cd25656a-27bc-2427-e81d-4e8f34f13922"},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1748548038795}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function Dialog({
  as: _Component = _Builtin.Block,
  dialog = false,
  prevBtn = false,
  closeBtn = false,
  bgClick = {},
  prevClick = {},
  closeClick = {},
  type = "modal",
  scrim = "70",
  blur = "3",
  shdw = "xl",
  dialogMap,
  anchor,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return dialog ? (
    <_Component
      className={_utils.cx(_styles, "dialog_wrap")}
      data-w-id="cd25656a-27bc-2427-e81d-4e8f34f13922"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "dialog_bg")}
        tag="div"
        data-scrim={scrim}
        data-blur={blur}
        {...bgClick}
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "dialog_box")}
        tag="div"
        data-bs={shdw}
        data-type={type}
        position-anchor={anchor}
      >
        {prevBtn ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "dialog_prev-btn")}
            tag="div"
            {...prevClick}
          >
            <Label
              txt={false}
              txtSrc="Previous"
              icnSrc="Nav_left"
              lblSz="r1"
              lblShad="y"
              lblClr="n700"
            />
          </_Builtin.Block>
        ) : null}
        {closeBtn ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "dialog_close-btn")}
            tag="div"
            id="closeModalLink"
            {...closeClick}
          >
            <Label
              txt={false}
              txtSrc="Close"
              icnSrc="Close"
              lblSz="r1"
              lblShad="y"
              lblClr="n700"
            />
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "dialog_content")}
          tag="div"
        >
          {dialogMap}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
