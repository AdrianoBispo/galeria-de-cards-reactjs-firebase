import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

export function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login"); // Redireciona para o login após cadastro
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Este e-mail já está em uso.");
      } else if (err.code === "auth/weak-password") {
        setError("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setError("Falha ao criar a conta.");
      }
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Cadastro
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {error && (
            <Typography color="red" className="text-center">
              {error}
            </Typography>
          )}
          <Input
            label="Email"
            size="lg"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            size="lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirmar Senha"
            size="lg"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleCadastro}>
            Cadastrar
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Já tem uma conta?
            <Link to="/login" className="ml-1 font-bold text-blue-500">
              Faça Login
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
