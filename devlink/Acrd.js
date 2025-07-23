"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AcrdItm } from "./AcrdItm";
import * as _utils from "./utils";
import _styles from "./Acrd.module.css";

export function Acrd({
  as: _Component = _Builtin.Block,
  element = "group",
  initial = "1",
  single = "true",
  acrdItmMap,
}) {
  return (
    <_Component className={_utils.cx(_styles, "acrdn_wrap")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3C!--%20%5BFinsweet%20Attributes%5D%20Accordion%20--%3E%0A%3Cscript%3E(()%3D%3E%7Bvar%20t%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40finsweet%2Fattributes-accordion%401%2Faccordion.js%22%2Ce%3Ddocument.querySelector(%60script%5Bsrc%3D%22%24%7Bt%7D%22%5D%60)%3Be%7C%7C(e%3Ddocument.createElement(%22script%22)%2Ce.async%3D!0%2Ce.src%3Dt%2Cdocument.head.append(e))%3B%7D)()%3B%3C%2Fscript%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "acrdn_main")}
        tag="div"
        fs-accordion-element={element}
        fs-accordion-initial={initial}
        fs-accordion-single={single}
      >
        {acrdItmMap ?? (
          <>
            <AcrdItm titleTxtSrc="Title" />
            <AcrdItm titleTxtSrc="Title" />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
