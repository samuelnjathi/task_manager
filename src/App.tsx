import {  useEffect, useState } from "react";
import Footer from "./components/Footer";
import TaskManager from "./components/TaskManager";
import { getImage } from "./services/API";
import { Analytics } from "@vercel/analytics/react"


export default function App() {
  const [imageUrl, setImageUrl] = useState<string | null>("");

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
 
  return(
    <div className="min-h-screen flex flex-col justify-center items-center bg-center bg-cover"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : "none"
        }}
    >
      <TaskManager /> 
      <Footer />
      <Analytics  />
    </div> 
  )
} 