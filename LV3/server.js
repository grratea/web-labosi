const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// ejs kao engine za predloske
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); // "posluzuje" index.html
// Automatski koristi sve iz mape public

// POCETNA STRANICA
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// PATH ZA STATISTIKU
app.get('/grafikon', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'grafikon.html'));
});

// PATH ZA GALERIJU
app.get('/slike', (req, res) => {
    const folderPath = path.join(__dirname, 'public', 'images');

    const files = fs.readdirSync(folderPath);

    const images = files
        .filter(file => /\.(jpg|jpeg|png|svg|webp)$/i.test(file))
        .map((file, index) => ({
            url: `/images/${file}`,
            id: `slika${index + 1}`,
            title: `Scena ${index + 1}`
        }));

    res.render('slike', { images });
});

app.listen(3000, () => {
    console.log('Server pokrenut na http://localhost:3000');
});

