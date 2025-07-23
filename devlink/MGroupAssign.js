"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { List } from "./List";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MGroupAssign.module.css";

export function MGroupAssign({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  avtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtrAlt = "__wf_reserved_inherit",
  titleSrc = "FName LName",
  subtxt1Src = "Rick Dandrow's friend",
  roleActClick = {},
  roleMap,
  roleExample = true,
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-group-assign")}
      tag="section"
      data-mini=""
      id="Admin"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="Assign Role"
          sz="xl"
          act1={true}
          titleSz="h4"
          act1TxtSrc="Cancel"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <ListItmCtrl
          pPTitleSrc={titleSrc}
          pPSubtxtSrc={subtxt1Src}
          lLAvtrSrc={avtrSrc}
          lLAvtrAlt={avtrAlt}
          lLAvtr={true}
          tTAct={false}
          tTIcn={false}
          trailClick={{}}
        />
        <SecHead
          act1Click={roleActClick}
          titleSrc="Roles"
          sz="m"
          act1={true}
          titleSz="r2"
          act1TxtSrc="Clear All"
        />
        <List listItmMap={roleMap} exampleListItm={false} />
        <ListItmCtrl
          listItem={roleExample}
          lLIcn={true}
          pPTitleSrc="RoleName"
          pPSubtxtSrc="description of the role here"
          pPTitleSz="r1"
          pPSubtxt={false}
          tTRdio={true}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <ButtonPanel
          btn1Click={doClick}
          btn3={false}
          btn2={false}
          btn1TxtSrc="Grant Role"
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
