"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import * as _utils from "./utils";
import _styles from "./SecFav.module.css";

export function SecFav({
  as: _Component = _Builtin.Section,
  secHeadTitleIcnSrc = "store",
  sec = true,
  secHeadTitleSrc = "Stores",
  secAddClick = {},
  conFavMap,
  conExampleFavorite = true,
  exampleVizImg = true,
  exampleVizAvtr = false,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleTitleSrc = "ObjectName",
  exampleSubtxtSrc = "@handle or address or price",
  exampleFavClick = {},
  exampleFavMoreClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "sec-fav")}
      grid={{
        type: "section",
      }}
      tag="section"
      data-shadow="y"
    >
      <SecHead
        act1Click={secAddClick}
        titleSrc={secHeadTitleSrc}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1TxtSrc="Add"
        act1Icn={true}
        act1Txt={true}
        act1IcnSrc="act_addcirc"
        titleIcn={true}
        act1Styl="pl"
      />
      <List listItmMap={conFavMap} exampleListItm={false} />
      <ListItmCtrl
        lLImg={exampleVizImg}
        pPTitleSrc={exampleTitleSrc}
        pPSubtxtSrc={exampleSubtxtSrc}
        listItem={conExampleFavorite}
        primeClick={exampleFavClick}
        trailClick={exampleFavMoreClick}
        lLImgSrc={exampleVizSrc}
        lLImgAlt={exampleVizAlt}
        lLAvtrSrc={exampleVizSrc}
        lLAvtrAlt={exampleVizAlt}
        lLAvtr={exampleVizAvtr}
        tTIcn={true}
        listItemClick={{}}
      />
    </_Component>
  ) : null;
}
