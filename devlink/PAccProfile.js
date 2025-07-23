"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Cell } from "./Cell";
import { TextfieldForm } from "./TextfieldForm";
import { TextareaForm } from "./TextareaForm";
import { ButtonPanel } from "./ButtonPanel";
import { ListItmContent } from "./ListItmContent";
import * as _utils from "./utils";
import _styles from "./PAccProfile.module.css";

export function PAccProfile({
  as: _Component = _Builtin.Block,
  avtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  avtrAlt = "__wf_reserved_inherit",
  avtrClick = {},
  doClick = {},
  metaBtnTxt = "Connect",
  metaBtnStyl = "nl",
  metaBtnClick = {},
  googleBtnTxt = "Connect",
  googleBtnStyl = "nl",
  googleBtnClick = {},
  xBtnTxt = "Connect",
  xBtnStyl = "nl",
  xBtnClick = {},
  pintBtnTxt = "Connect",
  pintBtnStyl = "nl",
  pintBtnClick = {},
  instaBtnTxt = "Connect",
  instaBtnStyl = "nl",
  instaBtnClick = {},
  fnameOnChange,
  lnameOnChange,
  handleOnChange,
  locOnChange,
  websiteOnChange,
  aboutOnChange,
  aboutCount = "0/750",
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-50-50")}
          id={_utils.cx(
            _styles,
            "w-node-_21aa3752-ebec-0f73-1fcf-202c0e308101-33b05238"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_21aa3752-ebec-0f73-1fcf-202c0e308102-33b05238"
            )}
          >
            <SecHead titleSrc="Profile" sz="xl" titleSz="h4b" act1={false} />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-fde7c982-eeb8-0c5e-04f2-b491e0a70314-33b05238"
            )}
          >
            <_Builtin.FormWrapper
              className={_utils.cx(_styles, "form-block-2")}
            >
              <_Builtin.FormForm
                name="wf-form-Member-Profile"
                data-name="Member Profile"
                method="get"
                id="wf-form-Member-Profile"
              >
                <SecHead
                  titleSrc="Details"
                  act1TxtSrc="Edit"
                  subtxt={true}
                  subtxtSrc="Let others know a little about who you are"
                  sz=""
                  act1Click={{}}
                  act1={false}
                  titleSz="r1"
                />
                <_Builtin.Layout
                  className={_utils.cx(_styles, "bqg-qs-prof-name")}
                  id={_utils.cx(
                    _styles,
                    "w-node-cc17b300-339d-a3ca-d059-23cf33b05240-33b05238"
                  )}
                >
                  <_Builtin.Cell
                    className={_utils.cx(_styles, "bqg-qs-avatar")}
                  >
                    <Cell
                      avtrAvtrSrc={avtrSrc}
                      avtrAvtrAlt={avtrAlt}
                      cellClick={avtrClick}
                      vizAvtr={true}
                      vizImg={false}
                      cellSz="xl"
                      capStkRow1Src="Change Photo"
                      capStkRow1Clr="f500"
                      avtrAvtrSz="xl"
                      caption={true}
                      captionCapStk={true}
                      capStkRowsAlign="c"
                    />
                  </_Builtin.Cell>
                  <_Builtin.Cell className={_utils.cx(_styles, "bqg-qs-name")}>
                    <TextfieldForm
                      fieldOnChange={fnameOnChange}
                      lblTopLblSrc="First Name"
                      fldHelp={false}
                      fieldFldId="fname"
                      fieldFldName="fname"
                      lblTopLblFor="fname"
                      fieldFldPlaceholderSrc="Jane"
                    />
                    <TextfieldForm
                      fieldOnChange={lnameOnChange}
                      lblTopLblSrc="Last Name"
                      fldHelp={false}
                      fieldFldId="lname"
                      lblTopLblFor="lname"
                      fieldFldName="lname"
                      fieldFldPlaceholderSrc="Doe"
                    />
                  </_Builtin.Cell>
                </_Builtin.Layout>
                <TextfieldForm
                  fieldOnChange={handleOnChange}
                  lblTopLblSrc="Handle"
                  fldHelpHelpLSrc="how others know and connect with you"
                  fieldFldId="handle"
                  lblTopLblFor="handle"
                  fieldFldName="handle"
                  fieldFldPlaceholderSrc="@handle"
                  fieldReadOnly="true"
                />
                <TextfieldForm
                  fieldOnChange={locOnChange}
                  lblTopLblSrc="Location"
                  fldHelp={false}
                  fieldFldId="location"
                  lblTopLblFor="location"
                  fieldFldName="location"
                  fieldFldPlaceholderSrc="My town"
                />
                <TextfieldForm
                  fieldOnChange={websiteOnChange}
                  lblTopLblSrc="Website"
                  fldHelp={false}
                  fieldFldId="website"
                  lblTopLblFor="website"
                  fieldFldName="website"
                  fieldFldPlaceholderSrc="https://yoursite.com"
                />
                <TextareaForm
                  fieldOnChange={aboutOnChange}
                  fldHelpHelpRSrc={aboutCount}
                  lblTopLblSrc="About Me"
                  fldHelpHelpLSrc=""
                  fldHelpHelpR={true}
                  fieldFldId="about"
                  lblTopLblFor="about"
                  fieldFldName="about"
                  fieldFldPholdSrc="Let others know a little something about yourself"
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
            id={_utils.cx(
              _styles,
              "w-node-_8df8aa87-088b-fd05-434f-770c9266096c-33b05238"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "sec-connections")}
              grid={{
                type: "section",
              }}
              tag="section"
            >
              <SecHead
                titleSrc="Connections"
                act1TxtSrc="Edit"
                subtxt={true}
                subtxtSrc="Share your content across your other social platforms"
                sz=""
                act1Click={{}}
                act1={false}
                titleSz="r1"
              />
              <_Builtin.List
                className={_utils.cx(_styles, "list_wrap")}
                tag="ul"
                unstyled={true}
              >
                <ListItmContent
                  tBtnTxtSrc={metaBtnTxt}
                  tBtnStyl={metaBtnStyl}
                  tBtnClick={metaBtnClick}
                  pTitleSrc="Meta (aka Facebook)"
                  tBtn={true}
                  lIcnL={true}
                  lIcnSrc="logo_facebook"
                />
                <ListItmContent
                  tBtnTxtSrc={googleBtnTxt}
                  tBtnStyl={googleBtnStyl}
                  tBtnClick={googleBtnClick}
                  pTitleSrc="Google"
                  tBtn={true}
                  lIcnL={true}
                  lIcnSrc="logo_google"
                />
                <ListItmContent
                  tBtnTxtSrc={xBtnTxt}
                  tBtnStyl={xBtnStyl}
                  tBtnClick={xBtnClick}
                  pTitleSrc="X (aka Twitter)"
                  tBtn={true}
                  lIcnL={true}
                  lIcnSrc="logo_twitter"
                />
                <ListItmContent
                  tBtnTxtSrc={pintBtnTxt}
                  tBtnStyl={pintBtnStyl}
                  tBtnClick={pintBtnClick}
                  pTitleSrc="Pinterest"
                  tBtn={true}
                  lIcnL={true}
                  lIcnSrc="logo_pinterest"
                />
                <ListItmContent
                  tBtnTxtSrc={instaBtnTxt}
                  tBtnStyl={instaBtnStyl}
                  tBtnClick={instaBtnClick}
                  pTitleSrc="Instagram"
                  tBtn={true}
                  lIcnL={true}
                  lIcnSrc="logo_instagram"
                />
              </_Builtin.List>
            </_Builtin.Section>
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
