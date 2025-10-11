import { type Metadata } from "@/types";

export function extractMetadataFromDocument(document: Document): Metadata {
  const meta = {
    title: document.title,
    description: document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content"),
    ogTitle: document
      .querySelector('meta[property="og:title"]')
      ?.getAttribute("content"),
    ogDescription: document
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content"),
    ogImage: document
      .querySelector('meta[property="og:image"]')
      ?.getAttribute("content"),
    ogUrl: document
      .querySelector('meta[property="og:url"]')
      ?.getAttribute("content"),
    ogType: document
      .querySelector('meta[property="og:type"]')
      ?.getAttribute("content"),
    twitterTitle: document
      .querySelector('meta[name="twitter:title"]')
      ?.getAttribute("content"),
    twitterDescription: document
      .querySelector('meta[name="twitter:description"]')
      ?.getAttribute("content"),
    twitterImage: document
      .querySelector('meta[name="twitter:image"]')
      ?.getAttribute("content"),
    twitterCard: document
      .querySelector('meta[name="twitter:card"]')
      ?.getAttribute("content")
  };

  return meta;
}
