import { compareSync } from "bcrypt-ts";
import db from "./db";

type User = {
  email: string;
  name: string;
  password?: string;
};

export async function findUserByCredencials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatch = compareSync(password, user.password);

  if (passwordMatch) {
    return { email: user.email, name: user.name };
  }
  return null;
}
