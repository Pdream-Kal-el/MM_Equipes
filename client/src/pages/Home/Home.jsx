import './Home.css'
import Cabecalho from '../../components/Cabecalho/Cabecalho.jsx'
import { useState, useEffect } from "react";
import Time from '../../components/Times/Times.jsx'

function Home() {
  const [times, setTimes] = useState([]); // Estado para armazenar os times
  const [funcionarios, setFuncionarios] = useState([]); // Estado para armazenar os funcionários
  const [erro, setErro] = useState('');   // Estado para armazenar mensagens de erro

  // Função para buscar times
  const buscarTimes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/Times'); 
      if (response.ok) {
        const data = await response.json();
        setTimes(data); // Armazena os times no estado
      } else {
        setErro('Erro ao buscar times');
      }
    } catch (error) {
      setErro('Erro no servidor ao buscar times.');
    }
  };

  // Função para buscar funcionários
  const buscarFuncionarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/funcionarios');
      if (response.ok) {
        const data = await response.json();
        setFuncionarios(data); // Armazena os funcionários no estado
      } else {
        setErro('Erro ao buscar funcionários');
      }
    } catch (error) {
      setErro('Erro no servidor ao buscar funcionários.');
    }
  };

  useEffect(() => {
    buscarTimes();
    buscarFuncionarios();
  }, []);

  return (
    <section className="section-body">
      <Cabecalho navs={["Sair"]} />
      {erro && <p className="erro">{erro}</p>}
      {times.length > 0 && funcionarios.length > 0 ? (
        times.map((time) => (
          <Time
            key={time._id} // Chave única do time
            nome={time.nome} 
            corPrincipal={time.corPrincipal}
            corSecundaria={time.corSecundaria}
            funcionarios={funcionarios.filter((funcionario) => funcionario.time === time.nome)}
          />
        ))
      ) : (
        <p>Carregando...</p> // Adiciona um fallback enquanto os dados são carregados
      )}
    </section>
  );
}

export default Home;
