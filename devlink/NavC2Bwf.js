"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Label } from "./Label";
import { MenuItem } from "./MenuItem";
import { Button } from "./Button";
import { Avatar } from "./Avatar";
import * as _utils from "./utils";
import _styles from "./NavC2Bwf.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-123":{"id":"e-123","name":"","animationType":"preset","eventTypeId":"NAVBAR_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-47","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-124"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8a3f71d3-8820-6487-6e50-f7db063e65e5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8a3f71d3-8820-6487-6e50-f7db063e65e5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666844732557},"e-124":{"id":"e-124","name":"","animationType":"preset","eventTypeId":"NAVBAR_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-52","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-123"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8a3f71d3-8820-6487-6e50-f7db063e65e5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8a3f71d3-8820-6487-6e50-f7db063e65e5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666844732557},"e-543":{"id":"e-543","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-105","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-544"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"383d1648-98dd-c9db-b9c8-008a43c0638c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"383d1648-98dd-c9db-b9c8-008a43c0638c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666844732557},"e-544":{"id":"e-544","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-110","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-543"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"383d1648-98dd-c9db-b9c8-008a43c0638c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"383d1648-98dd-c9db-b9c8-008a43c0638c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666844732557},"e-545":{"id":"e-545","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-107","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-546"}},"mediaQueries":["main"],"target":{"id":"383d1648-98dd-c9db-b9c8-008a43c0638c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"383d1648-98dd-c9db-b9c8-008a43c0638c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666844732557},"e-546":{"id":"e-546","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-545"}},"mediaQueries":["main"],"target":{"id":"383d1648-98dd-c9db-b9c8-008a43c0638c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"383d1648-98dd-c9db-b9c8-008a43c0638c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1666844732557},"e-747":{"id":"e-747","name":"","animationType":"preset","eventTypeId":"NAVBAR_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-134","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-748"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"44b622bf-9d52-83f3-7683-28b71556b821","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"44b622bf-9d52-83f3-7683-28b71556b821","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706466619054},"e-748":{"id":"e-748","name":"","animationType":"preset","eventTypeId":"NAVBAR_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-135","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-747"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"44b622bf-9d52-83f3-7683-28b71556b821","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"44b622bf-9d52-83f3-7683-28b71556b821","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706466619054},"e-765":{"id":"e-765","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-136","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-766"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"44b622bf-9d52-83f3-7683-28b71556b835","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"44b622bf-9d52-83f3-7683-28b71556b835","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706472316911},"e-766":{"id":"e-766","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-137","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-765"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"44b622bf-9d52-83f3-7683-28b71556b835","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"44b622bf-9d52-83f3-7683-28b71556b835","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706472316911},"e-767":{"id":"e-767","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-138","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-768"}},"mediaQueries":["main"],"target":{"id":"44b622bf-9d52-83f3-7683-28b71556b835","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"44b622bf-9d52-83f3-7683-28b71556b835","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706472316911},"e-768":{"id":"e-768","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-139","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-767"}},"mediaQueries":["main"],"target":{"id":"44b622bf-9d52-83f3-7683-28b71556b835","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"44b622bf-9d52-83f3-7683-28b71556b835","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706472316911},"e-769":{"id":"e-769","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-136","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-770"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"44b622bf-9d52-83f3-7683-28b71556b840","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"44b622bf-9d52-83f3-7683-28b71556b840","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706474369464},"e-770":{"id":"e-770","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-137","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-769"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"44b622bf-9d52-83f3-7683-28b71556b840","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"44b622bf-9d52-83f3-7683-28b71556b840","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706474369464},"e-771":{"id":"e-771","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-138","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-772"}},"mediaQueries":["main"],"target":{"id":"44b622bf-9d52-83f3-7683-28b71556b840","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"44b622bf-9d52-83f3-7683-28b71556b840","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706474369464},"e-772":{"id":"e-772","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-139","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-771"}},"mediaQueries":["main"],"target":{"id":"44b622bf-9d52-83f3-7683-28b71556b840","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"44b622bf-9d52-83f3-7683-28b71556b840","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1706474369464},"e-859":{"id":"e-859","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-138","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-860"}},"mediaQueries":["main"],"target":{"id":"ba5c828d-22bb-2254-e975-eb7114e62f9e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba5c828d-22bb-2254-e975-eb7114e62f9e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710270338295},"e-860":{"id":"e-860","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-139","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-859"}},"mediaQueries":["main"],"target":{"id":"ba5c828d-22bb-2254-e975-eb7114e62f9e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba5c828d-22bb-2254-e975-eb7114e62f9e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710270338295},"e-861":{"id":"e-861","name":"","animationType":"preset","eventTypeId":"DROPDOWN_OPEN","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-136","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-862"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"ba5c828d-22bb-2254-e975-eb7114e62f9e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba5c828d-22bb-2254-e975-eb7114e62f9e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710270338295},"e-862":{"id":"e-862","name":"","animationType":"preset","eventTypeId":"DROPDOWN_CLOSE","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-137","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-861"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"ba5c828d-22bb-2254-e975-eb7114e62f9e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"ba5c828d-22bb-2254-e975-eb7114e62f9e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710270338295}},"actionLists":{"a-47":{"id":"a-47","title":"Navbar 1 [Open Menu]","actionItemGroups":[{"actionItems":[{"id":"a-47-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"inOutQuint","duration":200,"target":{},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}},{"id":"a-47-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"yValue":-8,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-47-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".rl_menu-icon_line-top","selectorGuids":["209c3d5b-ee77-3933-21df-8ea058cd2ef8"]},"yValue":8,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-47-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{"useEventTarget":"CHILDREN","selector":".rl_menu-icon_line-top","selectorGuids":["209c3d5b-ee77-3933-21df-8ea058cd2ef8"]},"zValue":-45,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-47-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"zValue":45,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626168378054},"a-52":{"id":"a-52","title":"Navbar 1 [Close Menu]","actionItemGroups":[{"actionItems":[{"id":"a-52-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-52-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{"useEventTarget":"CHILDREN","selector":".rl_menu-icon_line-top","selectorGuids":["209c3d5b-ee77-3933-21df-8ea058cd2ef8"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-52-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-52-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".rl_menu-icon_line-top","selectorGuids":["209c3d5b-ee77-3933-21df-8ea058cd2ef8"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-52-n-5","actionTypeId":"STYLE_SIZE","config":{"delay":400,"easing":"inOutQuint","duration":200,"target":{},"widthValue":24,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626168766736},"a-105":{"id":"a-105","title":"Navbar 1 Dropdown [Open] [Tablet] 5","actionItemGroups":[{"actionItems":[{"id":"a-105-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{},"heightValue":0,"widthUnit":"px","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-105-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"ease","duration":300,"target":{},"widthUnit":"PX","heightUnit":"AUTO","locked":false}},{"id":"a-105-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dd-icon","selectorGuids":["08b54da8-aeac-fc8b-a67b-f9df0b7c3dfd"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1626241970095},"a-110":{"id":"a-110","title":"Navbar 1 Dropdown [Close] [Tablet] 5","actionItemGroups":[{"actionItems":[{"id":"a-110-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"ease","duration":200,"target":{},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-110-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dd-icon","selectorGuids":["08b54da8-aeac-fc8b-a67b-f9df0b7c3dfd"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626241970095},"a-107":{"id":"a-107","title":"Navbar 1 Dropdown [Open] [Desktop] 6","actionItemGroups":[{"actionItems":[{"id":"a-107-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":-3,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-107-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-107-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{},"yValue":0,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-107-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{},"value":1,"unit":""}},{"id":"a-107-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dd-icon","selectorGuids":["08b54da8-aeac-fc8b-a67b-f9df0b7c3dfd"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1626241970095},"a-103":{"id":"a-103","title":"Navbar 1 Dropdown [Close] [Desktop] 6","actionItemGroups":[{"actionItems":[{"id":"a-103-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{},"value":0,"unit":""}},{"id":"a-103-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dd-icon","selectorGuids":["08b54da8-aeac-fc8b-a67b-f9df0b7c3dfd"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-103-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":0,"target":{},"yValue":-4,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626241970095},"a-134":{"id":"a-134","title":"Navbar 1 [Open Menu] 6","actionItemGroups":[{"actionItems":[{"id":"a-134-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"inOutQuint","duration":200,"target":{},"widthValue":0,"widthUnit":"px","heightUnit":"PX","locked":false}},{"id":"a-134-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"yValue":-8,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-134-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"yValue":8,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-134-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"zValue":-45,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-134-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"zValue":45,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626168378054},"a-135":{"id":"a-135","title":"Navbar 1 [Close Menu] 6","actionItemGroups":[{"actionItems":[{"id":"a-135-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-135-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"inOutQuint","duration":600,"target":{},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-135-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-135-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"inOutQuint","duration":400,"target":{},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-135-n-5","actionTypeId":"STYLE_SIZE","config":{"delay":400,"easing":"inOutQuint","duration":200,"target":{},"widthValue":24,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626168766736},"a-136":{"id":"a-136","title":"Navbar 1 Dropdown [Open] [Tablet] 6","actionItemGroups":[{"actionItems":[{"id":"a-136-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{},"heightValue":0,"widthUnit":"px","heightUnit":"px","locked":false}}]},{"actionItems":[{"id":"a-136-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"ease","duration":300,"target":{},"widthUnit":"PX","heightUnit":"AUTO","locked":false}},{"id":"a-136-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dd-icon","selectorGuids":["08b54da8-aeac-fc8b-a67b-f9df0b7c3dfd"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1626241970095},"a-137":{"id":"a-137","title":"Navbar 1 Dropdown [Close] [Tablet] 6","actionItemGroups":[{"actionItems":[{"id":"a-137-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"ease","duration":200,"target":{},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-137-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dd-icon","selectorGuids":["08b54da8-aeac-fc8b-a67b-f9df0b7c3dfd"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626241970095},"a-138":{"id":"a-138","title":"Navbar 1 Dropdown [Open] [Desktop] 7","actionItemGroups":[{"actionItems":[{"id":"a-138-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"yValue":-3,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-138-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-138-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{},"yValue":0,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}},{"id":"a-138-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{},"value":1,"unit":""}},{"id":"a-138-n-5","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dd-icon","selectorGuids":["08b54da8-aeac-fc8b-a67b-f9df0b7c3dfd"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1626241970095},"a-139":{"id":"a-139","title":"Navbar 1 Dropdown [Close] [Desktop] 7","actionItemGroups":[{"actionItems":[{"id":"a-139-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{},"value":0,"unit":""}},{"id":"a-139-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".dd-icon","selectorGuids":["08b54da8-aeac-fc8b-a67b-f9df0b7c3dfd"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-139-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":0,"target":{},"yValue":-4,"xUnit":"PX","yUnit":"rem","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1626241970095}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function NavC2Bwf({
  as: _Component = _Builtin.NavbarWrapper,
  navBtn1 = true,
  navBtn1IcnSrc = "lt_ass_digital",
  navBtn1TxtSrc = "Discover",
  navBtn1OnClick = {},
  navMenu1Map,
  navMenu1ItmTitleSrc = "Menu Item",
  navMenu1ItmIcnSrc = "default",
  navMenu1ItmClick = {},
  signUp = true,
  signUpBtnClick = {},
  signIn = true,
  signInBtnClick = {},
  acct = false,
  acctAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c791c_me_280.avif",
  acctOnClick = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "a-navbar")}
      data-w-id="44b622bf-9d52-83f3-7683-28b71556b821"
      tag="div"
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      fs-scrolldisable-element="smart-nav"
      config={{
        animation: "default",
        easing: "ease-in-out",
        easing2: "ease-in-out",
        duration: 300,
        docHeight: false,
        collapse: "small",
        noScroll: false,
      }}
    >
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.nb-dd-list.w--open%20%7B%0A%20%20%20%20background-color%3A%20%23FFF%3B%0A%20%20%20%20border%3A%200px%20solid%20%23FFF%3B%0A%20%20%20%20padding%3A%200rem%3B%0A%7D%0A%3C%2Fstyle%3E" />
      <_Builtin.Block className={_utils.cx(_styles, "nb-container")} tag="div">
        <_Builtin.NavbarBrand
          className={_utils.cx(_styles, "nb-brand")}
          options={{
            href: "#",
          }}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "h2", "logo")}
            tag="div"
          >
            {"Bq"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "h4", "wordmark")}
            tag="div"
          >
            {"BlueQueue"}
          </_Builtin.Block>
        </_Builtin.NavbarBrand>
        <_Builtin.NavbarMenu
          className={_utils.cx(_styles, "nb-menu-wrap")}
          tag="nav"
          role="navigation"
        >
          <_Builtin.DropdownWrapper
            className={_utils.cx(_styles, "nb-menu-dd")}
            tag="div"
            delay={100}
            hover={false}
          >
            <_Builtin.DropdownToggle
              className={_utils.cx(_styles, "nb-dd-toggle")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "dd-icon")}
                value="%3Csvg%20width%3D%22%20100%25%22%20height%3D%22%20100%25%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.55806%206.29544C2.46043%206.19781%202.46043%206.03952%202.55806%205.94189L3.44195%205.058C3.53958%204.96037%203.69787%204.96037%203.7955%205.058L8.00001%209.26251L12.2045%205.058C12.3021%204.96037%2012.4604%204.96037%2012.5581%205.058L13.4419%205.94189C13.5396%206.03952%2013.5396%206.19781%2013.4419%206.29544L8.17678%2011.5606C8.07915%2011.6582%207.92086%2011.6582%207.82323%2011.5606L2.55806%206.29544Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Label txtSrc="Discover" lblSz="r1" icnSrc="discover" />
            </_Builtin.DropdownToggle>
            <_Builtin.DropdownList
              className={_utils.cx(_styles, "nb-dd-list")}
              tag="nav"
            >
              <MenuItem
                pTitleSrc="All Nodes"
                menuItmLink={{
                  href: "#",
                }}
              />
              <MenuItem
                pTitleSrc="One Node"
                menuItmLink={{
                  href: "#",
                }}
              />
            </_Builtin.DropdownList>
          </_Builtin.DropdownWrapper>
          <_Builtin.DropdownWrapper
            className={_utils.cx(_styles, "nb-mega-menu")}
            tag="div"
            delay={200}
            hover={false}
          >
            <_Builtin.DropdownToggle
              className={_utils.cx(_styles, "nb-dd-toggle")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "dd-icon")}
                value="%3Csvg%20width%3D%22%20100%25%22%20height%3D%22%20100%25%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.55806%206.29544C2.46043%206.19781%202.46043%206.03952%202.55806%205.94189L3.44195%205.058C3.53958%204.96037%203.69787%204.96037%203.7955%205.058L8.00001%209.26251L12.2045%205.058C12.3021%204.96037%2012.4604%204.96037%2012.5581%205.058L13.4419%205.94189C13.5396%206.03952%2013.5396%206.19781%2013.4419%206.29544L8.17678%2011.5606C8.07915%2011.6582%207.92086%2011.6582%207.82323%2011.5606L2.55806%206.29544Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Label txtSrc="Lists" lblSz="r1" icnSrc="list" />
            </_Builtin.DropdownToggle>
            <_Builtin.DropdownList
              className={_utils.cx(_styles, "nb-dd-mega")}
              tag="nav"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "nb-dd-mega-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "nb-dd-content")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dd-col")}
                    id={_utils.cx(
                      _styles,
                      "w-node-_87ce982d-2449-538e-eef5-60c71cc48bb8-1556b821"
                    )}
                    tag="div"
                  >
                    <MenuItem
                      lIcn={true}
                      lIcnSrc="l_supplies"
                      pTitleSz="r2b"
                      pTitleSrc="Supplies"
                      menuItmLink={{
                        href: "/l/2?cat=supplies",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Groceries"
                      menuItmLink={{
                        href: "/l/2?cat=grocery",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Office"
                      menuItmLink={{
                        href: "/l/2?cat=office",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="School"
                      menuItmLink={{
                        href: "/l/2?cat=school",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Project"
                      menuItmLink={{
                        href: "/l/2?cat=project",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Hobby"
                      menuItmLink={{
                        href: "/l/2?cat=hobby",
                      }}
                    />
                    <MenuItem
                      lIcn={true}
                      lIcnSrc="l_gift"
                      pTitleSz="r2b"
                      pTitleSrc="Gift"
                      menuItmLink={{
                        href: "/l/2?cat=gifts",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Birthday"
                      menuItmLink={{
                        href: "/l/2?cat=birthday",
                      }}
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.DropdownList>
          </_Builtin.DropdownWrapper>
          <_Builtin.DropdownWrapper
            className={_utils.cx(_styles, "nb-menu-dd")}
            data-w-id="ba5c828d-22bb-2254-e975-eb7114e62f9e"
            tag="div"
            delay={100}
            hover={false}
          >
            <_Builtin.DropdownToggle
              className={_utils.cx(_styles, "nb-dd-toggle")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "dd-icon")}
                value="%3Csvg%20width%3D%22%20100%25%22%20height%3D%22%20100%25%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.55806%206.29544C2.46043%206.19781%202.46043%206.03952%202.55806%205.94189L3.44195%205.058C3.53958%204.96037%203.69787%204.96037%203.7955%205.058L8.00001%209.26251L12.2045%205.058C12.3021%204.96037%2012.4604%204.96037%2012.5581%205.058L13.4419%205.94189C13.5396%206.03952%2013.5396%206.19781%2013.4419%206.29544L8.17678%2011.5606C8.07915%2011.6582%207.92086%2011.6582%207.82323%2011.5606L2.55806%206.29544Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Label txtSrc="People" lblSz="r1" icnSrc="peep" />
            </_Builtin.DropdownToggle>
            <_Builtin.DropdownList
              className={_utils.cx(_styles, "nb-dd-list")}
              tag="nav"
            >
              <MenuItem
                pTitleSrc="All"
                menuItmLink={{
                  href: "/u/2?cat=all",
                }}
              />
              <MenuItem
                pTitleSrc="Family"
                menuItmLink={{
                  href: "/u/2?cat=family",
                }}
              />
              <MenuItem
                pTitleSrc="Friends"
                menuItmLink={{
                  href: "/u/2?cat=friends",
                }}
              />
              <MenuItem
                pTitleSrc="Conects"
                menuItmLink={{
                  href: "/u/2?cat=connects",
                }}
              />
              <MenuItem
                pTitleSrc="Groups & Clubs"
                menuItmLink={{
                  href: "/u/2?cat=groups",
                }}
              />
            </_Builtin.DropdownList>
          </_Builtin.DropdownWrapper>
          <_Builtin.DropdownWrapper
            className={_utils.cx(_styles, "nb-mega-menu")}
            tag="div"
            delay={200}
            hover={false}
          >
            <_Builtin.DropdownToggle
              className={_utils.cx(_styles, "nb-dd-toggle")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "dd-icon")}
                value="%3Csvg%20width%3D%22%20100%25%22%20height%3D%22%20100%25%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.55806%206.29544C2.46043%206.19781%202.46043%206.03952%202.55806%205.94189L3.44195%205.058C3.53958%204.96037%203.69787%204.96037%203.7955%205.058L8.00001%209.26251L12.2045%205.058C12.3021%204.96037%2012.4604%204.96037%2012.5581%205.058L13.4419%205.94189C13.5396%206.03952%2013.5396%206.19781%2013.4419%206.29544L8.17678%2011.5606C8.07915%2011.6582%207.92086%2011.6582%207.82323%2011.5606L2.55806%206.29544Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Label txtSrc="Admin" lblSz="r1" icnSrc="admin" />
            </_Builtin.DropdownToggle>
            <_Builtin.DropdownList
              className={_utils.cx(_styles, "nb-dd-mega")}
              tag="nav"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "nb-dd-mega-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "nb-dd-content")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dd-col")}
                    tag="div"
                  >
                    <MenuItem
                      lIcn={true}
                      lIcnSrc="drawer"
                      pTitleSz="r2b"
                      pTitleSrc="Design System"
                    />
                    <MenuItem
                      pTitleSrc="Styles"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      menuItmLink={{
                        href: "#",
                      }}
                      pTitleSrc="Components"
                    />
                    <MenuItem
                      lIcn={true}
                      lIcnSrc="globe2"
                      pTitleSz="r2b"
                      pTitleSrc="Modules"
                    />
                    <MenuItem
                      menuItmLink={{
                        href: "#",
                      }}
                      pTitleSrc="Actions"
                    />
                    <MenuItem
                      menuItmLink={{
                        href: "#",
                      }}
                      pTitleSrc="Sign In & Up"
                    />
                    <MenuItem
                      menuItmLink={{
                        href: "#",
                      }}
                      pTitleSrc="Search & Share"
                    />
                    <MenuItem
                      menuItmLink={{
                        href: "#",
                      }}
                      pTitleSrc="Post - Note, Review, Vid, Q&A"
                    />
                    <MenuItem
                      menuItmLink={{
                        href: "#",
                      }}
                      pTitleSrc="Menu | Modal | Empty"
                    />
                    <MenuItem
                      menuItmLink={{
                        href: "#",
                      }}
                      pTitleSrc="Report & Feedback"
                    />
                    <MenuItem
                      menuItmLink={{
                        href: "#",
                      }}
                      pTitleSrc="Device Grants"
                    />
                    <MenuItem
                      menuItmLink={{
                        href: "#",
                      }}
                      pTitleSrc="Nav & Editor"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dd-col")}
                    id={_utils.cx(
                      _styles,
                      "w-node-ca710686-4331-9c07-e6dd-8e7009d91869-1556b821"
                    )}
                    tag="div"
                  >
                    <MenuItem
                      lIcn={true}
                      lIcnSrc="peep"
                      pTitleSz="r2b"
                      pTitleSrc="People & Groups"
                    />
                    <MenuItem
                      pTitleSrc="Peep/Groups All (L1)"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Peep Type (L2)"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Peep Detail (L4)"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Peep Modules"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Group Type (L2)"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Group Detail (L4)"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Group Room"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      lIcn={true}
                      lIcnSrc="profile"
                      pTitleSz="r2b"
                      pTitleSrc="Account"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Account Modules"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dd-col")}
                    id={_utils.cx(
                      _styles,
                      "w-node-ca710686-4331-9c07-e6dd-8e7009d91880-1556b821"
                    )}
                    tag="div"
                  >
                    <MenuItem
                      lIcn={true}
                      lIcnSrc="list"
                      pTitleSz="r2b"
                      pTitleSrc="Lists"
                    />
                    <MenuItem
                      pTitleSrc="List All (L1)"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="List Type (L2)"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="List Detail (L3)"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="List All - Settings"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="List Detail - Settings "
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="List Modules"
                      menuItmLink={{
                        href: "#",
                      }}
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dd-col")}
                    id={_utils.cx(
                      _styles,
                      "w-node-ca710686-4331-9c07-e6dd-8e7009d91890-1556b821"
                    )}
                    tag="div"
                  >
                    <MenuItem
                      lIcn={true}
                      lIcnSrc="checklist"
                      pTitleSz="r2b"
                      pTitleSrc="Item Detail (L4)"
                    />
                    <MenuItem
                      pTitleSrc="Snippet"
                      menuItmLink={{
                        href: "https://i/detail#snip",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Market"
                      menuItmLink={{
                        href: "https://i/detail#market",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Reviews"
                      menuItmLink={{
                        href: "https://i/detail#reviews",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Q & A"
                      menuItmLink={{
                        href: "https://i/detail#qa",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Videos"
                      menuItmLink={{
                        href: "https://i/detail#vid",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Library"
                      menuItmLink={{
                        href: "https://i/detail#lib",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Groups"
                      menuItmLink={{
                        href: "https://i/detail#groups",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Talk"
                      menuItmLink={{
                        href: "https://i/detail#talk",
                      }}
                    />
                    <MenuItem
                      pTitleSrc="Notes"
                      menuItmLink={{
                        href: "https://i/detail#notes",
                      }}
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.DropdownList>
          </_Builtin.DropdownWrapper>
          <_Builtin.Block
            className={_utils.cx(_styles, "nb-menu-access")}
            tag="div"
          >
            {signIn ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "signin-m")}
                tag="div"
              >
                <Button
                  btnClick={signInBtnClick}
                  btnTxtSrc="Sign In"
                  btnStyl="nl"
                  btnIcn={false}
                />
              </_Builtin.Block>
            ) : null}
            {signUp ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "signup-m")}
                tag="div"
              >
                <Button
                  btnClick={signUpBtnClick}
                  btnIcn={false}
                  btnTxtSrc="Sign Up"
                  btnStyl="pf"
                />
              </_Builtin.Block>
            ) : null}
            {acct ? (
              <_Builtin.Link
                className={_utils.cx(_styles, "nb-account")}
                button={false}
                block="inline"
                options={{
                  href: "#",
                }}
                {...acctOnClick}
              >
                <Avatar avtrSz="s" />
              </_Builtin.Link>
            ) : null}
          </_Builtin.Block>
        </_Builtin.NavbarMenu>
        <_Builtin.NavbarButton
          className={_utils.cx(_styles, "nb-hburger-btn")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "menu-icon")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "rl_menu-icon_line-top")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "menu-icon_line-mid")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "menu-icon_line-mid-inner")}
                tag="div"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "menu-icon_line-btm")}
              tag="div"
            />
          </_Builtin.Block>
        </_Builtin.NavbarButton>
      </_Builtin.Block>
    </_Component>
  );
}
