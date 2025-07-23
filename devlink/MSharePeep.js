"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Label } from "./Label";
import { ListItmCtrl } from "./ListItmCtrl";
import { List } from "./List";
import { InputWBtns } from "./InputWBtns";
import * as _utils from "./utils";
import _styles from "./MSharePeep.module.css";

export function MSharePeep({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  groupAddClick = {},
  peepAddClick = {},
  peepMap,
  exampleListItem = true,
  peepListItemClick = {},
  groupListItemClick = {},
  groupMap,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-share-peep")}
      tag="div"
      id="Share-Peep"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          sz="xl"
          titleSrc="Share with"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "segbtn_wrap")}
          tag="div"
          data-segbtn-clr="p"
        >
          <_Builtin.TabsWrapper
            className={_utils.cx(_styles, "segbtns")}
            data-duration-in="300"
            data-duration-out="100"
            current="2"
            easing="ease-in-out"
            fadeIn={300}
            fadeOut={100}
          >
            <_Builtin.TabsMenu
              className={_utils.cx(_styles, "segbtn_menu")}
              tag="div"
            >
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "segbtn")}
                data-w-tab="1"
                SegBtn=""
                block="inline"
              >
                <Label txtSrc="People" icn={true} txt={true} icnSrc="peep" />
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "segbtn")}
                data-w-tab="2"
                block="inline"
              >
                <Label txtSrc="Groups" icn={true} txt={true} icnSrc="group" />
              </_Builtin.TabsLink>
            </_Builtin.TabsMenu>
            <_Builtin.TabsContent
              className={_utils.cx(_styles, "seg-content")}
              tag="div"
            >
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "seg-detail")}
                tag="div"
                data-w-tab="1"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "list-peep")}
                  tag="div"
                >
                  <SecHead
                    act1Click={peepAddClick}
                    sz="xs"
                    titleSrc="Connections"
                    act1TxtSrc="Add All"
                  />
                  <ListItmCtrl
                    listItem={exampleListItem}
                    listItemClick={peepListItemClick}
                    lLAvtr={true}
                    lLImgSz="l"
                    pPTitleSrc="FName LName"
                    pPSubtxt2Src="@handle"
                    lLAvtrSz="l"
                    tTRdio={true}
                  />
                  <List listItmMap={peepMap} exampleListItm={false} />
                </_Builtin.Block>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "seg-detail")}
                tag="div"
                data-w-tab="2"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "list-group")}
                  tag="div"
                >
                  <SecHead
                    act1Click={groupAddClick}
                    sz="xs"
                    titleSrc="Connections"
                    act1TxtSrc="Add All"
                  />
                  <ListItmCtrl
                    listItem={exampleListItem}
                    listItemClick={groupListItemClick}
                    lLAvtr={false}
                    lLImgSz="l"
                    pPTitleSrc="GroupName"
                    pPSubtxt2Src="@handle"
                    lLAvtrSz="l"
                    tTRdio={true}
                    lLImg={true}
                    pPSubtxtSrc="@handle"
                  />
                  <List listItmMap={groupMap} exampleListItm={false} />
                </_Builtin.Block>
              </_Builtin.TabsPane>
            </_Builtin.TabsContent>
          </_Builtin.TabsWrapper>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "dock-btm")}
        tag="div"
        data-bs="m"
      >
        <InputWBtns
          tTBtn={true}
          tTBtnTxt={true}
          tTBtnIcn={false}
          tTBtnIcnSrc="act_share"
          tTBtnTxtSrc="Share"
          tTBtnStyle="pf"
          fldFldLIcnSrc="peep_1"
          pPFld={false}
        />
      </_Builtin.Block>
    </_Component>
  );
}
