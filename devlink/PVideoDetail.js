"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Post } from "./Post";
import { Spacer } from "./Spacer";
import { ItemHead } from "./ItemHead";
import { SecHead } from "./SecHead";
import { VideoItem } from "./VideoItem";
import * as _utils from "./utils";
import _styles from "./PVideoDetail.module.css";

export function PVideoDetail({
  as: _Component = _Builtin.Block,

  vidSrc = {
    width: 940,
    height: 528,
    title: "video placeholder",
    url: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FNpEaa2P7qZI%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DNpEaa2P7qZI&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FNpEaa2P7qZI%2Fhqdefault.jpg&type=text%2Fhtml&schema=youtube",
  },

  rank = true,
  rankMoreClick = {},
  rankQty = "0",
  rankLessClick = {},
  gttrPin = false,
  gttrBookmark = false,
  postMoreClick = {},
  postTime = "5d",
  titleSrc = "Post Title goes here and line wraps",
  bodySrc = (
    <>
      {
        "Body of the post goes in this location with any media attachments below text copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
      }
      <br />
      <br />
      {
        "Body of the post goes in this location with any media attachments below text copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
      }
    </>
  ),
  bodyAcrd = true,
  bodyAcrdClick = {},
  bodyAcrdTxtSrc = "more",
  bodyAcrdIcnSrc = "nav_down",
  media = false,
  mediaMap,
  mediaExample = true,
  atrb = true,
  atrbAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtrAlt = "__wf_reserved_inherit",
  atrbName = "ChannelName",
  atrbBdg = true,
  atrbStat1Icn = true,
  atrbStat1TxtSrc = "3.2k",
  atrbClick = {},
  act = true,
  actLike = true,
  actLikeQty = false,
  actLikeQtySrc = "1",
  actLikeIcnSrc = "act_like",
  actLikeClick = {},
  actComment = true,
  actCommentQty = false,
  actCommentQtySrc = "1",
  actCommentIcnSrc = "chat",
  actCommentClick = {},
  actShare = true,
  actShareClick = {},
  actBookmark = true,
  actBookmarkIcnSrc = "act_bookmark",
  actBookmarkClick = {},
  resp = true,
  respQty = "No",
  respName = "Comments",
  respList = true,
  respListMap,
  respItemExample = false,
  respEmpty = true,
  respEmptyClick = {},
  itmHead = true,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmName = "ItemName description goes here andline wraps",
  popular = true,
  popMap,
  popExample = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "bqg_video-detail")} tag="div">
      <_Builtin.Video
        className={_utils.cx(_styles, "herovid")}
        options={vidSrc}
      />
      <_Builtin.Block className={_utils.cx(_styles, "item_sec-span")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "itemvid-detail-col1")}
          tag="div"
        >
          <Post
            bodyAcrd={bodyAcrd}
            rank={rank}
            atrb={atrb}
            atrbStat1TxtSrc={atrbStat1TxtSrc}
            atrbStat1Icn={atrbStat1Icn}
            atrbName={atrbName}
            rankMoreClick={rankMoreClick}
            rankQty={rankQty}
            rankLessClick={rankLessClick}
            gttrPin={gttrPin}
            gttrBookmark={gttrBookmark}
            postMoreClick={postMoreClick}
            postTime={postTime}
            titleSrc={titleSrc}
            bodySrc={bodySrc}
            bodyAcrdClick={bodyAcrdClick}
            bodyAcrdTxtSrc={bodyAcrdTxtSrc}
            bodyAcrdIcnSrc={bodyAcrdIcnSrc}
            media={media}
            mediaMap={mediaMap}
            mediaExample={mediaExample}
            atrbAvtr={atrbAvtr}
            atrbAvtrAlt={atrbAvtrAlt}
            atrbBdg={atrbBdg}
            atrbClick={atrbClick}
            act={act}
            actLike={actLike}
            actLikeQty={actLikeQty}
            actLikeQtySrc={actLikeQtySrc}
            actLikeIcnSrc={actLikeIcnSrc}
            actLikeClick={actLikeClick}
            actComment={actComment}
            actCommentQty={actCommentQty}
            actCommentQtySrc={actCommentQtySrc}
            actCommentIcnSrc={actCommentIcnSrc}
            actCommentClick={actCommentClick}
            actShare={actShare}
            actShareClick={actShareClick}
            actBookmark={actBookmark}
            actBookmarkIcnSrc={actBookmarkIcnSrc}
            actBookmarkClick={actBookmarkClick}
            resp={resp}
            respQty={respQty}
            respName={respName}
            respList={respList}
            respListMap={respListMap}
            respItemExample={respItemExample}
            respEmpty={respEmpty}
            respEmptyClick={respEmptyClick}
            post={true}
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "itemvid-detail-col2")}
          tag="div"
        >
          <Spacer szDep="8" />
          <ItemHead
            itmImgSrc={itmImgSrc}
            name={itmName}
            itmHead={itmHead}
            itmImgAlt="__wf_reserved_inherit"
          />
          <Spacer szDep="16" />
          {popular ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "pop-sec")}
              tag="section"
            >
              <SecHead
                titleSrc="Popular"
                titleIcn={true}
                titleIcnSrc="hot"
                act1={false}
              />
              <Spacer szDep="16" />
              <_Builtin.Grid
                className={_utils.cx(_styles, "media-grid-aside")}
                tag="div"
              >
                {popMap ?? (
                  <VideoItem
                    videoItem={popExample}
                    postLength="00:00"
                    bodySrc="Name of the video goes here withline wrap to second line max really long line here to test the line wrap and truncate at the second"
                  />
                )}
              </_Builtin.Grid>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <Spacer szDep="80" />
    </_Component>
  );
}
