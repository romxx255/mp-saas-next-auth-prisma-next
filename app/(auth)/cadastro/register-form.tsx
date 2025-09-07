"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import registerAction from "./registerAction";
import { useFormStatus } from "react-dom";
import Form from "next/form";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full mt-6" type="submit">
      {pending ? "Registrando..." : "Registrar"}
    </Button>
  );
}

export default function RegisterForm() {
  const [state, setState] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await registerAction(null, formData);
    setState(result);
  }
  return (
    <>
      {state?.success === false && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative text-sm"
          role="alert"
        >
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{state.message}</span>
        </div>
      )}
      {state?.success === true && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-3 rounded relative text-sm"
          role="alert"
        >
          <strong className="font-bold">Sucesso! </strong>
          <span className="block sm:inline">{state.message}</span>
        </div>
      )}
      <Form action={handleSubmit}>
        <div>
          <Label>Nome</Label>
          <Input type="text" name="name" placeholder="Fulano de Tal" required />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="eu@exemplo.com"
            required
          />
        </div>
        <div>
          <Label>Senha</Label>
          <Input
            type="password"
            name="password"
            placeholder="********"
            required
          />
        </div>
        <div>
          <SubmitButton />
        </div>
      </Form>
    </>
  );
}
