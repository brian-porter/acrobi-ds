"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Spacer.module.css";

export function Spacer({
  as: _Component = _Builtin.Block,
  size = "0",
  szDep = "16",
}) {
  const _styleVariantMap = {
    0: "",
    1: "w-variant-8a5f6e5d-bbef-cc1c-68ce-3b59a32be1b7",
    8: "w-variant-eebe72dd-fde8-94eb-2ed5-6da540893aa8",
    16: "w-variant-10da6dc4-fb45-0010-edbf-a7904ecba2d7",
    24: "w-variant-359dd8e9-a93e-936d-3c0c-948510ed60d8",
    32: "w-variant-5794c7aa-d76b-b1ca-87e0-a2f83a75586b",
    40: "w-variant-95ae253a-bd74-459a-bbd8-ba430361bd31",
    48: "w-variant-32625d59-783a-b416-add1-6202dfbec895",
    56: "w-variant-907b6a25-e302-af88-3916-7ec753b44551",
    64: "w-variant-4860724b-7478-3845-1153-cedab3b410be",
    80: "w-variant-8366c044-9b9e-657e-3358-9054138598d6",
  };

  const _activeStyleVariant = _styleVariantMap[size];

  return (
    <_Component
      className={_utils.cx(_styles, "spacer", _activeStyleVariant)}
      tag="div"
      sp-size={szDep}
    />
  );
}
