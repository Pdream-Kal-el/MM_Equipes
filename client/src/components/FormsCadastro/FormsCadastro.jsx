import "./FormsCadastro.css";
import CampoTexto from '../CampoTexto/CampoTexto';
import Botao from '../BotaoForms/BotaoForms';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import ListaSuspensa from "../ListaSuspensa/ListaSuspensa";

const FormsCadastro = () => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [email, setEmail] = useState('');
    const [githublink, setGithublink] = useState('');
    const [cargo, setCargo] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [time, setTime] = useState(''); // Estado para o time selecionado
    const [times, setTimes] = useState([]); // Estado para armazenar os times vindos do banco
    const [erro, setErro] = useState(''); // Para mensagens de erro
    const navigate = useNavigate();

    // Função para buscar times do banco de dados
    useEffect(() => {
        const buscarTimes = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/Times');
                if (response.ok) {
                    const data = await response.json();
                    setTimes(data.map(time => time.nome)); // Mapeia apenas os nomes dos times
                } else {
                    console.error("Erro ao buscar times");
                }
            } catch (error) {
                console.error("Erro ao conectar ao servidor:", error);
            }
        };

        buscarTimes(); // Executa a função ao carregar o componente
    }, []);

    // Função para lidar com o cadastro
    const handleCadastrar = async (event) => {
        event.preventDefault();
        setErro(''); // Reseta a mensagem de erro
        

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
            // Enviando a requisição para o servidor
            const response = await fetch('http://localhost:3000/api/funcionarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoFuncionario),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Cadastro realizado com sucesso!", data);
                navigate('/login'); // Redirecionar para a página de login após o cadastro
            } else {
                const errorData = await response.json();
                setErro(`Erro no cadastro: ${errorData.error}`);
            }
        } catch (error) {
            setErro('Erro ao conectar ao servidor.');
            console.error("Erro:", error);
        }
    };

    return (
        <div className='Formulario'>
            <form onSubmit={handleCadastrar}>
                <div className='FormGroup'>
                    <CampoTexto
                        obrigatorio="true"
                        label="Nome"
                        placeholder="Digite seu nome"
                        valor={nome}
                        aoAlterado={valor => setNome(valor)}
                    />
                    <CampoTexto
                        obrigatorio="true"
                        label="Idade"
                        placeholder="Digite sua idade"
                        valor={idade}
                        aoAlterado={valor => setIdade(valor)}
                    />
                </div>
                <div className='FormGroup'>
                    <CampoTexto
                        obrigatorio="true"
                        label="Github Link"
                        placeholder="Digite seu Github"
                        valor={githublink}
                        aoAlterado={valor => setGithublink(valor)}
                    />
                    <CampoTexto
                        obrigatorio="true"
                        label="Cargo"
                        placeholder="Digite seu cargo"
                        valor={cargo}
                        aoAlterado={valor => setCargo(valor)}
                    />
                </div>
                <div className='FormGroup'>
                    <CampoTexto
                        obrigatorio="true"
                        label="Cpf"
                        placeholder="Digite seu cpf"
                        valor={cpf}
                        aoAlterado={valor => setCpf(valor)}
                    />
                    <CampoTexto
                        obrigatorio="true"
                        label="Email"
                        placeholder="Digite seu email"
                        valor={email}
                        aoAlterado={valor => setEmail(valor)}
                    />
                </div>
                <div className='FormGroup'>
                    <CampoTexto
                        obrigatorio="true"
                        label="Senha"
                        placeholder="Digite sua senha"
                        type="password"
                        valor={senha}
                        aoAlterado={valor => setSenha(valor)}
                    />
                    <ListaSuspensa className="ListaSuspensa" 
                        obrigatorio={true} 
                        label="Times" 
                        itens={times} // Passa os times obtidos do banco de dados
                        valor={time}
                        aoAlterado={valor => setTime(valor)}
                    />
                </div>
                <Botao className="Botao">
                    Cadastrar
                </Botao>

                {/* Exibir mensagem de erro, se houver */}
                {erro && <p className='Erro'>{erro}</p>}
            </form>
        </div>
    );
};

export default FormsCadastro;
