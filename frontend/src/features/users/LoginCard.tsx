import { useState } from "react";
import { useNavigate } from "react-router"; // <-- import hook
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // <-- initialize navigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_ADDRESS}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });

    if (response.ok) {
      // Redirect to home page after successful login
      navigate("/");
    } else {
       // Read the response body as JSON
      const errorData = await response.json();
      alert(errorData.message || "Login failed");
    }
  };

  return (
    <div className="flex items-start mt-20 justify-center h-screen rounded-md">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded text-lexend"
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded text-lexend"
          required
        />

        <Button type="submit" className="button">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
