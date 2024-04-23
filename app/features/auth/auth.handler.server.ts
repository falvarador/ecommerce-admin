import { AppLoadContext } from "@remix-run/cloudflare";
import { passwords, users } from "../../../drizzle/schema";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

import { buildDbClient } from "~/shared/db.client.server";
import { User } from "~/shared/types/user";
import {
  LoginRequest,
  RegisterRequest,
} from "~/features/auth/auth.request.server";

export function authHandler() {
  const register = async (
    request: RegisterRequest,
    context: AppLoadContext
  ) => {
    const { firstName, lastName, email, password, phone } = request;

    // Validate credentials
    if (!firstName || !lastName || !email || !password || !phone) {
      return {
        message: "missing credentials",
        user: null,
      };
    }

    const db = buildDbClient(context);
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser !== undefined) {
      return {
        message: "An account with this email already exists",
        user: null,
      };
    }

    const newUuid = uuidv4();
    await db
      .insert(users)
      .values({
        id: newUuid,
        firstName,
        lastName,
        email,
        phone,
      })
      .returning()
      .get();

    const userRecord = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (userRecord !== undefined) {
      // Create password record
      const userPassword = await bcrypt.hash(password, 10);
      await db
        .insert(passwords)
        .values({ hash: userPassword, userId: userRecord.id })
        .returning()
        .get();
      return {
        message: "Account created",
        user: userRecord as unknown as User,
      };
    }
    return {
      message: "Unknown error",
      user: null,
    };
  };

  const login = async (request: LoginRequest, context: AppLoadContext) => {
    const { email, password } = request;
    const db = buildDbClient(context);

    // check if email exists
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
      with: {
        password: true,
      },
    });

    if (user !== undefined) {
      const isValidPassword = bcrypt.compareSync(password, user.password.hash);

      return !isValidPassword ? null : user;
    }

    return null;
  };

  return {
    login,
    register,
  };
}
