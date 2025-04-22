import axios from "axios";
import { logError } from "./errorLogger";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const retryRequest = async (fn: () => Promise<any>, retries = 3) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

export const fetchBlocks = async () => {
  try {
    const response = await retryRequest(() => axios.get(`${API_BASE_URL}/blocks`));
    return response.data;
  } catch (error) {
    logError(error, "fetchBlocks");
    toast.error("Failed to fetch blocks. Please try again later.");
    throw error;
  }
};

export const fetchBlockDetails = async (blockId: string) => {
  try {
    const response = await retryRequest(() =>
      axios.get(`${API_BASE_URL}/blocks/${blockId}`)
    );
    return response.data;
  } catch (error) {
    logError(error, "fetchBlockDetails");
    toast.error("Failed to fetch block details. Please try again later.");
    throw error;
  }
};

export const launchToken = async (tokenData: any) => {
  try {
    const response = await retryRequest(() =>
      axios.post(`${API_BASE_URL}/tokens`, tokenData)
    );
    return response.data;
  } catch (error) {
    logError(error, "launchToken");
    toast.error("Failed to launch token. Please try again later.");
    throw error;
  }
};

export const fetchTokenLaunches = async () => {
  try {
    const response = await retryRequest(() => axios.get(`${API_BASE_URL}/tokens`));
    return response.data;
  } catch (error) {
    logError(error, "fetchTokenLaunches");
    toast.error("Failed to fetch token launches. Please try again later.");
    throw error;
  }
};