'use client'
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Hola, soy una página de registro</h1>
      <Link href={'/'}>Ir a la pagina principal</Link>
    </>
  );
}