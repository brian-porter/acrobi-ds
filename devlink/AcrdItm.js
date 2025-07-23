"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import { Paragraph } from "./Paragraph";
import { ListItmCtrl } from "./ListItmCtrl";
import * as _utils from "./utils";
import _styles from "./AcrdItm.module.css";

export function AcrdItm({
  as: _Component = _Builtin.Block,
  acrdItm = true,
  icn = false,
  icnSrc = "default",
  titleTxtSrc = "Title for the accordion item",
  body = false,
  bodySrc = "Body copy here lorem ipsum dolor sit amet, consectetur",
  acrdItmMap,
  exampleListItem = false,
}) {
  return acrdItm ? (
    <_Component
      className={_utils.cx(_styles, "acrd-itm_main", "is-active-accordion")}
      tag="div"
      fs-accordion-element="accordion"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "acrd-itm_head")}
        tag="div"
        tabIndex="0"
        role="button"
        aria-controls="accordion-1-content-1"
        aria-expanded="true"
        fs-accordion-element="trigger"
      >
        <Label txtSrc={titleTxtSrc} icn={icn} icnSrc={icnSrc} lblSz="r1" />
        <_Builtin.HtmlEmbed
          className={_utils.cx(
            _styles,
            "acrd_arrow-icon",
            "is-active-accordion"
          )}
          fs-accordion-element="arrow"
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22currentColor%22%3E%3Cpath%20d%3D%22M11.9999%2013.1714L16.9497%208.22168L18.3639%209.63589L11.9999%2015.9999L5.63599%209.63589L7.0502%208.22168L11.9999%2013.1714Z%22%2F%3E%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "acrd-itm_body")}
        tag="div"
        aria-labelledby="accordion-1-header-1"
        fs-accordion-element="content"
      >
        {acrdItmMap ?? (
          <>
            <Paragraph bodySrc={bodySrc} pgrph={body} fontClr="in" />
            <ListItmCtrl
              listItem={exampleListItem}
              lLIcn={true}
              pPSubtxt={false}
            />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
