"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { Spacer } from "./Spacer";
import { EmptyCollection } from "./EmptyCollection";
import * as _utils from "./utils";
import _styles from "./MMutual.module.css";

export function MMutual({
  as: _Component = _Builtin.Block,
  group = false,
  groupCancelClick = {},
  groupList = true,
  groupMap,
  groupExample = true,
  groupEmpty = false,
  peep = false,
  peepCancelClick = {},
  peepList = true,
  peepMap,
  peepExample = true,
  peepEmpty = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-mutual")} tag="div">
      {group ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "g-mutual-group")}
          tag="section"
          data-mini=""
        >
          <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
            <SecHead
              act1Click={groupCancelClick}
              titleSrc="Mutual Groups"
              sz="xl"
              act1={true}
              titleSz="h4"
              act1TxtSrc="Close"
            />
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
            <List
              listItmMap={groupMap}
              list={groupList}
              exampleListItm={false}
            />
            <ListItmCtrl
              listItem={groupExample}
              lLImg={true}
              lLImgSz="xl"
              tTIcn={true}
              pPTitleSubtxt={true}
              pPMsg={false}
              pPTitleSrc="GroupName goes here with a line wrap for two lines blah blah blah"
              pPTitleSz="r3"
              pPAtrb={true}
              pPSubtxt={false}
            />
            <Spacer size="16" />
            <EmptyCollection
              empty={groupEmpty}
              headlineSrc=""
              primeBtnTxtSrc=""
              icnSrc=""
              subtxtSrc=""
              btmDoc={false}
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {peep ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "g-mutual-peep")}
          tag="section"
          data-mini=""
        >
          <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
            <SecHead
              act1Click={peepCancelClick}
              titleSrc="Mutual Peeps"
              sz="xl"
              act1={true}
              titleSz="h4"
              act1TxtSrc="Close"
            />
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
            <List listItmMap={peepMap} list={peepList} exampleListItm={false} />
            <ListItmCtrl
              listItem={peepExample}
              lLImgSz="xl"
              tTIcn={true}
              pPTitleSubtxt={true}
              pPMsg={false}
              pPSubtxt={false}
              pPTitleSrc="FName LName"
              pPSubtxt2={true}
              pPSubtxt2Src="Rick Dandrow's friend"
              lLAvtr={true}
              lLAvtrSz="l"
            />
            <Spacer size="16" />
            <EmptyCollection
              empty={peepEmpty}
              headlineSrc="No Shared Connections"
              primeBtnTxtSrc="Find Friends"
              icnSrc="member"
              subtxtSrc="You don't share any connections with this person"
              btmDoc={false}
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
