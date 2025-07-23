"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AcrdFltrItm } from "./AcrdFltrItm";
import * as _utils from "./utils";
import _styles from "./AcrdFltr.module.css";

export function AcrdFltr({
  as: _Component = _Builtin.Block,
  acrdFltrMap,
  exampleAcrdFltrItm = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "fltr-acrdn_wrap")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3C!--%20%5BFinsweet%20Attributes%5D%20Accordion%20--%3E%0A%3Cscript%3E(()%3D%3E%7Bvar%20t%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40finsweet%2Fattributes-accordion%401%2Faccordion.js%22%2Ce%3Ddocument.querySelector(%60script%5Bsrc%3D%22%24%7Bt%7D%22%5D%60)%3Be%7C%7C(e%3Ddocument.createElement(%22script%22)%2Ce.async%3D!0%2Ce.src%3Dt%2Cdocument.head.append(e))%3B%7D)()%3B%3C%2Fscript%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "fltr-acrdn_main")}
        tag="div"
        fs-accordion-element="group"
        fs-accordion-initial="none"
        fs-accordion-single="true"
      >
        {acrdFltrMap ?? (
          <>
            <AcrdFltrItm
              comp={exampleAcrdFltrItm}
              filterSlider={true}
              fltrTitleSrc="Price"
              active=""
            />
            <AcrdFltrItm
              comp={exampleAcrdFltrItm}
              fltrTitleSrc="Color"
              active=""
              filterClr={true}
              fltrBdg={true}
            />
            <AcrdFltrItm
              comp={exampleAcrdFltrItm}
              fltrTitleSrc="Brand"
              active=""
              filterCbox={true}
              filterSearch={true}
            />
            <AcrdFltrItm
              comp={exampleAcrdFltrItm}
              fltrTitleSrc="Fulfilled by"
              active=""
              filterCbox={false}
              filterSearch={false}
              filterChoice={true}
            />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
