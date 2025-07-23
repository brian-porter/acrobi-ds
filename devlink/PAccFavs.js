"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { SecFav } from "./SecFav";
import * as _utils from "./utils";
import _styles from "./PAccFavs.module.css";

export function PAccFavs({
  as: _Component = _Builtin.Block,
  storeAddClick = {},
  placeAddClick = {},
  brandAddClick = {},
  prodAddClick = {},
  offerAddClick = {},
  creatorAddClick = {},
  offerMap,
  placeMap,
  brandMap,
  prodMap,
  creatorMap,
  exampleStore = true,
  examplePlace = true,
  exampleBrand = true,
  exampleProduct = true,
  exampleOffer = true,
  exampleCreator = true,
  placeVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  placeVizAlt = "__wf_reserved_inherit",
  placeTitleSrc = "PlaceName",
  placeSubtxtSrc = "address",
  placeClick = {},
  placeMoreClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-50-50")}
          id={_utils.cx(
            _styles,
            "w-node-_9d0af86e-e41f-0755-a430-527c57d7f817-580d694d"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_9d0af86e-e41f-0755-a430-527c57d7f818-580d694d"
            )}
          >
            <SecHead titleSrc="Favorites" sz="xl" titleSz="h4b" act1={false} />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_9d0af86e-e41f-0755-a430-527c57d7f81c-580d694d"
            )}
          >
            <SecFav
              secAddClick={storeAddClick}
              conFavMap={offerMap}
              conExampleFavorite={exampleStore}
              exampleSubtxtSrc="@handle"
              exampleTitleSrc="StoreName"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_7181ebe2-2096-d976-819b-59abcde13eb8-580d694d"
            )}
          >
            <SecFav
              secAddClick={placeAddClick}
              conFavMap={placeMap}
              conExampleFavorite={examplePlace}
              exampleVizSrc={placeVizSrc}
              exampleTitleSrc={placeTitleSrc}
              exampleSubtxtSrc={placeSubtxtSrc}
              exampleVizAlt={placeVizAlt}
              exampleFavClick={placeClick}
              exampleFavMoreClick={placeMoreClick}
              secHeadTitleIcnSrc="place"
              secHeadTitleSrc="Places"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_815df77c-ef3c-cd2b-212d-d06a7f82f20f-580d694d"
            )}
          >
            <SecFav
              secAddClick={brandAddClick}
              conFavMap={brandMap}
              conExampleFavorite={exampleBrand}
              secHeadTitleIcnSrc="brand"
              secHeadTitleSrc="Brands"
              exampleTitleSrc="BrandName"
              exampleSubtxtSrc="@handle"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-a19c1bc0-30ff-aad0-f5e5-396119886c5c-580d694d"
            )}
          >
            <SecFav
              secAddClick={prodAddClick}
              conFavMap={prodMap}
              conExampleFavorite={exampleProduct}
              secHeadTitleIcnSrc="prod"
              secHeadTitleSrc="Products"
              exampleTitleSrc="ProductName"
              exampleSubtxtSrc="@handle"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_4facd819-4ec5-0f48-a2ce-5228df4c13ba-580d694d"
            )}
          >
            <SecFav
              secAddClick={offerAddClick}
              conFavMap={offerMap}
              conExampleFavorite={exampleOffer}
              secHeadTitleIcnSrc="offer"
              secHeadTitleSrc="Offers"
              exampleTitleSrc="Offer Hook"
              exampleSubtxtSrc="$0.00"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-c2532257-c4d0-12f5-e8d8-493e9bfffe9f-580d694d"
            )}
          >
            <SecFav
              secAddClick={creatorAddClick}
              conFavMap={creatorMap}
              conExampleFavorite={exampleCreator}
              secHeadTitleIcnSrc="peep"
              secHeadTitleSrc="Creators"
              exampleVizImg={false}
              exampleVizAvtr={true}
              exampleVizSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
              exampleTitleSrc="FName LName"
              exampleSubtxtSrc="@handle"
            />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
