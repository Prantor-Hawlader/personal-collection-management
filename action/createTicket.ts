"use server";

import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/session";

export async function createTicket(formData: FormData) {
  const email = process.env.JIRA_EMAIL;
  const projectId = 10000;
  const apiToken = process.env.JIRA_API_TOKEN;
  const session = await getSession();
  const currentUserEmail = session?.user.email;
  const auth = Buffer.from(`${email}:${apiToken}`).toString("base64");

  try {
    let userResponse = await fetch(
      `https://collectioner.atlassian.net/rest/api/3/user/search?query=${currentUserEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    let userData = await userResponse.json();
    let accountId;

    if (userResponse.ok && userData.length > 0) {
      accountId = userData[0].accountId;
    } else {
      const newUserResponse = await fetch(
        "https://collectioner.atlassian.net/rest/api/3/user",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailAddress: currentUserEmail,
            products: [],
          }),
        }
      );

      if (newUserResponse.ok) {
        const newUser = await newUserResponse.json();

        accountId = newUser.accountId;
      }
    }

    const response = await fetch(
      "https://collectioner.atlassian.net/rest/api/3/issue/",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            reporter: {
              id: accountId,
            },
            summary: formData.get("summary"),
            project: {
              id: projectId,
            },
            issuetype: {
              name: "Task",
            },

            priority: { id: formData.get("priority") },

            customfield_10042: [{ id: accountId }],

            customfield_10044:
              `https://prantor-collection-management.vercel.app${formData.get("pageLink")}` ||
              "https://prantor-collection-management.vercel.app",
            customfield_10043: formData.get("collection") || "None",
            customfield_10045: { id: "10020" },
          },
        }),
      }
    );

    const data = await response.json();

    return { issueId: data.id, message: "Successfully ticket created" };
  } catch (error) {
    return { error: "Failed to create ticket" };
  } finally {
    revalidatePath("/help");
  }
}
