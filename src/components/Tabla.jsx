//ResultsTable
// Componente que muestra la tabla de resultados y los botones para
// reintentar o volver al inicio.

export default function ResultsTable({ results, onRetry, onBack }) {
    // Función para detectar si un resultado es el récord ACTUAL (no histórico)
    const isCurrentRecord = (currentResult, currentIndex) => {
        // Obtener TODOS los resultados del mismo nivel (anteriores y posteriores)
        const allSameLevelResults = results.filter((result) => result.level === currentResult.level);

        // Encontrar el mejor resultado de todos los del mismo nivel
        const bestScore = Math.max(...allSameLevelResults.map((r) => r.clicks));

        // Es récord actual si:
        // 1. Tiene el mejor puntaje del nivel
        // 2. Y es el resultado más reciente con ese puntaje (en caso de empate)
        if (currentResult.clicks === bestScore) {
            // Si hay empate, solo el más reciente es récord
            const lastIndexWithBestScore = results
                .map((r, i) => ({ result: r, index: i }))
                .filter((item) => item.result.level === currentResult.level && item.result.clicks === bestScore)
                .pop().index;

            return currentIndex === lastIndexWithBestScore;
        }

        return false;
    };

    return (
        <div className="results-container">
            <h3>Resultados</h3>
            {/* Lista de resultados de cada partida */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nivel</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, idx) => (
                        <tr key={idx} className={isCurrentRecord(result, idx) ? "record-row" : ""}>
                            <td>
                                {result.level} {isCurrentRecord(result, idx) ? "" : ""}
                            </td>
                            <td>{result.clicks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
