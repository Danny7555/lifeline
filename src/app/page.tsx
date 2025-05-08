import React from 'react';
import SignIn from "./[auth]/signIn/page";


export default function page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignIn />
    </main>
  )
}