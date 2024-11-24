"use strict";

const axios = require("axios").default;

const site = popclip.options.site;
const access_token = popclip.options.access_token;
const url = `${site}/api/v1/memos`;


const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${access_token}`,
};

let content = popclip.input.markdown.trim();
  if (popclip.options.sourceLink && popclip.context && popclip.context.browserUrl) {
    content += `[${popclip.context.browserTitle || "Source"}](${popclip.context.browserUrl})`;
  }

const data = {
  content: content,
  visibility: 'Private'
};

axios
  .post(url, data, { headers })
  .then((res) => {
    // print("Memo created successfully", res.data);
    popclip.showSuccess();
  })
  .catch((err) => {
    popclip.showFailure();
    console.error("Error creating memo", err);
  });