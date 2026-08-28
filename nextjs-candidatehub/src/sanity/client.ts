import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "p65whnge",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
