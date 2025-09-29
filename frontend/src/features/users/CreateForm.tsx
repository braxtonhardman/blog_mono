import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function CreateForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_ADDRESS}/user/create`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });

    if (response.ok) {
      // Clear the fields after successful submission
      setEmail("");
      setPassword("");
      alert("User created successfully!");
    } else {
      alert("Failed to create user");
    }
  };

  return (
    <div className="flex items-start mt-20 justify-center h-screen rounded-md">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-lexend font-bold text-center">Create User</h2>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded font-lexend"
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded font-lexend"
          required
        />

        <Button
          type="submit"
          className="button"
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateForm;
