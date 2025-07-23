"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./Tabs.module.css";

export function Tabs({
  as: _Component = _Builtin.Block,
  tabMap,
  tabUline,
  tab1Txt = true,
  tab1Icn = true,
  tab1TxtSrc = "Tab 1",
  tab1IcnSrc = "default",
  tab2Txt = true,
  tab2Icn = true,
  tab2TxtSrc = "Tab 2",
  tab2IcnSrc = "default",
  tab3Txt = true,
  tab3Icn = true,
  tab3TxtSrc = "Tab 3",
  tab3IcnSrc = "default",
  tab4Txt = true,
  tab4Icn = true,
  tab4TxtSrc = "Tab 4",
  tab4IcnSrc = "default",
  tab5Txt = true,
  tab5Icn = true,
  tab5TxtSrc = "Tab 5",
  tab5IcnSrc = "default",
  tab6Txt = true,
  tab6Icn = true,
  tab6TxtSrc = "Tab 6",
  tab6IcnSrc = "default",
  tabContMap,
}) {
  return (
    <_Component className={_utils.cx(_styles, "tabs-wrap")} tag="div">
      <_Builtin.TabsWrapper
        className={_utils.cx(_styles, "tabs")}
        data-duration-in="300"
        data-duration-out="100"
        data-tab-underline={tabUline}
        current="1"
        easing="ease-in-out"
        fadeIn={300}
        fadeOut={100}
      >
        <_Builtin.TabsMenu
          className={_utils.cx(_styles, "tab-menu", "u-side-scroll")}
          tag="div"
        >
          {tabMap ?? (
            <>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "tab-link")}
                data-w-tab="1"
                block="inline"
              >
                <Label
                  txtSrc={tab1TxtSrc}
                  icnSrc={tab1IcnSrc}
                  txt={tab1Txt}
                  icn={tab1Icn}
                />
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "tab-link")}
                data-w-tab="2"
                block="inline"
              >
                <Label
                  txtSrc={tab2TxtSrc}
                  icnSrc={tab2IcnSrc}
                  txt={tab2Txt}
                  icn={tab2Icn}
                />
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "tab-link")}
                data-w-tab="3"
                block="inline"
              >
                <Label
                  txtSrc={tab3TxtSrc}
                  icnSrc={tab3IcnSrc}
                  txt={tab3Txt}
                  icn={tab3Icn}
                />
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "tab-link")}
                data-w-tab="4"
                block="inline"
              >
                <Label
                  txtSrc={tab4TxtSrc}
                  icnSrc={tab4IcnSrc}
                  txt={tab4Txt}
                  icn={tab4Icn}
                />
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "tab-link")}
                data-w-tab="5"
                block="inline"
              >
                <Label
                  txtSrc={tab5TxtSrc}
                  icnSrc={tab5IcnSrc}
                  txt={tab5Txt}
                  icn={tab5Icn}
                />
              </_Builtin.TabsLink>
              <_Builtin.TabsLink
                className={_utils.cx(_styles, "tab-link")}
                data-w-tab="6"
                block="inline"
              >
                <Label
                  txtSrc={tab6TxtSrc}
                  icnSrc={tab6IcnSrc}
                  txt={tab6Txt}
                  icn={tab6Icn}
                />
              </_Builtin.TabsLink>
            </>
          )}
        </_Builtin.TabsMenu>
        <_Builtin.TabsContent
          className={_utils.cx(_styles, "tab-content")}
          tag="div"
        >
          {tabContMap ?? (
            <>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "tab-detail")}
                tag="div"
                data-w-tab="1"
              >
                <_Builtin.Heading tag="h1">{"Heading 1"}</_Builtin.Heading>
              </_Builtin.TabsPane>
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "tab-detail")}
                tag="div"
                data-w-tab="2"
              />
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "tab-detail")}
                tag="div"
                data-w-tab="3"
              />
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "tab-detail")}
                tag="div"
                data-w-tab="4"
              />
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "tab-detail")}
                tag="div"
                data-w-tab="5"
              />
              <_Builtin.TabsPane
                className={_utils.cx(_styles, "tab-detail")}
                tag="div"
                data-w-tab="6"
              />
            </>
          )}
        </_Builtin.TabsContent>
      </_Builtin.TabsWrapper>
    </_Component>
  );
}
