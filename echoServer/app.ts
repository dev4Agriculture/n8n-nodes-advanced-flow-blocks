import express, { Request, Response } from 'express';
// Create a new express application instance
const app: express.Application = express();

// Use JSON parser for all non-file uploads
app.use(express.json());

let server: any; // Variable to hold server instance

// Echo the request and shutdown the server
app.all('*', (req: Request, res: Response) => {
  const echo = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  };

  res.json(echo);

  // Close the server after sending the response
  server.close(() => {
    console.log('Server has been shut down.');
  });
});

// Start the server
const PORT = 5999;
server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
