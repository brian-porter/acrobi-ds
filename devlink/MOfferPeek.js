"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { ItmSecCta } from "./ItmSecCta";
import { BtnBarSs } from "./BtnBarSs";
import { Spacer } from "./Spacer";
import { CapStkLR } from "./CapStkLR";
import { SecHead } from "./SecHead";
import { Paragraph } from "./Paragraph";
import { TableRow } from "./TableRow";
import { TextareaForm } from "./TextareaForm";
import { MMute } from "./MMute";
import { EmptyCollection } from "./EmptyCollection";
import { Cell } from "./Cell";
import * as _utils from "./utils";
import _styles from "./MOfferPeek.module.css";

export function MOfferPeek({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroImgAlt = "__wf_reserved_inherit",
  heroQrClick = {},
  heroMoreClick = {},
  heroTitleSrc = "$1.50 Back",
  heroSubtxtSrc = "ProductName goes here with line wrapping to a second line to cover longer names",
  heroSubtxt2Src = "BrandName",
  heroProfClick = {},
  heroBtnIcnSrc = "Addcirc",
  heroBtnTxtSrc = "Clip",
  heroBtnClick = {},
  scanClick = {},
  shareClick = {},
  marketClick = {},
  clipper = true,
  clipperClick = {},
  muteClick = {},
  typeSrc = "In Store",
  limitSrc = "limit 5",
  rewardSrc = "",
  endsSrc = "ends 03.28.2025",
  detSrc = "Body copy here lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur",
  notesChange,
  notesClick = {},
  sheet = false,
  sheetMap,
  examplesSellerExample = false,
  examplesSelrEmpty = false,
  examplesSelrGrid = true,
  examplesSelrCloseClick = {},
  examplesSelrMap,
  examplesExampleSeller = true,
  examplesSelrVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  examplesSelrVizAlt = "__wf_reserved_inherit",
  examplesSelrNameSrc = "Target",
  examplesSelrCellClick = {},
  examplesSelrEmptyPrimeClick = {},
  examplesMuteExample = false,
  examplesMute24HOn = false,
  examplesMute2DOn = false,
  examplesMute1WOn = false,
  examplesMute2WOn = false,
  examplesMute1MOn = false,
  examplesMute3MOn = false,
  examplesMute6MOn = false,
  examplesMuteAllOn = true,
  examplesMuteCloseClick = {},
  examplesMute24HClick = {},
  examplesMute2DClick = {},
  examplesMute1WClick = {},
  examplesMute2WClick = {},
  examplesMute1MClick = {},
  examplesMute3MClick = {},
  examplesMute6MClick = {},
  examplesMuteAllClick = {},
  examplesMuteDoClick = {},
  examplesClipperExample = false,
  examplesCliprCloseClick = {},
  examplesCliprEmpty = false,
  examplesCliprGrid = true,
  examplesCliprMap,
  examplesClipperGridExample = true,
  examplesCliprVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  examplesCliprVizAlt = "__wf_reserved_inherit",
  examplesCliprNameSrc = "FName LI",
  examplesCliprHandleSrc = "@handle",
  examplesCliprCellClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-peek")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-peek-body")} tag="div">
        <Hero
          imgAlt={heroImgAlt}
          icnBarIcnBarL1Click={heroQrClick}
          icnBarIcnBarR1Click={heroMoreClick}
          imgSrc={heroImgSrc}
          avtr={false}
          hline={false}
          heroAsp="16-9"
          icnBarIcnBarL1Src="Qr"
          avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif"
          avtrAvtrAlt="__wf_reserved_inherit"
          avtrAvtrShape="r"
          icnBar={false}
          fadeBtm={false}
        />
        <ItmSecCta
          header={heroTitleSrc}
          btnTxtSrc={heroBtnTxtSrc}
          btnIcnSrc={heroBtnIcnSrc}
          desc={heroSubtxtSrc}
          linkClick={heroProfClick}
          btnClick={heroBtnClick}
          linkSrc={heroSubtxt2Src}
          eyebrowSrc="three to four words"
          eyebrow={false}
          link={true}
        />
        <BtnBarSs
          btn1Click={scanClick}
          btn2Click={shareClick}
          btn3Click={marketClick}
          btn4Click={clipperClick}
          btn5Click={muteClick}
          btn4={clipper}
          btn1TxtSrc="Scan Barcode"
          btn2TxtSrc="Share"
          btn3TxtSrc="Sold At"
          btn4TxtSrc="Clippers"
          btn6={false}
          btn5TxtSrc="Mute"
          btn6TxtSrc="Block"
          btn1IcnSrc="scan_bc"
          btn2IcnSrc="share"
          btn3IcnSrc="store"
          btn4IcnSrc="member"
          btn5IcnSrc="block"
          btn6IcnSrc="peep_block"
          sideFade={true}
          btn6Click={{}}
          btn7={false}
          btn7TxtSrc="Disconnect"
          btn7IcnSrc="stop"
          btn7Click={{}}
          btn6Id=""
          btn8={false}
          btn8Click={{}}
          btn5={true}
        />
        <Spacer />
        <_Builtin.Block className={_utils.cx(_styles, "off-stack")} tag="div">
          <CapStkLR
            rTxtSrc={limitSrc}
            lTxtSrc={typeSrc}
            capPad="y"
            lTxtClr="f500"
            rTxtClr="n500"
          />
          <CapStkLR
            lTxtSrc={rewardSrc}
            rTxtSrc={endsSrc}
            capPad="y"
            rTxtClr="n500"
            lTxtClr="n500"
          />
        </_Builtin.Block>
        <_Builtin.Section
          className={_utils.cx(_styles, "peek-sec-profile")}
          tag="section"
          grid={{
            type: "section",
          }}
          shadow="y"
        >
          <_Builtin.Block tag="div">
            <SecHead
              titleSrc="Offer Details"
              act1={false}
              sz="m"
              titleSz="r1"
            />
            <Paragraph bodySrc={detSrc} fontClr="n700" />
          </_Builtin.Block>
          <Spacer />
        </_Builtin.Section>
        <_Builtin.FormWrapper>
          <_Builtin.FormForm
            name="email-form"
            data-name="Email Form"
            method="get"
            id="email-form"
          >
            <TextareaForm
              fieldOnChange={notesChange}
              fieldFldClick={notesClick}
              lblTopLblSrc="Notes"
              fldHelp={false}
              lblTopLblFor="notes"
              fieldFldName="notes"
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
        <Spacer />
      </_Builtin.Block>
      {sheet ? (
        <_Builtin.Block className={_utils.cx(_styles, "sheet_bg")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "sheet-content")}
            tag="div"
            bs="l"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "sheet-grab")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sheet-slot")}
              tag="div"
            >
              {sheetMap ?? (
                <>
                  <MMute
                    mute={examplesMuteExample}
                    _24HOn={examplesMute24HOn}
                    _2DOn={examplesMute2DOn}
                    _1WOn={examplesMute1WOn}
                    _2WOn={examplesMute2WOn}
                    _1MOn={examplesMute1MOn}
                    _3MOn={examplesMute3MOn}
                    _6MOn={examplesMute6MOn}
                    allOn={examplesMuteAllOn}
                    cancelClick={examplesMuteCloseClick}
                    _24HClick={examplesMute24HClick}
                    _2DClick={examplesMute2DClick}
                    _1WClick={examplesMute1WClick}
                    _2WClick={examplesMute2WClick}
                    _1MClick={examplesMute1MClick}
                    _3MClick={examplesMute3MClick}
                    _6MClick={examplesMute6MClick}
                    allClick={examplesMuteAllClick}
                    doClick={examplesMuteDoClick}
                    _15M={false}
                    _1H={false}
                    _3H={false}
                    _8H={false}
                    _2D={true}
                    _1W={true}
                    _2W={true}
                    _1M={true}
                    _3M={true}
                    _6M={true}
                  />
                  {examplesClipperExample ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "g-clipper-list")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "g-objectlist")}
                        tag="section"
                        mini=""
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "a-header")}
                          tag="div"
                        >
                          <SecHead
                            act1Click={examplesCliprCloseClick}
                            titleSrc="Clippers"
                            sz=""
                            act1={true}
                            titleSz="h4"
                            act1TxtSrc="Close"
                            subtxt={true}
                            subtxtSrc="Connections that have clipped this offer"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "a-sheetbody")}
                          tag="div"
                        >
                          <EmptyCollection
                            empty={examplesCliprEmpty}
                            headlineSrc="No Clippers Found"
                            primeBtnTxtSrc="Addcirc"
                            icnSrc="member"
                            subtxtSrc="Be the first to grab this deal"
                            btmDoc={false}
                          />
                          {examplesCliprGrid ? (
                            <_Builtin.Grid
                              className={_utils.cx(_styles, "sheet-grid")}
                              tag="div"
                            >
                              {examplesCliprMap ?? (
                                <Cell
                                  capStkRow1Src={examplesCliprNameSrc}
                                  capStkRow2Src={examplesCliprHandleSrc}
                                  cell={examplesClipperGridExample}
                                  avtrAvtrSrc={examplesCliprVizSrc}
                                  avtrAvtrAlt={examplesCliprVizAlt}
                                  cellClick={examplesCliprCellClick}
                                  vizAvtr={true}
                                  vizImg={false}
                                  caption={true}
                                  captionCapStk={true}
                                  capStkRowsAlign="c"
                                  capStkRow2={true}
                                  capStkRow2Clr="n500"
                                />
                              )}
                            </_Builtin.Grid>
                          ) : null}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                  {examplesSellerExample ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "g-seller-list")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "g-objectlist")}
                        tag="section"
                        mini=""
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "a-header")}
                          tag="div"
                        >
                          <SecHead
                            act1Click={examplesSelrCloseClick}
                            titleSrc="Sold At"
                            sz=""
                            act1={true}
                            titleSz="h4"
                            act1TxtSrc="Close"
                            subtxt={true}
                            subtxtSrc="Where you can find this"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "a-sheetbody")}
                          tag="div"
                        >
                          <EmptyCollection
                            empty={examplesSelrEmpty}
                            primeBtnClick={examplesSelrEmptyPrimeClick}
                            icnSrc="store"
                            headlineSrc="No Sellers Found"
                            subtxtSrc="Be proactive and let this brand know that you are interested in this product."
                            primeBtnTxtSrc="Ask To Be Notified"
                          />
                          {examplesSelrGrid ? (
                            <_Builtin.Grid
                              className={_utils.cx(_styles, "sheet-grid3")}
                              tag="div"
                            >
                              {examplesSelrMap ?? (
                                <Cell
                                  imgImgSrc={examplesSelrVizSrc}
                                  imgImgAlt={examplesSelrVizAlt}
                                  cellClick={examplesSelrCellClick}
                                  cell={examplesExampleSeller}
                                  capStkRow1Src={examplesSelrNameSrc}
                                  captionCapStk={true}
                                  vizImg={true}
                                  capStkRowsAlign="l"
                                  adptAdptSz="l"
                                  imgImgAct={false}
                                  capStkRow2={false}
                                  capStkRow1Lc="1"
                                  captionPriceBdg={false}
                                  capLRLTxtClr="f500"
                                  capLRRTxtClr="n500"
                                  capLRLTxtSrc="offer type"
                                  capLRRTxtSrc="limit 2"
                                  priceBdgAmt="Up to 10% Back"
                                  priceBdgAmtHigh={false}
                                  priceBdgAmtH="000"
                                  imgActClick={{}}
                                  imgImgActBdg={false}
                                  imgActBdgTxtSrc="1"
                                  priceBdgSeller1={false}
                                  priceBdgSeller2={false}
                                  priceBdgSeller3={false}
                                  priceBdgSeller1Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/656a4b68f01fb1093f59dbbe_target.avif"
                                  priceBdgSeller2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
                                  priceBdgSeller3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
                                  caption={true}
                                  captionCapLR={false}
                                  capStkRow2Src="Up to 10% Back"
                                  capStkRow1Sz="r2"
                                  capStkRow2Sz="r3"
                                  capStkRow2Clr="n700"
                                />
                              )}
                            </_Builtin.Grid>
                          ) : null}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
