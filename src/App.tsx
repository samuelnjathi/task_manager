import {  useEffect, useState } from "react";
import Footer from "./components/Footer";
import TaskManager from "./components/TaskManager";
import { getImage, getQuotes } from "./services/API";


export default function App() {
  const [imageUrl, setImageUrl] = useState<string | null>("");
  // const [quote, setQuote] = useState<string[]>([])

  const isNewDay = (lastfetchedDate: string): boolean => {
    const today = new  Date().toLocaleDateString();
    return today !== lastfetchedDate;
  }

 useEffect(() => {
   const fetchImage = async () => {
    try {
      const image = await getImage();
      const imageUrl =  image.urls.full;

      localStorage.setItem("imageUrl", imageUrl)
      localStorage.setItem("lastfetchedDate", new Date().toLocaleDateString());

      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching image url", error);
    }
   }
   const storedImageUrl = localStorage.getItem("imageUrl");
   const lastfetchedDate = localStorage.getItem("lastfetchedDate");

   if (storedImageUrl && lastfetchedDate && !isNewDay(lastfetchedDate)) { 
      setImageUrl(storedImageUrl);
   } else {
    fetchImage();
   }
 }, []);

useEffect(() => {
  const fetchQuotes = async () => {
      const quotes = await getQuotes();
      console.log(quotes);
  }
  fetchQuotes();
}, [])
 
  return(
    <div className="min-h-screen flex flex-col justify-center items-center bg-center bg-cover"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : "none"
        }}
    >
      <TaskManager /> 
      <Footer />
    </div> 
  )
} 