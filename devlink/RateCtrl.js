"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./RateCtrl.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-711":{"id":"e-711","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-130","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-712"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f1b8|634593a4-0825-53cd-12e2-c1b8a325db40","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f1b8|634593a4-0825-53cd-12e2-c1b8a325db40","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1705035683176},"e-712":{"id":"e-712","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-131","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-711"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c28ee1b1ee0bfebe57f1b8|634593a4-0825-53cd-12e2-c1b8a325db40","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c28ee1b1ee0bfebe57f1b8|634593a4-0825-53cd-12e2-c1b8a325db40","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":false},"createdOn":1705035683177}},"actionLists":{"a-130":{"id":"a-130","title":"BBC-ShowFind","actionItemGroups":[{"actionItems":[{"id":"a-130-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"block"}},{"id":"a-130-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".label_wrap","selectorGuids":["579a7b8f-3b84-cc06-ebf3-0daa8d9e31ee"]},"value":"none"}}]},{"actionItems":[{"id":"a-130-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"block"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705035718968},"a-131":{"id":"a-131","title":"BBC-HideFind","actionItemGroups":[{"actionItems":[{"id":"a-131-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1705036399025}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function RateCtrl({
  as: _Component = _Builtin.Block,
  value = "0",
  rateId,
  rate1 = false,
  rate1State = "Star",
  rate1Over = {},
  rate2 = false,
  rate2State = "Star",
  rate2Over = {},
  rate3 = false,
  rate3State = "Starh",
  rate3Over = {},
  rate4 = false,
  rate4State = "Starh",
  rate4Over = {},
  rate5 = false,
  rate5State = "Starh",
  rate5Over = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "rating_wrap")}
      tag="div"
      id={rateId}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "rating_main")}
        tag="div"
        fs-starrating-element="group"
      >
        <_Builtin.FormRadioWrapper className={_utils.cx(_styles, "rpoint")}>
          <_Builtin.FormRadioInput
            className={_utils.cx(_styles, "rating_rdobtn")}
            type="radio"
            name="Rating"
            value="1"
            data-name="Rating"
            required={false}
            id="Star-rating-1-1"
            form={{
              type: "radio-input",
              name: "Rating",
            }}
            inputType="custom"
            customClassName="w-form-formradioinput--inputType-custom"
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "rating_bg")}
            fs-starrating-element="star"
            value="%3Csvg%20aria-hidden%3D%22true%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M23.971%208.33703C23.9368%208.23887%2023.8729%208.15379%2023.7881%208.09359C23.7034%208.03339%2023.602%208.00104%2023.498%208.00103H15.352L12.47%200.335027C12.4358%200.237131%2012.372%200.152296%2012.2874%200.0922707C12.2029%200.0322454%2012.1017%200%2011.998%200C11.8943%200%2011.7932%200.0322454%2011.7086%200.0922707C11.624%200.152296%2011.5602%200.237131%2011.526%200.335027L8.64402%208.00103H0.498022C0.394355%208.00164%200.293431%208.0344%200.209166%208.09479C0.1249%208.15518%200.0614432%208.24022%200.0275431%208.33819C-0.00635697%208.43616%20-0.00903037%208.54223%200.0198914%208.64179C0.0488133%208.74134%200.107906%208.82947%200.189022%208.89403L6.91202%2014.677L4.02302%2023.343C3.98958%2023.4437%203.989%2023.5523%204.02137%2023.6533C4.05374%2023.7543%204.11737%2023.8424%204.20308%2023.9048C4.28879%2023.9673%204.39214%2024.0008%204.49818%2024.0007C4.60423%2024.0006%204.70748%2023.9667%204.79302%2023.904L11.998%2018.621L19.203%2023.904C19.2886%2023.9667%2019.3918%2024.0006%2019.4979%2024.0007C19.6039%2024.0008%2019.7073%2023.9673%2019.793%2023.9048C19.8787%2023.8424%2019.9423%2023.7543%2019.9747%2023.6533C20.007%2023.5523%2020.0065%2023.4437%2019.973%2023.343L17.084%2014.677L23.807%208.89403C23.8889%208.8298%2023.9488%208.74162%2023.9782%208.64177C24.0076%208.54192%2024.0051%208.43539%2023.971%208.33703Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          {rate1 ? (
            <_Builtin.FormInlineLabel
              className={_utils.cx(_styles, "rating_on")}
              data-lbl-size="h3"
              {...rate1Over}
            >
              {rate1State}
            </_Builtin.FormInlineLabel>
          ) : null}
        </_Builtin.FormRadioWrapper>
        <_Builtin.FormRadioWrapper className={_utils.cx(_styles, "rpoint")}>
          <_Builtin.FormRadioInput
            className={_utils.cx(_styles, "rating_rdobtn")}
            type="radio"
            name="Rating"
            value="2"
            data-name="Rating"
            required={false}
            id="2"
            form={{
              type: "radio-input",
              name: "Rating",
            }}
            inputType="custom"
            customClassName="w-form-formradioinput--inputType-custom"
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "rating_bg")}
            fs-starrating-element="star"
            value="%3Csvg%20aria-hidden%3D%22true%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M23.971%208.33703C23.9368%208.23887%2023.8729%208.15379%2023.7881%208.09359C23.7034%208.03339%2023.602%208.00104%2023.498%208.00103H15.352L12.47%200.335027C12.4358%200.237131%2012.372%200.152296%2012.2874%200.0922707C12.2029%200.0322454%2012.1017%200%2011.998%200C11.8943%200%2011.7932%200.0322454%2011.7086%200.0922707C11.624%200.152296%2011.5602%200.237131%2011.526%200.335027L8.64402%208.00103H0.498022C0.394355%208.00164%200.293431%208.0344%200.209166%208.09479C0.1249%208.15518%200.0614432%208.24022%200.0275431%208.33819C-0.00635697%208.43616%20-0.00903037%208.54223%200.0198914%208.64179C0.0488133%208.74134%200.107906%208.82947%200.189022%208.89403L6.91202%2014.677L4.02302%2023.343C3.98958%2023.4437%203.989%2023.5523%204.02137%2023.6533C4.05374%2023.7543%204.11737%2023.8424%204.20308%2023.9048C4.28879%2023.9673%204.39214%2024.0008%204.49818%2024.0007C4.60423%2024.0006%204.70748%2023.9667%204.79302%2023.904L11.998%2018.621L19.203%2023.904C19.2886%2023.9667%2019.3918%2024.0006%2019.4979%2024.0007C19.6039%2024.0008%2019.7073%2023.9673%2019.793%2023.9048C19.8787%2023.8424%2019.9423%2023.7543%2019.9747%2023.6533C20.007%2023.5523%2020.0065%2023.4437%2019.973%2023.343L17.084%2014.677L23.807%208.89403C23.8889%208.8298%2023.9488%208.74162%2023.9782%208.64177C24.0076%208.54192%2024.0051%208.43539%2023.971%208.33703Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          {rate2 ? (
            <_Builtin.FormInlineLabel
              className={_utils.cx(_styles, "rating_on")}
              data-lbl-size="h3"
              {...rate2Over}
            >
              {rate2State}
            </_Builtin.FormInlineLabel>
          ) : null}
        </_Builtin.FormRadioWrapper>
        <_Builtin.FormRadioWrapper className={_utils.cx(_styles, "rpoint")}>
          <_Builtin.FormRadioInput
            className={_utils.cx(_styles, "rating_rdobtn")}
            type="radio"
            name="Rating"
            value="3"
            data-name="Rating"
            required={false}
            id="3"
            form={{
              type: "radio-input",
              name: "Rating",
            }}
            inputType="custom"
            customClassName="w-form-formradioinput--inputType-custom"
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "rating_bg")}
            fs-starrating-element="star"
            value="%3Csvg%20aria-hidden%3D%22true%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M23.971%208.33703C23.9368%208.23887%2023.8729%208.15379%2023.7881%208.09359C23.7034%208.03339%2023.602%208.00104%2023.498%208.00103H15.352L12.47%200.335027C12.4358%200.237131%2012.372%200.152296%2012.2874%200.0922707C12.2029%200.0322454%2012.1017%200%2011.998%200C11.8943%200%2011.7932%200.0322454%2011.7086%200.0922707C11.624%200.152296%2011.5602%200.237131%2011.526%200.335027L8.64402%208.00103H0.498022C0.394355%208.00164%200.293431%208.0344%200.209166%208.09479C0.1249%208.15518%200.0614432%208.24022%200.0275431%208.33819C-0.00635697%208.43616%20-0.00903037%208.54223%200.0198914%208.64179C0.0488133%208.74134%200.107906%208.82947%200.189022%208.89403L6.91202%2014.677L4.02302%2023.343C3.98958%2023.4437%203.989%2023.5523%204.02137%2023.6533C4.05374%2023.7543%204.11737%2023.8424%204.20308%2023.9048C4.28879%2023.9673%204.39214%2024.0008%204.49818%2024.0007C4.60423%2024.0006%204.70748%2023.9667%204.79302%2023.904L11.998%2018.621L19.203%2023.904C19.2886%2023.9667%2019.3918%2024.0006%2019.4979%2024.0007C19.6039%2024.0008%2019.7073%2023.9673%2019.793%2023.9048C19.8787%2023.8424%2019.9423%2023.7543%2019.9747%2023.6533C20.007%2023.5523%2020.0065%2023.4437%2019.973%2023.343L17.084%2014.677L23.807%208.89403C23.8889%208.8298%2023.9488%208.74162%2023.9782%208.64177C24.0076%208.54192%2024.0051%208.43539%2023.971%208.33703Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          {rate3 ? (
            <_Builtin.FormInlineLabel
              className={_utils.cx(_styles, "rating_on")}
              data-lbl-size="h3"
              {...rate3Over}
            >
              {rate3State}
            </_Builtin.FormInlineLabel>
          ) : null}
        </_Builtin.FormRadioWrapper>
        <_Builtin.FormRadioWrapper className={_utils.cx(_styles, "rpoint")}>
          <_Builtin.FormRadioInput
            className={_utils.cx(_styles, "rating_rdobtn")}
            type="radio"
            name="Rating"
            value="4"
            data-name="Rating"
            required={false}
            id="4"
            form={{
              type: "radio-input",
              name: "Rating",
            }}
            inputType="custom"
            customClassName="w-form-formradioinput--inputType-custom"
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "rating_bg")}
            fs-starrating-element="star"
            value="%3Csvg%20aria-hidden%3D%22true%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M23.971%208.33703C23.9368%208.23887%2023.8729%208.15379%2023.7881%208.09359C23.7034%208.03339%2023.602%208.00104%2023.498%208.00103H15.352L12.47%200.335027C12.4358%200.237131%2012.372%200.152296%2012.2874%200.0922707C12.2029%200.0322454%2012.1017%200%2011.998%200C11.8943%200%2011.7932%200.0322454%2011.7086%200.0922707C11.624%200.152296%2011.5602%200.237131%2011.526%200.335027L8.64402%208.00103H0.498022C0.394355%208.00164%200.293431%208.0344%200.209166%208.09479C0.1249%208.15518%200.0614432%208.24022%200.0275431%208.33819C-0.00635697%208.43616%20-0.00903037%208.54223%200.0198914%208.64179C0.0488133%208.74134%200.107906%208.82947%200.189022%208.89403L6.91202%2014.677L4.02302%2023.343C3.98958%2023.4437%203.989%2023.5523%204.02137%2023.6533C4.05374%2023.7543%204.11737%2023.8424%204.20308%2023.9048C4.28879%2023.9673%204.39214%2024.0008%204.49818%2024.0007C4.60423%2024.0006%204.70748%2023.9667%204.79302%2023.904L11.998%2018.621L19.203%2023.904C19.2886%2023.9667%2019.3918%2024.0006%2019.4979%2024.0007C19.6039%2024.0008%2019.7073%2023.9673%2019.793%2023.9048C19.8787%2023.8424%2019.9423%2023.7543%2019.9747%2023.6533C20.007%2023.5523%2020.0065%2023.4437%2019.973%2023.343L17.084%2014.677L23.807%208.89403C23.8889%208.8298%2023.9488%208.74162%2023.9782%208.64177C24.0076%208.54192%2024.0051%208.43539%2023.971%208.33703Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          {rate4 ? (
            <_Builtin.FormInlineLabel
              className={_utils.cx(_styles, "rating_on")}
              data-lbl-size="h3"
              {...rate4Over}
            >
              {rate4State}
            </_Builtin.FormInlineLabel>
          ) : null}
        </_Builtin.FormRadioWrapper>
        <_Builtin.FormRadioWrapper className={_utils.cx(_styles, "rpoint")}>
          <_Builtin.FormRadioInput
            className={_utils.cx(_styles, "rating_rdobtn")}
            type="radio"
            name="Rating"
            value="5"
            data-name="Rating"
            required={false}
            id="5"
            form={{
              type: "radio-input",
              name: "Rating",
            }}
            inputType="custom"
            customClassName="w-form-formradioinput--inputType-custom"
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "rating_bg")}
            fs-starrating-element="star"
            value="%3Csvg%20aria-hidden%3D%22true%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M23.971%208.33703C23.9368%208.23887%2023.8729%208.15379%2023.7881%208.09359C23.7034%208.03339%2023.602%208.00104%2023.498%208.00103H15.352L12.47%200.335027C12.4358%200.237131%2012.372%200.152296%2012.2874%200.0922707C12.2029%200.0322454%2012.1017%200%2011.998%200C11.8943%200%2011.7932%200.0322454%2011.7086%200.0922707C11.624%200.152296%2011.5602%200.237131%2011.526%200.335027L8.64402%208.00103H0.498022C0.394355%208.00164%200.293431%208.0344%200.209166%208.09479C0.1249%208.15518%200.0614432%208.24022%200.0275431%208.33819C-0.00635697%208.43616%20-0.00903037%208.54223%200.0198914%208.64179C0.0488133%208.74134%200.107906%208.82947%200.189022%208.89403L6.91202%2014.677L4.02302%2023.343C3.98958%2023.4437%203.989%2023.5523%204.02137%2023.6533C4.05374%2023.7543%204.11737%2023.8424%204.20308%2023.9048C4.28879%2023.9673%204.39214%2024.0008%204.49818%2024.0007C4.60423%2024.0006%204.70748%2023.9667%204.79302%2023.904L11.998%2018.621L19.203%2023.904C19.2886%2023.9667%2019.3918%2024.0006%2019.4979%2024.0007C19.6039%2024.0008%2019.7073%2023.9673%2019.793%2023.9048C19.8787%2023.8424%2019.9423%2023.7543%2019.9747%2023.6533C20.007%2023.5523%2020.0065%2023.4437%2019.973%2023.343L17.084%2014.677L23.807%208.89403C23.8889%208.8298%2023.9488%208.74162%2023.9782%208.64177C24.0076%208.54192%2024.0051%208.43539%2023.971%208.33703Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          {rate5 ? (
            <_Builtin.FormInlineLabel
              className={_utils.cx(_styles, "rating_on")}
              data-lbl-size="h3"
              {...rate5Over}
            >
              {rate5State}
            </_Builtin.FormInlineLabel>
          ) : null}
        </_Builtin.FormRadioWrapper>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "label_wrap")}
        tag="div"
        data-lbl-size="r3"
      >
        {value}
      </_Builtin.Block>
    </_Component>
  );
}
