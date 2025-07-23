"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { SecHead } from "./SecHead";
import { TableRow } from "./TableRow";
import { Spacer } from "./Spacer";
import { Paragraph } from "./Paragraph";
import { ImgSs } from "./ImgSs";
import * as _utils from "./utils";
import _styles from "./PAccSnip.module.css";

export function PAccSnip({
  as: _Component = _Builtin.Block,
  qrClick = {},
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif",
  heroBtnClick = {},
  userAvtrClick = {},
  userAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  userName = "FName LName",
  userHandle = "@handle",
  secEditClick = {},
  secEmail = "name@domain.com",
  secPhone = "+1.555.222.1234",
  secPin = "******",
  secBio = "Enabled",
  profEditClick = {},
  profName = "FName LName",
  profRankName = "RankName",
  profRankYr = "Est. 2023",
  profLoc = "Minneapolis",
  profLink = "domain.com",
  profSocFb = "disabled",
  profSocGoogle = "disabled",
  profSocX = "disabled",
  profSocInsta = "disabled",
  profSocPint = "disabled",
  setEditClick = {},
  setTheme = "Blue - Light",
  setLang = "English",
  setCountry = "USA",
  setCrnc = "US Dollar",
  setMeasure = "Imperial",
  setTz = "Chicago",
  setPermLoc = "disabled",
  setPermCam = "disabled",
  setPermCont = "disabled",
  setPermCal = "disabled",
  setPermPhoto = "disabled",
  setPermMic = "disabled",
  favsEditClick = {},
  favStoreExample = true,
  favStoreEmpty = false,
  favStoreEmptyClick = {},
  favStoreMap,
  favBrandExample = true,
  favBrandEmpty = false,
  favBrandEmptyClick = {},
  favBrandMap,
  favPlaceExample = true,
  favPlaceEmpty = false,
  favPlaceEmptyClick = {},
  favPlaceMap,
  favProdExample = true,
  favProdEmpty = false,
  favProdMap,
  favProdEmptyClick = {},
  favCreatorExample = true,
  favCreatorEmpty = false,
  favCreatorEmptyClick = {},
  favCreatorMap,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-70-30")}
          id={_utils.cx(
            _styles,
            "w-node-_8a5403b8-f215-564a-aea0-97a3cfb5e59f-f6351de0"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-_8a5403b8-f215-564a-aea0-97a3cfb5e5a0-f6351de0"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "hero_sec")}
              grid={{
                type: "section",
              }}
              tag="section"
              data-shadow="y"
            >
              <Hero
                imgSrc={heroImgSrc}
                icnBarIcnBarL1Click={qrClick}
                avtrAvtrHlineSrc={userName}
                btnBtnClick={heroBtnClick}
                avtrAvtrSrc={userAvtrSrc}
                avtrAvtrSubTxtSrc={userHandle}
                avtrAvtrClick={userAvtrClick}
                hline={false}
                avtr={true}
                btn={true}
                avtrAvtrBdg={true}
                avtrAvtrBdgClr="p500"
                fadeBtm={false}
                heroAsp="21-9"
                avtrAvtrHline={true}
                btnBtnIcnSrc="Edit"
                avtrAvtrBdgIcnSrc="Edit"
                icnBar={true}
                icnBarIcnBarR1Icn={false}
                icnBarIcnBarR1Clr="n000"
                icnBarIcnBarL1Clr="n000"
                icnBarIcnBarL1Src="Qr"
                icnBarIcnBarR1Src=""
                avtrAvtrSz="xl"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "acc-headline")}
                tag="div"
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "acc-link")}
                  button={false}
                  block="inline"
                  options={{
                    href: "#",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "acc-name")}
                    tag="div"
                  >
                    {"FName LName"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "acc-handle")}
                    tag="div"
                  >
                    {"@handle"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "acc-preview")}
                    tag="div"
                  >
                    {"Preview Profile"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.Block>
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-_8a5403b8-f215-564a-aea0-97a3cfb5e5a1-f6351de0"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "acc-sec-security")}
              grid={{
                type: "section",
              }}
              tag="section"
              data-shadow="y"
            >
              <SecHead
                act1Click={secEditClick}
                titleSrc="Security"
                act1TxtSrc="Edit"
                subtxt={true}
                subtxtSrc="Private sign in & security info"
                subtxtSz="r4"
                sz=""
                titleSz="r1"
              />
              <TableRow
                col2TxtSrc={secEmail}
                col1Icn={true}
                col1IcnSrc="email"
                col1TxtSrc="Email"
                col1Align="l"
                col2Align="r"
              />
              <TableRow
                col2TxtSrc={secPhone}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="phone"
                col1TxtSrc="Phone"
                col1Align="l"
              />
              <TableRow
                col2TxtSrc={secPin}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="pin"
                col1TxtSrc="PIN"
                col1Align="l"
              />
              <TableRow
                col2TxtSrc={secBio}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="biometric"
                col1TxtSrc="Biometric Sign In"
                col1Align="l"
              />
              <Spacer szDep="8" size="8" />
              <Paragraph
                bodySrc="never share these with others"
                fontClr="n700"
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-3")}
            id={_utils.cx(
              _styles,
              "w-node-_8a5403b8-f215-564a-aea0-97a3cfb5e5a2-f6351de0"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "acc-sec-profile")}
              grid={{
                type: "section",
              }}
              tag="section"
              data-shadow="y"
            >
              <_Builtin.Block tag="div">
                <SecHead
                  act1Click={profEditClick}
                  titleSrc="Profile"
                  act1TxtSrc="Edit"
                  subtxt={true}
                  subtxtSrc="How others see you"
                  sz=""
                  titleSz="r1"
                />
                <TableRow
                  col2TxtSrc={profName}
                  col2Align="r"
                  col1Icn={true}
                  col1IcnSrc="user_name"
                  col1TxtSrc="Name"
                  col1Align="l"
                />
                <TableRow
                  col1TxtSrc={profRankName}
                  col2TxtSrc={profRankYr}
                  col1Icn={true}
                  col2Align="r"
                  col1IcnSrc="rank3"
                />
                <TableRow
                  col2TxtSrc={profLoc}
                  col2Align="r"
                  col1Icn={true}
                  col1IcnSrc="geo_home"
                  col1TxtSrc="Location"
                />
                <TableRow
                  col2TxtSrc={profLink}
                  col2Align="r"
                  col1Icn={true}
                  col1IcnSrc="link"
                  col1TxtSrc="Link"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <SecHead
                  titleSrc="Social Sharing"
                  sz="m"
                  act1TxtSrc="Edit"
                  act1={false}
                />
                <TableRow
                  col2TxtSrc={profSocFb}
                  col2Align="r"
                  col1Icn={true}
                  col1IcnSrc="logo_facebook"
                  col1TxtSrc="Facebook"
                />
                <TableRow
                  col2TxtSrc={profSocGoogle}
                  col2Align="r"
                  col1Icn={true}
                  col1IcnSrc="logo_google"
                  col1TxtSrc="Google"
                />
                <TableRow
                  col2TxtSrc={profSocX}
                  col2Align="r"
                  col1Icn={true}
                  col1IcnSrc="logo_twitter"
                  col1TxtSrc="Twitter (X)"
                />
                <TableRow
                  col2TxtSrc={profSocInsta}
                  col2Align="r"
                  col1Icn={true}
                  col1IcnSrc="logo_instagram"
                  col1TxtSrc="Instagram"
                />
                <TableRow
                  col2TxtSrc={profSocPint}
                  col2Align="r"
                  col1Icn={true}
                  col1IcnSrc="logo_pinterest"
                  col1TxtSrc="Pinterest"
                />
              </_Builtin.Block>
              <Spacer szDep="8" size="8" />
              <Paragraph
                bodySrc="connect with other apps to share"
                fontClr="n700"
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-4")}
            id={_utils.cx(
              _styles,
              "w-node-_10e42c82-4bd4-f413-c5a6-447e6beec5c8-f6351de0"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "acc-sec-set")}
              grid={{
                type: "section",
              }}
              tag="section"
              data-shadow="y"
            >
              <SecHead
                act1Click={setEditClick}
                titleSrc="Settings"
                act1TxtSrc="Edit"
                subtxt={true}
                subtxtSrc="How you prefer to interact with the app"
                sz=""
                titleSz="r1"
              />
              <TableRow
                col2TxtSrc={setTheme}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="rank"
                col1TxtSrc="Theme & Mode"
              />
              <TableRow
                col2TxtSrc={setLang}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="translate"
                col1TxtSrc="Language"
              />
              <TableRow
                col2TxtSrc={setCountry}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="flag"
                col1TxtSrc="Country"
              />
              <TableRow
                col2TxtSrc={setCrnc}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="cash"
                col1TxtSrc="Currency"
              />
              <TableRow
                col2TxtSrc={setMeasure}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="measure"
                col1TxtSrc="Systems of Measure"
              />
              <TableRow
                col2TxtSrc={setTz}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="location"
                col1TxtSrc="Time Zone"
              />
              <SecHead
                titleSrc="Permissions"
                sz="m"
                act1TxtSrc="Enable All"
                act1={false}
              />
              <TableRow
                col2TxtSrc={setPermLoc}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="geo_location"
                col1TxtSrc="Location"
                col2IcnSrc="default"
              />
              <TableRow
                col2TxtSrc={setPermCam}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="photo"
                col1TxtSrc="Camera"
              />
              <TableRow
                col2TxtSrc={setPermCont}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="contacts"
                col1TxtSrc="Contacts"
                col2IcnSrc="default"
              />
              <TableRow
                col2TxtSrc={setPermCal}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="cal"
                col1TxtSrc="Calendar"
              />
              <TableRow
                col2TxtSrc={setPermPhoto}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="gal"
                col1TxtSrc="Photos"
              />
              <TableRow
                col2TxtSrc={setPermMic}
                col2Align="r"
                col1Icn={true}
                col1IcnSrc="mic"
                col1TxtSrc="Microphone"
              />
              <Spacer szDep="8" size="8" />
              <Paragraph
                bodySrc="customize to how you like it"
                fontClr="n700"
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-5")}
            id={_utils.cx(
              _styles,
              "w-node-b1ecdf61-cb2e-42cb-e5bc-09ad8e34d794-f6351de0"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "acc-sec-fav")}
              grid={{
                type: "section",
              }}
              tag="section"
              data-shadow="y"
            >
              <SecHead
                act1Click={favsEditClick}
                titleSrc="Favorites"
                act1TxtSrc="Edit"
                subtxt={true}
                subtxtSrc="How the app knows what you like"
                sz=""
                titleSz="r1"
              />
              <_Builtin.Layout
                className={_utils.cx(_styles, "quick-stack-2")}
                id={_utils.cx(
                  _styles,
                  "w-node-_491c3dd4-0911-e42f-3a60-11feae1872ce-f6351de0"
                )}
              >
                <_Builtin.Cell
                  id={_utils.cx(
                    _styles,
                    "w-node-_75ba5262-b898-fe1c-b17b-d5b999cc4a7e-f6351de0"
                  )}
                >
                  <SecHead
                    titleSrc="Stores"
                    sz="s"
                    act1TxtSrc="Add"
                    titleIcn={true}
                    act1={false}
                    titleIcnSrc="store"
                  />
                  <ImgSs
                    cellMap={favStoreMap}
                    emptyEmptyClick={favStoreEmptyClick}
                    empty={favStoreEmpty}
                    sideFade={false}
                    emptyIcnSrc=""
                    emptyCtaTxtSrc=""
                    emptyHlineSrc="No Favorites Yet"
                    emptySubTxtSrc=""
                    cellSz="2xl"
                  />
                </_Builtin.Cell>
                <_Builtin.Cell
                  id={_utils.cx(
                    _styles,
                    "w-node-_0f565c4d-172b-65d4-78d8-8e3ed0dff51d-f6351de0"
                  )}
                >
                  <SecHead
                    titleSrc="Brands"
                    sz="s"
                    act1TxtSrc="Add"
                    act1={false}
                    titleIcn={true}
                    titleIcnSrc="brand"
                  />
                  <ImgSs
                    cellMap={favBrandMap}
                    emptyEmptyClick={favBrandEmptyClick}
                    empty={favBrandEmpty}
                    sideFade={false}
                    emptyIcnSrc="brand"
                    emptyHlineSrc=""
                    emptyCtaTxtSrc="Find & Add Brands"
                    emptySubTxtSrc="Get the latest updates from your favorite brands"
                    cellSz="2xl"
                  />
                </_Builtin.Cell>
                <_Builtin.Cell
                  id={_utils.cx(
                    _styles,
                    "w-node-eedf377b-b2ea-8f28-6dba-eea407d57343-f6351de0"
                  )}
                >
                  <SecHead
                    titleSrc="Places"
                    sz="s"
                    act1TxtSrc="Add"
                    act1={false}
                    titleIcn={true}
                    titleIcnSrc="place"
                  />
                  <ImgSs
                    cellMap={favPlaceMap}
                    emptyEmptyClick={favPlaceEmptyClick}
                    empty={favPlaceEmpty}
                    sideFade={false}
                    emptyIcnSrc="place"
                    emptyHlineSrc="No Favorites Yet"
                    emptyCtaTxtSrc="Find & Add Places"
                    emptySubTxtSrc="Know what's going on at your favorites places"
                    cellSz="2xl"
                  />
                </_Builtin.Cell>
                <_Builtin.Cell
                  id={_utils.cx(
                    _styles,
                    "w-node-_4869c6a0-0ab2-0332-6e70-dcc5923fa69d-f6351de0"
                  )}
                >
                  <SecHead
                    titleSrc="Products"
                    sz="s"
                    act1TxtSrc="Add"
                    act1={false}
                    titleIcn={true}
                    titleIcnSrc="prod"
                  />
                  <ImgSs
                    cellMap={favProdMap}
                    emptyEmptyClick={favProdEmptyClick}
                    empty={favProdEmpty}
                    sideFade={false}
                    emptyIcnSrc="product"
                    emptyHlineSrc="No Favorites Yet"
                    emptyCtaTxtSrc="Find & Add Products"
                    emptySubTxtSrc="Stay informed about the latest product updates"
                    cellSz="2xl"
                  />
                </_Builtin.Cell>
                <_Builtin.Cell
                  id={_utils.cx(
                    _styles,
                    "w-node-c1f72396-f499-5a4d-55a0-96b9bcfc5205-f6351de0"
                  )}
                >
                  <SecHead
                    titleSrc="Offers"
                    sz="s"
                    act1TxtSrc="Add"
                    act1={false}
                    titleIcn={true}
                    titleIcnSrc="offer"
                  />
                  <ImgSs
                    cellMap={favProdMap}
                    emptyEmptyClick={favProdEmptyClick}
                    empty={favProdEmpty}
                    sideFade={false}
                    emptyIcnSrc="product"
                    emptyHlineSrc="No Favorites Yet"
                    emptyCtaTxtSrc="Find & Add Products"
                    emptySubTxtSrc="Stay informed about the latest product updates"
                    cellSz="2xl"
                  />
                </_Builtin.Cell>
                <_Builtin.Cell
                  id={_utils.cx(
                    _styles,
                    "w-node-_8577b1e2-0a59-ac12-6187-8aad65c21f9d-f6351de0"
                  )}
                >
                  <SecHead
                    titleSrc="Creators"
                    sz="s"
                    act1TxtSrc="Add"
                    act1={false}
                    titleIcn={true}
                    titleIcnSrc="peep"
                  />
                  <ImgSs
                    cellMap={favCreatorMap}
                    emptyEmptyClick={favCreatorEmptyClick}
                    empty={favCreatorEmpty}
                    sideFade={false}
                    emptyIcnSrc="peep"
                    emptyHlineSrc="No Favorites Yet"
                    emptyCtaTxtSrc="Find & Follow Creators"
                    emptySubTxtSrc="Learn new tips and tricks from creators in the community"
                    cellSz="2xl"
                  />
                </_Builtin.Cell>
              </_Builtin.Layout>
              <Spacer szDep="8" size="8" />
            </_Builtin.Section>
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
