import './Funcionario.css';
import { useNavigate } from 'react-router-dom';

const Funcionario = ({ nome, imagemGitHub, cargo, cordeFundo, id, corButton }) => {
    const imagem = `${imagemGitHub}.png`;
    const navigate = useNavigate();
    
    const navegarFuncionario = () => {
        navigate(`/Home/Funcionario/${id}`);
    };
  
    return (
      <button style={{backgroundColor:corButton}} className="Botao" onClick={navegarFuncionario}>
        <div className="Funcionario">
          <div className="cabecalho" style={{ backgroundColor: cordeFundo }}>
            <img src={imagem} alt={nome} />
          </div>
          <div className="rodape">
            <h4>{nome}</h4>
            <h5>{cargo}</h5>
          </div>
        </div>
      </button>
    );
};

export default Funcionario;
