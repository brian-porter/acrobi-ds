"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { HeroStack } from "./HeroStack";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MGrant.module.css";

export function MGrant({
  as: _Component = _Builtin.Block,
  geo = false,
  geoAll = false,
  cal = false,
  mic = false,
  contacts = false,
  camera = false,
  ble = false,
  bio = false,
  lib = false,
  geoYesClick = {},
  geoNoClick = {},
  geoAllYesClick = {},
  geoAllNoClick = {},
  calYesClick = {},
  calNoClick = {},
  micYesClick = {},
  micNoClick = {},
  contactsYesClick = {},
  contactsNoClick = {},
  cameraYesClick = {},
  cameraNoClick = {},
  bleYesClick = {},
  bleNoClick = {},
  bioYesClick = {},
  bioNoClick = {},
  libYesClick = {},
  libNoClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "m-grant")} tag="div">
      {geo ? (
        <_Builtin.Block className={_utils.cx(_styles, "m-grant-geo")} tag="div">
          <HeroStack
            headlineSrc="What's Nearby"
            subtxtSrc="If you would like to find deals close to you, please allow access to your location"
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/667aee1c07a93bd5a02731b2_a-map-location.webp"
            icn={false}
          />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <Spacer szDep="64" size="64" />
            <ButtonPanel
              btn1Click={geoYesClick}
              btn2Click={geoNoClick}
              btn3={false}
              btn1TxtSrc="Allow"
              btn2TxtSrc="Not Now"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {geoAll ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "m-grant-geoall")}
          tag="div"
        >
          <HeroStack
            headlineSrc="Don't Miss Out"
            subtxtSrc="We alert you about nearby deals when you're out and about, by knowing your location"
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/667af00d7508fba37ccf5af3_a-map-with-many-local-locations-.webp"
          />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <Spacer szDep="64" size="64" />
            <ButtonPanel
              btn1Click={geoAllYesClick}
              btn2Click={geoAllNoClick}
              btn3={false}
              btn1TxtSrc="Always Allow"
              btn2TxtSrc="Not Now"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {cal ? (
        <_Builtin.Block className={_utils.cx(_styles, "m-grant-cal")} tag="div">
          <HeroStack
            headlineSrc="What's Happening"
            subtxtSrc="Add your events to a shared family calendar that you control"
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/667af9cb22e91d2ec11b0936_an-icon-of-a-calendar-without-days-and-numbers.webp"
          />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <Spacer szDep="64" size="64" />
            <ButtonPanel
              btn1Click={calYesClick}
              btn2Click={calNoClick}
              btn3={false}
              btn1TxtSrc="Allow"
              btn2TxtSrc="Not Now"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {mic ? (
        <_Builtin.Block className={_utils.cx(_styles, "m-grant-mic")} tag="div">
          <HeroStack
            headlineSrc="Be Heard"
            subtxtSrc="Grant access to your microphone to dictate lists and do voice search"
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/667aff5c5db96ac4681d31c5_megaphone.webp"
          />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <Spacer szDep="64" size="64" />
            <ButtonPanel
              btn1Click={micYesClick}
              btn2Click={micNoClick}
              btn3={false}
              btn1TxtSrc="Allow"
              btn2TxtSrc="Not Now"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {contacts ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "m-grant-contacts")}
          tag="div"
        >
          <HeroStack
            headlineSrc="Family & Friends"
            subtxtSrc="Add your family and friends, so they can contribute to lists, events and more!"
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/667af88b1493bc81167535e2_a-family.webp"
          />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <Spacer szDep="64" size="64" />
            <ButtonPanel
              btn1Click={contactsYesClick}
              btn2Click={contactsNoClick}
              btn3={false}
              btn1TxtSrc="Allow"
              btn2TxtSrc="Not Now"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {camera ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "m-grant-camera")}
          tag="div"
        >
          <HeroStack
            headlineSrc="Lights, Camera, Action!"
            subtxtSrc="To share photos and videos please allow access to your camera and photo library"
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/667afed02b73454e10018354_back-of-a-phone-on-top-of-a-collection-of-photos.webp"
          />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <Spacer szDep="64" size="64" />
            <ButtonPanel
              btn1Click={cameraYesClick}
              btn2Click={cameraNoClick}
              btn3={false}
              btn1TxtSrc="Allow"
              btn2TxtSrc="Not Now"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {ble ? (
        <_Builtin.Block className={_utils.cx(_styles, "m-grant-ble")} tag="div">
          <HeroStack
            headlineSrc="Share Bluetooth"
            subtxtSrc="Grant access to the bluetooth on your device to connect with other devices"
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/667afa82ea382d4304f34566_a-bluetooth-symbol-on-a-blue-circle.webp"
          />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <Spacer szDep="64" size="64" />
            <ButtonPanel
              btn1Click={bleYesClick}
              btn2Click={bleNoClick}
              btn3={false}
              btn1TxtSrc="Allow"
              btn2TxtSrc="Not Now"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {bio ? (
        <_Builtin.Block className={_utils.cx(_styles, "m-grant-bio")} tag="div">
          <HeroStack
            headlineSrc="Share Access to Face ID"
            subtxtSrc="Secure your BlueQueue app with your face and easily unlock the app with just a glance"
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/667af6ad7f703dc6a29ff6d4_face-id-on-a-woman.webp"
          />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <Spacer szDep="64" size="64" />
            <ButtonPanel
              btn1Click={bioYesClick}
              btn2Click={bioNoClick}
              btn3={false}
              btn1TxtSrc="Allow"
              btn2TxtSrc="Not Now"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {lib ? (
        <_Builtin.Block className={_utils.cx(_styles, "m-grant-lib")} tag="div">
          <HeroStack
            headlineSrc="Share Your Photo Library"
            subtxtSrc="Add and browse photos you've taken in the past and easily add them to your account"
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/667af6ad12e62e4e42e0e855_a-photo-library.webp"
          />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <Spacer szDep="64" size="64" />
            <ButtonPanel
              btn1Click={libYesClick}
              btn2Click={libNoClick}
              btn3={false}
              btn1TxtSrc="Got It, I'll Give Access"
              btn2TxtSrc="Not Now"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
