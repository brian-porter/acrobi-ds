"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Headline } from "./Headline";
import { Spacer } from "./Spacer";
import { SliderForm } from "./SliderForm";
import { ClrItm } from "./ClrItm";
import { Button } from "./Button";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MenuFilterOptions.module.css";

export function MenuFilterOptions({
  as: _Component = _Builtin.Block,
  more = true,
  clr = false,
  clrItmMap,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "filter_choice")}
      tag="div"
      data-bs="xs"
    >
      <Headline
        titleSz="h5"
        titleH="h5"
        subtxt={false}
        sz=""
        titleSrc="FilterName"
      />
      <_Builtin.Block className={_utils.cx(_styles, "filter_range")} tag="div">
        <_Builtin.FormWrapper>
          <_Builtin.FormForm
            name="email-form"
            data-name="Email Form"
            method="get"
            id="email-form"
          >
            <Spacer size="24" />
            <SliderForm />
            <Spacer size="24" />
          </_Builtin.FormForm>
          <_Builtin.FormSuccessMessage>
            <_Builtin.Block tag="div">
              {"Thank you! Your submission has been received!"}
            </_Builtin.Block>
          </_Builtin.FormSuccessMessage>
          <_Builtin.FormErrorMessage>
            <_Builtin.Block tag="div">
              {"Oops! Something went wrong while submitting the form."}
            </_Builtin.Block>
          </_Builtin.FormErrorMessage>
        </_Builtin.FormWrapper>
      </_Builtin.Block>
      {clr ? (
        <_Builtin.Grid
          className={_utils.cx(_styles, "filter_choice-grid")}
          tag="div"
          id="ClrItm"
        >
          {clrItmMap ?? (
            <>
              <ClrItm itmOn={false} />
              <ClrItm />
              <ClrItm itmOn={true} />
              <ClrItm
                id={_utils.cx(
                  _styles,
                  "w-node-_3d577fb0-227d-729a-455d-41ca4a8d37eb-4a8d37e4"
                )}
              />
              <ClrItm
                id={_utils.cx(
                  _styles,
                  "w-node-_3d577fb0-227d-729a-455d-41ca4a8d37ec-4a8d37e4"
                )}
              />
            </>
          )}
        </_Builtin.Grid>
      ) : null}
      {more ? (
        <_Builtin.Block className={_utils.cx(_styles, "show-more")} tag="div">
          <Button
            btnHug="l"
            btnIcn={false}
            btnTxtSrc="show more"
            btnSz="m"
            lblSz="r3"
            btnStyl="ft"
          />
        </_Builtin.Block>
      ) : null}
      <ButtonPanel
        btnPnlOri="h"
        btn3={false}
        btn1Styl="nl"
        btn2Styl="pf"
        btn1Sz="m"
        btn2Sz="m"
        btn1Id=""
        btn1TxtSrc="Clear"
        btn2TxtSrc="Done"
      />
    </_Component>
  );
}
