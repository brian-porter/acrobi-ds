"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SwitchCtrl.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-25":{"id":"e-25","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-894"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8146cbd-b6f9-b498-b6d5-b8b50adb88ca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8146cbd-b6f9-b498-b6d5-b8b50adb88ca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1684003388733},"e-26":{"id":"e-26","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-17","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-893"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8146cbd-b6f9-b498-b6d5-b8b50adb88ca","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8146cbd-b6f9-b498-b6d5-b8b50adb88ca","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1684003388733}},"actionLists":{"a-11":{"id":"a-11","title":"Switch - On","actionItemGroups":[{"actionItems":[{"id":"a-11-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggledrag","selectorGuids":["9518badb-1608-3671-2a1c-098a75d6a5ef"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-11-n-7","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f131|f8146cbd-b6f9-b498-b6d5-b8b50adb88ca"},"globalSwatchId":"03baa38b","rValue":196,"bValue":196,"gValue":196,"aValue":1}}]},{"actionItems":[{"id":"a-11-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".toggledrag","selectorGuids":["9518badb-1608-3671-2a1c-098a75d6a5ef"]},"xValue":24,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-11-n-8","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f131|f8146cbd-b6f9-b498-b6d5-b8b50adb88ca"},"globalSwatchId":"741eaba2","rValue":25,"bValue":240,"gValue":117,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1683844210813},"a-17":{"id":"a-17","title":"Switch - Off","actionItemGroups":[{"actionItems":[{"id":"a-17-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".toggledrag","selectorGuids":["9518badb-1608-3671-2a1c-098a75d6a5ef"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-17-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f131|f78ac73e-7ba1-f821-d956-ce8374a6d717"},"globalSwatchId":"03baa38b","rValue":196,"bValue":196,"gValue":196,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1683844210813}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SwitchCtrl({
  as: _Component = _Builtin.Block,
  toglId,
  toglName,
  toglValue,
  tabOrder,
  onChange = "true",
  toglClick = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "toggle-ctrl")}
      tag="div"
      tabIndex={tabOrder}
      onChange={onChange}
      data-togl-id={toglId}
      data-togl-value={toglValue}
      data-togl-name={toglName}
      {...toglClick}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "toggletrack")}
        data-w-id="f8146cbd-b6f9-b498-b6d5-b8b50adb88ca"
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "toggledrag")}
          tag="div"
        />
      </_Builtin.Block>
    </_Component>
  );
}
