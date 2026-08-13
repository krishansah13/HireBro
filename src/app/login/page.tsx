"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    console.log(email, password)
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
        </label>

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        <label htmlFor="password">
          Password:
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />

        {error && <p>{error}</p>}

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}