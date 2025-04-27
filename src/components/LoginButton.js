export default function LoginButton() {
    const handleLogin = () => {
      // En un flujo real, aquí rediriges a la OAuth de GitHub:
      // 1. Redirigir a https://github.com/login/oauth/authorize?...
      // 2. GitHub vuelve a tu app con ?code=XXXXX
      // 3. Intercambiar el code por un access_token en tu backend o serverless function.
      alert("Aquí iría la lógica para iniciar sesión con GitHub");
    };
  
    return (
      <button
        onClick={handleLogin}
        className="bg-gray-800 text-white px-4 py-2 rounded"
      >
        Iniciar sesión con GitHub
      </button>
    );
  }
  