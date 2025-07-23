"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { EmptyBar } from "./EmptyBar";
import { Cell } from "./Cell";
import * as _utils from "./utils";
import _styles from "./PlaceChoiceSs.module.css";

export function PlaceChoiceSs({
  as: _Component = _Builtin.Block,
  sideFade = true,
  cellMap,
  cellExample = true,
  exampleCellActv = false,
  exampleVizSrc = "home",
  exampleVizSz = "l",
  exampleVizClr = "n500",
  exampleCapt = true,
  exampleCaptTitleSrc = "PlaceName",
  exampleCaptSubtxtSrc = "address",
  exampleCaptSub2Src = "city, {ST} zip",
  exampleCellSz = "3xl",
  exampleCellCard = "true",
  exampleCellClick = {},
  emptyEmpty = false,
  emptyIcnSrc = "geo_myloc",
  emptyHlineSrc = "Find Me",
  emptySubTxtSrc = "Locate the address you're at now",
  emptyCtaTxtSrc = "Ok, Let's Do It",
  emptyEmptyClick = {},
  slotId = "places",
}) {
  return (
    <_Component className={_utils.cx(_styles, "place-ss")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "u-bar-ss")}
        tag="div"
        id={slotId}
      >
        {cellMap ?? (
          <>
            <EmptyBar
              empty={emptyEmpty}
              hlineSrc={emptyHlineSrc}
              subTxtSrc={emptySubTxtSrc}
              ctaTxtSrc={emptyCtaTxtSrc}
              icnSrc={emptyIcnSrc}
              click={emptyEmptyClick}
            />
            <Cell
              caption={exampleCapt}
              cellCard={exampleCellCard}
              icnIcnClr={exampleVizClr}
              capStkRow1Src={exampleCaptTitleSrc}
              capStkRow2Src={exampleCaptSubtxtSrc}
              capStkRow3Src={exampleCaptSub2Src}
              cellSz={exampleCellSz}
              icnIcnSrc={exampleVizSrc}
              icnIcnSz={exampleVizSz}
              cell={cellExample}
              cellActv={exampleCellActv}
              cellClick={exampleCellClick}
              vizImg={false}
              vizIcn={true}
              captionCapStk={true}
              capStkRow1Clr="n999"
              capStkRow2={true}
              capStkRow3={true}
              capStkRow1Sz="r3"
              capStkRow2Clr="n700"
              capStkRow3Clr="n700"
              cellId="places"
            />
            <Cell
              caption={exampleCapt}
              cellCard={exampleCellCard}
              capStkRow2Src={exampleCaptSubtxtSrc}
              capStkRow3Src={exampleCaptSub2Src}
              cellSz={exampleCellSz}
              icnIcnSz={exampleVizSz}
              cell={cellExample}
              cellClick={exampleCellClick}
              vizImg={false}
              vizIcn={true}
              icnIcnClr="n500"
              captionCapStk={true}
              capStkRow1Clr="n999"
              capStkRow1Src="Office"
              capStkRow2={true}
              capStkRow3={true}
              capStkRow1Sz="r3"
              capStkRow2Clr="n700"
              capStkRow3Clr="n700"
              icnIcnSrc="office"
              cellActv={false}
            />
          </>
        )}
      </_Builtin.Block>
      {sideFade ? (
        <_Builtin.Block className={_utils.cx(_styles, "side-fade")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "side-fade-l")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "side-fade-r")}
            tag="div"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
