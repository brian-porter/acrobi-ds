"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Cell } from "./Cell";
import { SelectlistForm } from "./SelectlistForm";
import { TextfieldForm } from "./TextfieldForm";
import { TextareaForm } from "./TextareaForm";
import { CboxForm } from "./CboxForm";
import { Spacer } from "./Spacer";
import { Button } from "./Button";
import { ButtonPanel } from "./ButtonPanel";
import { EmptyCollection } from "./EmptyCollection";
import { MenuAcrd } from "./MenuAcrd";
import { InputWBtns } from "./InputWBtns";
import { Hero } from "./Hero";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./MPlaceAdd.module.css";

export function MPlaceAdd({
  as: _Component = _Builtin.Block,
  dDCancelClick = {},
  dDAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb5854b_place-generic.avif",
  dDAvtrAlt = "__wf_reserved_inherit",
  dDAvtrClick = {},
  dTypePHoldSrc = "What type of place is this",
  dTypePHoldClr = "n500",
  dTypeSelectDrpHide = false,
  dDTypeMap,
  dDNameChange,
  dDNameClick = {},
  dCountryPHoldSrc = "United States",
  dCountryPHoldClr = "n500",
  dCountrySelectDrpHide = false,
  dDCountryMap,
  dDStreetChange,
  dDStreetBtnClick = {},
  dDAddress2Change,
  dDCityChange,
  dDStateChange,
  dDZipChange,
  dDPhoneChange,
  dDNoteChange,
  dDDefaultChange,
  dDDoClick = {},
  dDErase = false,
  dDEraseClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "m-place-add")} tag="div">
      <_Builtin.TabsWrapper
        className={_utils.cx(_styles, "tabs")}
        data-duration-in="300"
        data-duration-out="100"
        tab-underline=""
        current="details"
        easing="ease-in-out"
        fadeIn={300}
        fadeOut={100}
      >
        <_Builtin.TabsContent
          className={_utils.cx(_styles, "tab-content")}
          tag="div"
        >
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail")}
            tag="div"
            data-w-tab="details"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "a-header")}
              tag="div"
            >
              <SecHead
                act1Click={dDCancelClick}
                titleSrc="Add Place"
                sz="l"
                titleSz="h4"
                subtxt={true}
                subtxtSrc="Give information about this place."
              />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "a-body2")} tag="div">
              <_Builtin.FormWrapper
                className={_utils.cx(_styles, "form-place-add")}
              >
                <_Builtin.FormForm
                  name="wf-form-Member-Profile"
                  data-name="Member Profile"
                  method="get"
                  id="wf-form-Member-Profile"
                >
                  <_Builtin.Layout
                    className={_utils.cx(_styles, "bqg-qs-prof-name")}
                    id={_utils.cx(
                      _styles,
                      "w-node-_4619e647-836b-164f-b6fa-8f3ce6136c33-e6136c26"
                    )}
                  >
                    <_Builtin.Cell
                      className={_utils.cx(_styles, "bqg-qs-avatar")}
                    >
                      <Cell
                        avtrAvtrAlt={dDAvtrAlt}
                        cellClick={dDAvtrClick}
                        avtrAvtrSrc={dDAvtrSrc}
                        vizAvtr={true}
                        vizImg={false}
                        cellSz="xl"
                        capStkRow1Src="Change Icon"
                        capStkRow1Clr="f500"
                        avtrAvtrSz="xl"
                        caption={true}
                        captionCapStk={true}
                        capStkRowsAlign="c"
                        avtrAvtrShape="r"
                      />
                    </_Builtin.Cell>
                    <_Builtin.Cell
                      className={_utils.cx(_styles, "bqg-qs-name")}
                    >
                      <SelectlistForm
                        fieldSelectMap={dDTypeMap}
                        fieldPHoldSrc={dTypePHoldSrc}
                        fieldPHoldClr={dTypePHoldClr}
                        fieldSelectDrpHide={dTypeSelectDrpHide}
                        fldHelp={false}
                        lblTopLblSrc="Location Type"
                        lblTopLblFor="type"
                        fieldFldId="type"
                      />
                      <TextfieldForm
                        fieldOnChange={dDNameChange}
                        fieldFldClick={dDNameClick}
                        lblTopLblSrc="Name"
                        fldHelp={true}
                        fieldFldId="name"
                        fieldFldName="name"
                        lblTopLblFor="name"
                        fieldFldPlaceholderSrc="Home, Office, Vacation Home..."
                        fieldTabOrder="0"
                        fldHelpHelpR={true}
                        fldHelpHelpRSrc="0/50"
                      />
                    </_Builtin.Cell>
                  </_Builtin.Layout>
                  <SelectlistForm
                    fieldSelectMap={dDCountryMap}
                    fieldPHoldSrc={dCountryPHoldSrc}
                    fieldPHoldClr={dCountryPHoldClr}
                    fieldSelectDrpHide={dCountrySelectDrpHide}
                    fldHelp={false}
                    lblTopLblSrc="Country"
                    lblTopLblFor="country"
                    lblTop={false}
                    fieldFldId="country"
                  />
                  <TextfieldForm
                    fieldOnChange={dDStreetChange}
                    fieldFldBtnClick={dDStreetBtnClick}
                    lblTopLblSrc="Street Address"
                    fieldFldId="street"
                    lblTopLblFor="street"
                    fieldFldName="street"
                    fieldFldPlaceholderSrc="street & number, P.O. Box..."
                    fldHelp={false}
                    fieldFldBtnIcnSrc="Geo_findme"
                    fieldFldBtn={true}
                  />
                  <TextfieldForm
                    fieldOnChange={dDAddress2Change}
                    lblTopLblSrc="Address 2"
                    fldHelp={false}
                    fieldFldId="address2"
                    lblTopLblFor="address2"
                    fieldFldName="address2"
                    fieldFldPlaceholderSrc="apartment, suite, unit, buildig, floor, etc."
                    lblTop={false}
                  />
                  <TextfieldForm
                    fieldOnChange={dDCityChange}
                    lblTopLblSrc="City"
                    fldHelp={false}
                    fieldFldId="city"
                    lblTopLblFor="city"
                    fieldFldName="city"
                    fieldFldPlaceholderSrc=""
                  />
                  <TextfieldForm
                    fieldOnChange={dDStateChange}
                    lblTopLblSrc="State | Province | Region"
                    fldHelp={false}
                    fieldFldId="state"
                    lblTopLblFor="state"
                    fieldFldName="state"
                    fieldFldPlaceholderSrc=""
                  />
                  <TextfieldForm
                    fieldOnChange={dDZipChange}
                    lblTopLblSrc="Zip Code"
                    fldHelp={false}
                    fieldFldId="zip"
                    lblTopLblFor="zip"
                    fieldFldName="zip"
                    fieldFldPlaceholderSrc=""
                  />
                  <TextfieldForm
                    fieldOnChange={dDPhoneChange}
                    lblTopLblSrc="Phone Number"
                    fldHelp={true}
                    fieldFldId="phone"
                    lblTopLblFor="phone"
                    fieldFldName="phone"
                    fieldFldPlaceholderSrc=""
                    fldHelpHelpLSrc="may be used to assist delivery"
                    lblTopOpt={true}
                    lblTopOptSrc="optional"
                  />
                  <TextareaForm
                    fieldOnChange={dDNoteChange}
                    lblTopLblSrc="Notes"
                    fldHelpHelpRSrc="0/750"
                    fldHelpHelpLSrc=""
                    fldHelpHelpR={true}
                    fieldFldId="note"
                    lblTopLblFor="note"
                    fieldFldName="note"
                    fieldFldPholdSrc="access code for building or gate"
                    lblTopOpt={true}
                    lblTopOptSrc="optional"
                  />
                  <CboxForm />
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
              {dDErase ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "place-delete")}
                  tag="div"
                >
                  <Spacer szDep="64" />
                  <Button
                    btnClick={dDEraseClick}
                    btnTxtSrc="Delete Place"
                    btnIcnSrc="place"
                    lblClr="fd500"
                  />
                  <Spacer szDep="24" />
                  <Spacer szDep="64" />
                  <Spacer szDep="64" />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "a-footer")}
              tag="div"
              data-top-shadow="y"
            >
              <ButtonPanel
                btn1Click={dDDoClick}
                btn1TxtSrc="Done"
                btnPnlOri="hr"
                btn2={false}
                btn3={false}
              />
              <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%5Btop-shadow%3D%22y%22%5D.a-footer%20%7B%0A%09border-top%3A%201px%20solid%3B%0A%20%20color%3Argba(var(--n300)%2C%201)%3B%0A%20%20box-shadow%3A%200px%20-10px%2010px%200px%20rgba(var(--n200)%2C%201)%3B%0A%7D%0A%3C%2Fstyle%3E" />
            </_Builtin.Block>
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail")}
            tag="div"
            data-w-tab="people"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "a-header")}
              tag="div"
            >
              <SecHead
                titleSrc="People"
                sz="xl"
                act1TxtSrc="Cancel"
                titleSz="h4"
                act1Click={{}}
                subtxtSrc="Who are the people that are normally at this location"
                subtxt={true}
              />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "a-body2")} tag="div">
              <EmptyCollection
                icnSrc="peep_add"
                headlineSrc="Let's Add Some Peeps"
                subtxtSrc="Put the word out with an invite to join. Once they accept your invite they'll show up here."
                primeBtnClick={{}}
                primeBtnTxtSrc="Send Invites"
                primeBtnStyl="ft"
                empty={false}
              />
              <MenuAcrd acrd={true} acrdSecMap="" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "a-footer")}
              tag="div"
              data-top-shadow="y"
            >
              <InputWBtns
                tTBtn={true}
                tTBtnPad="n"
                tTBtnIcnSrc="peep_role"
                tTBtnTxtSrc="Role"
                lLBtnIcnSrc="Add"
                fldFldLIcnSrc="peep_search"
                fldFldTBtn={false}
                fldFldPholdSrc="Search members"
                lLBtnClick={{}}
                fldFldClick={{}}
                fldFldOnChange=""
                tTBtnClick={{}}
              />
              <Spacer />
            </_Builtin.Block>
          </_Builtin.TabsPane>
          <_Builtin.TabsPane
            className={_utils.cx(_styles, "tab-detail")}
            tag="div"
            data-w-tab="visuals"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "a-header")}
              tag="div"
            >
              <SecHead
                titleSrc="Group Visuals"
                sz="xl"
                act1TxtSrc="Cancel"
                titleSz="h4"
                act1Click={{}}
              />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "a-body2")} tag="div">
              <_Builtin.Row
                tag="div"
                columns={{
                  main: "6|6",
                  medium: "",
                  small: "",
                  tiny: "",
                }}
              >
                <_Builtin.Column tag="div">
                  <SecHead
                    titleSrc="Logo"
                    titleSz="r2"
                    act1={false}
                    subtxt={true}
                    subtxtSrc="Upload a logo for the group, we suggest a size of 300 x 300px. This is shown to people looking for this group."
                  />
                </_Builtin.Column>
                <_Builtin.Column tag="div">
                  <Hero
                    imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif"
                    btn={true}
                    avtrAvtrBdg={true}
                    avtrAvtrBdgClr="p500"
                    fadeBtm={false}
                    avtrAvtrHline={true}
                    btnBtnIcnSrc="Edit"
                    avtrAvtrBdgIcnSrc="Edit"
                    icnBarIcnBarR1Icn={false}
                    icnBarIcnBarL1Click={{}}
                    avtrAvtrHlineSrc="FName LName"
                    btnBtnClick={{}}
                    avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                    avtrAvtrSubTxtSrc="@handle"
                    avtrAvtrClick={{}}
                    icnBarIcnBarR1Clr="n000"
                    icnBarIcnBarL1Clr="n000"
                    icnBarIcnBarL1Src="Qr"
                    icnBarIcnBarR1Src=""
                    icnBar={false}
                    hline={false}
                    heroAsp="1-1"
                  />
                </_Builtin.Column>
              </_Builtin.Row>
              <_Builtin.Section
                grid={{
                  type: "section",
                }}
                tag="section"
              >
                <SecHead
                  titleSrc="Cover"
                  titleSz="r2"
                  act1={false}
                  subtxt={true}
                  subtxtSrc="Upload a cover image that represents the group, we suggest a size of 1600 x 900px. This is displayed at the top of the group."
                />
                <Hero
                  imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif"
                  btn={true}
                  avtrAvtrBdg={true}
                  avtrAvtrBdgClr="p500"
                  fadeBtm={false}
                  avtrAvtrHline={true}
                  btnBtnIcnSrc="Edit"
                  avtrAvtrBdgIcnSrc="Edit"
                  icnBarIcnBarR1Icn={false}
                  icnBarIcnBarL1Click={{}}
                  avtrAvtrHlineSrc="FName LName"
                  btnBtnClick={{}}
                  avtrAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
                  avtrAvtrSubTxtSrc="@handle"
                  avtrAvtrClick={{}}
                  icnBarIcnBarR1Clr="n000"
                  icnBarIcnBarL1Clr="n000"
                  icnBarIcnBarL1Src="Qr"
                  icnBarIcnBarR1Src=""
                  icnBar={false}
                  hline={false}
                />
              </_Builtin.Section>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "a-footer")}
              tag="div"
              data-top-shadow="y"
            >
              <Spacer szDep="64" />
            </_Builtin.Block>
          </_Builtin.TabsPane>
          <_Builtin.TabsPane tag="div" data-w-tab="properties" />
        </_Builtin.TabsContent>
        <_Builtin.TabsMenu
          className={_utils.cx(_styles, "tab-menu-group", "u-side-scroll")}
          tag="div"
        >
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link")}
            data-w-tab="details"
            block="inline"
          >
            <Label txtSrc="Details" icnSrc="snip" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link")}
            data-w-tab="people"
            block="inline"
          >
            <Label txtSrc="People" icnSrc="member" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link")}
            data-w-tab="visuals"
            block="inline"
          >
            <Label txtSrc="Visuals" icnSrc="ed_img" />
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "tab-link")}
            data-w-tab="properties"
            block="inline"
          >
            <Label txtSrc="Properties" icnSrc="setting" />
          </_Builtin.TabsLink>
        </_Builtin.TabsMenu>
      </_Builtin.TabsWrapper>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "css-tab")}
        value="%3Cstyle%3E%0A%2F*%20Hide%20scrollbar%20for%20Chrome%2C%20Safari%20and%20Opera%20*%2F%0A.tab-bar%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A%2F*%20Hide%20scrollbar%20for%20IE%2C%20Edge%20and%20Firefox%20*%2F%0A.tab-bar%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%20%20%2F*%20IE%20and%20Edge%20*%2F%0A%20%20scrollbar-width%3A%20none%3B%20%20%2F*%20Firefox%20*%2F%0A%7D%0A%0A.tab-link.w--current%20.label%20.txt%20%7B%0A%09font-weight%3A%20bold%3B%0A%7D%0A.tab-link.w--current%20.label%20.icn%3A%3Afirst-letter%20%7B%0A%20%20%20%20text-transform%3A%20uppercase%3B%0A%7D%0A%5Btab-underline%3D%22y%22%5D%0A.tab-link.w--current%20%7B%0A%20%20%20%20border-bottom-style%3A%20solid%3B%0A%20%20%20%20border-bottom-width%3A%202px%3B%0A%20%20%20%20border-bottom-color%3A%20var(--theme--light--p500)%3B%0A%20%20%20%20color%3A%20var(--theme--light--p500)%3B%0A%20%20%20%20font-weight%3A%20700%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
