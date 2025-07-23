"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import { AcrdFltr } from "./AcrdFltr";
import { FltrItm } from "./FltrItm";
import { SelectlistForm } from "./SelectlistForm";
import * as _utils from "./utils";
import _styles from "./SecFilterBar.module.css";

export function SecFilterBar({
  as: _Component = _Builtin.Section,
  sec = true,
  fltrDrp = true,
  fltrSs = true,
  sort = true,
  fltrDrpTitleSrc = "Filters",
  acrdFltrMap,
  exampleAcrdFltrItm = true,
  fltrSsMap,
  exampleFilters = true,
  sortTitleSrc = "Sort by: Featured",
  sortSelectMap,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "filter-sort_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%2F*%20width%20*%2F%0A%3A%3A-webkit-scrollbar%20%7B%0A%20%20width%3A%202px%3B%0A%7D%0A%0A%2F*%20Handle%20*%2F%0A%3A%3A-webkit-scrollbar-thumb%20%7B%0A%20%20background%3A%20var(--color--p500)%3B%20%0A%7D%0A%0A%0A%20.a_filter-tgl%5Bdata-fltrd%3D%22true%22%5D%2C%20%5Bdata-fltrd%3D%22true%22%5D%20*%20%7B%0Afont-weight%3A%20bold%3B%0Acolor%3A%20var(--color--p500)%3B%0Aborder-color%3A%20var(--color--p500)%3B%0A%7D%0A%5Bdata-active%3D%22true%22%5D.is-active-accordion%20%7B%0A%09%0A%7D%0A%3C%2Fstyle%3E" />
      <_Builtin.Block
        className={_utils.cx(_styles, "filter-sort_main")}
        tag="div"
      >
        {fltrDrp ? (
          <_Builtin.DropdownWrapper
            className={_utils.cx(_styles, "filter-drp_main")}
            tag="div"
            data-value=""
            delay="0"
            hover={false}
          >
            <_Builtin.DropdownToggle
              className={_utils.cx(_styles, "a_filter-tgl")}
              tag="div"
              data-field-brd=""
              onChange=""
              data-fltrd=""
            >
              <_Builtin.Icon
                className={_utils.cx(_styles, "a_filter-arw")}
                widget={{
                  type: "icon",
                  icon: "dropdown-toggle",
                }}
              />
              <Label
                txtSrc={fltrDrpTitleSrc}
                lblSz="r3"
                icn={true}
                txt={true}
                icnSrc="Filter"
                lblClr="n500"
              />
            </_Builtin.DropdownToggle>
            <_Builtin.DropdownList
              className={_utils.cx(_styles, "filter-drop")}
              tag="nav"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "a_filter-list")}
                tag="div"
              >
                <AcrdFltr
                  acrdFltrMap={acrdFltrMap}
                  exampleAcrdFltrItm={exampleAcrdFltrItm}
                />
              </_Builtin.Block>
            </_Builtin.DropdownList>
          </_Builtin.DropdownWrapper>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "filter-ss_main")}
          tag="div"
        >
          {fltrSs ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "filters-ss")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "u-filter-ss")}
                tag="div"
              >
                {fltrSsMap ??
                  (exampleFilters ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "example-fltrs")}
                      tag="div"
                    >
                      <FltrItm
                        fltrTitleSrc="Seller"
                        ctrlCbox={true}
                        exampleCboxLblSrc="SellerName"
                        ctrlSearch={true}
                      />
                      <FltrItm
                        fltrTitleSrc="Price"
                        exampleCboxLblSrc="$From - $To"
                        ctrlSlider={true}
                        ctrlCbox={true}
                      />
                      <FltrItm fltrTitleSrc="Size" ctrlCbox={true} />
                      <FltrItm
                        fltrTitleSrc="Color"
                        ctrlClr={true}
                        exampleClrName="Color"
                        exampleClrSelected={false}
                      />
                      <FltrItm
                        fltrTitleSrc="Brand"
                        ctrlCbox={true}
                        exampleCboxLblSrc="SellerName"
                        ctrlSearch={true}
                      />
                      <FltrItm
                        fltrTitleSrc="Type"
                        ctrlCbox={true}
                        exampleCboxLblSrc="OptionName"
                      />
                      <FltrItm
                        fltrTitleSrc="Rating"
                        ctrlCbox={true}
                        exampleCboxLblSrc="# Stars"
                      />
                      <FltrItm
                        fltrTitleSrc="Deals"
                        ctrlCbox={true}
                        exampleCboxLblSrc="DealType"
                      />
                      <FltrItm
                        fltrTitleSrc="Fulfilled"
                        exampleCboxLblSrc="DealType"
                        ctrlChoice={true}
                      />
                    </_Builtin.Block>
                  ) : null)}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "side-fade")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "side-fade-l")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "side-fade-r")}
                  tag="div"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {sort ? (
          <_Builtin.FormWrapper className={_utils.cx(_styles, "sort-form")}>
            <_Builtin.FormForm
              name="email-form"
              data-name="Email Form"
              method="get"
              id="email-form"
            >
              <SelectlistForm
                fieldPHoldSrc={sortTitleSrc}
                fieldSelectMap={sortSelectMap}
                lblTop={false}
                fieldSelectDrpHide={false}
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
      </_Builtin.Block>
    </_Component>
  ) : null;
}
