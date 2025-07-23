"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CardPeepData } from "./CardPeepData";
import * as _utils from "./utils";
import _styles from "./P1Grid.module.css";

export function P1Grid({
  as: _Component = _Builtin.Grid,
  slotId = "obj-data",
  p1Grid = true,
  p1Map,
  p1Example = true,
  p1Group = true,
  p1Peep = false,
  p1GroupImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  p1PeepAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  p1PeepAvtrBdgClr = "on",
  p1GroupImgAlt,
  p1ProfName = "ProfName",
  p1ProfClick = {},
  p1ChatBtnClick = {},
  p1MoreBtnClick = {},
  p1ListQty = "0",
  p1LsAdpt1IcnSrc = "Default",
  p1LsAdpt1BgClr = "n300",
  p1LsAdpt2BgClr = "n300",
  p1LsAdpt2CnSrc = "Default",
  p1LsAdpt3BgClr = "n300",
  p1LsAdpt3IcnSrc = "Default",
  p1ListClick = {},
  p1PeepQty = "0",
  p1PeepAvtr1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  p1PeepAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  p1PeepAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  p1PeepClick = {},
  p1CalQty = "0",
  p1CalAdpt1IcnSrc = "Default",
  p1CalAdpt1BgClr = "n300",
  p1CalAdpt2BgClr = "n300",
  p1CalAdpt2CnSrc = "Default",
  p1CalAdpt3BgClr = "n300",
  p1CalAdpt3IcnSrc = "Default",
  p1CalClick = {},
  exampleCell = true,
}) {
  return p1Grid ? (
    <_Component
      className={_utils.cx(_styles, "grid-peep-act")}
      tag="div"
      id="obj-data"
    >
      {p1Map ??
        (exampleCell ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "example-cell")}
            id={_utils.cx(
              _styles,
              "w-node-fc7ad752-e8e8-6059-f257-dbb137828cc2-3ebee3c1"
            )}
            tag="div"
          >
            <CardPeepData />
          </_Builtin.Block>
        ) : null)}
    </_Component>
  ) : null;
}
