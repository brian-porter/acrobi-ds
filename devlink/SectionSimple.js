"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalSectionSpace } from "./GlobalSectionSpace";
import * as _utils from "./utils";
import _styles from "./SectionSimple.module.css";

export function SectionSimple({
  as: _Component = _Builtin.Section,
  styleTheme = "Inherit",
  stylePaddingTop = null,
  stylePaddingBottom = null,
}) {
  const _styleVariantMap = {
    Inherit: "",
    Light: "w-variant-04cc9da7-f72c-daa8-85dd-07e7e2ecf321",
    Dark: "w-variant-fcdf3d17-023a-6766-3950-01aa3ba965a7",
  };

  const _activeStyleVariant = _styleVariantMap[styleTheme];

  return (
    <_Component
      tag="section"
      grid={{
        type: "section",
      }}
    >
      <GlobalSectionSpace sectionSpace={stylePaddingTop} />
      <_Builtin.Block
        className={_utils.cx(_styles, "u-container", _activeStyleVariant)}
        tag="div"
      />
      <GlobalSectionSpace sectionSpace={stylePaddingBottom} />
    </_Component>
  );
}
