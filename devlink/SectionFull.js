"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalSectionSpace } from "./GlobalSectionSpace";
import { Eyebrow } from "./Eyebrow";
import { GlobalHeading } from "./GlobalHeading";
import { GlobalParagraph } from "./GlobalParagraph";
import { GlobalBtnGroup } from "./GlobalBtnGroup";
import { Visual } from "./Visual";
import * as _utils from "./utils";
import _styles from "./SectionFull.module.css";

export function SectionFull({
  as: _Component = _Builtin.Section,
  theme = "Inherit",
  paddingTop = "Inherit",
  paddingBottom = "Inherit",
  eyebrowEyebrowVisibility = true,
  eyebrowEyebrowText = "",
  globalHeadingHeadingText = "",
  globalParagraphParagraphVisibility = true,
  globalParagraphParagraphText = "",
  globalButtonGroupGroupVisibility = true,
}) {
  const _styleVariantMap = {
    Inherit: "",
    Light: "w-variant-3dfa430c-adcc-2fdc-5ab1-398318da31ff",
    Dark: "w-variant-eb31948e-24d6-2e1c-109d-266c1749cfd4",
  };

  const _activeStyleVariant = _styleVariantMap[theme];

  return (
    <_Component
      tag="section"
      grid={{
        type: "section",
      }}
    >
      <GlobalSectionSpace sectionSpace={paddingTop} />
      <_Builtin.Block
        className={_utils.cx(_styles, "u-container", _activeStyleVariant)}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "u-grid-autofit", _activeStyleVariant)}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "u-align-self-center",
              _activeStyleVariant
            )}
            id={_utils.cx(
              _styles,
              "w-node-e1723b58-4d11-9ce8-65d4-7c6f2957147f-2957147b"
            )}
            tag="div"
          >
            <Eyebrow
              visibility={eyebrowEyebrowVisibility}
              text={eyebrowEyebrowText}
            />
            <GlobalHeading text={globalHeadingHeadingText} />
            <GlobalParagraph
              visibility={globalParagraphParagraphVisibility}
              text={globalParagraphParagraphText}
            />
            <GlobalBtnGroup
              groupVisibility={globalButtonGroupGroupVisibility}
              slot={
                <>
                  <BtnMain />
                  <BtnMain />
                </>
              }
            />
          </_Builtin.Block>
          <Visual
            id={_utils.cx(
              _styles,
              "w-node-e1723b58-4d11-9ce8-65d4-7c6f29571486-2957147b"
            )}
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <GlobalSectionSpace sectionSpace={paddingBottom} />
    </_Component>
  );
}
