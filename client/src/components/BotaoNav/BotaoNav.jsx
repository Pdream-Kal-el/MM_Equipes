import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BotaoNav.css'; // Importando o arquivo de estilos

const BotaoNav = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.link); // Mude para a rota desejada
    };

    return (
        <button className="Botao-Nav" onClick={handleClick}>
            {props.texto}
        </button>
    );
};

export default BotaoNav;