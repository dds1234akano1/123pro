const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Handle incoming requests
const server = http.createServer((req, res) => {
    // Get the target URL from the request
    const targetUrl = req.url.slice(1); // Remove leading slash

    // Check if URL is valid
    if (!targetUrl) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid URL.');
        return;
    }

    console.log(`Proxying request to: ${targetUrl}`);

    // Proxy the request to the target URL
    proxy.web(req, res, { target: targetUrl }, (err) => {
        // Error handling
        res.writeHead(502, { 'Content-Type': 'text/plain' });
        res.end('Error occurred while trying to proxy request.');
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
});
