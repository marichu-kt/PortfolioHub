export default function LoginButton() {
    const handleLogin = () => {
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
  