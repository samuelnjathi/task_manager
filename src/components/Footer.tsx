import React, { useEffect, useState } from 'react';
import { getQuote } from '../services/API';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    const [quote, setQuote] = useState<{content: string; author: string}[]>([]);
    const [isHovered, setIsHovered] = useState(false);

    const isNewDay = (lastFetchedDate: string): boolean => {
        const today = new Date().toLocaleDateString();
        return today !== lastFetchedDate;
    }

    useEffect(() => {
            const fetchQuote = async () => {
                try {
                    const quote = await getQuote();
                    
                    localStorage.setItem("quote", JSON.stringify(quote));
                    localStorage.setItem("lastFetchedDate", new Date().toLocaleDateString());

                    setQuote(quote);
                } catch (error) {
                    console.error("Error fetching quote", error);
                }
            }
            const storedQuote = localStorage.getItem("quote");
            const lastFetchedDate = localStorage.getItem("lastFetchedDate");

            if (storedQuote && lastFetchedDate && !isNewDay(lastFetchedDate)) {
                try {
                    setQuote(JSON.parse(storedQuote));
                } catch (error) {
                    console.error("Error parsing stored quote", error);
                    localStorage.removeItem("quote");
                }
            } else{
                fetchQuote();
            }
          
        }, []);
    return (
        <footer className="flex flex-col justify-end items-center mt-auto text-white my-2">
            {quote.map((q, index) => (
                <div className="flex flex-col items-center" key={index} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
                    <p className="mb-1">"{q.content}"</p>
                    {isHovered && (
                        <motion.p className="text-sm text-gray-100"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}>
                            {q.author}
                        </motion.p>)}
                    
                </div>
            ))}
           <p className="text-sm">Softliving Technologies © {new Date().getFullYear()}</p>
        </footer>
    )
}
export default React.memo(Footer);