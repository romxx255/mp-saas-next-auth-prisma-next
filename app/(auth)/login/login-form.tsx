"use client";
import Form from "next/form";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import loginAction from "./loginAction";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  console.log(state);

  return (
    <>
    {state?.success === false && (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded relative text-sm"
        role="alert"
      >
        <strong className="font-bold">Erro! </strong>
        <span className="block sm:inline">{state.error}</span>
      </div>
    )}
    {state?.success === true && (
      <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-3 rounded relative text-sm"
        role="alert"
      >
        <strong className="font-bold">Sucesso! </strong>
        <span className="block sm:inline">{state.success}</span>
      </div>
    )}
      <Form action={formAction}>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="eu@exemplo.com" />
        </div>
        <div>
          <Label>Senha</Label>
          <Input type="password" name="password" placeholder="********" />
        </div>
        <div>
          <Button className="w-full mt-6" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </>
  );
}
