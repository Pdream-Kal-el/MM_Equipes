import "./Login.css"
import Cabecalho from '../../components/Cabecalho/Cabecalho.jsx'
import FormsLogin from '../../components/FormsLogin/FormsLogin.jsx'
const Login=()=>{
    return(
        <section className="section-body">
            <Cabecalho navs={["Login", "Cadastrar", "Sobre"]} />
            <FormsLogin></FormsLogin>
        </section>
    )
}
export default Login