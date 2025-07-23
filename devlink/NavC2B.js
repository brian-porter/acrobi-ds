"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { NavDrop } from "./NavDrop";
import { NavDropMega } from "./NavDropMega";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import * as _utils from "./utils";
import _styles from "./NavC2B.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-123":{"id":"e-123","name":"","animationType":"preset","eventTypeId":"NAVBAR_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-47","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-124"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8a3f71d3-8820-6487-6e50-f7db063e65e5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8a3f71d3-8820-6487-6e50-f7db063e65e5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666844732557},"e-124":{"id":"e-124","name":"","animationType":"preset","eventTypeId":"NAVBAR_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-52","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-123"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8a3f71d3-8820-6487-6e50-f7db063e65e5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8a3f71d3-8820-6487-6e50-f7db063e65e5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666844732557},"e-875":{"id":"e-875","name":"","animationType":"preset","eventTypeId":"NAVBAR_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-169","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-876"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"677a365d-9657-71a9-4e3f-742331e2e975","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"677a365d-9657-71a9-4e3f-742331e2e975","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715009599450},"e-876":{"id":"e-876","name":"","animationType":"preset","eventTypeId":"NAVBAR_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-170","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-875"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"677a365d-9657-71a9-4e3f-742331e2e975","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"677a365d-9657-71a9-4e3f-742331e2e975","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715009599450}},"actionLists":{"a-47":{"id":"a-47","title":"Navbar 1 [Open Menu]","actionItemGroups":[{"actionItems":[{"id":"a-47-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"inOutQuint","duration":200,"target":{},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}},{"id":"a-47-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"yValue":-8,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-47-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".rl_menu-icon_line-top","selectorGuids":["209c3d5b-ee77-3933-21df-8ea058cd2ef8"]},"yValue":8,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-47-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{"useEventTarget":"CHILDREN","selector":".rl_menu-icon_line-top","selectorGuids":["209c3d5b-ee77-3933-21df-8ea058cd2ef8"]},"zValue":-45,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-47-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"zValue":45,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626168378054},"a-52":{"id":"a-52","title":"Navbar 1 [Close Menu]","actionItemGroups":[{"actionItems":[{"id":"a-52-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-52-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{"useEventTarget":"CHILDREN","selector":".rl_menu-icon_line-top","selectorGuids":["209c3d5b-ee77-3933-21df-8ea058cd2ef8"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-52-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-52-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".rl_menu-icon_line-top","selectorGuids":["209c3d5b-ee77-3933-21df-8ea058cd2ef8"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-52-n-5","actionTypeId":"STYLE_SIZE","config":{"delay":400,"easing":"inOutQuint","duration":200,"target":{},"widthValue":24,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626168766736},"a-169":{"id":"a-169","title":"Navbar 1 [Open Menu] 7","actionItemGroups":[{"actionItems":[{"id":"a-169-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"inOutQuint","duration":200,"target":{},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}},{"id":"a-169-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"yValue":-8,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-169-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"yValue":8,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-169-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"zValue":-45,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-169-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"zValue":45,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626168378054},"a-170":{"id":"a-170","title":"Navbar 1 [Close Menu] 7","actionItemGroups":[{"actionItems":[{"id":"a-170-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-170-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-170-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-170-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-170-n-5","actionTypeId":"STYLE_SIZE","config":{"delay":400,"easing":"inOutQuint","duration":200,"target":{},"widthValue":24,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626168766736}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function NavC2B({
  as: _Component = _Builtin.NavbarWrapper,
  brandIcnSrc = "Bq",
  brandTxtSrc = "BlueQueue",
  brandClick = {},
  menuMap,
  signUp = true,
  signInClick = {},
  signUpClick = {},
  account = false,
  accAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c791c_me_280.avif",
  accClick = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "a-navbar")}
      data-w-id="677a365d-9657-71a9-4e3f-742331e2e975"
      tag="div"
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      fs-scrolldisable-element="smart-nav"
      config={{
        animation: "default",
        easing: "ease-in-out",
        easing2: "ease-in-out",
        duration: 300,
        docHeight: false,
        collapse: "small",
        noScroll: false,
      }}
    >
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.nb-dd-list.w--open%20%7B%0A%20%20%20%20background-color%3A%20%23FFF%3B%0A%20%20%20%20border%3A%200px%20solid%20%23FFF%3B%0A%20%20%20%20padding%3A%200rem%3B%0A%7D%0A%3C%2Fstyle%3E" />
      <_Builtin.Block className={_utils.cx(_styles, "nb-container")} tag="div">
        <_Builtin.NavbarBrand
          className={_utils.cx(_styles, "nb-brand")}
          options={{
            href: "#",
          }}
          {...brandClick}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "h2", "logo")}
            tag="div"
          >
            {brandIcnSrc}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "h4", "wordmark")}
            tag="div"
          >
            {brandTxtSrc}
          </_Builtin.Block>
        </_Builtin.NavbarBrand>
        <_Builtin.NavbarMenu
          className={_utils.cx(_styles, "nb-menu-wrap")}
          tag="nav"
          role="navigation"
        >
          <_Builtin.Block className={_utils.cx(_styles, "nb-menu")} tag="nav">
            {menuMap ?? (
              <>
                <NavDrop
                  navBtn={true}
                  navBtnClick={{}}
                  navItmMap=""
                  navItmClick={{}}
                  navItmTxtSrc="Menu Item"
                  navItmIcnSrc="default"
                />
                <NavDropMega navBtnTxtSrc="Nav" navBtnIcnSrc="default" />
              </>
            )}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "nb-access")} tag="div">
            {signUp ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "nb-signup")}
                tag="div"
              >
                <Button
                  btnClick={signInClick}
                  btnTxtSrc="Sign In"
                  btnStyl="nl"
                  btnIcn={false}
                />
                <Button
                  btnClick={signUpClick}
                  btnIcn={false}
                  btnTxtSrc="Sign Up"
                  btnStyl="pf"
                />
              </_Builtin.Block>
            ) : null}
            {account ? (
              <_Builtin.Link
                className={_utils.cx(_styles, "nb-account")}
                button={false}
                block="inline"
                options={{
                  href: "#",
                }}
                {...accClick}
              >
                <Avatar avtrSz="s" />
              </_Builtin.Link>
            ) : null}
          </_Builtin.Block>
        </_Builtin.NavbarMenu>
        <_Builtin.NavbarButton
          className={_utils.cx(_styles, "nb-hburger-btn")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "menu-icon")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "rl_menu-icon_line-top")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "menu-icon_line-mid")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "menu-icon_line-mid-inner")}
                tag="div"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "menu-icon_line-btm")}
              tag="div"
            />
          </_Builtin.Block>
        </_Builtin.NavbarButton>
      </_Builtin.Block>
    </_Component>
  );
}
