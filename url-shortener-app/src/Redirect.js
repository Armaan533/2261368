import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { urlMap } from "./urlMap";

export default function Redirect() {
    const { code } = useParams();

    useEffect(() => {
        const longUrl = urlMap.get(code);
        if (longUrl) {
            window.location.href = longUrl;
        } else {
            alert("Short URL not found.");
        }
    }, [code]);

    return null; // No UI needed, just redirecting
}