"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { SelectlistForm } from "./SelectlistForm";
import { SwitchForm } from "./SwitchForm";
import { ButtonPanel } from "./ButtonPanel";
import { ListItmContent } from "./ListItmContent";
import * as _utils from "./utils";
import _styles from "./PAccSettings.module.css";

export function PAccSettings({
  as: _Component = _Builtin.Block,
  themeSelectDrpHide = false,
  themePHoldSrc = "BlueQueue",
  themePHoldClr = "n500",
  themeMap,
  modeClick = {},
  languageSelectDrpHide = false,
  languagePHoldSrc = "English",
  languagePHoldClr = "n500",
  languageMap,
  countrySelectDrpHide = false,
  countryPHoldSrc = "United States",
  countryPHoldClr = "n500",
  countryMap,
  currencySelectDrpHide = false,
  currencyPHoldSrc = "US Dollar",
  currencyPHoldClr = "n500",
  currencyMap,
  measureSelectDrpHide = false,
  measurePHoldSrc = "Imperial",
  measurePHoldClr = "n500",
  measureMap,
  zoneSelectDrpHide = false,
  zonePHoldSrc = "Eastern Time (US) EDT UTC-4",
  zonePHoldClr = "n500",
  zoneMap,
  permAllClick = {},
  permLocClick = {},
  permCamClick = {},
  permContClick = {},
  permCalClick = {},
  permLibClick = {},
  permMicClick = {},
  doClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-50-50")}
          id={_utils.cx(
            _styles,
            "w-node-_0b3d555f-a98c-7d5c-73b7-df236f8098ff-b4f4fb3a"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_0b3d555f-a98c-7d5c-73b7-df236f809900-b4f4fb3a"
            )}
          >
            <SecHead titleSrc="Settings" sz="xl" titleSz="h4b" act1={false} />
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-6")}
            id={_utils.cx(
              _styles,
              "w-node-_0b3d555f-a98c-7d5c-73b7-df236f809904-b4f4fb3a"
            )}
          >
            <SecHead
              titleSrc="Accessibility & Display"
              act1={false}
              titleSz="r1"
            />
            <_Builtin.FormWrapper>
              <_Builtin.FormForm
                name="wf-form-Account-Settings"
                data-name="Account Settings"
                method="get"
                id="wf-form-Account-Settings"
              >
                <SelectlistForm
                  fieldSelectMap={themeMap}
                  fieldPHoldSrc={themePHoldSrc}
                  fieldPHoldClr={themePHoldClr}
                  fieldSelectDrpHide={themeSelectDrpHide}
                  lblTopLblSrc="Theme"
                  fldHelp={false}
                  lblTopLblFor="theme"
                  fieldFldId="theme"
                  fieldFldValue=""
                />
                <SwitchForm
                  fieldTglClick={modeClick}
                  lblTop={false}
                  fieldTglLableSrc="Dark Mode"
                />
                <SelectlistForm
                  fieldSelectMap={languageMap}
                  fieldPHoldSrc={languagePHoldSrc}
                  fieldPHoldClr={languagePHoldClr}
                  fieldSelectDrpHide={languageSelectDrpHide}
                  lblTopLblSrc="Language"
                  fldHelp={false}
                  lblTopLblFor="language"
                  fieldFldId="language"
                  fieldFldValue=""
                />
                <SelectlistForm
                  fieldSelectMap={countryMap}
                  fieldPHoldSrc={countryPHoldSrc}
                  fieldPHoldClr={countryPHoldClr}
                  fieldSelectDrpHide={countrySelectDrpHide}
                  lblTopLblSrc="Country"
                  fldHelp={false}
                  lblTopLblFor="country"
                  fieldFldId="country"
                  fieldFldValue=""
                />
                <SelectlistForm
                  fieldSelectMap={currencyMap}
                  fieldPHoldSrc={currencyPHoldSrc}
                  fieldPHoldClr={currencyPHoldClr}
                  fieldSelectDrpHide={currencySelectDrpHide}
                  lblTopLblSrc="Currency"
                  fldHelp={false}
                  lblTopLblFor="currency"
                  fieldFldId="currency"
                  fieldFldValue=""
                />
                <SelectlistForm
                  fieldSelectMap={measureMap}
                  fieldPHoldSrc={measurePHoldSrc}
                  fieldPHoldClr={measurePHoldClr}
                  fieldSelectDrpHide={measureSelectDrpHide}
                  fldHelp={false}
                  lblTopLblSrc="System of Measure"
                  lblTopLblFor="measure"
                  fieldFldId="measure"
                  fieldFldValue=""
                />
                <SelectlistForm
                  fieldSelectMap={zoneMap}
                  fieldPHoldSrc={zonePHoldSrc}
                  fieldPHoldClr={zonePHoldClr}
                  fieldSelectDrpHide={zoneSelectDrpHide}
                  fldHelp={false}
                  lblTopLblSrc="Time Zone"
                  lblTopLblFor="tzone"
                  fieldFldId="zone"
                />
                <ButtonPanel
                  btn1Click={doClick}
                  btn1TxtSrc="Done"
                  btnPnlOri="hr"
                  btn2={false}
                  btn3={false}
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
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-7")}
            id={_utils.cx(
              _styles,
              "w-node-_0b3d555f-a98c-7d5c-73b7-df236f80992c-b4f4fb3a"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "sec-permissions")}
              grid={{
                type: "section",
              }}
              tag="section"
            >
              <SecHead
                act1Click={permAllClick}
                titleSrc="Permissions"
                act1TxtSrc="Enable All"
                act1Styl="pf"
                sz="m"
                titleSz="r1"
              />
              <_Builtin.List
                className={_utils.cx(_styles, "list_wrap")}
                tag="ul"
                unstyled={true}
              >
                <ListItmContent
                  tTrailClick={permLocClick}
                  pTitleSrc="Location"
                  pSubtxt1Src="To help find thing around you"
                  tBtn={true}
                  lIcnL={true}
                  tBtnTxtSrc="Enable"
                  lIcnSrc="location"
                  pSubtxt1={true}
                />
                <ListItmContent
                  tTrailClick={permCamClick}
                  pTitleSrc="Camera"
                  pSubtxt1Src="For taking photos and scanning"
                  tBtn={true}
                  lIcnL={true}
                  tBtnTxtSrc="Enable"
                  lIcnSrc="photo"
                  pSubtxt1={true}
                />
                <ListItmContent
                  tTrailClick={permContClick}
                  pTitleSrc="Contacts"
                  pSubtxt1Src="Making it easy to share with others"
                  tBtn={true}
                  lIcnL={true}
                  tBtnTxtSrc="Enable"
                  lIcnSrc="contacts"
                  pSubtxt1={true}
                />
                <ListItmContent
                  tTrailClick={permCalClick}
                  pTitleSrc="Calender"
                  pSubtxt1Src="To keep your events sync'ed"
                  tBtn={true}
                  lIcnL={true}
                  tBtnTxtSrc="Enable"
                  lIcnSrc="cal"
                  pSubtxt1={true}
                />
                <ListItmContent
                  tTrailClick={permLibClick}
                  pTitleSrc="Photos"
                  pSubtxt1Src="Giving you easy access to your pic's"
                  tBtn={true}
                  lIcnL={true}
                  tBtnTxtSrc="Enable"
                  lIcnSrc="gal"
                  pSubtxt1={true}
                />
                <ListItmContent
                  tTrailClick={permMicClick}
                  pTitleSrc="Microphone"
                  pSubtxt1Src="So we can hear your requests"
                  tBtn={true}
                  lIcnL={true}
                  tBtnTxtSrc="Enable"
                  lIcnSrc="mic"
                  pSubtxt1={true}
                />
              </_Builtin.List>
            </_Builtin.Section>
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
