export const ACTIONS = {
  INITIATE_SIGNIN_FROM_WELCOME: "initiate-signin-from-welcome",
  EXTRACT_METADATA: "extract-metadata",
  SAVE_BOOKMARK: "save-bookmark",
  EXTRACT_METADATA_AND_SAVE: "extract-metadata-and-save"
} as const;

export type Action = (typeof ACTIONS)[keyof typeof ACTIONS];
// export type ACTIONS = keyof typeof ACTIONS;
