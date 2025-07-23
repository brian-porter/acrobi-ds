"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Label } from "./Label";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import * as _utils from "./utils";
import _styles from "./PMessaging.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-903":{"id":"e-903","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-904"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3177b71b-54ad-3e6d-2e84-750b8881772c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3177b71b-54ad-3e6d-2e84-750b8881772c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1735861868185},"e-905":{"id":"e-905","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-906"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3177b71b-54ad-3e6d-2e84-750b88817730","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3177b71b-54ad-3e6d-2e84-750b88817730","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1735861868185},"e-907":{"id":"e-907","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-908"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3177b71b-54ad-3e6d-2e84-750b88817732","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3177b71b-54ad-3e6d-2e84-750b88817732","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1735861868185}},"actionLists":{"a-22":{"id":"a-22","title":"Sheet - Open","actionItemGroups":[{"actionItems":[{"id":"a-22-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"none"}},{"id":"a-22-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"xValue":null,"yValue":500,"xUnit":"px","yUnit":"px","zUnit":"PX"}},{"id":"a-22-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-22-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"flex"}},{"id":"a-22-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeInOut","duration":250,"target":{},"value":1,"unit":""}},{"id":"a-22-n-6","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"easeInOut","duration":250,"target":{},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1663936524957},"a-23":{"id":"a-23","title":"Sheet - Close","actionItemGroups":[{"actionItems":[{"id":"a-23-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":250,"target":{},"value":1,"unit":""}},{"id":"a-23-n-5","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":250,"target":{},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}}]},{"actionItems":[{"id":"a-23-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":250,"easing":"","duration":250,"target":{},"yValue":500,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-23-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":250,"easing":"","duration":250,"target":{},"value":0,"unit":""}},{"id":"a-23-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":500,"easing":"","duration":0,"target":{},"value":"none"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1663936524957}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function PMessaging({
  as: _Component = _Builtin.Block,
  groupList = true,
  groupListMap,
  groupBtmBtn = false,
  groupMoreClick = {},
  snip = true,
  snipMap,
  roomList = true,
  roomListMap,
  roomDetail = true,
  roomDetailMap,
  mbrList = false,
  mbrListMap,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "bq-page-wrapper")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "global-styles")}
        value="%3Cstyle%3E%0A%0A%2F*%20Get%20rid%20of%20top%20margin%20on%20first%20element%20in%20any%20rich%20text%20element%20*%2F%0A.w-richtext%20%3E%20%3Anot(div)%3Afirst-child%2C%20.w-richtext%20%3E%20div%3Afirst-child%20%3E%20%3Afirst-child%20%7B%0A%20%20margin-top%3A%200%20!important%3B%0A%7D%0A%0A%2F*%20Get%20rid%20of%20bottom%20margin%20on%20last%20element%20in%20any%20rich%20text%20element%20*%2F%0A.w-richtext%3E%3Alast-child%2C%20.w-richtext%20ol%20li%3Alast-child%2C%20.w-richtext%20ul%20li%3Alast-child%20%7B%0A%09margin-bottom%3A%200%20!important%3B%0A%7D%0A%0A%2F*%20%0AMake%20the%20following%20elements%20inherit%20typography%20styles%20from%20the%20parent%20and%20not%20have%20hardcoded%20values.%20%0AImportant%3A%20You%20will%20not%20be%20able%20to%20style%20for%20example%20%22All%20Links%22%20in%20Designer%20with%20this%20CSS%20applied.%0AUncomment%20this%20CSS%20to%20use%20it%20in%20the%20project.%20Leave%20this%20message%20for%20future%20hand-off.%0A*%2F%0A%2F*%0Aa%2C%0A.w-input%2C%0A.w-select%2C%0A.w-tab-link%2C%0A.w-nav-link%2C%0A.w-dropdown-btn%2C%0A.w-dropdown-toggle%2C%0A.w-dropdown-link%20%7B%0A%20%20color%3A%20inherit%3B%0A%20%20text-decoration%3A%20inherit%3B%0A%20%20font-size%3A%20inherit%3B%0A%7D%0A*%2F%0A%0A%2F*%20Prevent%20all%20click%20and%20hover%20interaction%20with%20an%20element%20*%2F%0A.pointer-events-off%20%7B%0A%09pointer-events%3A%20none%3B%0A%7D%0A%0A%2F*%20Enables%20all%20click%20and%20hover%20interaction%20with%20an%20element%20*%2F%0A.pointer-events-on%20%7B%0A%20%20pointer-events%3A%20auto%3B%0A%7D%0A%0A%2F*%20Snippet%20enables%20you%20to%20add%20class%20of%20div-square%20which%20creates%20and%20maintains%20a%201%3A1%20dimension%20of%20a%20div.*%2F%0A.div-square%3A%3Aafter%20%7B%0A%20%20content%3A%20%22%22%3B%0A%20%20display%3A%20block%3B%0A%20%20padding-bottom%3A%20100%25%3B%0A%7D%0A%0A%2F*Hide%20focus%20outline%20for%20main%20content%20element*%2F%0A%20%20%20%20main%3Afocus-visible%20%7B%0A%20%20%20%20outline%3A%20-webkit-focus-ring-color%20auto%200px%3B%0A%7D%0A%0A%2F*%20Make%20sure%20containers%20never%20lose%20their%20center%20alignment*%2F%0A.container-medium%2C%20.container-small%2C%20.container-large%20%7B%0A%20%20margin-right%3A%20auto%20!important%3B%0A%20%20margin-left%3A%20auto%20!important%3B%0A%7D%0A%0A%2F*Reset%20selects%2C%20buttons%2C%20and%20links%20styles*%2F%0A.w-input%2C%20.w-select%2C%20a%20%7B%0Acolor%3A%20inherit%3B%0Atext-decoration%3A%20inherit%3B%0Afont-size%3A%20inherit%3B%0A%7D%0A%0A%2F*Apply%20%22...%22%20after%203%20lines%20of%20text%20*%2F%0A.text-style-3lines%20%7B%0A%20%20%20%20display%3A%20-webkit-box%3B%0A%20%20%20%20overflow%3A%20hidden%3B%0A%20%20%20%20-webkit-line-clamp%3A%203%3B%0A%20%20%20%20-webkit-box-orient%3A%20vertical%3B%0A%7D%0A%0A%2F*%20Apply%20%22...%22%20after%202%20lines%20of%20text%20*%2F%0A.text-style-2lines%20%7B%0A%20%20%20%20display%3A%20-webkit-box%3B%0A%20%20%20%20overflow%3A%20hidden%3B%0A%20%20%20%20-webkit-line-clamp%3A%202%3B%0A%20%20%20%20-webkit-box-orient%3A%20vertical%3B%0A%7D%0A%2F*%20Apply%20%22...%22%20at%20100%25%20width%20*%2F%0A.truncate-width%20%7B%20%0A%09%09width%3A%20100%25%3B%20%0A%20%20%20%20white-space%3A%20nowrap%3B%20%0A%20%20%20%20overflow%3A%20hidden%3B%20%0A%20%20%20%20text-overflow%3A%20ellipsis%3B%20%0A%7D%0A%2F*%20Removes%20native%20scrollbar%20*%2F%0A.no-scrollbar%20%7B%0A%20%20%20%20-ms-overflow-style%3A%20none%3B%20%20%2F%2F%20IE%2010%2B%0A%20%20%20%20overflow%3A%20-moz-scrollbars-none%3B%20%20%2F%2F%20Firefox%0A%7D%0A%0A.no-scrollbar%3A%3A-webkit-scrollbar%20%7B%0A%20%20%20%20display%3A%20none%3B%20%2F%2F%20Safari%20and%20Chrome%0A%7D%0A%0A%2F*%20Adds%20inline%20flex%20display%20*%2F%0A.display-inlineflex%20%7B%0A%20%20display%3A%20inline-flex%3B%0A%7D%0A%0A%2F*%20These%20classes%20are%20never%20overwritten%20*%2F%0A.hide%20%7B%0A%20%20display%3A%20none%20!important%3B%0A%7D%0A%0A%40media%20screen%20and%20(max-width%3A%20991px)%2C%20%0A%20%20%40media%20screen%20and%20(max-width%3A%20767px)%2C%20%0A%20%20%40media%20screen%20and%20(max-width%3A%20479px)%7B%0A%20%20%20%20.hide%2C%20.hide-tablet%7B%0A%20%20%20%20%20%20display%3A%20none%20!important%3B%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%40media%20screen%20and%20(max-width%3A%20767px)%0A%20%20%20%20.hide-mobile-landscape%7B%0A%20%20%20%20%20%20display%3A%20none%20!important%3B%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20%40media%20screen%20and%20(max-width%3A%20479px)%0A%20%20%20%20.hide-mobile%7B%0A%20%20%20%20%20%20display%3A%20none%20!important%3B%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%0A.margin-0%20%7B%0A%20%20margin%3A%200rem%20!important%3B%0A%7D%0A%20%20%0A.padding-0%20%7B%0A%20%20padding%3A%200rem%20!important%3B%0A%7D%0A%0A.spacing-clean%20%7B%0Apadding%3A%200rem%20!important%3B%0Amargin%3A%200rem%20!important%3B%0A%7D%0A%0A.margin-top%20%7B%0A%20%20margin-right%3A%200rem%20!important%3B%0A%20%20margin-bottom%3A%200rem%20!important%3B%0A%20%20margin-left%3A%200rem%20!important%3B%0A%7D%0A%0A.padding-top%20%7B%0A%20%20padding-right%3A%200rem%20!important%3B%0A%20%20padding-bottom%3A%200rem%20!important%3B%0A%20%20padding-left%3A%200rem%20!important%3B%0A%7D%0A%20%20%0A.margin-right%20%7B%0A%20%20margin-top%3A%200rem%20!important%3B%0A%20%20margin-bottom%3A%200rem%20!important%3B%0A%20%20margin-left%3A%200rem%20!important%3B%0A%7D%0A%0A.padding-right%20%7B%0A%20%20padding-top%3A%200rem%20!important%3B%0A%20%20padding-bottom%3A%200rem%20!important%3B%0A%20%20padding-left%3A%200rem%20!important%3B%0A%7D%0A%0A.margin-bottom%20%7B%0A%20%20margin-top%3A%200rem%20!important%3B%0A%20%20margin-right%3A%200rem%20!important%3B%0A%20%20margin-left%3A%200rem%20!important%3B%0A%7D%0A%0A.padding-bottom%20%7B%0A%20%20padding-top%3A%200rem%20!important%3B%0A%20%20padding-right%3A%200rem%20!important%3B%0A%20%20padding-left%3A%200rem%20!important%3B%0A%7D%0A%0A.margin-left%20%7B%0A%20%20margin-top%3A%200rem%20!important%3B%0A%20%20margin-right%3A%200rem%20!important%3B%0A%20%20margin-bottom%3A%200rem%20!important%3B%0A%7D%0A%20%20%0A.padding-left%20%7B%0A%20%20padding-top%3A%200rem%20!important%3B%0A%20%20padding-right%3A%200rem%20!important%3B%0A%20%20padding-bottom%3A%200rem%20!important%3B%0A%7D%0A%20%20%0A.margin-horizontal%20%7B%0A%20%20margin-top%3A%200rem%20!important%3B%0A%20%20margin-bottom%3A%200rem%20!important%3B%0A%7D%0A%0A.padding-horizontal%20%7B%0A%20%20padding-top%3A%200rem%20!important%3B%0A%20%20padding-bottom%3A%200rem%20!important%3B%0A%7D%0A%0A.margin-vertical%20%7B%0A%20%20margin-right%3A%200rem%20!important%3B%0A%20%20margin-left%3A%200rem%20!important%3B%0A%7D%0A%20%20%0A.padding-vertical%20%7B%0A%20%20padding-right%3A%200rem%20!important%3B%0A%20%20padding-left%3A%200rem%20!important%3B%0A%7D%0A%0A%3C%2Fstyle%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "bq-main-wrapper")}
        tag="main"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "app-main")}
          tag="section"
          id="main"
        >
          {groupList ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "col-lead")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sidebar-left")}
                tag="div"
              >
                {groupListMap ?? (
                  <>
                    {groupList ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "group-list")}
                        tag="div"
                      >
                        {groupListMap ?? (
                          <_Builtin.HtmlEmbed value="%3C!--%20Map%20Group%20List%20Here%20--%3E" />
                        )}
                      </_Builtin.Block>
                    ) : null}
                    {groupBtmBtn ? (
                      <_Builtin.VFlex
                        className={_utils.cx(_styles, "side-btm-l")}
                        tag="div"
                      >
                        <Button
                          btnStyl="nt"
                          btnTxt={false}
                          btnSz="l"
                          lblClr="n500"
                          btn={false}
                          btnIcnLoc="t"
                        />
                        <Button
                          btnStyl="nt"
                          btnTxt={false}
                          btnSz="l"
                          lblClr="n500"
                          btn={false}
                          btnIcnLoc="t"
                        />
                        <Button
                          btnClick={groupMoreClick}
                          btnStyl="nt"
                          btnTxt={false}
                          btnIcnSrc="Moreh"
                          btnSz="l"
                          lblClr="n500"
                          btnTxtSrc="More"
                          btnIcnLoc="t"
                        />
                      </_Builtin.VFlex>
                    ) : null}
                  </>
                )}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block className={_utils.cx(_styles, "app-stage")} tag="div">
            {snip ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "panel-snip")}
                tag="div"
              >
                {snipMap ?? (
                  <_Builtin.HtmlEmbed value="%3C!--%20Map%20Snip%20Example%20Here%20--%3E" />
                )}
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "panel-rm")}
              tag="div"
            >
              {roomList ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "rm-list")}
                  tag="div"
                >
                  {roomListMap ?? (
                    <_Builtin.HtmlEmbed value="%3C!--%20Map%20Room%20List%20Here%20--%3E" />
                  )}
                </_Builtin.Block>
              ) : null}
              {roomDetail ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "rm-detail")}
                  tag="div"
                >
                  {roomDetailMap ?? (
                    <_Builtin.HtmlEmbed value="%3C!--%20Map%20Room%20Detail%20Here%20--%3E" />
                  )}
                </_Builtin.Block>
              ) : null}
              {mbrList ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "mbr-list")}
                  tag="div"
                >
                  {mbrListMap ?? (
                    <_Builtin.HtmlEmbed value="%3C!--%20Map%20Member%20List%20Here%20--%3E" />
                  )}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
