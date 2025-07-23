"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GutterBadge } from "./GutterBadge";
import { ListItmCtrl } from "./ListItmCtrl";
import * as _utils from "./utils";
import _styles from "./ListItm.module.css";

export function ListItm({
  as: _Component = _Builtin.ListItem,
  exampleListItm = false,
  listItmCtrlMap,
  exampleListItmCtrl = false,
  gttrBdg = false,
  gttrGttrBdgPin = false,
  gttrGttrBdgAlarm = false,
  gttrGttrBdgBkmrk = false,
}) {
  return exampleListItm ? (
    <_Component className={_utils.cx(_styles, "listitm")}>
      {listItmCtrlMap ?? (
        <>
          {gttrBdg ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "listitm-gttr")}
              tag="div"
            >
              <GutterBadge
                pin={gttrGttrBdgPin}
                bookmark={gttrGttrBdgBkmrk}
                alarm={gttrGttrBdgAlarm}
                gttrBdg={true}
              />
            </_Builtin.Block>
          ) : null}
          <ListItmCtrl
            listItem={exampleListItmCtrl}
            pPSubtxt2={true}
            pPSubtxt={false}
          />
        </>
      )}
    </_Component>
  ) : null;
}
