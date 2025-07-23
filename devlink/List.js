"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ListItm } from "./ListItm";
import * as _utils from "./utils";
import _styles from "./List.module.css";

export function List({
  as: _Component = _Builtin.List,
  list = true,
  listItmMap,
  exampleListItm = true,
}) {
  return list ? (
    <_Component
      className={_utils.cx(_styles, "list")}
      tag="ul"
      id="ListItm-Name-Here"
      unstyled={true}
    >
      {listItmMap ?? (
        <ListItm exampleListItm={exampleListItm} exampleListItmCtrl={true} />
      )}
    </_Component>
  ) : null;
}
