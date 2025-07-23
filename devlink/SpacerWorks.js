"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SpacerWorks.module.css";

export function SpacerWorks({
  as: _Component = _Builtin.Block,
  size = "none",
}) {
  const _styleVariantMap = {
    none: "",
    8: "w-variant-ec88e1ae-7ba4-19e2-29e1-398f6e3e4dd6",
    16: "w-variant-d0cd7684-6318-7ac2-6dfd-16b63a40a486",
    24: "w-variant-eae3a6a1-cc08-efe6-2dbf-c96623bc2e0b",
    32: "w-variant-c639535a-4aa9-58e6-7ebb-87becf0069d2",
    40: "w-variant-3605e632-9def-fc25-82f4-9fae9620c5de",
    48: "w-variant-4029e4d7-cbab-b3c2-f3d7-6ce63ddaaf55",
    56: "w-variant-ffaf40be-b9d8-90f5-195e-0d7b30df881d",
    64: "w-variant-8055e9df-2c07-2e01-f459-31e94e0e14fd",
    80: "w-variant-68c5de7e-c2d3-c3f9-82ec-e1ad9e704f4d",
  };

  const _activeStyleVariant = _styleVariantMap[size];
  return (
    <_Component
      className={_utils.cx(_styles, "spacer", _activeStyleVariant)}
      tag="div"
    />
  );
}
