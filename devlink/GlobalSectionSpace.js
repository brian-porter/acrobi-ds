"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalSectionSpace.module.css";

export function GlobalSectionSpace({
  as: _Component = _Builtin.Block,
  sectionSpace = "None",
}) {
  const _styleVariantMap = {
    None: "",
    Even: "w-variant-00843078-7ce6-b975-abf9-1014d965425a",
    Small: "w-variant-bb6c054c-397c-2aa5-6897-4672b5c32300",
    Main: "w-variant-c8734953-ec55-5423-0c1e-d1977af733f2",
    Large: "w-variant-40f51d7c-3e5a-6629-c2f8-67d0bc1d21a1",
    "Page Top": "w-variant-80e0edf9-8fd0-8268-a3ab-ea1edb4439c3",
  };

  const _activeStyleVariant = _styleVariantMap[sectionSpace];

  return (
    <_Component
      className={_utils.cx(_styles, "g_section_space", _activeStyleVariant)}
      tag="div"
    />
  );
}
