import "server-only";

import { 
  Client, 
  Account, 
  Storage, 
  Models, 
  Databases, 
  type Account as AccountType, 
  type Databases as DatabasesType, 
  type Storage as StorageTypes,
  type Users as UsersType,
} from 'node-appwrite'
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { AUTH_COOKIE } from "@/features/auth/constants";

type Context = {
  Variables: {
    account: AccountType,
    storage: StorageTypes,
    databases: DatabasesType,
    users: UsersType,
    user: Models.User<Models.Preferences>,
  }
};

export const sessionMiddleware = createMiddleware<Context>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

      const session = getCookie(c, AUTH_COOKIE)

      if (!session) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      client.setSession(session);

      const account = new Account(client);
      const storage = new Storage(client);
      const databases = new Databases(client);

      const user = await account.get();

      c.set("account", account);
      c.set("storage", storage);
      c.set("databases", databases);
      c.set("user", user);

      await next();

  },
);