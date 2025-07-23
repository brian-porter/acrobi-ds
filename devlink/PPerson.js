"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecPeep } from "./SecPeep";
import { SnipSecRank } from "./SnipSecRank";
import { SnipSecFavs } from "./SnipSecFavs";
import * as _utils from "./utils";
import _styles from "./PPerson.module.css";

export function PPerson({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  heroName = "FName LName",
  heroHandle = "@handle",
  heroQrClick = {},
  heroMoreClick = {},
  heroBtn = true,
  heroBtnClick = {},
  scanQrBtnClick = {},
  searchClick = {},
  addtoClick = {},
  chatClick = {},
  honorClick = {},
  alertClick = {},
  topPeepMap,
  rank = true,
  rankAll = false,
  rankAllClick = {},
  rankImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  rankImgAlt = "__wf_reserved_inherit",
  rankName = "{RankName}",
  rankYr = "{year} status",
  rankEstYr = "est {month} {year}",
  rankPts = "pts {point-amt}",
  rankAchMap,
  exampleAch = true,
  rankAct1Icn = "default",
  rankAct1Name = "{ActivityName}",
  rankAct1Pts = "{XXX} pts",
  rankAct1Time = "{time}",
  rankAct2Icn = "default",
  rankAct2Name = "{ActivityName}",
  rankAct2Pts = "{XXX} pts",
  rankAct2Time = "{time}",
  rankAct3Icn = "default",
  rankAct3Name = "{ActivityName}",
  rankAct3Pts = "{XXX} pts",
  rankAct3Time = "{time}",
  rankStatTotal = "{XXX} total pts",
  fav = true,
  favAllClick = {},
  favProdQty = "{#}",
  favPlaceQty = "{#}",
  favCreatorQty = "{#}",
  favStoreQty = "{#}",
  favBrandQty = "{#}",
  favProdClick = {},
  favPlaceClick = {},
  favCreatorClick = {},
  favStoreClick = {},
  favBrandClick = {},
  peep = true,
  peepAllClick = {},
  peepAvtrImg = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  peepName = "{FName LName}'s",
  peepConMap,
  peepStatFam = "{X} family",
  peepStatFriend = "{X} friends",
  peepStatAll = "{X} overall",
  peepGroupMap,
  peepAct1Icn = "default",
  peepAct1Name = "{ActivityName}",
  peepAct1Pts = "{XXX} pts",
  peepAct1Time = "{time}",
  peepAct2Icn = "default",
  peepAct2Name = "{ActivityName}",
  peepAct2Pts = "{XXX} pts",
  peepAct2Time = "{time}",
  peepAct3Icn = "default",
  peepAct3Name = "{ActivityName}",
  peepAct3Pts = "{XXX} pts",
  peepAct3Time = "{time}",
  peepStatTotal = "{XXX} total pts",
  list = true,
  lsAllClick = {},

  lsVidSrc = {
    width: 940,
    height: 528,
    title: "video placeholder",
    url: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FNpEaa2P7qZI%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DNpEaa2P7qZI&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FNpEaa2P7qZI%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube",
  },

  lsVidChanImg = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  lsVidHook = "ListName goes here",
  lsVidDetail = "{OfferDetail}",
  lsVidPts = "{time}",
  lsVidDetClick = {},
  lsVidAddClick = {},
  lsSoonMap,
  lsAct1ImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  lsAct1Itm = "{ItemName}",
  lsAct1Type = "{ListType}",
  lsAct1Time = "{time}",
  lsAct1Click = {},
  lsAct2ImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  lsAct2Itm = "{ItemName}",
  lsAct2Type = "{ListType}",
  lsAct2Time = "{time}",
  lsAct2Click = {},
  lsAct3ImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  lsAct3Itm = "{ItemName}",
  lsAct3Type = "{ListType}",
  lsAct3Time = "{time}",
  lsAct3Click = {},
  lsStatList = "{XX} lists",
  lsStatItm = "{XX} items",
  lsStatPeep = "{XX} peeps",
  offer = true,
  offAllClick = {},

  offVidSrc = {
    width: 940,
    height: 528,
    title: "video placeholder",
    url: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FNpEaa2P7qZI%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DNpEaa2P7qZI&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FNpEaa2P7qZI%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube",
  },

  offVidChanImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  offVidHook = "{OfferHook}",
  offVidDetail = "{OfferDetail}",
  offVidPts = "+{XXX} pts",
  offVidDetClick = {},
  offVidAddClick = {},
  offerMap,
  offAct1ImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  offAct1Hook = "{OfferHook}",
  offAct1Det = "{OfferDetail}",
  offAct1Pts = "+{XXX} pts",
  offAct1DetClick = {},
  offAct1AddClick = {},
  tie = true,
  place = true,
  community = true,
  body1Map,
  body2Map,
  body3Map,
  body4Map,
  body5Map,
  body6Map,
  body7Map,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-header")}
          id={_utils.cx(
            _styles,
            "w-node-ef2f81ff-faf4-995f-3613-1e34cade1332-2b2b6877"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-ef2f81ff-faf4-995f-3613-1e34cade1333-2b2b6877"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "hero_sec")}
              tag="section"
              grid={{
                type: "section",
              }}
            >
              <Hero
                btn={heroBtn}
                imgSrc={heroImgSrc}
                icnBarIcnBarL1Click={heroQrClick}
                icnBarIcnBarR1Click={heroMoreClick}
                btnBtnClick={heroBtnClick}
                avtrAvtrSrc={heroAvtrSrc}
                avtrAvtrHlineSrc={heroName}
                avtrAvtrSubTxtSrc={heroHandle}
                hlineHlineSubtxt={true}
                btnBtnTxtSrc="Connect"
                btnBtnIcnSrc="Addcirc"
                btnBtnTxt={true}
                icnBarIcnBarR1Src="Moreh"
                icnBar={true}
                hlineHlineLoc="btm"
                fadeBtm={false}
                avtr={true}
                hline={false}
                avtrAvtrHline={true}
                heroAsp="21-9"
                icnBarIcnBarL1Src="Qr"
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-ef2f81ff-faf4-995f-3613-1e34cade133d-2b2b6877"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "act-sec")}
              tag="section"
              grid={{
                type: "section",
              }}
            >
              <_Builtin.Layout
                className={_utils.cx(_styles, "qs-action")}
                id={_utils.cx(
                  _styles,
                  "w-node-ef2f81ff-faf4-995f-3613-1e34cade133f-2b2b6877"
                )}
              >
                <_Builtin.Cell
                  className={_utils.cx(_styles, "act-expand")}
                  id={_utils.cx(
                    _styles,
                    "w-node-ef2f81ff-faf4-995f-3613-1e34cade1340-2b2b6877"
                  )}
                >
                  <InputWBtns
                    lLBtnClick={scanQrBtnClick}
                    fldFldClick={searchClick}
                    fldFldTBtn={false}
                    tTBtn={false}
                  />
                </_Builtin.Cell>
                <_Builtin.Cell
                  className={_utils.cx(_styles, "act-expand")}
                  id={_utils.cx(
                    _styles,
                    "w-node-ef2f81ff-faf4-995f-3613-1e34cade1344-2b2b6877"
                  )}
                >
                  <BtnBarSs
                    btn1Click={addtoClick}
                    btn2Click={chatClick}
                    btn3Click={honorClick}
                    btn4Click={alertClick}
                    btn1TxtSrc="Add To"
                    btn2TxtSrc="Message"
                    btn3TxtSrc="Honor"
                    btn4TxtSrc="Alerts"
                    btn3IcnSrc="rank_lvl2"
                    btn3Id="honor"
                    btn2IcnSrc="chat"
                    btn2Id="add-to"
                    btn1Id="add-to"
                    btn4Id="alert"
                    btn4IcnSrc="alarm"
                    btn1IcnSrc="assign"
                    btn5={false}
                    btn8TxtSrc="Settings"
                    btn8IcnSrc="setting"
                    btn8Id="settings"
                    btn3Dis="true"
                  />
                </_Builtin.Cell>
                <_Builtin.Cell
                  className={_utils.cx(_styles, "act-expand")}
                  id={_utils.cx(
                    _styles,
                    "w-node-ef2f81ff-faf4-995f-3613-1e34cade1350-2b2b6877"
                  )}
                >
                  <SecPeep
                    conCellMap={topPeepMap}
                    stats={false}
                    secHeadTitleIcnSrc="peep_add"
                    secHeadTitleSrc="Popular Connections"
                    exampleCellCard="true"
                    exampleVizSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                  />
                </_Builtin.Cell>
              </_Builtin.Layout>
            </_Builtin.Section>
          </_Builtin.Cell>
        </_Builtin.Layout>
        <_Builtin.Layout
          className={_utils.cx(_styles, "stk-50-50")}
          id={_utils.cx(
            _styles,
            "w-node-e16d89b7-f25b-a7da-29bd-a3282b2b6898-2b2b6877"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-clamp")}
            id={_utils.cx(
              _styles,
              "w-node-e16d89b7-f25b-a7da-29bd-a3282b2b6899-2b2b6877"
            )}
          >
            {body1Map ?? (
              <>
                <SnipSecRank
                  sec={rank}
                  secHeadAct1Click={rankAllClick}
                  conRankTitleSrc={rankName}
                  conRankVizSrc={rankImgSrc}
                  conRankYrSrc={rankYr}
                  conRankEstYrSrc={rankEstYr}
                  conRankPtsSrc={rankPts}
                  conSec1Map={rankAchMap}
                  exActvActvTitleSrc={rankAct1Name}
                  exActvActvSubtxtSrc={rankAct1Pts}
                  exActvActvRTxtSrc={rankAct1Time}
                  stat1Src={rankStatTotal}
                  secHeadAct1={rankAll}
                  conExampleCellAchievement={exampleAch}
                  conRankVizAlt={rankImgAlt}
                />
                <SnipSecFavs
                  sec={fav}
                  secHeadAct1Click={favAllClick}
                  conFavProdQty={favProdQty}
                  conFavProdClick={favProdClick}
                  conFavPlaceQty={favPlaceQty}
                  conFavPlaceClick={favPlaceClick}
                  conFavCreatorQty={favCreatorQty}
                  conFavCreatorClick={favCreatorClick}
                  conFavStoreQty={favStoreQty}
                  conFavStoreClick={favStoreClick}
                  conFavBrandQty={favBrandQty}
                  conFavBrandClick={favBrandClick}
                />
              </>
            )}
          </_Builtin.Cell>
          {peep ? (
            <_Builtin.Cell
              className={_utils.cx(_styles, "cell-clamp")}
              id={_utils.cx(
                _styles,
                "w-node-e16d89b7-f25b-a7da-29bd-a3282b2b68f8-2b2b6877"
              )}
            >
              {body2Map ?? (
                <_Builtin.HtmlEmbed value="%3C!--%20Peep%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
              )}
            </_Builtin.Cell>
          ) : null}
          {list ? (
            <_Builtin.Cell
              className={_utils.cx(_styles, "cell-clamp")}
              id={_utils.cx(
                _styles,
                "w-node-e16d89b7-f25b-a7da-29bd-a3282b2b6935-2b2b6877"
              )}
            >
              {body3Map ?? (
                <_Builtin.HtmlEmbed value="%3C!--%20List%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
              )}
            </_Builtin.Cell>
          ) : null}
          {offer ? (
            <_Builtin.Cell
              className={_utils.cx(_styles, "cell-clamp")}
              id={_utils.cx(
                _styles,
                "w-node-e16d89b7-f25b-a7da-29bd-a3282b2b6968-2b2b6877"
              )}
            >
              {body4Map ?? (
                <_Builtin.HtmlEmbed value="%3C!--%20Offer%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
              )}
            </_Builtin.Cell>
          ) : null}
          {tie ? (
            <_Builtin.Cell
              className={_utils.cx(_styles, "cell-clamp")}
              id={_utils.cx(
                _styles,
                "w-node-e16d89b7-f25b-a7da-29bd-a3282b2b699e-2b2b6877"
              )}
            >
              {body5Map ?? (
                <_Builtin.HtmlEmbed value="%3C!--%20Brand%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
              )}
            </_Builtin.Cell>
          ) : null}
          {place ? (
            <_Builtin.Cell
              className={_utils.cx(_styles, "cell-clamp")}
              id={_utils.cx(
                _styles,
                "w-node-e16d89b7-f25b-a7da-29bd-a3282b2b69b5-2b2b6877"
              )}
            >
              {body6Map ?? (
                <_Builtin.HtmlEmbed value="%3C!--%20Places%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
              )}
            </_Builtin.Cell>
          ) : null}
          {community ? (
            <_Builtin.Cell
              className={_utils.cx(_styles, "cell-clamp")}
              id={_utils.cx(
                _styles,
                "w-node-e16d89b7-f25b-a7da-29bd-a3282b2b69d5-2b2b6877"
              )}
            >
              {body7Map ?? (
                <_Builtin.HtmlEmbed value="%3C!--%20Activity%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
              )}
            </_Builtin.Cell>
          ) : null}
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
