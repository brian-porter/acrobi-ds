"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PostMedia.module.css";

export function PostMedia({
  as: _Component = _Builtin.Block,
  media = true,
  mediaMap,
  mediaExample = true,
}) {
  return media ? (
    <_Component className={_utils.cx(_styles, "post-media")} tag="div">
      {mediaMap ??
        (mediaExample ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-70")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "mediaitem")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c7903_hassaan-qaiser-bKfkhVRAJTQ-unsplash.avif"
            />
            <_Builtin.Image
              className={_utils.cx(_styles, "mediaitem")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c7903_hassaan-qaiser-bKfkhVRAJTQ-unsplash.avif"
            />
          </_Builtin.Block>
        ) : null)}
    </_Component>
  ) : null;
}
