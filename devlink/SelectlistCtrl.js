"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Icon } from "./Icon";
import { Label } from "./Label";
import { List } from "./List";
import * as _utils from "./utils";
import _styles from "./SelectlistCtrl.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-897":{"id":"e-897","name":"","animationType":"custom","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-186","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-898"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".selectlist_wrap","originalId":"63226e0878e70198b1448dd7|78bd4205-904e-c5f9-435b-95105151720d","appliesTo":"CLASS"},"targets":[{"selector":".selectlist_wrap","originalId":"63226e0878e70198b1448dd7|78bd4205-904e-c5f9-435b-95105151720d","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1645840154469},"e-898":{"id":"e-898","name":"","animationType":"custom","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-187","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-897"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".selectlist_wrap","originalId":"63226e0878e70198b1448dd7|78bd4205-904e-c5f9-435b-95105151720d","appliesTo":"CLASS"},"targets":[{"selector":".selectlist_wrap","originalId":"63226e0878e70198b1448dd7|78bd4205-904e-c5f9-435b-95105151720d","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1645840154470}},"actionLists":{"a-186":{"id":"a-186","title":"Dropdown / OPEN 🟢","actionItemGroups":[{"actionItems":[{"id":"a-186-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".a_selectlist-arw","selectorGuids":["e1a3655c-a354-e3e0-f2a9-bd51ba8c64ab"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-186-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".a_selectlist-arw","selectorGuids":["e1a3655c-a354-e3e0-f2a9-bd51ba8c64ab"]},"globalSwatchId":"--color--n700","rValue":109,"bValue":109,"gValue":109,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1645840161064},"a-187":{"id":"a-187","title":"Dropdown / CLOSE 🔴","actionItemGroups":[{"actionItems":[{"id":"a-187-n","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".a_selectlist-arw","selectorGuids":["e1a3655c-a354-e3e0-f2a9-bd51ba8c64ab"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-187-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".a_selectlist-arw","selectorGuids":["e1a3655c-a354-e3e0-f2a9-bd51ba8c64ab"]},"globalSwatchId":"--color--n300","rValue":196,"bValue":196,"gValue":196,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1645840161064}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SelectlistCtrl({
  as: _Component = _Builtin.Block,
  fldSelect = true,
  fbk = false,
  pHoldSrc = "Value",
  pHoldClr = "n500",
  fldBrdClr,
  fbkFbkTxt = true,
  fbkFbkIcn = false,
  fbkFbkTxtSrc = "Feedback text",
  fbkFbkIcnSrc = "act_check_circle",
  fbkFbkClr = "fd500",
  fldId,
  fldValue,
  onChange,
  selectMap,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "selectlist_wrap")} tag="div">
      {fldSelect ? (
        <_Builtin.DropdownWrapper
          className={_utils.cx(_styles, "selectlist_main")}
          tag="div"
          data-value={fldValue}
          id={fldId}
          delay={0}
          hover={false}
        >
          <_Builtin.DropdownToggle
            className={_utils.cx(_styles, "a_selectlist-tgl")}
            tag="div"
            data-field-brd={fldBrdClr}
            onChange={onChange}
          >
            <_Builtin.Icon
              className={_utils.cx(_styles, "a_selectlist-arw")}
              widget={{
                type: "icon",
                icon: "dropdown-toggle",
              }}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "selecteditem")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "si-lead")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "si-primary")}
                tag="div"
              >
                <Label
                  txtSrc={pHoldSrc}
                  lblClr={pHoldClr}
                  icnLoc="l"
                  icnSrc="default"
                  icn={false}
                  lblSz="r3"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            {fbk ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "a_feedback-txt-sel")}
                tag="div"
              >
                <Label
                  txtSrc={fbkFbkTxtSrc}
                  txt={fbkFbkTxt}
                  icnSrc={fbkFbkIcnSrc}
                  lblClr={fbkFbkClr}
                  icn={fbkFbkIcn}
                  icnLoc="r"
                  lblSz="r3"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.DropdownToggle>
          <_Builtin.DropdownList
            className={_utils.cx(_styles, "selectlist-drop")}
            tag="nav"
          >
            {selectMap ?? <List exampleListItm={true} />}
          </_Builtin.DropdownList>
        </_Builtin.DropdownWrapper>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "_w-icon-dropdown-toggle-close")}
        tag="div"
      />
    </_Component>
  );
}
