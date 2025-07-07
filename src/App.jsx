import { useState, useCallback, useEffect, useRef } from "react";
import Button from "./components/Button";
import LevelSelector from "./components/Nivel";
import Temporizador from "./components/Temporizador";
import Clicks from "./components/Click";
import ResultsTable from "./components/Tabla";

//Todos los useState viven en App.jsx y se pasan como props a los componentes hijos
// Importar los componentes necesarios: Button, Nivel, Temporizador, Clicks, Tabla
// Los niveles del juego
// Defino los niveles disponibles con su nombre y tiempo asignado
const LEVELS = [
    { name: "Fácil", time: 8 },
    { name: "Medio", time: 4 },
    { name: "Difícil", time: 1.5 },
];

export default function App() {
    // estado para controlar en qué pantalla está el usuario
    const [screen, setScreen] = useState("level"); // 4 secciones: nivel, empezar, juego y resultados

    // estado para guardar el nivel seleccionado por el usuario
    const [selectedLevel, setSelectedLevel] = useState(null);

    // estado para el tiempo restante de la partida actual
    const [timeLeft, setTimeLeft] = useState(0);

    // estado que guarda la cantidad de clicks hechos durante la partida
    const [clicks, setClicks] = useState(0);

    // estado para almacenar los resultados de todas las partidas jugadas
    const [currentResults, setCurrentResults] = useState([]);

    // estados para la música de fondo
    const audioRef = useRef(null);

    // useEffect para inicializar la música de fondo
    useEffect(() => {
        // elemento de audio
        audioRef.current = new Audio("/music/a-big-world-238961.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4; // para que no suene tan fuerte

        // función para iniciar la música en la primera interacción (listener)
        const startMusic = () => {
            audioRef.current.play().catch((error) => {
                console.log("Error al reproducir música:", error);
            });
            // saca el listener después de la primera interacción
            document.removeEventListener("click", startMusic);
            document.removeEventListener("keydown", startMusic);
        };

        // Agregar listeners para la primera interacción (click en pantalla)
        document.addEventListener("click", startMusic);

        // Cleanup cuando el componente se desmonte
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
            document.removeEventListener("click", startMusic);
            document.removeEventListener("keydown", startMusic);
        };
    }, []);

    // Función para iniciar el juego con el nivel seleccionado
    const startGame = () => {
        setClicks(0); // Reseteo el contador de clicks
        setTimeLeft(selectedLevel.time); // Seteo el tiempo según el nivel
        setScreen("game"); // Cambio la pantalla a la del juego -->(provisorio hasta lograr la screen de comienzo)
    };

    // Función para reintentar la partida en el mismo nivel
    const retryGame = () => {
        setClicks(0); // Reseteo los clicks
        setTimeLeft(selectedLevel.time); // Vuelvo a poner el tiempo según nivel
        setScreen("game"); // Vuelvo a la pantalla de juego
    };

    // Función para volver a la selección de nivel
    const goToStart = () => {
        setScreen("level"); // Cambio la pantalla a selección de nivel
        setSelectedLevel(null); // Deselecciono el nivel
    };

    const finishCalled = useRef(false);

    // Función que se ejecuta al finalizar el tiempo de juego
    const finishGame = useCallback(() => {
        if (finishCalled.current) return; // Evita doble ejecución
        finishCalled.current = true;
        setCurrentResults((prev) => [...prev, { level: selectedLevel.name, clicks }]);
        setScreen("results");
    }, [selectedLevel, clicks, setCurrentResults, setScreen]);

    // HECHO CON COPILOT:
    // useEffect para manejar el temporizador del juego
    // Este efecto se activa cuando la pantalla es "game"
    useEffect(() => {
        if (screen === "game") {
            finishCalled.current = false; // Resetear bandera al iniciar juego
            const interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 0.01) {
                        clearInterval(interval);
                        finishGame();
                        return 0;
                    }
                    return +(prevTime - 0.01).toFixed(2); // Redondeamos a 2 decimales
                });
            }, 10); // 10ms = 0.01 segundos

            return () => clearInterval(interval);
        }
    }, [screen, finishGame]);

    // Renderizado condicional de componentes según pantalla
    return (
        <div>
            <div className="app">
                {/* Pantalla de inicio */}
                {/* Pantalla de selección de nivel */}
                {screen === "level" && (
                    <>
                        {/* Tabla de récords directamente aquí */}
                        <div className="simple-records-container">
                            <h3 className="records-title">RECORDS</h3>
                            <div className="records-list">
                                <div className="record-item">Fácil: 58</div>
                                <div className="record-item">Medio: 31</div>
                                <div className="record-item">Difícil: 8</div>
                            </div>
                        </div>

                        {/* Solo selector de nivel */}
                        <LevelSelector
                            levels={LEVELS}
                            selectedLevel={selectedLevel}
                            onSelectLevel={(level) => {
                                setSelectedLevel(level);
                                setScreen("start");
                            }}
                        />
                    </>
                )}
                {/* Nueva pantalla: solo botón comenzar */}
                {screen === "start" && selectedLevel && <Button title="Comenzar" action={startGame} />}

                {/* Pantalla de juego*/}
                {screen === "game" && (
                    <>
                        {/* Timer y clicks visibles durante la partida */}
                        <Temporizador timeLeft={timeLeft} setTimeLeft={setTimeLeft} onFinish={finishGame} />
                        <Clicks count={clicks} />
                        <Button title="Click" action={() => setClicks((prev) => prev + 1)} />
                    </>
                )}

                {/* Pantalla de resultados */}
                {screen === "results" && (
                    <>
                        <ResultsTable results={currentResults} />
                        <Button title="Volver a inicio" action={goToStart} />
                        <Button title="Reiniciar" action={retryGame} />
                    </>
                )}
            </div>
        </div>
    );
}
