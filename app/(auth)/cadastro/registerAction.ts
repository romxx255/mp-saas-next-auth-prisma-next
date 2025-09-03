"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";

export default async function registerAction(formData: FormData) {
  console.log("FormData received:", formData);

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("Extracted data:", { name, email, password });

  // Validação dos campos
  if (!email || !name || !password) {
    return {
      message: "Você precisa preencher todos os campos",
      success: false,
    };
  }

  try {
    // Verificar se o usuário já existe
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return {
        message: "Este usuário já existe",
        success: false,
      };
    }

    // Criar o usuário
    await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashSync(password),
      },
    });

    return {
      message: "Usuário criado com sucesso",
      success: true,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      message: "Erro interno do servidor",
      success: false,
    };
  }
}
