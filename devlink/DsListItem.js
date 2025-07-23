"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { LicLead } from "./LicLead";
import { LicPrime } from "./LicPrime";
import { LicTrail } from "./LicTrail";
import * as _utils from "./utils";
import _styles from "./DsListItem.module.css";

export function DsListItem({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "ds_doc_card-preview")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "ds__card-name")} tag="div">
        <SecHead act1={false} titleSrc="Sample" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "ds__card-sample")}
        tag="div"
      >
        <ListItmCtrl
          lLIcnSrc="default"
          lLIcn={true}
          lLIcnClr="p500"
          lLIcnSz="s"
        />
        <_Builtin.Block className={_utils.cx(_styles, "listitem")} tag="div">
          <LicLead
            icnSrc="default"
            icn={true}
            img={false}
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
            adptIcn={false}
            adptIcnSrc="default_f"
            avtr={false}
          />
          <LicPrime
            titleSubtxt={true}
            titleSrc="ItemTitle"
            rate={false}
            titleSz="r2"
            subtxtSz="r3"
            subtxt={true}
            subtxt2Sz="r3"
            subtxt2={false}
            subtxtSrc="Subtext"
            subtxt2Src="Subtext"
          />
          <LicTrail
            suprAct={false}
            icnSrc="act_moreh_f"
            actLbl2TxtSrc="14h"
            actLbl2={true}
            btn={true}
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
