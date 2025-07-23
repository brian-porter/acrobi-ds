"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Img } from "./Img";
import { Label } from "./Label";
import { Chiclet } from "./Chiclet";
import { Avatar } from "./Avatar";
import * as _utils from "./utils";
import _styles from "./MrkNav.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-912":{"id":"e-912","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-195","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-913"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"35d7a437-a090-7000-c8d7-cd6b6a4f9615","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"35d7a437-a090-7000-c8d7-cd6b6a4f9615","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1748548288429}},"actionLists":{"a-195":{"id":"a-195","title":"BQ-Dialog-Open","actionItemGroups":[{"actionItems":[{"id":"a-195-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"id":"cd25656a-27bc-2427-e81d-4e8f34f13922"},"value":0,"unit":""}},{"id":"a-195-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"id":"cd25656a-27bc-2427-e81d-4e8f34f13922"},"value":"none"}}]},{"actionItems":[{"id":"a-195-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"outQuad","duration":200,"target":{"id":"cd25656a-27bc-2427-e81d-4e8f34f13922"},"value":1,"unit":""}},{"id":"a-195-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"id":"cd25656a-27bc-2427-e81d-4e8f34f13922"},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1748548038795}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function MrkNav({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "mrk_bbc")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "bbc-container")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "bbc-shell")}
          tag="nav"
          data-bs="s"
        >
          <_Builtin.Block className={_utils.cx(_styles, "bbc_wrap")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "bbc_main")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "bbc_lead")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "bbc_l1")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "mrk-bbc_logo")}
                    tag="div"
                    data-chic-size="l"
                    data-chic-style="nl"
                    role="button"
                    x-disabled="false"
                    data-chic-active="false"
                    data-chic-multi=""
                  >
                    <Img
                      imgSz="s"
                      imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/683a15f407cf58e120434cf5_c-logo-blue.svg"
                    />
                    <_Builtin.Link
                      className={_utils.cx(_styles, "link-block-3")}
                      button={false}
                      block="inline"
                      options={{
                        href: "#",
                      }}
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "bbc_prime")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "bbc-bar")}
                  tag="div"
                >
                  <_Builtin.List
                    className={_utils.cx(_styles, "nav-marketing")}
                    tag="ul"
                    unstyled={true}
                  >
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "mrk-bbc-itm")}
                      data-active=""
                    >
                      <Label
                        lblGap="4"
                        txtSrc="Home"
                        icn={false}
                        txt={true}
                        icnSrc="snip"
                        lblSz="r1"
                        lblClr="n900"
                      />
                      <_Builtin.Link
                        className={_utils.cx(_styles, "bbc-itm-link")}
                        button={false}
                        block="inline"
                        options={{
                          href: "#",
                        }}
                      />
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "mrk-bbc-itm")}
                      data-active=""
                    >
                      <Label
                        lblGap="4"
                        txtSrc="Challenge"
                        icn={false}
                        txt={true}
                        icnSrc="snip"
                        lblSz="r1"
                        lblClr="n900"
                      />
                      <_Builtin.Link
                        className={_utils.cx(_styles, "bbc-itm-link")}
                        button={false}
                        block="inline"
                        options={{
                          href: "#",
                        }}
                      />
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "mrk-bbc-itm")}
                      data-active=""
                    >
                      <Label
                        lblGap="4"
                        txtSrc="Solution"
                        icn={false}
                        txt={true}
                        icnSrc="snip"
                        lblSz="r1"
                        lblClr="n900"
                      />
                      <_Builtin.Link
                        className={_utils.cx(_styles, "bbc-itm-link")}
                        button={false}
                        block="inline"
                        options={{
                          href: "#",
                        }}
                      />
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "mrk-bbc-itm")}
                      data-active=""
                    >
                      <Label
                        lblGap="4"
                        txtSrc="Contribute"
                        icn={false}
                        txt={true}
                        icnSrc="snip"
                        lblSz="r1"
                        lblClr="n900"
                      />
                      <_Builtin.Link
                        className={_utils.cx(_styles, "bbc-itm-link")}
                        button={false}
                        block="inline"
                        options={{
                          href: "#",
                        }}
                      />
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "mrk-bbc-itm")}
                      data-active=""
                    >
                      <Label
                        lblGap="4"
                        txtSrc="About"
                        icn={false}
                        txt={true}
                        icnSrc="snip"
                        lblSz="r1"
                        lblClr="n900"
                      />
                      <_Builtin.Link
                        className={_utils.cx(_styles, "bbc-itm-link")}
                        button={false}
                        block="inline"
                        options={{
                          href: "#",
                        }}
                      />
                    </_Builtin.ListItem>
                  </_Builtin.List>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "side-fade")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "side-fade-l")}
                      tag="div"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "side-fade-r")}
                      tag="div"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "bbc_trail")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "bbc_l1-auth")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "bbc_sign-in")}
                    data-w-id="35d7a437-a090-7000-c8d7-cd6b6a4f9615"
                    tag="div"
                  >
                    <Chiclet
                      chiclet={true}
                      lblIcnSrc="default"
                      chicSz="l"
                      chicStyl="pf"
                      lblClr="n000"
                      chicClick={{}}
                      lblIcn={false}
                      lblTxt={true}
                      lblTxtSrc="Join Us"
                      lblSz="r2"
                      chicId="openModalLink"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
