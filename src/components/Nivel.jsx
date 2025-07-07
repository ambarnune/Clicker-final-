//LevelSelector
import Button from "./Button";

export default function LevelSelector({ levels, selectedLevel, onSelectLevel }) {
    return (
        <div style={{ textAlign: "center" }}>
            <h2>Selecciona un nivel:</h2>
            {/* asocia cada nivel a un botón. El botón queda deshabilitado si está seleccionado */}
            {levels.map((level) => (
                <Button
                    key={level.name}
                    title={level.name}
                    action={() => onSelectLevel(level)}
                    // Cambia el nivel seleccionado al clickear:
                    disabled={selectedLevel && selectedLevel.name === level.name}
                />
            ))}
        </div>
    );
}
