// Componente Temporizador: muestra y gestiona el timer del juego en centésimas de segundo (0.01s).
import { useEffect } from "react";

export default function Temporizador({ timeLeft, setTimeLeft, onFinish }) {
    // useEffect se ejecuta cada vez que cambia timeLeft, setTimeLeft o onFinish
    useEffect(() => {
        // Si el tiempo llegó a cero termina el juego
        if (timeLeft <= 0) {
            onFinish();
            return;
        }
        // Para dar más urgencia al usuario hice que el timer
        // disminuya el tiempo de a 0.01 cada 10ms (0.01s), para que constantemente se vean
        // numeros reduciciendo en pantalla.
        const timer = setTimeout(() => {
            setTimeLeft((prev) => +(prev - 0.01).toFixed(2)); // Restamos y redondeamos a 2 decimales
        }, 10);
        // Limpia el timeout si el componente se desmonta o cambia el tiempo
        return () => clearTimeout(timer);
    }, [timeLeft, setTimeLeft, onFinish]);

    // Renderiza el tiempo restante con dos decimales
    return <div className="clicks-display"> {timeLeft.toFixed(2)}s</div>;
}
