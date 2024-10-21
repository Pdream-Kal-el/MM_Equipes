import Cabecalho from "../../components/Cabecalho/Cabecalho"
import "./Sobre.css"
const Sobre=()=>{
    return(
        <section className="section-body">
        <Cabecalho navs={["Login", "Cadastrar", "Sobre"]} />
            <div class="lobby-sobre">
                <h1 class="titulo-lobby">Bem-vindo ao Lobby do Sobre</h1>
                <p class="texto-intro">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a nibh et mauris bibendum pulvinar. Aenean non erat lectus. Proin consequat elit et mi auctor auctor. Sed elementum congue quam et convallis.</p>

                <div class="box-destaque">
                    <h2 class="subtitulo">Sobre nós</h2>
                    <p>Aenean iaculis auctor velit at iaculis. Nulla eget lobortis nibh. Suspendisse gravida nunc enim, id ultricies lacus porttitor ut. Duis quam est, aliquet sit amet enim nec, sodales porta eros.</p>
                    <blockquote class="citacao">"Mauris eu quam ut odio molestie condimentum. Donec mollis, elit eget gravida vestibulum, velit mauris commodo sapien."</blockquote>
                </div>

                <div class="texto-corpo">
                    <h3>Missão</h3>
                    <p>Vestibulum commodo urna et vehicula volutpat. Mauris eu quam ut odio molestie condimentum. Donec mollis, elit eget gravida vestibulum, velit mauris commodo sapien, vel pellentesque eros elit non dui.</p>

                    <h3>Visão</h3>
                    <p>Cras quis viverra felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>

                    <h3>Valores</h3>
                    <ul>
                        <li>In convallis elit eu erat porta fringilla.</li>
                        <li>Donec finibus luctus tristique.</li>
                        <li>Aliquam erat volutpat.</li>
                    </ul>
                </div>

                <footer class="footer-lobby">
                    <p><strong>Contato:</strong> Aenean dictum tempus dolor, eu lacinia urna. Aenean condimentum urna id blandit varius. Sed quis nisi eget metus venenatis suscipit.</p>
                    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                </footer>
            </div>

        </section>
    )
}
export default Sobre