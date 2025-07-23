"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { OlIconbarAction } from "./OlIconbarAction";
import { OlHeadline } from "./OlHeadline";
import { OlBtn } from "./OlBtn";
import { OlBannerFull } from "./OlBannerFull";
import { OlAvtr } from "./OlAvtr";
import * as _utils from "./utils";
import _styles from "./Hero.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-591":{"id":"e-591","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-592"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3e866c86-4c38-8b8f-2609-5760dcef4c03","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3e866c86-4c38-8b8f-2609-5760dcef4c03","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695845223849},"e-592":{"id":"e-592","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-591"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3e866c86-4c38-8b8f-2609-5760dcef4c03","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3e866c86-4c38-8b8f-2609-5760dcef4c03","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695845223849},"e-593":{"id":"e-593","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-594"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695845231565},"e-594":{"id":"e-594","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-593"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695845231565},"e-595":{"id":"e-595","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-596"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695852856785},"e-596":{"id":"e-596","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-595"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695852856785},"e-623":{"id":"e-623","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-624"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697221606753},"e-624":{"id":"e-624","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-623"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697221606753},"e-877":{"id":"e-877","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-878"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756},"e-878":{"id":"e-878","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-877"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756},"e-879":{"id":"e-879","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-880"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756},"e-880":{"id":"e-880","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-879"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756},"e-881":{"id":"e-881","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-882"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756},"e-882":{"id":"e-882","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-881"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756}},"actionLists":{"a-121":{"id":"a-121","title":"Accordion open 2","actionItemGroups":[{"actionItems":[{"id":"a-121-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f07c|9ba05589-0bc1-605d-e5bd-02c64ffc38d3"},"heightValue":96,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-121-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".acrd-icon","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f98378e"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-121-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ol-fade-btm","selectorGuids":["20a6580c-d0bf-e0df-d717-722d7e2cb454"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-121-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f07c|9ba05589-0bc1-605d-e5bd-02c64ffc38d3"},"widthUnit":"PX","heightUnit":"AUTO","locked":false}},{"id":"a-121-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".acrd-icon","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f98378e"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-121-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ol-fade-btm","selectorGuids":["20a6580c-d0bf-e0df-d717-722d7e2cb454"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1606862693281},"a-122":{"id":"a-122","title":"Accordion close 2","actionItemGroups":[{"actionItems":[{"id":"a-122-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f07c|9ba05589-0bc1-605d-e5bd-02c64ffc38d3"},"heightValue":96,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-122-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".acrd-icon","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f98378e"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-122-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".ol-fade-btm","selectorGuids":["20a6580c-d0bf-e0df-d717-722d7e2cb454"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1606866824674}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function Hero({
  as: _Component = _Builtin.Block,
  sec = true,
  img = true,
  vid = false,
  imgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  imgAlt = "__wf_reserved_inherit",

  vidSrc = {
    width: 940,
    height: 528,
    title: "video placeholder",
    url: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FNpEaa2P7qZI%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DNpEaa2P7qZI&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FNpEaa2P7qZI%2Fhqdefault.jpg&type=text%2Fhtml&schema=youtube",
  },

  icnBar = true,
  hline = true,
  btn = false,
  avtr = false,
  bnr = false,
  fadeBtm = true,
  heroAsp = "16-9",
  icnBarIcnBarL1Icn = true,
  icnBarIcnBarR1Icn = true,
  icnBarIcnBarL1Src = "Scan_qr",
  icnBarIcnBarL1Clr = "white",
  icnBarIcnBarR1Src = "Moreh",
  icnBarIcnBarR1Clr = "white",

  icnBarIcnBarL1Link = {
    href: "#",
  },

  icnBarIcnBarR1Link = {
    href: "#",
  },

  icnBarIcnBarL1Click = {},
  icnBarIcnBarR1Click = {},
  hlineHlineSubtxt = false,
  hlineHlineSrc = "HeroTitle",
  hlineHlineSubtxtSrc = "Subhead description below",
  hlineHlineSz = "2xl",
  hlineHlineAlign = "l",
  hlineHlineLoc = "btm",
  btnBtnIcn = true,
  btnBtnTxt = false,
  btnBtnTxtSrc = "Edit",
  btnBtnIcnSrc = "Edit",
  btnBtnSz = "l",
  btnBtnStyl = "pf",
  btnBtnLoc = "br",

  btnBtnLink = {
    href: "#",
  },

  btnBtnClick = {},
  avtrAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtrAvtrAlt = "__wf_reserved_inherit",
  avtrAvtrSz = "xl",
  avtrAvtrBdgIcnSz = "r4",
  avtrAvtrShape = "c",
  avtrAvtrBdg = false,
  avtrAvtrBdgClr = "fd500",
  avtrAvtrBdgIcnSrc = "Edit",
  avtrAvtrHline = false,
  avtrAvtrHlineSrc = "FName LName",
  avtrAvtrHlineSz = "h3",
  avtrAvtrHlineClr = "n000",
  avtrAvtrSubTxtSrc = "@handle",
  avtrAvtrSubTxtSz = "r2",
  avtrAvtrSubTxtClr = "n000",
  avtrAvtrSubTxt2 = false,
  avtrAvtrSubTxt2Src = "subtxt2",
  avtrAvtrSubTxt2Clr = "n000",
  avtrAvtrSubTxt2Sz = "r2",
  avtrAvtrClick = {},
  bnrBnrTxtSrc = "GroupName",
  bnrBnrLoc = "btm",
  bnrBnrAvtr = false,
  bnrBnrAvtr2 = false,
  bnrBnrAvtr3 = false,
  bnrBnrAvtr4 = false,
  bnrBnrAvtr5 = false,
  bnrBnrAvtr1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  bnrBnrAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  bnrBnrAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  bnrBnrAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  bnrBnrAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  heroLink = false,

  heroLinkSrc = {
    href: "#",
  },

  heroClick = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return sec ? (
    <_Component
      className={_utils.cx(_styles, "hero_sec")}
      tag="section"
      {...heroClick}
    >
      <_Builtin.Block className={_utils.cx(_styles, "hero")} tag="div">
        {img ? (
          <_Builtin.Image
            className={_utils.cx(_styles, "heroimg")}
            loading="lazy"
            width="auto"
            height="auto"
            data-obj-asp={heroAsp}
            src={imgSrc}
          />
        ) : null}
        {vid ? (
          <_Builtin.Video
            className={_utils.cx(_styles, "herovid")}
            data-obj-asp={heroAsp}
            options={vidSrc}
          />
        ) : null}
        {heroLink ? (
          <_Builtin.Link
            className={_utils.cx(_styles, "herolink")}
            button={false}
            block="inline"
            options={heroLinkSrc}
          />
        ) : null}
        <OlIconbarAction
          r1IcnR1Src={icnBarIcnBarR1Src}
          l1IcnL1Link={icnBarIcnBarL1Link}
          r1IcnR1Link={icnBarIcnBarR1Link}
          icnBar={icnBar}
          l1IcnL1Click={icnBarIcnBarL1Click}
          r1IcnR1Click={icnBarIcnBarR1Click}
          l1Icn={icnBarIcnBarL1Icn}
          r1Icn={icnBarIcnBarR1Icn}
          l1IcnL1Clr={icnBarIcnBarL1Clr}
          r1IcnR1Clr={icnBarIcnBarR1Clr}
          l1IcnL1Src={icnBarIcnBarL1Src}
          l2IcnL2Click={{}}
          l3IcnL3Click={{}}
          r2IcnR2Click={{}}
          r3IcnR3Click={{}}
          l2IcnL2Src="Default"
          l2IcnL2Clr="n000"
          r2IcnR2Clr="n000"
          l3IcnL3Clr="n000"
          r3IcnR3Clr="n000"
        />
        <OlHeadline
          hlineTitleSrc={hlineHlineSrc}
          hline={hline}
          hlineSubtxt={hlineHlineSubtxt}
          hlineSubtxtSrc={hlineHlineSubtxtSrc}
          hlineLoc={hlineHlineLoc}
          hlineSz={hlineHlineSz}
          hlineAlign={hlineHlineAlign}
        />
        <OlBtn
          btn={btn}
          btnIcnSrc={btnBtnIcnSrc}
          btnTxt={btnBtnTxt}
          btnTxtSrc={btnBtnTxtSrc}
          btnLink={btnBtnLink}
          btnIcn={btnBtnIcn}
          btnLoc={btnBtnLoc}
          btnClick={btnBtnClick}
          btnSz={btnBtnSz}
          btnStyl={btnBtnStyl}
        />
        <OlBannerFull
          bnr={bnr}
          bnrLoc={bnrBnrLoc}
          lblTxtSrc={bnrBnrTxtSrc}
          avtr1Src={bnrBnrAvtr1Src}
          avtr2Src={bnrBnrAvtr2Src}
          avtr3Src={bnrBnrAvtr3Src}
          avtr4Src={bnrBnrAvtr4Src}
          avtr5Src={bnrBnrAvtr5Src}
          avtr3={bnrBnrAvtr3}
          avtr4={bnrBnrAvtr4}
          avtr5={bnrBnrAvtr5}
          avtrGrp={bnrBnrAvtr}
          avtr2={bnrBnrAvtr2}
          avtrSz="s"
        />
        <OlAvtr
          avtr={avtr}
          avtrBdg={avtrAvtrBdg}
          avtrBdgClr={avtrAvtrBdgClr}
          avtrBdgIcnSrc={avtrAvtrBdgIcnSrc}
          avtrSrc={avtrAvtrSrc}
          hline={avtrAvtrHline}
          hlineTitleSrc={avtrAvtrHlineSrc}
          hlineSubTxtSrc={avtrAvtrSubTxtSrc}
          avtrClick={avtrAvtrClick}
          avtrAlt={avtrAvtrAlt}
          avtrShape={avtrAvtrShape}
          avtrSz={avtrAvtrSz}
          hlineTitleClr={avtrAvtrHlineClr}
          hlineTitleSz={avtrAvtrHlineSz}
          hlineSubTxtClr={avtrAvtrSubTxtClr}
          hlineSubTxtSz={avtrAvtrSubTxtSz}
          hlineSubTxt2={avtrAvtrSubTxt2}
          hlineSubTxt2Src={avtrAvtrSubTxt2Src}
          hlineSubTxt2Clr={avtrAvtrSubTxt2Clr}
          hlineSubTxt2Sz={avtrAvtrSubTxt2Sz}
          avtrBdgIcnSz={avtrAvtrBdgIcnSz}
        />
        {fadeBtm ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "ol-fade-btm")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
