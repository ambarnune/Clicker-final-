# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Juego

## Fuentes

Para hacer el boton contador utilice: Clase 6
Para incorporar el useEffect mire https://youtu.be/TBxpAhpQqYk?si=Wrsr89uurxp1BOnk
Para hacer el título led utilice: https://css-tricks.com/
Para alinear los componentes al centro de la pantalla use: https://claude.ai/

## timer

Para el timer tuve la complicación que al tocar el botón de clicks, el tiempo se detenia y unicamente continuaba cuando dejaba de seleccionarlo. Para prevenir esto elegi usar:
setTimeLeft((prev) => prev - 1) para que funcione bien aunque haya muchos renders por los clicks. Por otro lado, timer solo depende de timeLeft, porque supuestamente no se pausa aunque hagas muchos clicks. A pesar de tener en cuenta esto no me funciono. Luego con la ayuda de copilot lo rearticule:

antes:
{/_ Pantalla de juego _/}
{screen === "game" && (
<>
{/_ Componente que muestra el timer y controla el fin del juego _/}
<Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onFinish={finishGame} />
{/_ Componente que muestra la cantidad de clicks actuales _/}
<ClickCounter count={clicks} />
{/_ Botón para sumar clicks durante la partida _/}
<Button title="Click" action={() => setClicks((c) => c + 1)} />
</>
)}

despues:
useEffect(() => {
if (screen === "game") {
const interval = setInterval(() => {
setTimeLeft((prevTime) => {
// Restamos 0.01
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
            {screen === "game" && (
                <>
                    {/* Timer y clicks visibles durante la partida */}
                    <h2>Time left: {timeLeft}</h2>
                    <h3>Clicks: {clicks}</h3>
                    <button onClick={() => setClicks((prev) => prev + 1)}>CLICK!</button>
                </>
            )})

## Estado

LevelSelector (nivel): maneja el nivel seleccionado localmente para feedback visual, pero comunica el nivel elegido al padre (App) para que el juego lo use.

Timer (temporizador): maneja el tiempo restante localmente, reinicia cuando cambias de nivel, y avisa cuando termina.

ClickCounter (clicks): maneja animación local y muestra el contador, pero el valor real vive en App (y así lo puedes usar para resultados y reiniciar).

ResultsTable (tabla): resalta el último resultado usando un estado local.

App.jsx: concentra los estados principales y pasa props a los hijos, asegurando que toda la lógica y los datos estén sincronizados.

## Estilo

Con el estilo tuve varios problemas con la alineacion de los elementos y los fondos. En un principio agarre cada cumponente y le arme una carpeta css pero como no estaban funcionando luego agregue estilos dentro de las hojas jsx. El problema con esto era que se empezaron a sobreponer unos con los otros asi que termine utilizando index.css para ocuparme del estilo de toda la pagina y sus componentes (el cual puede verse actualmente en el código)y agregando clase: className Button debido a que no podia editar mis botones por la falta de clase.

## Audio

Agregue audio y para eso utilice dos tutoriales:
De música quería una que se asimile a la de los juegos vintage y a la musica de Deltarun. Busque diferentes audios online y encontre "a big world" la cual creo que era la más compatible con el género que quería y el loop no sea demasiado brusco.

Cuando aprendi a armarlo también aprendi acerca de dos cosas: listeners. Estos eran necesarios en este trabajo debido a que actualmente la mayoria de los navegadores no dejan que la musica empieze en automatico, necesitan que haya algun tipo de interaccion en la página como para que empieze el audio. La dinamica es:
Usuario entra a la página → listeners se activan → usuario hace click (probablemente ese click sea en alguno de los botones de niveles) → empieza la música de fondo → listeners se eliminan (por ende mientras el jugador sigue haciendo clicks, los listeners ya no responden).

## -
