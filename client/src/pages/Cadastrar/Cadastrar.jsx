import "./Cadastrar.css";
import Cabecalho from '../../components/Cabecalho/Cabecalho.jsx';
import FormsCadastro from '../../components/FormsCadastro/FormsCadastro.jsx';

const Cadastrar = () => {
    return (
        <section className="section-body">
            <Cabecalho navs={["Login", "Cadastrar", "Sobre"]} />
            <FormsCadastro />
        </section>
    );
}

export default Cadastrar;
