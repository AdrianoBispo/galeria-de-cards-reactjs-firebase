import { Routes, Route } from "react-router-dom";
import { Login } from "./routes/Login";
import { Cadastro } from "./routes/Cadastro";
import { Cards } from "./routes/Cards";
import { Galeria } from "./routes/Galeria";
import { RotaPrivada } from "./components/RotaPrivada";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/"
        element={
          <RotaPrivada>
            <Cards />
          </RotaPrivada>
        }
      />
      <Route
        path="/cards"
        element={
          <RotaPrivada>
            <Cards />
          </RotaPrivada>
        }
      />
      <Route
        path="/galeria"
        element={
          <RotaPrivada>
            <Galeria />
          </RotaPrivada>
        }
      />
      {/* Adicione outras rotas se necessário */}
    </Routes>
  );
}
