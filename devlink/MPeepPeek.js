"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { ItmSecCta } from "./ItmSecCta";
import { Spacer } from "./Spacer";
import { BtnBarSs } from "./BtnBarSs";
import { SecHead } from "./SecHead";
import { Paragraph } from "./Paragraph";
import { TableRow } from "./TableRow";
import { ImgSs } from "./ImgSs";
import { TextareaForm } from "./TextareaForm";
import { MMutual } from "./MMutual";
import { MMute } from "./MMute";
import { MBlock } from "./MBlock";
import { MDelete2 } from "./MDelete2";
import * as _utils from "./utils";
import _styles from "./MPeepPeek.module.css";

export function MPeepPeek({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroImgAlt = "__wf_reserved_inherit",
  heroQrClick = {},
  heroMoreClick = {},
  heroAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  heroAvtrAlt = "__wf_reserved_inherit",
  heroTitleSrc = "FName LName",
  heroSubtxtSrc = "@handle",
  heroProfClick = {},
  heroBtnIcnSrc = "Addcirc",
  heroBtnTxtSrc = "Connect",
  heroBtnClick = {},
  inviteClick = {},
  alertClick = {},
  groupsClick = {},
  peepClick = {},
  muteClick = {},
  blockClick = {},
  disClick = {},
  aboutSrc = "Body copy here lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur",
  rankSrc = "RankName",
  estSrc = "Est. 2023",
  locationSrc = "LocationName",
  domainSrc = "DomainName.com",
  domainClick = {},
  socialMap,
  socialExample = true,
  notesChange,
  notesClick = {},
  sheet = false,
  sheetMap,
  groupExample = false,
  peepExample = false,
  muteExample = false,
  blockExample = false,
  dis = false,
  disconnectExample = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-peek")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-peek-body")} tag="div">
        <Hero
          imgSrc={heroImgSrc}
          imgAlt={heroImgAlt}
          icnBarIcnBarL1Click={heroQrClick}
          icnBarIcnBarR1Click={heroMoreClick}
          avtrAvtrSrc={heroAvtrSrc}
          avtrAvtrAlt={heroAvtrAlt}
          avtr={true}
          hline={false}
          heroAsp="21-9"
          icnBarIcnBarL1Src="Qr"
        />
        <ItmSecCta
          header={heroTitleSrc}
          btnTxtSrc={heroBtnTxtSrc}
          btnIcnSrc={heroBtnIcnSrc}
          desc={heroSubtxtSrc}
          linkClick={heroProfClick}
          btnClick={heroBtnClick}
          eyebrowSrc="three to four words"
          eyebrow={false}
          link={true}
        />
        <Spacer />
        <BtnBarSs
          btn1Click={inviteClick}
          btn2Click={alertClick}
          btn3Click={groupsClick}
          btn4Click={peepClick}
          btn5Click={muteClick}
          btn6Click={blockClick}
          btn7Click={disClick}
          btn7={dis}
          btn1TxtSrc="Invite"
          btn2TxtSrc="Set Alert"
          btn3TxtSrc="Mutual Groups"
          btn4TxtSrc="Mutual Peeps"
          btn6={true}
          btn5TxtSrc="Mute"
          btn6TxtSrc="Block"
          btn1IcnSrc="peep_add"
          btn2IcnSrc="alarm"
          btn3IcnSrc="group"
          btn4IcnSrc="member"
          btn5IcnSrc="block"
          btn6IcnSrc="peep_block"
          sideFade={true}
          btn7TxtSrc="Disconnect"
          btn7IcnSrc="stop"
          btn6Id=""
        />
        <_Builtin.Section
          className={_utils.cx(_styles, "peek-sec-profile")}
          grid={{
            type: "section",
          }}
          tag="section"
          shadow="y"
        >
          <_Builtin.Block tag="div">
            <SecHead titleSrc="About Me" act1={false} sz="m" titleSz="r1" />
            <Paragraph bodySrc={aboutSrc} fontClr="n700" />
            <TableRow
              col1TxtSrc={rankSrc}
              col2TxtSrc={estSrc}
              col1Icn={true}
              col2Align="r"
              col1IcnSrc="rank3"
            />
            <TableRow
              col1TxtSrc={locationSrc}
              col2Align="r"
              col1Icn={true}
              col1IcnSrc="geo_home"
              col2={false}
            />
            <TableRow
              col1TxtSrc={domainSrc}
              rowClick={domainClick}
              col2Align="r"
              col1Icn={true}
              col1IcnSrc="link"
              col2={false}
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <SecHead titleSrc="Socials" act1={false} titleSz="r1" />
            <ImgSs
              cellMap={socialMap}
              cellExample={socialExample}
              emptyHlineSrc="Link Your Apps"
              emptyCtaTxtSrc="Add Apps"
              emptyIcnSrc="ed_share"
              emptySubTxtSrc="No social apps are connected to your account Add them and next time they'll show up here to choose from."
              emptyEmptyClick={{}}
              cellSz="l"
              sideFade={false}
            />
          </_Builtin.Block>
          <Spacer />
        </_Builtin.Section>
        <_Builtin.FormWrapper>
          <_Builtin.FormForm
            name="email-form"
            data-name="Email Form"
            method="get"
            id="email-form"
          >
            <TextareaForm
              fieldOnChange={notesChange}
              fieldFldClick={notesClick}
              lblTopLblSrc="Notes"
              fldHelp={false}
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
        <Spacer />
      </_Builtin.Block>
      {sheet ? (
        <_Builtin.Block className={_utils.cx(_styles, "sheet_bg")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "sheet-content")}
            tag="div"
            bs="l"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "sheet-grab")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sheet-slot")}
              tag="div"
            >
              {sheetMap ?? (
                <>
                  <MMutual
                    group={groupExample}
                    peep={peepExample}
                    groupEmpty={false}
                  />
                  <MMute
                    mute={muteExample}
                    _15MOn={true}
                    _1HOn={false}
                    _3HOn={false}
                    _8HOn={false}
                    _24HOn={false}
                    allOn={false}
                    cancelClick={{}}
                    _15MClick={{}}
                    _1HClick={{}}
                    _3HClick={{}}
                    _8HClick={{}}
                    _24HClick={{}}
                    allClick={{}}
                    doClick={{}}
                  />
                  <MBlock block={blockExample} />
                  <MDelete2
                    baseBase={disconnectExample}
                    baseBaseObjImg={false}
                    baseBaseObjAvtr={true}
                    baseBaseObjTitleSrc="FName LName"
                    baseBaseObjSubtxt1Src="@handle"
                    baseBaseDoTxtSrc="Disconnect"
                  />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
