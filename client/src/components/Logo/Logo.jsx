import React from 'react';
import './Logo.css'; // Estilos para posicionar a imagem
import logo from "../../assets/img/LogoSemFundo.png";

const LogoBotao = () => {
    const handleReload = () => {
        window.location.reload(); // recarregar a página
    };

    return (
        <div className="logo-container">
            <button className="logo-button" onClick={handleReload}>
                <img
                    src={logo}
                    alt="Logo"
                    className="logo-img"
                />
            </button>
            <h1 className="logo-title">Lojas MM</h1>
        </div>
    );
};

export default LogoBotao;
