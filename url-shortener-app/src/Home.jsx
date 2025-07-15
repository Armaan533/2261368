import { useState } from "react";
import { saveUrlMap, urlMap } from "./urlMap";
import { generateShortCode } from "./utils";


function getUniqueShortCode() {
    let code;
    do {
      code = generateShortCode();
    } while (urlMap.has(code));
    return code;
}

export default function Home() {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [userShortCode, setUserShortCode] = useState("");

    const handleShorten = () => {
        if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
            alert("Please enter a valid URL.");
            return;
        }

        if( userShortCode && urlMap.has(userShortCode) ) {
            alert("Short code already exists. Please choose a different one.");
            return;
        }
        else if (userShortCode) {
            urlMap.set(userShortCode, longUrl);
            saveUrlMap();
            setShortUrl(`${window.location.origin}/${userShortCode}`);
        }
        else {
            const shortCode = getUniqueShortCode();
            urlMap.set(shortCode, longUrl);
            saveUrlMap();
            setShortUrl(`${window.location.origin}/${shortCode}`);
        }

    };

    return (
        <div>
            <h1>
                URL Shortener
            </h1>
            <input
                type="text"
                placeholder="Enter long URL"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Custom short code (optional)"
                value={userShortCode}
                onChange={(e) => setUserShortCode(e.target.value)}
            />

            <button onClick={handleShorten}>Shorten</button>
            {shortUrl &&(
                <div>
                    <h2>Shortened URL:</h2>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </div>
            )}
        </div>
    );
}