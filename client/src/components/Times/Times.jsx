import Funcionario from '../Funcionario/Funcionario.jsx';
import './Times.css';

const Time = (props) => {
  const css = { backgroundColor: props.corSecundaria };
  
  return (
    <section className="Times" style={css}>
      <h3 style={{ borderColor: props.corPrincipal }}>{props.nome}</h3>
      <div className="Funcionarios">
        {props.funcionarios.map((funcionario) => (
          <Funcionario
            key={funcionario._id}  // Use o `id` como chave única
            id={funcionario._id}
            cordeFundo={props.corPrincipal}
            corButton={props.corSecundaria}
            nome={funcionario.nome}
            cargo={funcionario.cargo}
            imagemGitHub={funcionario.githublink}
          />
        ))}
      </div>
    </section>
  );
};

export default Time;
