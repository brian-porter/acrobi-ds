"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalBtnGroup } from "./GlobalBtnGroup";
import * as _utils from "./utils";
import _styles from "./Visual.module.css";

export function Visual({
  as: _Component = _Builtin.DOM,
  componentVisualVisibility = true,
  componentClasses = "u-cover-absolute",
  imageImageVisibility = true,
  imageImageFile = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/67e87a7e9174953180857a14_placeholder.svg",
  imageImageAltText = "__wf_reserved_inherit",
  imageImageLoading = "lazy",
  imageImagePosition = "object-position: 50% 50%;",
  videoVideoVisibility = false,
  videoVideoUrl,
  videoVideoLoop = "loop",
  videoVideoAutoplay = "autoplay",
  videoVideoMuted = "muted",
  overlayOverlayVisibility = false,
  overlayOverlayOpacity = "opacity: 40%;",
}) {
  return componentVisualVisibility ? (
    <_Component
      className={_utils.cx(_styles, "g_visual_wrap", "u-position-relative")}
      tag="div"
      data-class={componentClasses}
      data-style={imageImagePosition}
    >
      <_Builtin.DOM
        className={_utils.cx(
          _styles,
          "g_visual_background",
          "u-cover-absolute"
        )}
        tag="div"
      />
      {imageImageVisibility ? (
        <_Builtin.Image
          className={_utils.cx(_styles, "g_visual_img", "u-cover-absolute")}
          width="auto"
          height="auto"
          loading={imageImageLoading}
          src={imageImageFile}
        />
      ) : null}
      {videoVideoVisibility ? (
        <_Builtin.DOM
          className={_utils.cx(_styles, "g_visual_video", "u-cover-absolute")}
          tag="video"
          src={videoVideoUrl}
          playsinline=" "
        />
      ) : null}
      {overlayOverlayVisibility ? (
        <_Builtin.DOM
          className={_utils.cx(_styles, "g_visual_overlay", "u-cover-absolute")}
          tag="div"
          style={overlayOverlayOpacity}
        />
      ) : null}
      <GlobalBtnGroup />
    </_Component>
  ) : null;
}
