"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Hero } from "./Hero";
import { ItmSecCta } from "./ItmSecCta";
import { BtnBarSs } from "./BtnBarSs";
import { Spacer } from "./Spacer";
import { CapStkLR } from "./CapStkLR";
import { Label } from "./Label";
import { Paragraph } from "./Paragraph";
import { OlFade } from "./OlFade";
import { SecPeep } from "./SecPeep";
import { GridSecBrand } from "./GridSecBrand";
import { SecProduct } from "./SecProduct";
import { GridSecOffer } from "./GridSecOffer";
import * as _utils from "./utils";
import _styles from "./POffer.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-591":{"id":"e-591","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-592"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3e866c86-4c38-8b8f-2609-5760dcef4c03","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3e866c86-4c38-8b8f-2609-5760dcef4c03","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695845223849},"e-592":{"id":"e-592","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-591"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3e866c86-4c38-8b8f-2609-5760dcef4c03","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3e866c86-4c38-8b8f-2609-5760dcef4c03","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695845223849},"e-593":{"id":"e-593","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-594"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695845231565},"e-594":{"id":"e-594","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-593"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695845231565},"e-595":{"id":"e-595","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-596"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695852856785},"e-596":{"id":"e-596","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-595"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695852856785},"e-623":{"id":"e-623","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-624"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697221606753},"e-624":{"id":"e-624","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-623"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f14f|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f14f|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697221606753},"e-877":{"id":"e-877","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-878"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756},"e-878":{"id":"e-878","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-877"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|bedd1144-ba80-b9be-0a19-db7df57c557c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756},"e-879":{"id":"e-879","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-880"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756},"e-880":{"id":"e-880","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-879"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|d3268beb-9b54-e2eb-17c4-3dbe9c332c62","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756},"e-881":{"id":"e-881","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-121","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-882"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756},"e-882":{"id":"e-882","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-122","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-881"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"666a2ccffe0720724ee720b5|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"666a2ccffe0720724ee720b5|e1411cf5-ae03-568a-57b9-3cad42e71f10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718234319756},"e-893":{"id":"e-893","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-182","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-894"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".acrd_item-trig","originalId":"31a9c110-9ebc-10be-bd69-866c6143b599","appliesTo":"CLASS"},"targets":[{"selector":".acrd_item-trig","originalId":"31a9c110-9ebc-10be-bd69-866c6143b599","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1721511851003},"e-894":{"id":"e-894","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-183","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-893"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".acrd_item-trig","originalId":"31a9c110-9ebc-10be-bd69-866c6143b599","appliesTo":"CLASS"},"targets":[{"selector":".acrd_item-trig","originalId":"31a9c110-9ebc-10be-bd69-866c6143b599","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1721511851006}},"actionLists":{"a-121":{"id":"a-121","title":"Accordion open 2","actionItemGroups":[{"actionItems":[{"id":"a-121-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f07c|9ba05589-0bc1-605d-e5bd-02c64ffc38d3"},"heightValue":96,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-121-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".acrd-icon","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f98378e"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-121-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ol-fade-btm","selectorGuids":["20a6580c-d0bf-e0df-d717-722d7e2cb454"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-121-n-3","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f07c|9ba05589-0bc1-605d-e5bd-02c64ffc38d3"},"widthUnit":"PX","heightUnit":"AUTO","locked":false}},{"id":"a-121-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".acrd-icon","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f98378e"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-121-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ol-fade-btm","selectorGuids":["20a6580c-d0bf-e0df-d717-722d7e2cb454"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1606862693281},"a-122":{"id":"a-122","title":"Accordion close 2","actionItemGroups":[{"actionItems":[{"id":"a-122-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":true,"id":"65c28ee1b1ee0bfebe57f07c|9ba05589-0bc1-605d-e5bd-02c64ffc38d3"},"heightValue":96,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-122-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".acrd-icon","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f98378e"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-122-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".ol-fade-btm","selectorGuids":["20a6580c-d0bf-e0df-d717-722d7e2cb454"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1606866824674},"a-182":{"id":"a-182","title":"Accordion - Open 2","actionItemGroups":[{"actionItems":[{"id":"a-182-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".acrd_item-cont","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f983790"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"rem","locked":false}},{"id":"a-182-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".acrd_item-cont","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f983790"]},"value":"none"}}]},{"actionItems":[{"id":"a-182-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".acrd_item-cont","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f983790"]},"value":"block"}}]},{"actionItems":[{"id":"a-182-n-4","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":250,"target":{"useEventTarget":"SIBLINGS","selector":".acrd_item-cont","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f983790"]},"widthValue":100,"widthUnit":"%","heightUnit":"AUTO","locked":false}},{"id":"a-182-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":250,"target":{"useEventTarget":"CHILDREN","selector":".acrd-icon","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f98378e"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1663934233644},"a-183":{"id":"a-183","title":"Accordion - Close 2","actionItemGroups":[{"actionItems":[{"id":"a-183-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":250,"target":{"useEventTarget":"SIBLINGS","selector":".acrd_item-cont","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f983790"]},"widthValue":100,"heightValue":0,"widthUnit":"%","heightUnit":"px","locked":false}},{"id":"a-183-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":250,"target":{"useEventTarget":"CHILDREN","selector":".acrd-icon","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f98378e"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-183-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".acrd_item-cont","selectorGuids":["22f19174-9cd2-e14d-549e-2b1c8f983790"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1663934233644}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function POffer({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  heroImgAlt = "__wf_reserved_inherit",
  heroQrClick = {},
  heroMoreClick = {},
  hookSrc = "$1.50 Back",
  prodSrc = "Product Name goes here with line wrapping until four or five lines are here",
  brandSrc = "BrandName",
  detClick = {},
  typeSrc = "In Store",
  limitSrc = "limit 5",
  rewardSrc = "15 Qoins",
  endsSrc = "ends in 2d",
  detSrc = "Body copy goes here for the about section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  primeTxtSrc = "Clip",
  primeIcnSrc = "Addcirc",
  primeClick = {},
  scanClick = {},
  shareClick = {},
  muteClick = {},
  clipr = true,
  cliprMap,
  exampleClipper = true,
  exampleClprVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  exampleClprVizAlt = "__wf_reserved_inherit",
  exampleClprNameSrc = "FName LI",
  exampleClprSubtxtSrc = "@handle",
  exampleClprCellClick = {},
  selr = true,
  selrMap,
  exampleSeller = true,
  exampleSelrVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exampleSelrVizAlt = "__wf_reserved_inherit",
  exampleSelrNameSrc = "SellerName",
  exampleSelrHookSrc = "MainHook",
  exampleSelrCellClick = {},
  alt = true,
  altMap,
  exampleProdAlts = true,
  exampleAltVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  exampleAltVizAlt = "__wf_reserved_inherit",
  exampleAltNameSrc = "ProductName here with a wrap to a 2nd line and truncation at the second lines here with a line clamp",
  exampleAltPriceAmtSrc = "$00.00",
  exampleAltPriceAmtHSrc = "00.00",
  exampleAltPriceSeller1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exampleAltActClick = {},
  exampleAltCellClick = {},
  more = true,
  moreMap,
  exampleMore = true,
  exampleMoVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  exampleMoVizAlt = "__wf_reserved_inherit",
  exampleMoNameSrc = "ProductName here with a wrap to a 2nd line and truncation at the second lines here with a line clamp",
  exampleMoHookSrc = "$0.00",
  exampleMoByVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exampleMoTypeSrc = "offer type",
  exampleMoLimitSrc = "limit 2",
  exampleMoActClick = {},
  exampleMoCellClick = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-50-50")}
          id={_utils.cx(
            _styles,
            "w-node-_34816e06-9bb0-38ac-24ad-dedb0300f0f9-f4dc56fc"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-_34816e06-9bb0-38ac-24ad-dedb0300f0fa-f4dc56fc"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "bqg-qs-off-hero")}
              grid={{
                type: "section",
              }}
              tag="section"
            >
              <Hero
                imgSrc={heroImgSrc}
                imgAlt={heroImgAlt}
                icnBarIcnBarL1Click={heroQrClick}
                icnBarIcnBarR1Click={heroMoreClick}
                hline={false}
                icnBarIcnBarL1Clr="n500"
                icnBarIcnBarR1Clr="n500"
                heroAsp="1-1"
                fadeBtm={false}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-_34816e06-9bb0-38ac-24ad-dedb0300f0fb-f4dc56fc"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "offer-detail-sec")}
              grid={{
                type: "section",
              }}
              tag="section"
            >
              <ItmSecCta
                header={hookSrc}
                btnTxtSrc={primeTxtSrc}
                btnIcnSrc={primeIcnSrc}
                btnClick={primeClick}
                desc={prodSrc}
                linkSrc={brandSrc}
                linkClick={detClick}
                eyebrowSrc="get a deal"
                link={true}
              />
              <BtnBarSs
                btn1Click={scanClick}
                btn2Click={shareClick}
                btn5Click={muteClick}
                btn1TxtSrc="Check Barcode"
                btn1IcnSrc="scan_bc"
                btn2TxtSrc="Share"
                btn2IcnSrc="share"
                btn5IcnSrc="block"
                btn5TxtSrc="Mute"
                btn3={false}
                btn4={false}
              />
              <Spacer size="16" />
              <_Builtin.Block
                className={_utils.cx(_styles, "off-stack")}
                tag="div"
              >
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
                  lTxtClr="n500"
                  rTxtClr="n500"
                />
              </_Builtin.Block>
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "acrd_item")}
                tag="div"
                fs-accordion-element="accordion"
                delay="0"
                hover={false}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "acrd_item-trig")}
                  tag="div"
                  fs-accordion-element="trigger"
                  aria-controls="item-about"
                  aria-expanded="true"
                  role="button"
                  id="acrd-sec"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "acrd_header")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "sec-title-acrd")}
                      tag="div"
                    >
                      <_Builtin.Icon
                        className={_utils.cx(_styles, "acrd-icon")}
                        widget={{
                          type: "icon",
                          icon: "dropdown-toggle",
                        }}
                        fs-accordion-element="arrow"
                      />
                      <Label
                        icnLoc="r"
                        icn={false}
                        txtSrc="Offer Details"
                        lblSz="r2"
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "acrd_item-cont")}
                  tag="nav"
                  fs-accordion-element="content"
                  id="item-about"
                >
                  <Paragraph bodySrc={detSrc} />
                  <OlFade fadeBtm={true} />
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
            </_Builtin.Section>
            <SecPeep
              sec={clipr}
              conCellMap={cliprMap}
              conExampleCell={exampleClipper}
              exampleVizSrc={exampleClprVizSrc}
              exampleVizAlt={exampleClprVizAlt}
              exampleTitleSrc={exampleClprNameSrc}
              exampleSubtxtSrc={exampleClprSubtxtSrc}
              exampleCellClick={exampleClprCellClick}
              stats={false}
              secHeadTitleSrc="Clippers"
              secHeadTitleIcnSrc=""
              secHeadTitleIcn={false}
              exampleBtn={false}
              exampleCaptSubtxt={true}
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_34816e06-9bb0-38ac-24ad-dedb0300f0fc-f4dc56fc"
            )}
          >
            <GridSecBrand
              sec={selr}
              conCellMap={selrMap}
              conExampleBrands={exampleSeller}
              exampleVizSrc={exampleSelrVizSrc}
              exampleVizAlt={exampleSelrVizAlt}
              exampleCellClick={exampleSelrCellClick}
              exampleHookSrc={exampleSelrHookSrc}
              exampleNameSrc={exampleSelrNameSrc}
              secHeadTitleSrc="Sold At"
              conGrid3={true}
              conGrid5={false}
            />
            <SecProduct
              sec={alt}
              conCellMap={altMap}
              conExampleCell={exampleProdAlts}
              exampleVizSrc={exampleAltVizSrc}
              exampleVizAlt={exampleAltVizAlt}
              exampleNameSrc={exampleAltNameSrc}
              examplePriceAmtSrc={exampleAltPriceAmtSrc}
              examplePriceAmtHSrc={exampleAltPriceAmtHSrc}
              examplePriceSeller1Src={exampleAltPriceSeller1Src}
              exampleActClick={exampleAltActClick}
              exampleCellClick={exampleAltCellClick}
              secHeadTitleSrc="Alternative Products"
              examplePriceSeller2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
              examplePriceSeller3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif"
              examplePriceSeller2={false}
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_9134afcc-7c96-135a-5a31-25da70332849-f4dc56fc"
            )}
          >
            <GridSecOffer
              sec={more}
              conCellMap={moreMap}
              conCellExample={exampleMore}
              exampleVizSrc={exampleMoVizSrc}
              exampleVizAlt={exampleMoVizAlt}
              exampleTypeSrc={exampleMoTypeSrc}
              exampleLimitSrc={exampleMoLimitSrc}
              exampleActClick={exampleMoActClick}
              exampleCellClick={exampleMoCellClick}
              exampleByVizSrc={exampleMoByVizSrc}
              exampleHookSrc={exampleMoHookSrc}
              exampleNameSrc={exampleMoNameSrc}
              secHeadTitleSrc="More Deals"
              conGrid3={true}
              conGrid5={false}
            />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
