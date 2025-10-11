import { ACTIONS } from "@/constants";
import { saveBookmark, fetchCollections, fetchTags } from "@/utils/api";
import { authClient } from "@pouch/auth/client";

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
      } catch (error) {
        console.error("saving bookmark failed again:", error);
      }
      return;
    }
  });

  browser.runtime.onStartup.addListener(async () => {
    console.log("onStartup background script started.");
    checkAuthSession("Checking auth session on startup...");
  });

  browser.runtime.onInstalled.addListener(async () => {
    console.log("onInstalled background script installed.");
    await checkAuthSession("Checking auth session on install...");

    // const session = await authClient.getSession();

    // if (!session) {
    //   await browser.tabs.create({
    //     url: "http://localhost:3000/auth/sign-in"
    //   });
    //   return;
    // }

    // console.log("Current session on install:", session); // this is getting logged
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

      // const collections = await fetchCollections();
      // const tags = await fetchTags();
      // console.log({ collections, tags });

      console.log("Session data stored in local storage:", data.session);
    } catch (error) {
      console.error("Error checking auth session:", error);
      await browser.storage.local.remove("session");
      return null;
    }

    // const sessionKey = await browser.storage.local.get("session");

    // if (sessionKey) {
    //   await browser.storage.local.set({ session: session.data });
    //   console.log("Session data stored in local storage:", session.data);
    // } else {
    //   await browser.storage.local.set({ session: session.data });
    // }
  };
});
