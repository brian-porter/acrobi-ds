"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ItemHead } from "./ItemHead";
import { Spacer } from "./Spacer";
import { ItmSecCta } from "./ItmSecCta";
import { InputWBtns } from "./InputWBtns";
import { OrderSs } from "./OrderSs";
import { List } from "./List";
import { PostItem } from "./PostItem";
import * as _utils from "./utils";
import _styles from "./PItemTalk.module.css";

export function PItemTalk({
  as: _Component = _Builtin.Block,
  examplePostItems = true,
  exampleTwitPostItem = true,
  itmHead = true,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  itmName = "ItemName description goes here andline wraps",
  postAddClick = {},
  scanBtn = false,
  scanBtnClick = {},
  searchClick = {},
  searchChange,
  fltrBtn = false,
  inputWBtnsTFltrClick = {},
  postMap,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-60-40")}
          id={_utils.cx(
            _styles,
            "w-node-_81cab9ff-66f0-16e4-84ee-b0d69a315e26-822586b4"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_81cab9ff-66f0-16e4-84ee-b0d69a315e27-822586b4"
            )}
          >
            <ItemHead
              itmHead={itmHead}
              itmImgSrc={itmImgSrc}
              itmImgAlt={itmImgAlt}
              name={itmName}
            />
            <Spacer szDep="32" size="32" />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_81cab9ff-66f0-16e4-84ee-b0d69a315e2f-822586b4"
            )}
          >
            <ItmSecCta
              btnClick={postAddClick}
              header="Talk"
              eyebrowSrc="the latest buzz"
              desc="Get up to the moment discussions about this item in the community and from your social platforms."
              btnTxtSrc="Post"
              btnIcnSrc="Chat_edit"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_81cab9ff-66f0-16e4-84ee-b0d69a315e38-822586b4"
            )}
          >
            <InputWBtns
              lLBtn={scanBtn}
              tTBtn={fltrBtn}
              lLBtnClick={scanBtnClick}
              fldFldClick={searchClick}
              fldFldOnChange={searchChange}
              tTBtnClick={inputWBtnsTFltrClick}
              tTBtnIcnSrc="act_filter"
              fldFldTBtn={false}
              tTBtnPad="n"
            />
            <OrderSs />
            <List listItmMap={postMap} exampleListItm={false} />
            {examplePostItems ? (
              <_Builtin.FormWrapper>
                <_Builtin.FormForm
                  name="email-form"
                  data-name="Email Form"
                  method="get"
                  id="email-form"
                >
                  <PostItem
                    titleSrc="BQ Post Title goes here"
                    bodySrc="Post body goes here, with others available using the more answers link. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
                    postItem={true}
                  />
                  <PostItem
                    titleSrc="Twitter Post Title goes here"
                    bodySrc="Post body goes here, with others available using the more answers link. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
                    postItem={true}
                  />
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
            ) : null}
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_81cab9ff-66f0-16e4-84ee-b0d69a315e3e-822586b4"
            )}
          >
            <Spacer size="16" />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
