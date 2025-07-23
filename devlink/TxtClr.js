"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function TxtClr({
  as: _Component = _Builtin.Block,
  color = "n999",
  source = "Default",
}) {
  const _styleVariantMap = {
    n999: "",
    n900: "w-variant-653f4018-5d0f-4f2a-2632-b29947684b8a",
    n700: "w-variant-ac72e2ca-07ab-27bd-9032-4d5ed6647831",
    n500: "w-variant-3e6a32c5-faae-179b-cc67-652ec72e9a58",
    n300: "w-variant-9011924e-3338-cfb0-b095-266af5ddedf4",
    n200: "w-variant-68f36dda-8f0e-4a75-3818-6d813fa02e5d",
    n100: "w-variant-52667a87-7047-c539-8498-2aeebb437d68",
    n000: "w-variant-c7e03f2d-d7af-0bea-627e-f88f41b13f9f",
    p500: "w-variant-87402f36-25fd-7410-7069-6cb471ac4740",
    f500: "w-variant-a58216d7-f0dc-4094-117c-7c18780c2267",
    fs500: "w-variant-bb63e74c-85e3-032b-2d13-6489c16ee8f2",
    fw500: "w-variant-3ee8bbdd-cb50-71bf-714b-9fdb8bb7485d",
    fd500: "w-variant-11525bda-4e4a-18c8-4ae3-31d9c737d617",
  };

  const _activeStyleVariant = _styleVariantMap[color];
  return <_Component tag="div">{source}</_Component>;
}
