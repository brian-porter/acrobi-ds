"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Label } from "./Label";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { EmptyCollection } from "./EmptyCollection";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MAddTo.module.css";

export function MAddTo({
  as: _Component = _Builtin.Block,
  titleSrc = "Add to",
  cancelClick = {},
  list = true,
  listMap,
  listItmExample = true,
  group = false,
  peepMap,
  groupMap,
  fldChipMap,
  chipMapExample = true,
  doClick = {},
  empty = false,
  emptyHlineSrc = "Oops, You Need a {Collection}",
  emptySecBtnTxtSrc = "Create {Collection}",
  emptySecBtnClick = {},
  emptyPrimeBtnTxtSrc = "Find a {Collection}",
  emptyPrimeBtnClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-add-to")}
      tag="div"
      id="Add-to"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc={titleSrc}
          sz="xl"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        {group ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "peep-segbtn-wrap")}
            tag="div"
            segbtn-clr="p"
          >
            <_Builtin.TabsWrapper
              className={_utils.cx(_styles, "segbtns")}
              data-duration-in="300"
              data-duration-out="100"
              current="peep"
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
                  data-w-tab="peep"
                  block="inline"
                >
                  <Label txtSrc="People" icn={true} txt={true} icnSrc="peep" />
                </_Builtin.TabsLink>
                <_Builtin.TabsLink
                  className={_utils.cx(_styles, "segbtn")}
                  data-w-tab="group"
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
                  data-w-tab="peep"
                >
                  <List listItmMap={peepMap} exampleListItm={false} />
                </_Builtin.TabsPane>
                <_Builtin.TabsPane
                  className={_utils.cx(_styles, "seg-detail")}
                  tag="div"
                  data-w-tab="group"
                >
                  <List listItmMap={groupMap} exampleListItm={false} />
                </_Builtin.TabsPane>
              </_Builtin.TabsContent>
            </_Builtin.TabsWrapper>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "css-segbtn")}
              value="%3Cstyle%3E%0A%3Aroot%20%7B%0A%20%20--segbtn-bg%3A%20rgba(var(--n000)%2C%201)%3B%0A%7D%0A.segbtn-menu%20%7B%0A%20%20background%3A%20var(--a-segbtn-bg)%3B%0A%20%20border%3A%201px%20solid%20var(--seg-bdr)%3B%0A%20%20border-radius%3A%206px%3B%0A%20%20display%3A%20flex%3B%0A%20%20flex-wrap%3A%20wrap%3B%0A%20%20height%3A%2036px%3B%0A%20%20overflow%3A%20hidden%3B%0A%20%20width%3A%20auto%3B%0A%7D%0A.segbtn-menu%20a%20%7B%0A%20%20color%3A%20var(--seg-clr)%3B%0A%20%20display%3A%20flex%3B%0A%20%20flex%3A%201%3B%0A%20%20justify-content%3A%20center%3B%0A%20%20text-decoration%3A%20none%3B%0A%20%20transition%3A%200.3s%20color%2C%200.3s%20background%2C%200.3s%20border-color%3B%0A%20%20-webkit-tap-highlight-color%3A%20transparent%3B%0A%7D%0A.segbtn.w--current%20%7B%0A%20%20background%3A%20var(--seg-clr)%3B%0A%20%20color%3A%20var(--segbtn-bg)%3B%0A%7D%0A.segbtn.w--current%20.label%20.txt%20%7B%0A%09font-weight%3A%20bold%3B%0A%7D%0A.segbtn.w--current%20.label%20.icn%3A%3Afirst-letter%20%7B%0A%20%20%20%20text-transform%3A%20uppercase%3B%0A%7D%0A%0A.segbtn-menu%20a%3Anot(%3Afirst-child)%20%7B%0A%20%20border-left%3A%201px%20solid%20currentColor%3B%0A%7D%0A%0A.segbtn-wrap-alt%20a%3Anot(%3Afirst-child)%20%7B%0A%20%20border%3A%200%3B%0A%7D%0A.segbtn-wrap-alt%20a.active%20%7B%0A%20%20background%3A%20var(--seg-clr-light)%3B%0A%20%20color%3A%20var(--seg-clr)%3B%0A%20%20font-weight%3A%20bold%3B%0A%7D%0A%0A.seg-grey%20%7B%0A%20%20--seg-clr%3A%20rgba(var(--n700)%2C%201)%3B%0A%20%20--seg-clr-light%3A%20rgba(var(--n200)%2C%201)%3B%0A%7D%0A%5Bsegbtn-clr%3D%22n%22%5D%20%7B%0A%20%20--seg-bdr%3A%20rgba(var(--n700)%2C%201)%3B%0A%20%20--seg-clr%3A%20rgba(var(--n700)%2C%201)%3B%0A%20%20--seg-clr-light%3A%20rgba(var(--n200)%2C%201)%3B%0A%7D%0A%5Bsegbtn-clr%3D%22p%22%5D%20%7B%0A%20%20--seg-bdr%3A%20rgba(var(--p500)%2C%201)%3B%0A%20%20--seg-clr%3A%20rgba(var(--p500)%2C%201)%3B%0A%20%20--seg-clr-light%3A%20rgba(var(--p200)%2C%201)%3B%0A%7D%0A%0A%5Bsegbtn-status%3D%22on%22%5D%20%7B%0A%20%20background%3A%20var(--seg-clr)%3B%0A%20%20color%3A%20var(--segbtn-bg)%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
            />
          </_Builtin.Block>
        ) : null}
        {list ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "list-segbtn-wrap")}
            tag="div"
            segbtn-clr="p"
          >
            <_Builtin.TabsWrapper
              className={_utils.cx(_styles, "segbtns")}
              data-duration-in="300"
              data-duration-out="100"
              current="list"
              easing="ease-in-out"
              fadeIn={300}
              fadeOut={100}
            >
              <_Builtin.TabsContent
                className={_utils.cx(_styles, "seg-content")}
                tag="div"
              >
                <_Builtin.TabsPane
                  className={_utils.cx(_styles, "seg-detail")}
                  tag="div"
                  data-w-tab="list"
                >
                  <List listItmMap={listMap} exampleListItm={false} />
                  <ListItmCtrl
                    listItem={listItmExample}
                    lLImg={true}
                    pPTitleSrc="ListName"
                    pPSubtxtSrc="privacy type"
                    tTIcn={true}
                    tTAct={false}
                    tTSuprAct={false}
                    tTIcnSrc="Checkfat"
                    tTIcnClr="p500"
                    tTIcnSz="m"
                    listItemClick={{}}
                  />
                </_Builtin.TabsPane>
                <_Builtin.TabsPane
                  className={_utils.cx(_styles, "seg-detail")}
                  tag="div"
                  data-w-tab="2"
                >
                  <List listItmMap={groupMap} exampleListItm={false} />
                </_Builtin.TabsPane>
              </_Builtin.TabsContent>
            </_Builtin.TabsWrapper>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "css-segbtn")}
              value="%3Cstyle%3E%0A%3Aroot%20%7B%0A%20%20--segbtn-bg%3A%20rgba(var(--n000)%2C%201)%3B%0A%7D%0A.segbtn-menu%20%7B%0A%20%20background%3A%20var(--a-segbtn-bg)%3B%0A%20%20border%3A%201px%20solid%20var(--seg-bdr)%3B%0A%20%20border-radius%3A%206px%3B%0A%20%20display%3A%20flex%3B%0A%20%20flex-wrap%3A%20wrap%3B%0A%20%20height%3A%2036px%3B%0A%20%20overflow%3A%20hidden%3B%0A%20%20width%3A%20auto%3B%0A%7D%0A.segbtn-menu%20a%20%7B%0A%20%20color%3A%20var(--seg-clr)%3B%0A%20%20display%3A%20flex%3B%0A%20%20flex%3A%201%3B%0A%20%20justify-content%3A%20center%3B%0A%20%20text-decoration%3A%20none%3B%0A%20%20transition%3A%200.3s%20color%2C%200.3s%20background%2C%200.3s%20border-color%3B%0A%20%20-webkit-tap-highlight-color%3A%20transparent%3B%0A%7D%0A.segbtn.w--current%20%7B%0A%20%20background%3A%20var(--seg-clr)%3B%0A%20%20color%3A%20var(--segbtn-bg)%3B%0A%7D%0A.segbtn.w--current%20.label%20.txt%20%7B%0A%09font-weight%3A%20bold%3B%0A%7D%0A.segbtn.w--current%20.label%20.icn%3A%3Afirst-letter%20%7B%0A%20%20%20%20text-transform%3A%20uppercase%3B%0A%7D%0A%0A.segbtn-menu%20a%3Anot(%3Afirst-child)%20%7B%0A%20%20border-left%3A%201px%20solid%20currentColor%3B%0A%7D%0A%0A.segbtn-wrap-alt%20a%3Anot(%3Afirst-child)%20%7B%0A%20%20border%3A%200%3B%0A%7D%0A.segbtn-wrap-alt%20a.active%20%7B%0A%20%20background%3A%20var(--seg-clr-light)%3B%0A%20%20color%3A%20var(--seg-clr)%3B%0A%20%20font-weight%3A%20bold%3B%0A%7D%0A%0A.seg-grey%20%7B%0A%20%20--seg-clr%3A%20rgba(var(--n700)%2C%201)%3B%0A%20%20--seg-clr-light%3A%20rgba(var(--n200)%2C%201)%3B%0A%7D%0A%5Bsegbtn-clr%3D%22n%22%5D%20%7B%0A%20%20--seg-bdr%3A%20rgba(var(--n700)%2C%201)%3B%0A%20%20--seg-clr%3A%20rgba(var(--n700)%2C%201)%3B%0A%20%20--seg-clr-light%3A%20rgba(var(--n200)%2C%201)%3B%0A%7D%0A%5Bsegbtn-clr%3D%22p%22%5D%20%7B%0A%20%20--seg-bdr%3A%20rgba(var(--p500)%2C%201)%3B%0A%20%20--seg-clr%3A%20rgba(var(--p500)%2C%201)%3B%0A%20%20--seg-clr-light%3A%20rgba(var(--p200)%2C%201)%3B%0A%7D%0A%0A%5Bsegbtn-status%3D%22on%22%5D%20%7B%0A%20%20background%3A%20var(--seg-clr)%3B%0A%20%20color%3A%20var(--segbtn-bg)%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
            />
          </_Builtin.Block>
        ) : null}
        {empty ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "empty-state")}
            tag="div"
          >
            <EmptyCollection
              headlineSrc={emptyHlineSrc}
              secBtnTxtSrc={emptySecBtnTxtSrc}
              primeBtnTxtSrc={emptyPrimeBtnTxtSrc}
              secBtnClick={emptySecBtnClick}
              primeBtnClick={emptyPrimeBtnClick}
              empty={true}
              icnSrc=""
              subtxtSrc=""
              secBtn={true}
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
            tTBtnClick={doClick}
            tTBtnStyle="pf"
            tTBtnTxtSrc="Done"
            tTBtnTxt={true}
            tTBtnIcn={false}
            tTBtn={true}
            fldFldTBtn={false}
            fldFldLIcn={true}
            fldFldLIcnDisp="n"
            pPFld={true}
            lLBtnClick={{}}
            lLBtnIcnSrc="Add"
            fldFldPholdSrc="Search"
            tTBtnIcnSrc="Add"
            lLBtn={false}
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
