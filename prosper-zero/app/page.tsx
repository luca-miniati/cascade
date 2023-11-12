"use client";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/api/auth/signin/prosper");
  }
  return (
    <main>
      <h1>ProsperZero</h1>
      <button onClick={handleClick}>Sign in with Prosper</button>
    </main>
  );
};

export default Home;
