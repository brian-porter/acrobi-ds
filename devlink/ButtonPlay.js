"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalClickable } from "./GlobalClickable";
import * as _utils from "./utils";
import _styles from "./ButtonPlay.module.css";

export function ButtonPlay({
  as: _Component = _Builtin.Block,
  visibility = true,
  buttonStyle = "Primary",
  text = "Play",

  link = {
    href: "#",
  },
}) {
  const _styleVariantMap = {
    Primary: "",
    Secondary: "w-variant-0c361cd9-46ea-a565-986a-599d766a45ab",
  };

  const _activeStyleVariant = _styleVariantMap[buttonStyle];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "btn_play_wrap", _activeStyleVariant)}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "btn_play_icon", _activeStyleVariant)}
        tag="div"
        aria-hidden="true"
      >
        <_Builtin.DOM
          className={_utils.cx(
            _styles,
            "btn_play_play",
            "u-cover-absolute",
            _activeStyleVariant
          )}
          tag="svg"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 1393 1394"
          fill="none"
        >
          <_Builtin.DOM
            tag="path"
            d="M1271 696.5L280 1393L280 -4.3318e-05L1271 696.5Z"
            fill="currentColor"
          />
        </_Builtin.DOM>
        <_Builtin.DOM
          className={_utils.cx(
            _styles,
            "btn_play_pause",
            "u-cover-absolute",
            _activeStyleVariant
          )}
          tag="svg"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 898 1277"
          fill="none"
        >
          <_Builtin.DOM
            tag="rect"
            x="577"
            width="321"
            height="1277"
            fill="currentColor"
          />
          <_Builtin.DOM
            tag="rect"
            width="321"
            height="1277"
            fill="currentColor"
          />
        </_Builtin.DOM>
      </_Builtin.Block>
      <GlobalClickable text={text} link={link} />
    </_Component>
  ) : null;
}
