"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./TestSelect.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-899":{"id":"e-899","name":"","animationType":"custom","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-188","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-900"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".f-dropdown","originalId":"63226e0878e70198b1448dd7|78bd4205-904e-c5f9-435b-95105151720d","appliesTo":"CLASS"},"targets":[{"selector":".f-dropdown","originalId":"63226e0878e70198b1448dd7|78bd4205-904e-c5f9-435b-95105151720d","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1645840154469},"e-900":{"id":"e-900","name":"","animationType":"custom","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-189","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-899"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".f-dropdown","originalId":"63226e0878e70198b1448dd7|78bd4205-904e-c5f9-435b-95105151720d","appliesTo":"CLASS"},"targets":[{"selector":".f-dropdown","originalId":"63226e0878e70198b1448dd7|78bd4205-904e-c5f9-435b-95105151720d","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1645840154470}},"actionLists":{"a-188":{"id":"a-188","title":"Dropdown / OPEN 🟢 2","actionItemGroups":[{"actionItems":[{"id":"a-188-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".f-dropdown-icon-l","selectorGuids":["fc397744-1d24-dec4-ea5b-83e14ddd5659"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-188-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".f-dropdown-icon-l","selectorGuids":["fc397744-1d24-dec4-ea5b-83e14ddd5659"]},"globalSwatchId":"2d1581e5","rValue":100,"bValue":255,"gValue":46,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1645840161064},"a-189":{"id":"a-189","title":"Dropdown / CLOSE 🔴 2","actionItemGroups":[{"actionItems":[{"id":"a-189-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".f-dropdown-icon-l","selectorGuids":["fc397744-1d24-dec4-ea5b-83e14ddd5659"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-189-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".f-dropdown-icon-l","selectorGuids":["fc397744-1d24-dec4-ea5b-83e14ddd5659"]},"globalSwatchId":"2268f126","rValue":107,"bValue":148,"gValue":112,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1645840161064}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TestSelect({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component tag="div">
      <_Builtin.DropdownWrapper
        className={_utils.cx(_styles, "f-dropdown")}
        tag="div"
        delay="0"
        hover={false}
      >
        <_Builtin.DropdownToggle
          className={_utils.cx(_styles, "f-dropdown-toggle")}
          tag="div"
        >
          <_Builtin.Icon
            className={_utils.cx(_styles, "f-dropdown-icon-l")}
            widget={{
              type: "icon",
              icon: "dropdown-toggle",
            }}
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "f-paragraph-small")}
            tag="div"
          >
            {"Default"}
          </_Builtin.Block>
        </_Builtin.DropdownToggle>
        <_Builtin.DropdownList
          className={_utils.cx(_styles, "f-dropdown-list")}
          tag="nav"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "f-dropdown-wrap")}
            tag="div"
          >
            <_Builtin.DropdownLink
              className={_utils.cx(_styles, "f-dropdown-link")}
              options={{
                href: "#",
              }}
            >
              {"Account settings"}
            </_Builtin.DropdownLink>
            <_Builtin.DropdownLink
              className={_utils.cx(_styles, "f-dropdown-link")}
              options={{
                href: "#",
              }}
            >
              {"Support"}
            </_Builtin.DropdownLink>
            <_Builtin.DropdownLink
              className={_utils.cx(_styles, "f-dropdown-link")}
              options={{
                href: "#",
              }}
            >
              {"License"}
            </_Builtin.DropdownLink>
            <_Builtin.DropdownLink
              className={_utils.cx(_styles, "f-dropdown-link")}
              options={{
                href: "#",
              }}
            >
              {"Sign Out"}
            </_Builtin.DropdownLink>
          </_Builtin.Block>
        </_Builtin.DropdownList>
      </_Builtin.DropdownWrapper>
    </_Component>
  );
}
