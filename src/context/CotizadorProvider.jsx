import { createContext, useState } from "react";
import { calcularMarca, obtenerDiferenciaYear, calcularPlan, formatearDinero } from "../helpers";

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('');
    const [resultado, setResultado] = useState(0);
    const [cargando, setCargando] = useState(false);

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const CotizarSeguro = () => {
        //Una base 
        let resultado = 2000

        //Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)
        
        //Hay que restar el 3% por cada año
        resultado -= ((diferencia * 3) * resultado) / 100

        //Europeo 30%
        //Americano 15%
        //Asiatico 5%
        resultado *= calcularMarca(datos.marca)
        //Basico 20%
        //Completo 50%
        resultado *= calcularPlan(datos.plan)
        
        //Formatear dinero
        resultado = formatearDinero(resultado)

        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000)

    }
    
    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                CotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext