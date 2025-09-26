import { ACTIONS } from "@/constants";
import { authClient } from "@pouch/auth/client";

export default defineBackground(() => {
  console.log("Hello background.", { id: browser.runtime.id });

  browser.tabs.onUpdated.addListener(async (rest, changeInfo) => {
    const sessionKey = await browser.storage.local.get("session");
    console.log("Current session key in storage:", sessionKey);
    // console.log(browser.identity.getRedirectURL());
    // console.log("Tab updated:", changeInfo);
    // console.log("Rest info:", rest);

    if (changeInfo.url?.startsWith(browser.identity.getRedirectURL())) {
      console.log("Redirect URL:", browser.identity.getRedirectURL());
      // finishUserOAuth(changeInfo.url);
      console.log("OAuth redirect detected:", changeInfo.url);
    }
  });

  browser.runtime.onMessage.addListener(async props => {
    console.log("Message received in background script:", props);

    if (props.type === ACTIONS.INITIATE_SIGNIN_FROM_WELCOME) {
      await browser.tabs.create({
        url: `${import.meta.env.WXT_WEBSITE_URL}/auth/sign-in`
      });
    }
  });

  browser.runtime.onStartup.addListener(async () => {
    console.log("onStartup background script started.");
    checkAuthSession("Checking auth session on startup...");
  });

  browser.runtime.onInstalled.addListener(async () => {
    console.log("onInstalled background script installed.");
    checkAuthSession("Checking auth session on install...");

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
    const session = await authClient.getSession();

    if (!session || !session.data) {
      await browser.storage.local.remove("session");
      console.log("No valid session found. Cleared local session storage.");
      return;
    }

    await browser.storage.local.set({ session: session.data });
    console.log("Session data stored in local storage:", session.data);

    // const sessionKey = await browser.storage.local.get("session");

    // if (sessionKey) {
    //   await browser.storage.local.set({ session: session.data });
    //   console.log("Session data stored in local storage:", session.data);
    // } else {
    //   await browser.storage.local.set({ session: session.data });
    // }
  };
});
