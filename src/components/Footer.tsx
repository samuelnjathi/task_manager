import React, { useEffect, useState } from 'react';
import { getQuote } from '../services/API';

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
        <footer className="flex flex-col justify-center items-center fixed bottom-0 text-white my-2">
            {quote.map((q, index) => (
                <div className="flex flex-col items-center" key={index}>
                    <p className="mb-1" onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>"{q.content}"</p>
                    {isHovered && (<p className="text-sm text-gray-300">{q.author}</p>)}
                    
                </div>
            ))}
           <p className="text-sm">Softliving Technologies © {new Date().getFullYear()}</p>
        </footer>
    )
}
export default React.memo(Footer);