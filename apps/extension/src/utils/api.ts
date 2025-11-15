import axios from "axios";
import type { Metadata } from "@/types";

export async function fetchCollections() {
  const response = await axios.get(
    `${import.meta.env.WXT_API_URL}/collections/all?includeAll=true`
  );
  return response.data;
}

export async function fetchTags() {
  const response = await axios.get(`${import.meta.env.WXT_API_URL}/tags/all`);

  return response.data;
}

export async function createCollection(name: string) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.WXT_API_URL}/collections/create`,
      { name }
    );

    return data;
  } catch (error) {
    console.error("Error creating collection:", error);
  }
}

export async function createTag(name: string) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.WXT_API_URL}/tags/create`,
      { name }
    );

    return data;
  } catch (error) {
    console.error("Error creating tag:", error);
  }
}

export async function saveBookmark(props: {
  title: string;
  url: string;
  collectionId: string;
  tags: string[];
  metadata: Metadata;
}) {
  const { data } = await axios.post(
    `${import.meta.env.WXT_API_URL}/bookmarks/create`,
    {
      title: props.title,
      url: props.url,
      collectionId: props.collectionId,
      tags: props.tags,
      metadata: props.metadata
    }
  );

  return data;
}
