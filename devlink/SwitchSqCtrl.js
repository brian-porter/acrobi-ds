"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SwitchSqCtrl.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-27":{"id":"e-27","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-18","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-34"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e152ec5e-455c-65cf-16b9-e5547b962392","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e152ec5e-455c-65cf-16b9-e5547b962392","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1684003425807},"e-28":{"id":"e-28","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-33"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e152ec5e-455c-65cf-16b9-e5547b962392","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e152ec5e-455c-65cf-16b9-e5547b962392","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1684003425807}},"actionLists":{"a-18":{"id":"a-18","title":"SwitchSq - On","actionItemGroups":[{"actionItems":[{"id":"a-18-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".toggledragsq","selectorGuids":["61034d08-5b17-f427-8685-ea1c0e671ed2"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-18-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f131|f78ac73e-7ba1-f821-d956-ce8374a6d717"},"globalSwatchId":"03baa38b","rValue":196,"bValue":196,"gValue":196,"aValue":1}}]},{"actionItems":[{"id":"a-18-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".toggledragsq","selectorGuids":["61034d08-5b17-f427-8685-ea1c0e671ed2"]},"xValue":24,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-18-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f131|f78ac73e-7ba1-f821-d956-ce8374a6d717"},"globalSwatchId":"741eaba2","rValue":25,"bValue":240,"gValue":117,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1683844210813},"a-19":{"id":"a-19","title":"SwitchSq - Off","actionItemGroups":[{"actionItems":[{"id":"a-19-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".toggledragsq","selectorGuids":["61034d08-5b17-f427-8685-ea1c0e671ed2"]},"xValue":0,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-19-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f131|f78ac73e-7ba1-f821-d956-ce8374a6d717"},"globalSwatchId":"03baa38b","rValue":196,"bValue":196,"gValue":196,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1683844210813}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SwitchSqCtrl({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "togglesq-ctrl")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "toggletracksq")}
        data-w-id="e152ec5e-455c-65cf-16b9-e5547b962392"
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "toggledragsq")}
          tag="div"
        />
      </_Builtin.Block>
    </_Component>
  );
}
