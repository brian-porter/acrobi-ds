"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Icon } from "./Icon";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./MenuItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-121":{"id":"e-121","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-42","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-122"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".acrd-sec-trig","originalId":"65c28ee1b1ee0bfebe57f131|1afd9728-8499-db41-0c65-44bc9446ecd6","appliesTo":"CLASS"},"targets":[{"selector":".acrd-sec-trig","originalId":"65c28ee1b1ee0bfebe57f131|1afd9728-8499-db41-0c65-44bc9446ecd6","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1667593479296},"e-122":{"id":"e-122","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-43","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-121"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".acrd-sec-trig","originalId":"65c28ee1b1ee0bfebe57f131|1afd9728-8499-db41-0c65-44bc9446ecd6","appliesTo":"CLASS"},"targets":[{"selector":".acrd-sec-trig","originalId":"65c28ee1b1ee0bfebe57f131|1afd9728-8499-db41-0c65-44bc9446ecd6","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1667593479296}},"actionLists":{"a-42":{"id":"a-42","title":"Accordion - Open","actionItemGroups":[{"actionItems":[{"id":"a-42-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".acrd-sec-body","selectorGuids":["26e05d4b-d892-aac6-b2bf-1a310477d765"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"rem","locked":false}},{"id":"a-42-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".acrd-sec-body","selectorGuids":["26e05d4b-d892-aac6-b2bf-1a310477d765"]},"value":"none"}}]},{"actionItems":[{"id":"a-42-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".acrd-sec-body","selectorGuids":["26e05d4b-d892-aac6-b2bf-1a310477d765"]},"value":"block"}}]},{"actionItems":[{"id":"a-42-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":250,"target":{"useEventTarget":"SIBLINGS","selector":".acrd-sec-body","selectorGuids":["26e05d4b-d892-aac6-b2bf-1a310477d765"]},"widthValue":100,"widthUnit":"%","heightUnit":"AUTO","locked":false}},{"id":"a-42-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":250,"target":{"useEventTarget":"CHILDREN","selector":".acc_arrow","selectorGuids":["0cf27a66-040d-df73-ccc5-a9ef5aec8963"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1663934233644},"a-43":{"id":"a-43","title":"Accordion - Close","actionItemGroups":[{"actionItems":[{"id":"a-43-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":250,"target":{"useEventTarget":"SIBLINGS","selector":".acrd-sec-body","selectorGuids":["26e05d4b-d892-aac6-b2bf-1a310477d765"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-43-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":250,"target":{"useEventTarget":"CHILDREN","selector":".acc_arrow","selectorGuids":["0cf27a66-040d-df73-ccc5-a9ef5aec8963"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-43-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".acrd-sec-body","selectorGuids":["26e05d4b-d892-aac6-b2bf-1a310477d765"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1663934233644}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function MenuItem({
  as: _Component = _Builtin.Block,
  menuItm = true,
  lIcn = false,
  pSubtext = false,
  tValue = false,
  tAcrdArrw = false,
  tSelected = false,
  lIcnSrc = "default",
  lIcnClr = "in",
  pTitleSrc = "Title",
  pTitleSz = "r2",
  pSubtxtSrc = "Subtitle copy here",
  tValueSrc = "value",
  lItmDiv,
  pItmDiv = "y",
  tItmDiv = "y",

  menuItmLink = {
    href: "#",
  },

  menuItmClick = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return menuItm ? (
    <_Component
      className={_utils.cx(_styles, "menu_item_wrap")}
      tag="div"
      {...menuItmClick}
    >
      <_Builtin.Link
        className={_utils.cx(_styles, "menu-link")}
        button={false}
        block="inline"
        options={menuItmLink}
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "mi-lead")}
        tag="div"
        data-div={lItmDiv}
      >
        {lIcn ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "mic-lead-icn")}
            tag="div"
          >
            <Icon icnSrc={lIcnSrc} icnClr={lIcnClr} />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "mi-primary")}
        tag="div"
        data-div={pItmDiv}
      >
        <Label
          txtSrc={pTitleSrc}
          lblSz={pTitleSz}
          icnLoc="l"
          icnSrc="default"
          icn={false}
        />
        <Label
          txtSrc={pSubtxtSrc}
          lbl={pSubtext}
          icn={false}
          icnSrc="default"
          lblSz="r3"
          lblClr="n700"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "mi-trail")}
        tag="div"
        data-div={tItmDiv}
      >
        {tAcrdArrw ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "mic-trail-acc")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "acc_arrow")}
              tag="div"
              data-clr="n700"
            >
              {"nav_down"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {tSelected ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "mic-trail-select")}
            tag="div"
          >
            <Icon icnSrc="Checkfat" icnClr="p500" />
          </_Builtin.Block>
        ) : null}
        {tValue ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "mic-trail-value")}
            tag="div"
          >
            <Label
              txtSrc={tValueSrc}
              icn={false}
              icnLoc="t"
              icnSrc="default"
              lblSz="r3"
              lbl={true}
              lblClr="n700"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
