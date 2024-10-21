import { useState } from 'react'
import Botao from '../BotaoForms/BotaoForms'
import { useNavigate } from 'react-router-dom';
import CampoTexto from '../CampoTexto/CampoTexto'
/*import ListaSuspensa from '../ListaSuspensa/ListaSuspensa'*/
import './FormsLogin.css'
const Formulario=(props)=>{
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState(''); // Estado para guardar mensagens de erro
    const navigate = useNavigate(); // Hook para redirecionar

    const handleLogin = async (event) => {
        event.preventDefault();
    
        const funcionario = { email, senha };
    
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(funcionario),
            });
    
            // Verificar se o status é OK antes de tentar fazer o parse do JSON
            if (!response.ok) {
                throw new Error('Erro na requisição de login');
            }
    
            const data = await response.json();
            console.log('Login response data:', data); // Verifique o que está sendo retornado
    
            if (data.success) {
                const id = data.funcionario._id; 
                console.log(id)

                document.cookie = `id=${id}; path=/; max-age=86400`;
                
 
                navigate('/Home');
            } else {
                setErro(data.message || 'Login falhou. ID não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            setErro('Erro no servidor. Tente novamente mais tarde.');
        }
    };
    

    return (
        <div className='Formulario'>
            <form onSubmit={handleLogin}>
                <CampoTexto
                    obrigatorio="true"
                    label="Email"
                    placeholder="Digite seu email"
                    valor={email}
                    aoAlterado={valor => setEmail(valor)}
                />
                <CampoTexto
                    obrigatorio="true"
                    label="Senha"
                    placeholder="Digite sua senha"
                    type="password"
                    valor={senha}
                    aoAlterado={valor => setSenha(valor)}
                />
                <Botao className="Botao">
                    Logar
                </Botao>

                {/* Exibir mensagem de erro, se houver */}
                {erro && <p className='Erro'>{erro}</p>}
            </form>
        </div>
    );
}
export default Formulario