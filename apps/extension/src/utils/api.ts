import axios from "axios";

export async function fetchCollections() {
  const response = await axios.get(
    `${import.meta.env.WXT_API_URL}/collections/all?includeAll=true`
  );
  return response.data;
}

export async function fetchTags() {
  try {
    const { data } = await axios.get(`${import.meta.env.WXT_API_URL}/tags/all`);

    return data;
  } catch (error) {
    console.error("Error fetching tags:", error);
  }
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
  collection: string;
  tags: string[];
  metadata: {
    title: string;
    description: string;
    domain: string;
    ogTitle: string | null;
    ogDescription: string | null;
    ogImage: string | null;
    ogUrl: string | null;
    ogType: string | null;
    twitterTitle: string | null;
    twitterDescription: string | null;
    twitterImage: string | null;
    twitterCard: string | null;
  };
}) {
  console.log("saveBookmark called with props:", props);
  console.log("WXT_API_URL:", import.meta.env.WXT_API_URL);

  const { data } = await axios.post(
    `${import.meta.env.WXT_API_URL}/bookmarks/create`,
    {
      title: props.title,
      url: props.url,
      collection: props.collection,
      tags: props.tags
    }
  );

  return data;
}
