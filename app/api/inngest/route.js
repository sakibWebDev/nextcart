import { serve } from "inngest/next";
import { inngestClient } from "@/inngest/client";
import {
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
} from "@/inngest/functions/userFunctions";

export const { GET, POST, PUT } = serve({
  client: inngestClient,
  functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
});
