const http = require('http');
const fs = require('fs');
var readline = require('readline');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    const fileContent = fs.readFileSync('usernames.txt', 'utf8').toString();
    const usernames = fileContent.split('\n');

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body>');
        res.write('<h1>Welcome fellow users!</h1><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create!</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    } else if (url === '/users') {
        let usernameList = '';
        usernames.forEach(username => {
            usernameList += `<li>${username}</li>`
        });
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body>');
        res.write('<h1>And the users are...!</h1>');
        res.write(`<ul>${usernameList}</ul>`);
        res.write('</body>');
        res.write('</html>');
        return res.end();
    } else if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            fs.appendFile('message.txt', `\n${username}`, (err) => {
                res.writeHead(302, {'Location': '/'});
                return res.end();
            });
        })
    }
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<html>');
    // res.write('<head><title>Node.js!</title></head>');
    // res.write('<body><h1>Hello From Node.js!</h1></body>');
    // res.write('</html>');
    // res.end();
});

server.listen(3001);