import axios from "axios";
const unsplashApiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
// const ninjaApiKey = import.meta.env.VITE_NINJA_API_KEY;

export const getImage = async () => {
    try {
        const response = await axios.get("https://api.unsplash.com/photos/random", {
            params: {
                client_id: unsplashApiKey,
                orientation: "landscape"
        }});

       return response.data;
    } catch (error) {
        console.error("Error fetching background image", error);
    }
}

export const getQuote = async  () => {
    try {
        const response = await axios.get("https://api.realinspire.live/v1/quotes/random");
        return response.data;
    } catch (error) {
        console.error("Error fetching Quote", error);
    }
}