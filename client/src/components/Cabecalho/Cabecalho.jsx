import "./Cabecalho.css"
import LogoBotao from "../Logo/Logo"
import BotaoNav from "../BotaoNav/BotaoNav"

const Cabecalho = (props) => {
    return (
        <header className="cabecalho">
            <LogoBotao />
            <div className="navegacao">
                {props.navs.map((nav) => (
                    <BotaoNav key={nav} link={`/${nav.toLowerCase()}`} texto={nav} />
                ))}
            </div>
        </header>
    )
}

export default Cabecalho;
