"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { TabsSegBtn } from "./TabsSegBtn";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { EmptyCollection } from "./EmptyCollection";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MAssign.module.css";

export function MAssign({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  peepMap,
  peepItemClick = {},
  peepItmExample = true,
  groupMap,
  groupItmClick = {},
  groupItmExample = false,
  emptyPeep = false,
  emptyInviteClick = {},
  emptyFindPeepClick = {},
  emptyGroup = false,
  emptyAddGroupClick = {},
  emptyFindGroupClick = {},
  scanClick = {},
  fldChipMap,
  chipMapExample = true,
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-assign")}
      tag="div"
      id="Assign-to"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          sz="xl"
          titleSrc="Assign to"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <TabsSegBtn
          segBtn3={false}
          btn2TxtSrc="Groups"
          btn2IcnSrc="groups"
          btn2Icn={true}
          btn1IcnSrc="peep"
          btn1TxtSrc="People"
          btn1Icn={true}
        />
        {peepItmExample ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "example-map")}
            tag="div"
          >
            <List listItmMap={peepMap} exampleListItm={false} />
            <ListItmCtrl
              listItem={peepItmExample}
              listItemClick={peepItemClick}
              lLImg={false}
              pPTitleSrc="FName LName"
              pPSubtxtSrc="@handle"
              tTIcn={false}
              tTAct={false}
              tTSuprAct={false}
              tTIcnSrc="Checkfat"
              tTIcnClr="p500"
              tTIcnSz="m"
              lLAvtr={true}
              lLAvtrSz="l"
              tTRdio={true}
            />
            <EmptyCollection
              secBtnClick={emptyInviteClick}
              primeBtnClick={emptyFindPeepClick}
              empty={emptyPeep}
              icnSrc="peep_add"
              headlineSrc="Let's Make a Connecton"
              subtxtSrc="Make a connection with people to share with them. Next time they'll show up here to choose from."
              secBtn={true}
              secBtnTxtSrc="Send Invite"
              primeBtnTxtSrc="Find My Peeps"
            />
          </_Builtin.Block>
        ) : null}
        {groupItmExample ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "example-map")}
            tag="div"
          >
            <List listItmMap={groupMap} exampleListItm={false} />
            <ListItmCtrl
              listItem={groupItmExample}
              listItemClick={groupItmClick}
              lLImg={true}
              pPTitleSrc="GroupName"
              pPSubtxtSrc="@handle"
              tTIcn={false}
              tTAct={false}
              tTSuprAct={false}
              tTIcnSrc="Checkfat"
              tTIcnClr="p500"
              tTIcnSz="m"
              lLAvtr={false}
              lLAvtrSz="l"
              tTRdio={true}
            />
            <EmptyCollection
              secBtnClick={emptyAddGroupClick}
              primeBtnClick={emptyFindGroupClick}
              empty={emptyGroup}
              icnSrc="group"
              headlineSrc="Oops, You Need a Group"
              subtxtSrc="Use the link below to make one. Next time they'll show up here to choose from."
              secBtn={true}
              secBtnTxtSrc="Create Group"
              primeBtnTxtSrc="Find A Group"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.FormWrapper
        className={_utils.cx(_styles, "dock-btm")}
        data-bs="m"
      >
        <_Builtin.FormForm
          name="wf-form-Search"
          data-name="Search"
          method="get"
          id="wf-form-Search"
        >
          <InputWBtns
            lLBtnClick={scanClick}
            tTBtnClick={doClick}
            tTBtnStyle="pf"
            tTBtnTxtSrc="Assign"
            tTBtnTxt={true}
            tTBtnIcn={false}
            tTBtn={true}
            fldFldTBtn={false}
            fldFldLIcn={true}
            fldFldLIcnDisp="n"
            pPFld={true}
          />
          <Spacer size="16" />
        </_Builtin.FormForm>
        <_Builtin.FormSuccessMessage>
          <_Builtin.Block tag="div">
            {"Thank you! Your submission has been received!"}
          </_Builtin.Block>
        </_Builtin.FormSuccessMessage>
        <_Builtin.FormErrorMessage>
          <_Builtin.Block tag="div">
            {"Oops! Something went wrong while submitting the form."}
          </_Builtin.Block>
        </_Builtin.FormErrorMessage>
      </_Builtin.FormWrapper>
    </_Component>
  );
}
