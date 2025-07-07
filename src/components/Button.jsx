// Componente reutilizable para cualquier botón de la app.
// Recibe el texto del botón (title), una función para ejecutar
//  al hacer click (action) y si debe estar deshabilitado
// (disabled).

const Button = ({ title = "default-button", action, disabled = false }) => {
    // Renderiza un <button> estándar de HTML con los props recibidos.
    // onClick llama a la función action. El botón puede estar deshabilitado.
    return (
        <button className="Button" onClick={action} disabled={disabled}>
            {title}
        </button>
    );
};

export default Button;
