"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SliderCtrl.module.css";

export function SliderCtrl({
  as: _Component = _Builtin.Block,
  single = true,
  dual = false,
  wrapperId = "wrapper",
  trackId = "track",
  handleId = "handle",
  fillId = "fill",
  min = "0",
  max = "100000",
  step,
  start,
  start2,
  value = "display-value",
}) {
  return (
    <_Component className={_utils.cx(_styles, "slider")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "code-embed-2")}
        value="%3C!--%20This%20component%20is%20based%20off%20of%20the%20Finsweet%20Range%20Slider.%20%20Documentation%20here%3A%20https%3A%2F%2Ffinsweet.com%2Fattributes%2Frange-slider%20--%3E"
      />
      {single ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slider_wrapper")}
          tag="div"
          fs-rangeslider-element={wrapperId}
          fs-rangeslider-min={min}
          fs-rangeslider-max={max}
          fs-rangeslider-step={step}
          fs-rangeslider-formatdisplay="true"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slider_track")}
            tag="div"
            fs-rangeslider-element={trackId}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slider_handle")}
              tag="div"
              fs-rangeslider-element={handleId}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "slider_handle-value")}
                tag="div"
                data-fs="r3"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slider_fill")}
              tag="div"
              fs-rangeslider-element={fillId}
            />
          </_Builtin.Block>
          <_Builtin.FormTextInput
            className={_utils.cx(_styles, "slider_input")}
            autoFocus={false}
            maxLength={256}
            name="From-3"
            data-name="From 3"
            placeholder="From"
            type="text"
            disabled={false}
            required={false}
            fs-cmsfilter-field="price"
            fs-cmsfilter-range="from"
            id="From-3"
          />
        </_Builtin.Block>
      ) : null}
      {dual ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slider_wrapper")}
          tag="div"
          fs-rangeslider-element={wrapperId}
          fs-rangeslider-min={min}
          fs-rangeslider-max={max}
          fs-rangeslider-formatdisplay="true"
          fs-rangeslider-step={step}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slider_track")}
            tag="div"
            fs-rangeslider-element={trackId}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slider_handle")}
              tag="div"
              fs-rangeslider-element={handleId}
              fs-rangeslider-start={start}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "slider_handle")}
              tag="div"
              fs-rangeslider-element={handleId}
              fs-rangeslider-start={start2}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "slider_fill")}
              tag="div"
              fs-rangeslider-element={fillId}
            />
          </_Builtin.Block>
          <_Builtin.FormTextInput
            className={_utils.cx(_styles, "slider_input")}
            autoFocus={false}
            maxLength={256}
            name="From-3"
            data-name="From 3"
            placeholder="From"
            type="text"
            disabled={false}
            required={false}
            fs-cmsfilter-field="price"
            fs-cmsfilter-range="from"
            id="From-3"
          />
          <_Builtin.FormTextInput
            className={_utils.cx(_styles, "slider_input")}
            autoFocus={false}
            maxLength={256}
            name="To-3"
            data-name="To 3"
            placeholder="To"
            type="text"
            disabled={false}
            required={false}
            fs-cmsfilter-field="price"
            fs-cmsfilter-range="to"
            id="To-3"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "slider_values")}
            tag="div"
            data-fs="r3"
          >
            <_Builtin.Block tag="div">{"0"}</_Builtin.Block>
            <_Builtin.Block tag="div">{"0"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
