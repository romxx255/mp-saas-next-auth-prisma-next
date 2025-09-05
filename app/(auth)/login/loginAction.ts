'use server';

import { signIn } from "@/auth";

export default async function loginAction(_prevState: any, formData: FormData) {
	try {
		await signIn("credentials", {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
			redirect: false,
		});
		return { success: true }
	} catch (e: any) {
		if (e.type === "CredentialsSignin") {
			return { success: false, error: "Dados de login incorretos." }
		}
		return { success: false, error: "Erro interno do servidor." }
	}
}