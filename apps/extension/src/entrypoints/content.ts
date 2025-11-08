// content.ts

import { ACTIONS, type Action } from "@/constants";
import { browser } from "wxt/browser";

import type { Metadata } from "@/types";
import { extractMetadataFromDocument } from "@/utils/extract-metadata";

interface BaseMessage {
  type: Action;
}

interface SaveBookmarksMessage extends BaseMessage {
  title: string;
  url: string;
  collection: string;
  tags: string[];
}

export default defineContentScript({
  matches: ["<all_urls>"],
  // matches: ["*://*.google.com/*"],
  main() {
    console.log("Hello content.");

    browser.runtime.onMessage.addListener(
      async (message: BaseMessage, sender, sendResponse) => {
        console.log("Message received in content script:", message, sender);

        // if (props.type === ACTIONS.EXTRACT_METADATA) {
        //   const meta = {
        //     title: document.title,
        //     description: document
        //       .querySelector('meta[name="description"]')
        //       ?.getAttribute("content"),
        //     ogTitle: document
        //       .querySelector('meta[property="og:title"]')
        //       ?.getAttribute("content"),
        //     ogDescription: document
        //       .querySelector('meta[property="og:description"]')
        //       ?.getAttribute("content"),
        //     ogImage: document
        //       .querySelector('meta[property="og:image"]')
        //       ?.getAttribute("content"),
        //     ogUrl: document
        //       .querySelector('meta[property="og:url"]')
        //       ?.getAttribute("content"),
        //     ogType: document
        //       .querySelector('meta[property="og:type"]')
        //       ?.getAttribute("content"),
        //     twitterTitle: document
        //       .querySelector('meta[name="twitter:title"]')
        //       ?.getAttribute("content"),
        //     twitterDescription: document
        //       .querySelector('meta[name="twitter:description"]')
        //       ?.getAttribute("content"),
        //     twitterImage: document
        //       .querySelector('meta[name="twitter:image"]')
        //       ?.getAttribute("content"),
        //     twitterCard: document
        //       .querySelector('meta[name="twitter:card"]')
        //       ?.getAttribute("content")
        //   };

        //   console.log("Title:", props.title);
        //   console.log("URL:", props.url);
        //   console.log("Meta title", meta.title);
        //   console.log("Meta description", meta.description);
        //   console.log("Meta og:title", meta.ogTitle);
        //   console.log("Meta og:description", meta.ogDescription);
        //   console.log("Meta og:image", meta.ogImage);
        //   console.log("Meta og:url", meta.ogUrl);
        //   console.log("Meta og:type", meta.ogType);
        //   console.log("Meta twitter:title", meta.twitterTitle);
        //   console.log("Meta twitter:description", meta.twitterDescription);
        //   console.log("Meta twitter:image", meta.twitterImage);
        //   console.log("Meta twitter:card", meta.twitterCard);
        //   return;

        //   // browser.runtime.sendMessage({
        //   //   type: "DONE_FROM_CONTENT",
        //   //   meta
        //   // });
        // }

        if (message.type === ACTIONS.INITIATE_SIGNIN_FROM_WELCOME) {
          console.log("Initiating sign-in from content script");

          browser.runtime.sendMessage({
            type: ACTIONS.INITIATE_SIGNIN_FROM_WELCOME
          });
        }

        if (message.type === ACTIONS.SAVE_BOOKMARK) {
          console.log(
            "Saving bookmark from content script with props:",
            message
          );
          const metadata = extractMetadataFromDocument(document);

          browser.runtime.sendMessage({
            ...message,
            type: ACTIONS.SAVE_BOOKMARK,
            metadata
          });

          return;
        }
      }
    );

    // browser.runtime.sendMessage({
    //   type: "DONE_FROM_OUTSIDE_CONTENT"
    // });

    return true;
  }
});
