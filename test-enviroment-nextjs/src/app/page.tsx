'use client'
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold">Hola, soy una página</h1>
      <Link href={'/register'}>Quieres ir al register?</Link>
    </>
  );
}