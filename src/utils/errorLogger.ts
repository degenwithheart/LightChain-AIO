export const logError = (error: unknown, context: string = "General") => {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
  
    console.error(`[Error - ${context}]:`, errorMessage);
  
    // Extend this to send logs to an external service
    // Example:
    // axios.post('https://your-logging-service.com/logs', {
    //   context,
    //   error: errorMessage,
    //   timestamp: new Date().toISOString(),
    // });
  };