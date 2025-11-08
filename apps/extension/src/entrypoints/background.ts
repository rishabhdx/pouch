import { ACTIONS } from "@/constants";
import { saveBookmark } from "@/utils/api";
import { authClient } from "@pouch/auth/client";
import { AxiosError } from "axios";

export default defineBackground(() => {
  console.log("Hello background.", { id: browser.runtime.id });

  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
      console.log("Tab fully loaded:", tab.url);

      if (tab.url.startsWith(import.meta.env.WXT_WEBSITE_URL)) {
        console.log("Redirect URL detected:", import.meta.env.WXT_WEBSITE_URL);

        await checkAuthSession("Checking auth session on tab update...");
      }
    }
  });

  browser.runtime.onMessage.addListener(async props => {
    console.log("Message received in background script:", props);

    if (props.type === ACTIONS.INITIATE_SIGNIN_FROM_WELCOME) {
      await browser.tabs.create({
        url: `${import.meta.env.WXT_WEBSITE_URL}/auth/sign-in`
      });
      return;
    }

    if (props.type === ACTIONS.SAVE_BOOKMARK) {
      console.log("Saving bookmark with props:", props);
      try {
        await saveBookmark({
          title: props.title,
          url: props.url,
          collectionId: props.collectionId,
          tags: props.tags,
          metadata: props.metadata
        });

        await browser.runtime.sendMessage({
          type: ACTIONS.SAVE_BOOKMARK_SUCCESS
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          await browser.runtime.sendMessage({
            type: ACTIONS.SAVE_BOOKMARK_FAILURE,
            error: error.response?.data.message || "Failed to save bookmark"
          });

          return;
        }

        await browser.runtime.sendMessage({
          type: ACTIONS.SAVE_BOOKMARK_FAILURE,
          error: "Failed to save bookmark"
        });
      }
    }
  });

  browser.runtime.onStartup.addListener(async () => {
    checkAuthSession("Checking auth session on startup...");
  });

  browser.runtime.onInstalled.addListener(async () => {
    await checkAuthSession("Checking auth session on install...");
  });

  const checkAuthSession = async (msg: string) => {
    console.log(msg);
    try {
      const { data } = await authClient.getSession({
        fetchOptions: { throw: false }
      });

      if (!data || !data.session) {
        await browser.storage.local.remove("session");
        console.log("No valid session found. Cleared local session storage.");
        return;
      }

      await browser.storage.local.set({ session: data.session });

      console.log("Session data stored in local storage:", data.session);
    } catch (error) {
      console.error("Error checking auth session:", error);
      await browser.storage.local.remove("session");
      return null;
    }
  };
});
