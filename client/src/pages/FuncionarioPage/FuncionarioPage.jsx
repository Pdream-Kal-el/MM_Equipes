import Cabecalho from "../../components/Cabecalho/Cabecalho";
import CampoTexto from "../../components/CampoTexto/CampoTexto";
import "./FuncionarioPage.css";
import ListaSuspensa from "../../components/ListaSuspensa/ListaSuspensa";
import Botao from '../../components/BotaoForms/BotaoForms';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const Funcionario = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Adicionar navigate para redirecionar após sucesso
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [githublink, setGithublink] = useState('');
  const [cargo, setCargo] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [time, setTime] = useState('');
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const buscarTimes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/Times');
        if (response.ok) {
          const data = await response.json();
          setTimes(data.map(time => time.nome));
        } else {
          console.error("Erro ao buscar times");
        }
      } catch (error) {
        console.error("Erro ao conectar ao servidor:", error);
      }
    };
    buscarTimes();
  }, []);

  const buscarUsuario = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/funcionarios/${id}`);
      if (!response.ok) {
        throw new Error('Usuário não encontrado');
      }
      const data = await response.json();
      setUserData(data);
      setNome(data.nome);
      setIdade(data.idade);
      setEmail(data.email); // Corrigido para pegar o email
      setGithublink(data.githublink);
      setCargo(data.cargo);
      setCpf(data.cpf); // Corrigido para pegar o CPF
      setSenha(data.senha); // Corrigido para pegar a senha
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarUsuario();
  }, [id]);

  const handleModificar = async (event) => {
    event.preventDefault();
  
    const novoFuncionario = {
      nome,
      idade,
      email,
      time,
      githublink,
      cargo,
      cpf,
      senha
    };
  
    try {
      const response = await fetch(`http://localhost:3000/api/funcionarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoFuncionario),
      });
      console.log(response)
      console.log(novoFuncionario)
      if (response.ok) {
        console.log("Atualização realizada com sucesso!");
        navigate('/Home');
      } else {
        // Lidar com possíveis erros do backend
        const errorData = await response.json();
        console.error(`Erro na atualização: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor.", error);
    }
  };
  
  const handleDelete = async () => {
    console.log("Tentando deletar...");
    const confirmacao = window.confirm("Você realmente deseja deletar este funcionário?");
    if (!confirmacao) return;

    try {
      const response = await fetch(`http://localhost:3000/api/funcionarios/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Funcionário deletado com sucesso!');
        navigate('/Home'); // Redireciona para a página inicial
      } else {
        const errorData = await response.json();
        console.error(`Erro ao deletar: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor.", error);
    }
  };

  return (
    <section className="section-body">
      <Cabecalho navs={["Sair"]} />
      <div className="UsuarioPage">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          userData && (
            <div className="FuncionarioDiv">
              <button className="Deletar" onClick={handleDelete}>Deletar Funcionário</button>
              <div className='Formulario'>
                <form onSubmit={handleModificar}>
                  <div className="fotoFuncionario">
                    <a className="botaoGitHub" href={githublink}>
                      <img src={`${userData.githublink}.png`} alt={userData.nome} />
                    </a>
                  </div>
                  <div className='FormGroup'>
                    <CampoTexto obrigatorio="true" label="Nome" valor={nome} aoAlterado={setNome} />
                    <CampoTexto obrigatorio="true" label="Idade" valor={idade} aoAlterado={setIdade} />
                  </div>
                  <div className='FormGroup'>
                    <CampoTexto obrigatorio="true" label="Github Link" valor={githublink} aoAlterado={setGithublink} />
                    <CampoTexto obrigatorio="true" label="Cargo" valor={cargo} aoAlterado={setCargo} />
                  </div>
                  <div className='FormGroup'>
                    <CampoTexto obrigatorio="true" label="CPF" valor={cpf} aoAlterado={setCpf} />
                    <CampoTexto obrigatorio="true" label="Email" valor={email} aoAlterado={setEmail} />
                  </div>
                  <div className='FormGroup'>
                    <CampoTexto obrigatorio="true" label="Senha" valor={senha} type="password" aoAlterado={setSenha} />
                    <ListaSuspensa obrigatorio="true" label="Times" itens={times} valor={time} aoAlterado={setTime} />
                  </div>
                  <Botao>Alterar</Botao>
                </form>
                
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Funcionario;
