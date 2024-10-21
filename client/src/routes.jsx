import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import Cadastrar from "./pages/Cadastrar/Cadastrar";
import Sobre from "./pages/Sobre/Sobre";
import Funcionario from "./pages/FuncionarioPage/FuncionarioPage";
function MainRoutes(){
            /*<Route path="/Cadastrar" element={<Cadastrar></Cadastrar>}/>
            <Route path="/Home" element={<Home></Home>}/>
            <Route path="/CadastrarFuncionario" element={<CadastrarFuncionario></CadastrarFuncionario>}/>
            <Route path="/CadastrarTime" element={<CadastrarTime></CadastrarTime>}/>
            <Route path="/PesquisarTime" element={<PesquisarTime></PesquisarTime>}/>
            <Route path="/PesquisarFuncionario" element={<PesquisarFuncionario></PesquisarFuncionario>}/>
            */
    return(
        <Routes>
            <Route path="/" element={<Login></Login>}/>
            <Route path="/Login" element={<Login></Login>}/>
            <Route path="/Sair" element={<Login></Login>}/>
            <Route path="/Cadastrar" element={<Cadastrar></Cadastrar>}/>
            <Route path="/Sobre" element={<Sobre></Sobre>}/>
            <Route path="/Home" element={<Home></Home>}/>
            <Route path="/Home/Funcionario/:id" element={<Funcionario></Funcionario>}/>
        </Routes>
    )
}
export default MainRoutes