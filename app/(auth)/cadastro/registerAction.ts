"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";
import { redirect } from 'next/navigation';

export default async function registerAction(
  _prevState: { message?: string; success?: boolean } | null,
  formData: FormData
) {
  try {
    const entries = Array.from(formData.entries());
    const data = Object.fromEntries(entries) as {
      name: string;
      email: string;
      password: string;
    };

    // Validate input
    if (!data.email || !data.name || !data.password) {
      return {
        message: 'Preencha todos os campos',
        success: false,
      };
    }

    try {
      // Check if user already exists
      const existingUser = await db.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        return {
          message: 'Este e-mail já está em uso',
          success: false,
        };
      }

      // Create new user
      await db.user.create({
        data: {
          email: data.email,
          name: data.name,
          password: hashSync(data.password, 10),
        },
      });
      
      return redirect('/dashboard');
      
    } catch (dbError) {
      console.error('Database error during registration:', dbError);
      return {
        message: 'Erro ao processar o cadastro. Por favor, tente novamente.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Unexpected error in registerAction:', error);
    return {
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
      success: false,
    };
  }
}
