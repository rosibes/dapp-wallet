import { useState } from 'react';
import SolanaWallet from './components/SolanaWallet';
import { EthWallet } from './components/EthWallet';
import { Buffer } from 'buffer';
import { FaSun, FaMoon } from 'react-icons/fa';  // Importă iconurile pentru Soare și Lună
import { GiCube } from 'react-icons/gi';  // Importă iconul pentru Cube (reprezintă blockchain-ul)
import './index.css'; // Importă fișierul CSS care conține directivele Tailwind
import Toggle from './components/Toogle';

if (!window.Buffer) {
  window.Buffer = Buffer; // Asigură suportul pentru `Buffer` în browser
}
const handleNavigation = (url) => {
  window.location.href = url; // Navighează la URL-ul dorit
};

function App() {
  const [mnemonic, setMnemonic] = useState(''); // Stocăm mnemonic-ul
  const [selectedBlockchain, setSelectedBlockchain] = useState(null); // Stocăm blockchain-ul selectat
  const [darkMode, setDarkMode] = useState(false); // Stocăm starea modului (Night/Day)

  // Afișăm interfața de selecție dacă nu a fost selectat un blockchain
  if (!selectedBlockchain) {
    return (
      <div className={`h-screen p-5 px-28 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-11 flex items-center ">
            {/* Logo ocupă 4 coloane pe desktop, 12 coloane pe mobil */}
            <GiCube onClick={() => handleNavigation('/App')}
              className='w-10 h-10 transform transition-all duration-300 hover:scale-105 
          hover:shadow-4xl hover:opacity-90 ' /> {/* Iconul de tip Cube (Blockchain) */}
            <p onClick={() => handleNavigation('/App')}
              className='ml-4 text-3xl font-bold transform transition-all duration-300 hover:scale-105 
          hover:shadow-4xl hover:opacity-90 '>rosibes</p>
          </div>
          {/* Toggle ocupă 8 coloane pe desktop, 12 coloane pe mobil */}
          <div className=' col-span-1 mt-5'>
            <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>

        <div className='mt-20'>
          <p className='text-5xl font-bold'>Choose a Blockchain to get Started</p>
          <br />
          <button
            className={`mr-1 font-bold py-2 px-5 rounded-xl shadow-lg transform transition-all duration-300 
    ${darkMode ? 'bg-white text-black hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500'
                : 'bg-black text-white hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500'} 
    hover:scale-105 hover:shadow-2xl hover:opacity-90 animate-pulse`}
            onClick={() => setSelectedBlockchain('solana')}
          >
            Solana
          </button>

          <button
            className={`font-bold py-2 px-5 rounded-xl shadow-lg transform transition-all duration-300 
    ${darkMode ? 'bg-white text-black hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500'
                : 'bg-black text-white hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500'} 
    hover:scale-105 hover:shadow-2xl hover:opacity-90 animate-pulse`}
            onClick={() => setSelectedBlockchain('ethereum')}
          >
            Ethereum
          </button>
        </div>
        <div className="w-full max-w-[1200px] mt-4 text-sm border-t absolute bottom-0">
          <footer className=" text-gray-500  py-4 text-sm bottom-0">
            Developed by <a
              href="https://x.com/rosibes27"
              target="_blank"
              rel="noopener noreferrer" className="text-gray-600 text-lg">rosibes</a>
          </footer>
        </div>
      </div>
    );
  }

  return (

    <div className="'bg-white text-black h-screen p-5 px-28 ">
      {/* Switch pentru Night/Day Mode */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-11 flex items-center mt-4">
          {/* Logo ocupă 4 coloane pe desktop, 12 coloane pe mobil */}
          <GiCube onClick={() => handleNavigation('/App')}
            className='w-10 h-10 transform transition-all duration-300 hover:scale-105 
          hover:shadow-4xl hover:opacity-90 ' /> {/* Iconul de tip Cube (Blockchain) */}
          <p onClick={() => handleNavigation('/App')}
            className='ml-4 text-3xl font-bold transform transition-all duration-300 hover:scale-105 
          hover:shadow-4xl hover:opacity-90 '>rosibes</p>
        </div>
        {/* Toggle ocupă 8 coloane pe desktop, 12 coloane pe mobil */}

      </div>

      <p>{mnemonic}</p>
      {selectedBlockchain === 'solana' && <SolanaWallet mnemonic={mnemonic} />}
      {selectedBlockchain === 'ethereum' && <EthWallet mnemonic={mnemonic} />}
      <div className="w-full max-w-[1200px] mt-4 text-sm border-t absolute bottom-0">
        <footer className=" text-gray-500  py-4 text-sm bottom-0">
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
