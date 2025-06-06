import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/cards'); // Redireciona para a home após login
    } catch (err) {
      setError("Falha ao fazer login. Verifique seu e-mail e senha.");
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/cards'); // Redireciona para a home após login
    } catch (err) {
       setError("Falha ao fazer login com o Google.");
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
            Login
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {error && <Typography color="red" className="text-center">{error}</Typography>}
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
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleLogin}>
            Entrar
          </Button>
           <Button variant="outlined" fullWidth className="mt-4" onClick={handleGoogleLogin}>
            Entrar com Google
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Não tem uma conta?
            <Link to="/cadastro" className="ml-1 font-bold text-blue-500">
              Cadastre-se
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
