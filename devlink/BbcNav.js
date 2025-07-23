"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { BbcNavItm } from "./BbcNavItm";
import * as _utils from "./utils";
import _styles from "./BbcNav.module.css";

export function BbcNav({
  as: _Component = _Builtin.Block,
  nav = true,
  navItmMap,
  exampleNav = true,
  exampleItmIcn = true,
  exampleItmTxt = true,
  exampleItmIcnSrc = "default",
  exampleItmTxtSrc = "NavItm",
  exampleItmSz = "r2",
  exampleItmClr = "n900",
  exampleItmClick = {},
  exampleActive,
  marketing = false,
}) {
  return nav ? (
    <_Component className={_utils.cx(_styles, "bbc-bar")} tag="div">
      {exampleNav ? (
        <_Builtin.List
          className={_utils.cx(_styles, "bbc-ss")}
          tag="ul"
          unstyled={true}
        >
          {navItmMap ?? (
            <>
              <BbcNavItm
                itm={exampleNav}
                itmSz={exampleItmSz}
                itmTxtSrc={exampleItmTxtSrc}
                itmIcnSrc={exampleItmIcnSrc}
                itmClr={exampleItmClr}
                itmIcn={exampleItmIcn}
                itmTxt={exampleItmTxt}
                itmClick={exampleItmClick}
                active={exampleActive}
              />
              <BbcNavItm itm={exampleNav} itmSz="r2" itmTxtSrc="NavItm" />
              <BbcNavItm itm={exampleNav} itmSz="r2" itmTxtSrc="NavItm" />
              <BbcNavItm itm={exampleNav} itmSz="r2" itmTxtSrc="NavItm" />
              <BbcNavItm itm={exampleNav} itmSz="r2" itmTxtSrc="NavItm" />
              <BbcNavItm itm={exampleNav} itmSz="r2" itmTxtSrc="NavItm" />
              <BbcNavItm itm={exampleNav} itmSz="r2" itmTxtSrc="NavItm" />
            </>
          )}
        </_Builtin.List>
      ) : null}
      {marketing ? (
        <_Builtin.List
          className={_utils.cx(_styles, "nav-marketing")}
          tag="ul"
          unstyled={true}
        >
          <BbcNavItm
            itm={true}
            itmSz="r2"
            itmTxtSrc="Intro"
            itmIcnSrc="snip"
            itmClr="n900"
            itmIcn={false}
            itmTxt={true}
            itmClick={{}}
            active=""
            itmLink={true}
            itmLinkSrc={{
              href: "#",
            }}
          />
          <BbcNavItm
            itm={true}
            itmSz="r2"
            itmTxtSrc="Challenge"
            itmIcnSrc="profile"
            itmClr="n900"
            itmIcn={false}
            itmTxt={true}
            itmClick={{}}
            active=""
            itmLink={true}
            itmLinkSrc={{
              href: "#",
            }}
          />
          <BbcNavItm
            itm={true}
            itmSz="r2"
            itmTxtSrc="Solution"
            itmIcnSrc="security"
            itmClr="n900"
            itmIcn={false}
            itmTxt={true}
            itmClick={{}}
            active=""
            itmLink={true}
            itmLinkSrc={{
              href: "#",
            }}
          />
          <BbcNavItm
            itm={true}
            itmSz="r2"
            itmTxtSrc="Contribute"
            itmIcnSrc="favs"
            itmClr="n900"
            itmIcn={false}
            itmTxt={true}
            itmClick={{}}
            active=""
            itmLink={true}
            itmLinkSrc={{
              href: "#",
            }}
          />
          <BbcNavItm
            itm={true}
            itmSz="r2"
            itmTxtSrc="About"
            itmIcnSrc="setting"
            itmClr="n900"
            itmIcn={false}
            itmTxt={true}
            itmClick={{}}
            active=""
            itmLink={true}
            itmLinkSrc={{
              href: "#",
            }}
          />
        </_Builtin.List>
      ) : null}
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
    </_Component>
  ) : null;
}
