import { Log } from "./logging";

export async function apiClient(url = "http://20.244.56.144/evaluation-service/logs", method = "GET", body = null, module = "api") {
    Log("frontend", "info", module, `API Request: ${method} ${url}`);

    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if(body) {
        options.body = JSON.stringify(body);
        Log("frontend", "debug", module, `Request Body: ${JSON.stringify(body)}`);
    }

    try{
        const response = await fetch(url, options);
        const text = await response.text();
        let json;

        try {
            json = JSON.parse(text);
        } catch {
            json = { message: text };
        }

        Log("frontend", response.ok ? "info" : "warn", module, `Response: ${response.status} ${response.statusText} ${JSON.stringify(json)}`);
        return json;
    } catch (error) {
        Log("frontend", "error", module, `Error: ${error.message}`);
        throw error;
    }
}