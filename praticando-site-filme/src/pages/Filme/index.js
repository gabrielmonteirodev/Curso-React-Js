import { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './filme.css';
import { toast } from "react-toastify";

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState();
    const [loading, setLoading] = useState(true);

    useEffect (()=>{
        async function loadFilme (){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:'6161d6b7fdded030ffe936e6cf4ac898',
                    language: "pt-br",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log('filme nao encontrado')
                navigate("/", { replace: true })
                return;
            })
        }

        loadFilme();

        return ()=>{
            console.log('componente foi desmontado')
        }

    }, [navigate, id])

    function salvarfilme(){
        const myList = localStorage.getItem("@primeflix")

        let filmesSalvos = JSON.parse(myList) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos)=>filmesSalvos.id === filme.id)
    
        if (hasFilme){
            toast.warning("Este filme ja esta salvo em sua lista!")
            return;
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso")

    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt="Imagem filme"/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong> Avaliação: {filme.vote_average} /10</strong>

            <div className="area-buttons">
                <button onClick={salvarfilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`} >
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;