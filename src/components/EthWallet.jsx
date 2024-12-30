import { useState } from "react";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Stiluri pentru Toastify
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FaRegCopy } from "react-icons/fa6";


export const EthWallet = () => {
    const [mnemonic, setMnemonic] = useState(""); // Mutăm starea mnemonic aici
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]); // Stocăm adresele și cheile private
    const [isFirstWalletGenerated, setIsFirstWalletGenerated] = useState(false); // Starea pentru actualizarea butonului
    const [showKeys, setShowKeys] = useState([]); // Starea pentru afișarea sau ascunderea cheilor private
    const [showMnemonic, setShowMnemonic] = useState(false); // Starea pentru a arăta fraza secretă

    const deleteWallet = (index) => {
        // Șterge un portofel specific din listă
        const updatedWallets = addresses.filter((_, i) => i !== index);
        setAddresses(updatedWallets);
        setShowKeys(showKeys.filter((_, i) => i !== index));
    };

    const deleteAllWallets = () => {
        // Șterge toate portofelele
        setAddresses([]); // Golește lista de portofele
        setMnemonic(""); // Resetează mnemonic-ul
        setCurrentIndex(0); // Resetează indexul curent
        setIsFirstWalletGenerated(false); // Resetează starea butonului
        setShowKeys([]);

    };

    const toggleKeyVisibility = (index) => {
        setShowKeys((prevState) => {
            const updatedVisibility = [...prevState];
            updatedVisibility[index] = !updatedVisibility[index];
            return updatedVisibility;
        });
    };

    const handleShowMnemonic = () => {
        setShowMnemonic(!showMnemonic); // Comută starea pentru a arăta/ascunde fraza secretă
    };

    const copyToClipboard = (word) => {
        navigator.clipboard.writeText(word).then(() => {
            // Arată notificarea Toastify
            toast.success(`Copied to clipboard!`, {
                position: "bottom-right", // Locația pop-up-ului
                autoClose: 3000, // Dispare după 3 secunde
            });
        }).catch((error) => {
            console.error('Failed to copy text: ', error);
            toast.error('Failed to copy text!', {
                position: "bottom-right",
                autoClose: 3000,
            });
        });
    };

    const copyMnemonic = () => {
        copyToClipboard(mnemonic); // Copiem întreaga frază mnemonic
    };

    return (
        <div className="p-50 bg-white space-y-5">
            {/* Primul chenar */}
            <div className=" p-10 rounded-lg shadow-lg">
                <button className="bg-black text-white rounded-lg px-6 py-2 hover:bg-gray-800"
                    onClick={async function () {
                        try {
                            if (!mnemonic) {
                                const generatedMnemonic = generateMnemonic();
                                setMnemonic(generatedMnemonic);
                                console.log("Generated Mnemonic:", generatedMnemonic);
                            }
                            const seed = await mnemonicToSeed(mnemonic);
                            const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                            const hdNode = HDNodeWallet.fromSeed(seed);
                            const child = hdNode.derivePath(derivationPath);
                            const privateKey = child.privateKey;
                            const wallet = new Wallet(privateKey);

                            setCurrentIndex(currentIndex + 1);
                            setAddresses([...addresses, { address: wallet.address, privateKey }]);

                            if (!isFirstWalletGenerated) setIsFirstWalletGenerated(true);
                        } catch (error) {
                            console.error("Error generating Ethereum wallet:", error);
                            alert(`An error occurred: ${error.message}`);
                        }
                    }}
                >
                    {isFirstWalletGenerated ? "Add Wallet" : "Generate ETH Wallet"}
                </button>

                {addresses.length > 0 && (
                    <button className="bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-500 ml-4"
                        onClick={deleteAllWallets}> Delete All </button>
                )}

                {mnemonic && (
                    <div className=" mt-10 ">
                        <div className="flex justify-between">
                            <div className="mb-1">
                                <span className="font-bold text-2xl">Your Secret Phrase </span>
                            </div>
                            {/* Când fraza secretă este vizibilă, schimbă săgeata în sus */}
                            <div>
                                <button onClick={handleShowMnemonic}
                                >
                                    {showMnemonic ? (
                                        <>
                                            <SlArrowUp className="text-xl rounded-lg ml-2 text-black mr-4 hover:shadow-md rounded-lg  " />
                                        </>
                                    ) : (
                                        <>
                                            <SlArrowDown className="text-xl rounded-lg ml-2 text-black mr-4 hover:shadow-md rounded-lg " />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {showMnemonic && (
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                {mnemonic.split(" ").map((word, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 px-4 py-4 rounded-md font-medium transition duration-300 transform hover:bg-gray-200 hover:text-black hover:shadow-lg cursor-pointer"
                                        onClick={() => copyToClipboard(word)}
                                    >
                                        {word}
                                    </div>
                                    
                                ))}
                                <div className="mt-6 flex gap-2 items-center cursor-pointer" onClick={copyMnemonic}>
                                <FaRegCopy className="text-gray-400"/>
                                <p className="text-gray-400">Click here to copy</p>
                                </div>
                        
                            </div>
                        )}
                        
                    </div>
                    
                )}
            </div>
            {addresses.length > 0 &&(
                <p className="text-2xl font-bold mb-4">Ethereum Wallets</p>
            )}
            

            {/* Al doilea chenar */}
            <div className=" rounded-4xl shadow-lg">
                {addresses.map((wallet, index) => (
                    <div key={index} className="mb-6">
                        <div className="px-5 flex justify-between items-center py-2">
                            <p className="text-3xl px-5 p-6 font-bold">Wallet {index + 1}</p>
                            <button className="p-3 text-red-600 hover:bg-gray-100 mr-5 rounded-lg"
                                onClick={() => deleteWallet(index)}>
                                <FaTrash className="w-4 h-4" />
                            </button>
                        </div>
                        <div className=" px-10 bg-gray-50 rounded-md shadow-md p-7 mb-10">
                            <div className="mb-5">
                                <p className="font-bold">Address</p>
                                <p className="text-gray-700">{wallet.address}</p>
                            </div>
                            <div>
                                <p className="font-bold">Private Key</p>
                                <div className="flex items-center justify-between ">
                                    <p className="text-gray-700">
                                        {showKeys[index]
                                            ? wallet.privateKey
                                            : " • ".repeat(wallet.privateKey.length)}
                                    </p>
                                    <button
                                        className=" p-3 text-black hover:bg-gray-100 text-gray-700 rounded-lg"
                                        onClick={() => toggleKeyVisibility(index)}
                                    >
                                        {showKeys[index] ? (
                                            <FaEyeSlash className="w-4 h-4" />
                                        ) : (
                                            <FaEye className="w-4 h-4" />
                                        )}
                                    </button>
                                    
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                ))}
                
            </div>
            {/* Aici va fi container-ul pentru toast */}
            <ToastContainer />

        </div>
    );
};

export default EthWallet;
