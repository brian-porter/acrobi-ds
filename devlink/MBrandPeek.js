"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { ItmSecCta } from "./ItmSecCta";
import { Spacer } from "./Spacer";
import { BtnBarSs } from "./BtnBarSs";
import { SecHead } from "./SecHead";
import { Paragraph } from "./Paragraph";
import { TableRow } from "./TableRow";
import { ImgSs } from "./ImgSs";
import { TextareaForm } from "./TextareaForm";
import { MMute } from "./MMute";
import { MBlock } from "./MBlock";
import { MDelete2 } from "./MDelete2";
import { EmptyCollection } from "./EmptyCollection";
import { Cell } from "./Cell";
import * as _utils from "./utils";
import _styles from "./MBrandPeek.module.css";

export function MBrandPeek({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroImgAlt = "__wf_reserved_inherit",
  heroQrClick = {},
  heroMoreClick = {},
  heroAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  heroAvtrAlt = "__wf_reserved_inherit",
  heroTitleSrc = "BrandName",
  heroSubtxtSrc = "@handle",
  heroProfClick = {},
  heroBtnIcnSrc = "Addcirc",
  heroBtnTxtSrc = "Connect",
  heroBtnClick = {},
  favIcnSrc = "favs",
  favTxtSrc = "Favorite",
  favClick = {},
  prodClick = {},
  sellerClick = {},
  offClick = {},
  clipClick = {},
  muteClick = {},
  disClick = {},
  setClick = {},
  off = true,
  dis = true,
  aboutSrc = "Body copy here lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur",
  rankSrc = "RankName",
  estSrc = "Est. 2023",
  locationSrc = "LocationName",
  domainSrc = "DomainName.com",
  domainClick = {},
  socialMap,
  notesChange,
  notesClick = {},
  sheet = false,
  sheetMap,
  examplesSocialExample = true,
  examplesSocialVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  examplesSocialVizAlt = "__wf_reserved_inherit",
  examplesSocialNameSrc = "Name",
  examplesSocialCellClick = {},
  examplesProdExample = false,
  examplesProdCloseClick = {},
  examplesProdMap,
  examplesProdGridExample = true,
  examplesProdVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  examplesProdVizAlt = "__wf_reserved_inherit",
  examplesProdNameSrc = "ProductName goes here with a wrap to a second line",
  examplesProdCellClick = {},
  examplesSellerExample = false,
  examplesSelrCloseClick = {},
  examplesSelrMap,
  examplesSellerGridExample = true,
  examplesSelrVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  examplesSelrVizAlt = "__wf_reserved_inherit",
  examplesSelrNameSrc = "Target",
  examplesSelrCellClick = {},
  examplesOfferExample = false,
  examplesOffCloseClick = {},
  examplesOffMap,
  examplesOfferGridExample = true,
  examplesOffVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  examplesOffVizAlt = "__wf_reserved_inherit",
  examplesOffActClick = {},
  examplesOffHookSrc = "$1.50 back",
  examplesOffTypeSrc = "offer type",
  examplesOffLimitSrc = "limit 2",
  examplesOffCellClick = {},
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
  examplesMuteExample = false,
  examplesDisExample = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-peek")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-peek-body")} tag="div">
        <Hero
          imgSrc={heroImgSrc}
          imgAlt={heroImgAlt}
          icnBarIcnBarL1Click={heroQrClick}
          icnBarIcnBarR1Click={heroMoreClick}
          avtrAvtrSrc={heroAvtrSrc}
          avtrAvtrAlt={heroAvtrAlt}
          avtr={true}
          hline={false}
          heroAsp="21-9"
          icnBarIcnBarL1Src="Qr"
          avtrAvtrShape="r"
        />
        <ItmSecCta
          header={heroTitleSrc}
          btnTxtSrc={heroBtnTxtSrc}
          btnIcnSrc={heroBtnIcnSrc}
          desc={heroSubtxtSrc}
          linkClick={heroProfClick}
          btnClick={heroBtnClick}
          eyebrowSrc="three to four words"
          eyebrow={false}
          link={true}
        />
        <Spacer />
        <BtnBarSs
          btn1TxtSrc={favTxtSrc}
          btn1IcnSrc={favIcnSrc}
          btn1Click={favClick}
          btn2Click={prodClick}
          btn3Click={sellerClick}
          btn4Click={offClick}
          btn5Click={clipClick}
          btn6Click={muteClick}
          btn7={dis}
          btn7Click={disClick}
          btn8Click={setClick}
          btn4={off}
          btn2TxtSrc="Products"
          btn3TxtSrc="Sold At"
          btn4TxtSrc="Deals"
          btn6={false}
          btn5TxtSrc="Clippers"
          btn6TxtSrc="Mute"
          btn2IcnSrc="products"
          btn3IcnSrc="store"
          btn4IcnSrc="offer"
          btn5IcnSrc="member"
          btn6IcnSrc="block"
          sideFade={true}
          btn7TxtSrc="Disconnect"
          btn7IcnSrc="stop"
          btn6Id="mute"
          btn8={false}
          btn5Id="mute"
          btn4Id="clipper"
          btn5={true}
          btn7Id="dis"
          btn8Id="set"
        />
        <_Builtin.Section
          className={_utils.cx(_styles, "peek-sec-profile")}
          tag="section"
          grid={{
            type: "section",
          }}
          shadow="y"
        >
          <_Builtin.Block tag="div">
            <SecHead titleSrc="About" act1={false} sz="m" titleSz="r1" />
            <Paragraph bodySrc={aboutSrc} fontClr="n700" />
            <_Builtin.Block
              className={_utils.cx(_styles, "member-details")}
              tag="div"
            >
              <TableRow
                col1TxtSrc={rankSrc}
                col2TxtSrc={estSrc}
                col1Icn={true}
                col2Align="r"
                col1IcnSrc="rank3"
              />
              <TableRow
                col1TxtSrc={locationSrc}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="geo_home"
                col2={false}
              />
              <TableRow
                col1TxtSrc={domainSrc}
                rowClick={domainClick}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="link"
                col2={false}
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <SecHead titleSrc="Socials" act1={false} titleSz="r1" />
            <ImgSs
              cellMap={socialMap}
              cellExample={examplesSocialExample}
              vizImgSrc={examplesSocialVizSrc}
              vizImgAlt={examplesSocialVizAlt}
              captionCapStkRow1Src={examplesSocialNameSrc}
              cellCellClick={examplesSocialCellClick}
              emptyHlineSrc="Link Your Apps"
              emptyCtaTxtSrc="Add Apps"
              emptyIcnSrc="ed_share"
              emptySubTxtSrc="No social apps are connected to your account Add them and next time they'll show up here to choose from."
              emptyEmptyClick={{}}
              cellSz="l"
              sideFade={false}
            />
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
                    _15MOn={false}
                    _1HOn={false}
                    _3HOn={false}
                    _8HOn={false}
                    _24HOn={false}
                    allOn={false}
                    cancelClick={{}}
                    _15MClick={{}}
                    _1HClick={{}}
                    _3HClick={{}}
                    _8HClick={{}}
                    _24HClick={{}}
                    allClick={{}}
                    doClick={{}}
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
                  <MBlock block={false} />
                  <MDelete2
                    baseBase={examplesDisExample}
                    baseBaseObjImg={false}
                    baseBaseObjAvtr={true}
                    baseBaseObjTitleSrc="FName LName"
                    baseBaseObjSubtxt1Src="@handle"
                    baseBaseDoTxtSrc="Disconnect"
                  />
                  {examplesProdExample ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "g-prod-list")}
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
                            act1Click={examplesProdCloseClick}
                            titleSrc="Products"
                            sz="xl"
                            act1={true}
                            titleSz="h4"
                            act1TxtSrc="Close"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "a-sheetbody")}
                          tag="div"
                        >
                          <EmptyCollection
                            empty={false}
                            headlineSrc=""
                            primeBtnTxtSrc=""
                            icnSrc=""
                            subtxtSrc=""
                            btmDoc={false}
                          />
                          <_Builtin.Grid
                            className={_utils.cx(_styles, "sheet-grid")}
                            tag="div"
                          >
                            {examplesProdMap ?? (
                              <Cell
                                cell={examplesProdGridExample}
                                cellClick={examplesProdCellClick}
                                capStkRow1Src={examplesProdNameSrc}
                                imgImgSrc={examplesProdVizSrc}
                                imgImgAlt={examplesProdVizAlt}
                                captionCapStk={true}
                                caption={true}
                                capStkRow1Lc="2"
                              />
                            )}
                          </_Builtin.Grid>
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
                            sz="xl"
                            act1={true}
                            titleSz="h4"
                            act1TxtSrc="Close"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "a-sheetbody")}
                          tag="div"
                        >
                          <EmptyCollection
                            empty={false}
                            headlineSrc=""
                            primeBtnTxtSrc=""
                            icnSrc=""
                            subtxtSrc=""
                            btmDoc={false}
                          />
                          <_Builtin.Grid
                            className={_utils.cx(_styles, "sheet-grid3")}
                            tag="div"
                          >
                            {examplesSelrMap ?? (
                              <Cell
                                cell={examplesSellerGridExample}
                                cellClick={examplesSelrCellClick}
                                imgImgSrc={examplesSelrVizSrc}
                                imgImgAlt={examplesSelrVizAlt}
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
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                  {examplesOfferExample ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "g-deals-list")}
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
                            act1Click={examplesOffCloseClick}
                            titleSrc="Deals"
                            sz="xl"
                            act1={true}
                            titleSz="h4"
                            act1TxtSrc="Close"
                          />
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, "a-sheetbody")}
                          tag="div"
                        >
                          <EmptyCollection />
                          <_Builtin.Grid
                            className={_utils.cx(_styles, "sheet-grid")}
                            tag="div"
                          >
                            {examplesOffMap ?? (
                              <Cell
                                cell={examplesOfferGridExample}
                                cellClick={examplesOffCellClick}
                                capLRLTxtSrc={examplesOffTypeSrc}
                                capLRRTxtSrc={examplesOffLimitSrc}
                                imgImgSrc={examplesOffVizSrc}
                                imgImgAlt={examplesOffVizAlt}
                                priceBdgAmt={examplesOffHookSrc}
                                imgActClick={examplesOffActClick}
                                captionCapStk={false}
                                vizImg={true}
                                capStkRowsAlign="l"
                                adptAdptSz="l"
                                imgImgAct={true}
                                capStkRow2={false}
                                capStkRow1Lc="2"
                                captionPriceBdg={true}
                                capLRLTxtClr="f500"
                                capLRRTxtClr="n500"
                                priceBdgAmtHigh={false}
                                priceBdgAmtH="000"
                                imgImgActBdg={false}
                                imgActBdgTxtSrc="1"
                                priceBdgSeller1={false}
                                priceBdgSeller2={false}
                                priceBdgSeller3={false}
                                priceBdgSeller1Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
                                priceBdgSeller2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
                                priceBdgSeller3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
                                caption={true}
                                captionCapLR={true}
                              />
                            )}
                          </_Builtin.Grid>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
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
                            subtxtSrc="Connections that have clipped an offer"
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
                            subtxtSrc="Be the first to grab a deal"
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
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
