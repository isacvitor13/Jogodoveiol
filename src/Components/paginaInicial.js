import Styles from './paginaInicial.module.css'
import { Link } from 'react-router-dom'
function PaginaInicial(){
    return(

        <div className={Styles.container}>
    <div className={Styles.gamecontainer}>
        <h1>Bem-vindo ao JOGO DO VELHO</h1>
        <Link className={Styles.startbutton} to='/sozinho'>Jogar Sozinho</Link>
        <Link className={Styles.startbutton}to='/amigo'>Jogar com Amigo</Link>
    </div>
    </div>
    )
}
export default PaginaInicial