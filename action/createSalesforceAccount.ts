"use server";

export async function createSalesforceAccount(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const number = formData.get("number");

  try {
    const tokenResponse = await fetch(
      "https://login.salesforce.com/services/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "password",
          client_id: process.env.SALESFORCE_CLIENT_ID!,
          client_secret: process.env.SALESFORCE_CLIENT_SECRET!,
          username: process.env.SALESFORCE_USERNAME!,
          password: `${process.env.SALESFORCE_PASSWORD}${process.env.SALESFORCE_SECURITY_TOKEN}`,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error("Failed to obtain Salesforce access token");
    }

    const instanceUrl = tokenData.instance_url;
    const accessToken = tokenData.access_token;

    const accountResponse = await fetch(
      `${instanceUrl}/services/data/v58.0/sobjects/Account`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: name,
          Type: "Customer",
        }),
      }
    );

    const accountData = await accountResponse.json();

    await fetch(`${instanceUrl}/services/data/v58.0/sobjects/Contact`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LastName: name,
        Email: email,
        Phone: number,
        Title: "Collectioner web user",
        AccountId: accountData.id,
      }),
    });

    return { message: "Successfully created Salesforce record" };
  } catch (error) {
    return { error: "Failed to create Salesforce record" };
  }
}
