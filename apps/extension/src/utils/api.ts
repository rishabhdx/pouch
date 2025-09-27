import axios from "axios";

export async function saveBookmark(props: {
  title: string;
  url: string;
  collection: string;
  tags: string[];
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
