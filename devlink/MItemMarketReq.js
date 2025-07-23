"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { List } from "./List";
import { TglItm } from "./TglItm";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MItemMarketReq.module.css";

export function MItemMarketReq({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAltTxt = "__wf_reserved_inherit",
  itmNameSrc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  listAct1Click = {},
  listItmMap,
  shareHistClick = {},
  doClick = {},
  exampleListItem = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-offer-req")}
      tag="section"
      id="Request"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="Custom Offer Request"
          sz="xl"
          act1={true}
          titleSz="h4"
        />
        <ListItmCtrl
          pPTitleSrc={itmNameSrc}
          lLImgSrc={itmImgSrc}
          lLImgAlt={itmImgAltTxt}
          lLImg={true}
          pPSubtxt={false}
          pPTitleSz="r4"
          pPTitleLc="3"
          lLImgSz="2xl"
        />
        <SecHead
          act1Click={listAct1Click}
          titleSrc="Market"
          act1={true}
          act1TxtSrc="Select All"
          titleSz="r1"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <List listItmMap={listItmMap} exampleListItm={false} />
        <ListItmCtrl
          listItem={exampleListItem}
          lLImg={true}
          pPTitleSrc="$00.00"
          pPTitleSz="r2b"
          pPSubtxtSrc="OfferBrand"
          tTRdio={false}
          tTTogl={true}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <_Builtin.FormWrapper>
          <_Builtin.FormForm
            name="email-form"
            data-name="Email Form"
            method="get"
            id="email-form"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "side-spacer")}
              tag="div"
            >
              <TglItm
                tglClick={shareHistClick}
                lblSrc="Share buying history for better offers"
              />
            </_Builtin.Block>
            <ButtonPanel
              btn1Click={doClick}
              btn2={false}
              btn3={false}
              btn1TxtSrc="Send Me An Offer"
            />
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
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
