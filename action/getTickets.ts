"use server";

import { getSession } from "@/lib/session";

export async function getTickets() {
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;

  const session = await getSession();
  const currentUserEmail = session?.user?.email;

  if (!currentUserEmail) {
    throw new Error("User not authenticated");
  }

  const auth = Buffer.from(`${email}:${apiToken}`).toString("base64");

  const jql = `reporter="${currentUserEmail}"`;

  try {
    const response = await fetch(
      `https://collectioner.atlassian.net/rest/api/3/search?jql=${jql}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return data.issues;
  } catch (error) {
    return { error: "Failed to fetch tickets" };
  }
}
