// httpService.ts
import axios, { AxiosInstance } from "axios";

interface MessageRequest {
    content: string;
}

// Extend AxiosInstance
interface CustomHttp extends AxiosInstance {
    stream(url: string, data: MessageRequest): Promise<ReadableStream<Uint8Array> | null>;
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://catoly-server-production.up.railway.app";

const Http = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  }) as CustomHttp;
  
  Http.stream = async function(url: string, data: MessageRequest) {
    const response = await fetch(`${baseURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.body;
  };
  
  export default Http;