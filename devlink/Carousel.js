"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Carousel.module.css";

export function Carousel({
  as: _Component = _Builtin.Block,
  arrows = true,
  pagination = true,
  img1Src = "",
  img1Alt,
  img2Src = "",
  img2Alt,
  img6Src = "",
  img6Alt,
  options = '{"type":"loop","perPage":1}',
  id = "image-carousel",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "splide", "slider1")}
      tag="div"
      aria-label="carouselDescription"
      data-splide={options}
      id={id}
    >
      {arrows ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "splide__arrows")}
          tag="div"
        >
          <_Builtin.Link
            className={_utils.cx(
              _styles,
              "splide__arrow",
              "splide__arrow--prev"
            )}
            button={true}
            block=""
            options={{
              href: "#",
            }}
          >
            {"nav_left_f"}
          </_Builtin.Link>
          <_Builtin.Link
            className={_utils.cx(
              _styles,
              "splide__arrow",
              "splide__arrow--next"
            )}
            button={true}
            block=""
            options={{
              href: "#",
            }}
          >
            {"nav_right_f"}
          </_Builtin.Link>
        </_Builtin.Block>
      ) : null}
      {pagination ? (
        <_Builtin.List
          className={_utils.cx(_styles, "splide__pagination")}
          tag="ul"
          unstyled={false}
        >
          <_Builtin.ListItem
            className={_utils.cx(_styles, "splide__pagination__item")}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "splide__pagination__page")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "splide__pagination__page",
                "is-active"
              )}
              tag="div"
            />
          </_Builtin.ListItem>
        </_Builtin.List>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "splide__track")} tag="div">
        <_Builtin.List
          className={_utils.cx(_styles, "splide__list")}
          tag="ul"
          unstyled={false}
        >
          <_Builtin.ListItem className={_utils.cx(_styles, "splide__slide")}>
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              src={img1Src}
            />
          </_Builtin.ListItem>
          <_Builtin.ListItem className={_utils.cx(_styles, "splide__slide")}>
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              src={img2Src}
            />
          </_Builtin.ListItem>
          <_Builtin.ListItem className={_utils.cx(_styles, "splide__slide")}>
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              src={img6Src}
            />
          </_Builtin.ListItem>
          <_Builtin.ListItem className={_utils.cx(_styles, "splide__slide")}>
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              src={img6Src}
            />
          </_Builtin.ListItem>
          <_Builtin.ListItem className={_utils.cx(_styles, "splide__slide")}>
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              src={img6Src}
            />
          </_Builtin.ListItem>
          <_Builtin.ListItem className={_utils.cx(_styles, "splide__slide")}>
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              src={img6Src}
            />
          </_Builtin.ListItem>
        </_Builtin.List>
      </_Builtin.Block>
    </_Component>
  );
}
