// Componente que muestra la cantidad actual de clicks realizados durante la partida.
// Recibe como prop el conteo de clicks y lo muestra --> orienta al jugador

export default function Clicks({ count }) {
    // Renderiza el número de clicks en pantalla
    return <div className="clicks-display">Clicks: {count}</div>;
}
