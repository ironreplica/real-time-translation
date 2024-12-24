import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("676332e900095032dfac"); // Your project ID

export const account = new Account(client);

// You can export other Appwrite services here as well
