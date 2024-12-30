import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'; // Importă `Routes`, `Route` și `Link`
import SolanaWallet from './components/SolanaWallet';
import { EthWallet } from './components/EthWallet';
import { Buffer } from 'buffer';
import { FaSun, FaMoon } from 'react-icons/fa';  
import { GiCube } from 'react-icons/gi';  
import './index.css'; 
import Toggle from './components/Toogle';

if (!window.Buffer) {
  window.Buffer = Buffer;
}

function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  
  const navigate = useNavigate(); // Folosim useNavigate pentru a naviga la o altă pagină

  const handleBlockchainSelection = (blockchain) => {
    setMnemonic(blockchain); // Setăm mnemonic-ul pentru Solana sau Ethereum
    // Navigăm către ruta corespunzătoare
    if (blockchain === 'solana') {
      navigate('/solana');
    } else if (blockchain === 'ethereum') {
      navigate('/ethereum');
    }
  };

  return (
    <div className={`min-h-screen p-5 px-28 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'} flex flex-col`}>
      {/* Header cu logo */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-11 flex items-center mt-4">
          <Link to="/"> {/* Folosește Link pentru navigare */}
            <GiCube className="w-10 h-10 transform transition-all duration-300 hover:scale-105 hover:shadow-4xl hover:opacity-90" />
          </Link>
          <p className="ml-4 text-3xl font-bold transform transition-all duration-300 hover:scale-105 hover:shadow-4xl hover:opacity-90">
            <Link to="/">rosibes</Link> {/* Folosește Link pentru navigare */}
          </p>
        </div>
      </div>

      <Routes>
        {/* Ruta principală */}
        <Route path="/" element={
          <div className="mt-20 flex-grow">
            <p className="text-5xl font-bold">Choose a Blockchain to get Started</p>
            <br />
            <button
              className={`mr-1 font-bold py-2 px-5 rounded-xl shadow-lg transform transition-all duration-300 
                ${darkMode ? 'bg-white text-black hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500'
                          : 'bg-black text-white hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500'} 
                hover:scale-105 hover:shadow-2xl hover:opacity-90 animate-pulse`}
              onClick={() => handleBlockchainSelection('solana')}
            >
              Solana
            </button>

            <button
              className={`font-bold py-2 px-5 rounded-xl shadow-lg transform transition-all duration-300 
                ${darkMode ? 'bg-white text-black hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500'
                          : 'bg-black text-white hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500'} 
                hover:scale-105 hover:shadow-2xl hover:opacity-90 animate-pulse`}
              onClick={() => handleBlockchainSelection('ethereum')}
            >
              Ethereum
            </button>
          </div>
        } />
        
        {/* Ruta pentru Solana */}
        <Route path="/solana" element={<SolanaWallet mnemonic={mnemonic} />} />
        
        {/* Ruta pentru Ethereum */}
        <Route path="/ethereum" element={<EthWallet mnemonic={mnemonic} />} />
      </Routes>

      {/* Footer */}
      <div className="w-full text-sm border-t mt-auto"> {/* Folosim mt-auto pentru a-l împinge în jos */}
        <footer className="text-gray-500 py-4 text-sm">
          Developed by <a
            href="https://x.com/rosibes27"
            target="_blank"
            rel="noopener noreferrer" className="text-gray-600 text-lg">rosibes</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
