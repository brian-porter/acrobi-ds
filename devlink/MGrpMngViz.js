"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Hero } from "./Hero";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MGrpMngViz.module.css";

export function MGrpMngViz({
  as: _Component = _Builtin.Block,
  vVCancelClick = {},
  vVLogoEditClick = {},
  vVCoverEditClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "grp-mng-viz_main")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={vVCancelClick}
          titleSrc="Group Visuals"
          sz="xl"
          act1TxtSrc="Cancel"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body2")} tag="div">
        <_Builtin.Row
          className={_utils.cx(_styles, "columns")}
          tag="div"
          columns={{
            main: "6|6",
            medium: "",
            small: "",
            tiny: "",
          }}
        >
          <_Builtin.Column className={_utils.cx(_styles, "column-2")} tag="div">
            <SecHead
              titleSrc="Logo"
              titleSz="r2"
              act1={false}
              subtxt={true}
              subtxtSrc="Upload a logo for the group, we suggest a size of 300 x 300px. This is shown to people looking for this group."
            />
          </_Builtin.Column>
          <_Builtin.Column tag="div">
            <Hero
              btnBtnClick={vVLogoEditClick}
              imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif"
              btn={true}
              avtrAvtrBdg={true}
              avtrAvtrBdgClr="p500"
              fadeBtm={false}
              avtrAvtrHline={true}
              btnBtnIcnSrc="Edit"
              avtrAvtrBdgIcnSrc="Edit"
              icnBarIcnBarR1Icn={false}
              icnBarIcnBarL1Click={{}}
              avtrAvtrHlineSrc="FName LName"
              avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
              avtrAvtrSubTxtSrc="@handle"
              avtrAvtrClick={{}}
              icnBarIcnBarR1Clr="n000"
              icnBarIcnBarL1Clr="n000"
              icnBarIcnBarL1Src="Qr"
              icnBarIcnBarR1Src=""
              icnBar={false}
              hline={false}
              heroAsp="1-1"
            />
          </_Builtin.Column>
        </_Builtin.Row>
        <_Builtin.Section
          grid={{
            type: "section",
          }}
          tag="section"
        >
          <SecHead
            titleSrc="Cover"
            titleSz="r2"
            act1={false}
            subtxt={true}
            subtxtSrc="Upload a cover image that represents the group, we suggest a size of 1600 x 900px. This is displayed at the top of the group."
          />
          <Hero
            btnBtnClick={vVCoverEditClick}
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif"
            btn={true}
            avtrAvtrBdg={true}
            avtrAvtrBdgClr="p500"
            fadeBtm={false}
            avtrAvtrHline={true}
            btnBtnIcnSrc="Edit"
            avtrAvtrBdgIcnSrc="Edit"
            icnBarIcnBarR1Icn={false}
            icnBarIcnBarL1Click={{}}
            avtrAvtrHlineSrc="FName LName"
            avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
            avtrAvtrSubTxtSrc="@handle"
            avtrAvtrClick={{}}
            icnBarIcnBarR1Clr="n000"
            icnBarIcnBarL1Clr="n000"
            icnBarIcnBarL1Src="Qr"
            icnBarIcnBarR1Src=""
            icnBar={false}
            hline={false}
          />
          <Spacer szDep="64" size="0" />
        </_Builtin.Section>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <Spacer szDep="64" size="1" />
      </_Builtin.Block>
    </_Component>
  );
}
