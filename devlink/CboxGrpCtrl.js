"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CboxCtrl } from "./CboxCtrl";
import * as _utils from "./utils";
import _styles from "./CboxGrpCtrl.module.css";

export function CboxGrpCtrl({
  as: _Component = _Builtin.Block,
  cboxCtrlMap,
  exampleCboxCtrl = false,
  align = "l",
  fieldItmTxtSrc = "Label",
  fieldItmName = "cbox",
  fieldItmValue,
  fieldItmActive = "False",
  fieldItmClick = {},
  fieldLink = false,
  fieldLinkTxtSrc = "Link here",
  fieldLinkClick = {},
  fieldFbk = false,
  fieldFbkTxtSrc = "Feedback message",
  fieldFbkIcnSrc = "clearcirc",
  fieldFbkClr = "fd500",
  fieldFbkIcnLoc = "r",
}) {
  return (
    <_Component className={_utils.cx(_styles, "grp_wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "grp_main")}
        tag="div"
        data-input-align={align}
      >
        {cboxCtrlMap ??
          (exampleCboxCtrl ? (
            <_Builtin.Block tag="div">
              <CboxCtrl
                itmLblSrc={fieldItmTxtSrc}
                fbk={fieldFbk}
                fbkFbkTxtSrc={fieldFbkTxtSrc}
                fbkFbkIcnSrc={fieldFbkIcnSrc}
                fbkFbkClr={fieldFbkClr}
                itmName={fieldItmName}
                itmValue={fieldItmValue}
                fbkFbkIcnLoc={fieldFbkIcnLoc}
                linkTxtSrc={fieldLinkTxtSrc}
                link={fieldLink}
                linkClick={fieldLinkClick}
                itmActive={fieldItmActive}
                itmClick={fieldItmClick}
                txt={true}
                linkSrc={{
                  href: "#",
                }}
                fbkFbkTxt={true}
                fbkFbkIcn={true}
                tabOrder=""
                itmLblSz="r3"
                onChange=""
                lblShdw=""
                linkShdw=""
                lblFor="cbox"
                id="cbox"
              />
              <CboxCtrl
                itmLblSrc={fieldItmTxtSrc}
                fbk={fieldFbk}
                fbkFbkTxtSrc={fieldFbkTxtSrc}
                fbkFbkIcnSrc={fieldFbkIcnSrc}
                fbkFbkClr={fieldFbkClr}
                itmName={fieldItmName}
                itmValue={fieldItmValue}
                fbkFbkIcnLoc={fieldFbkIcnLoc}
                itmActive={fieldItmActive}
                itmClick={fieldItmClick}
                txt={true}
                linkSrc={{
                  href: "#",
                }}
                linkTxtSrc="Link here"
                link={false}
                fbkFbkTxt={true}
                fbkFbkIcn={true}
                tabOrder=""
                itmLblSz="r3"
                onChange=""
                linkClick={{}}
                lblShdw=""
                linkShdw=""
                lblFor="cbox"
                id="cbox"
              />
            </_Builtin.Block>
          ) : null)}
      </_Builtin.Block>
    </_Component>
  );
}
