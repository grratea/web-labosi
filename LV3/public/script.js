// let sviFilmovi = []; // Globalna varijabla za sve podatke

// document.addEventListener("DOMContentLoaded", () => {
//     ucitajPodatke();
//     postaviEventListenere();
// });

// function ucitajPodatke() {
//     fetch('movies.csv')
//         .then(res => res.text())
//         .then(csv => {
//             const rezultat = Papa.parse(csv, {
//                 header: true,
//                 skipEmptyLines: true
//             });

//             // Mapiranje podataka iz CSV-a u objekte
//             sviFilmovi = rezultat.data.map(film => ({
//                 naslov: film.Naslov,
//                 zanr: film.Zanr,
//                 godina: parseInt(film.Godina),
//                 trajanje: film.Trajanje_min,
//                 ocjena: parseFloat(film.Ocjena)
//             }));

//             // Inicijalni prikaz svih filmova
//             prikaziTablicu(sviFilmovi);
//         });
// }

// function postaviEventListenere() {
//     // Ažuriranje prikaza vrijednosti slidera dok se pomiče
//     const slider = document.getElementById('filter-rating');
//     const display = document.getElementById('rating-value');
//     slider.addEventListener('input', () => {
//         display.textContent = slider.value;
//     });

//     // Gumb za filtriranje
//     document.getElementById('btn-filtriraj').addEventListener('click', filtrirajPodatke);
// }

// function filtrirajPodatke() {
//     // Dohvaćanje vrijednosti iz elemenata
//     const unosNaslov = document.getElementById('filter-title').value.toLowerCase();
//     const minOcjena = parseFloat(document.getElementById('filter-rating').value);
//     const odabranaEra = document.querySelector('input[name="era"]:checked').value;

//     const filtrirani = sviFilmovi.filter(film => {
//         // 1. Filter po naslovu
//         const naslovMatch = film.naslov.toLowerCase().includes(unosNaslov);
        
//         // 2. Filter po ocjeni
//         const ocjenaMatch = film.ocjena >= minOcjena;
        
//         // 3. Filter po eri (Radio gumbi)
//         let eraMatch = true;
//         if (odabranaEra === 'classic') eraMatch = film.godina < 1980;
//         else if (odabranaEra === 'modern') eraMatch = film.godina >= 1980;

//         return naslovMatch && ocjenaMatch && eraMatch;
//     });

//     prikaziTablicu(filtrirani);
// }

// function prikaziTablicu(podaci) {
//     const tbody = document.getElementById('movies-body');
//     tbody.innerHTML = '';

//     if (podaci.length === 0) {
//         tbody.innerHTML = '<tr><td colspan="5">Nema rezultata za odabrane filtre.</td></tr>';
//         return;
//     }

//     podaci.forEach(film => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${film.naslov}</td>
//             <td>${film.zanr}</td>
//             <td>${film.godina}</td>
//             <td>${film.trajanje} min</td>
//             <td style="font-weight: bold; color: #ffd700;">${film.ocjena}</td>
//         `;
//         tbody.appendChild(row);
//     });
// }


let kosarica = []; // Globalni niz za pohranu odabranih filmova

document.addEventListener("DOMContentLoaded", () => {
    ucitajPodatke();
    postaviEventListenere();
});

function ucitajPodatke() {
    fetch('movies.csv')
        .then(res => res.text())
        .then(csv => {
            const rezultat = Papa.parse(csv, {
                header: true,
                skipEmptyLines: true
            });

            // Mapiranje podataka iz CSV-a u objekte
            sviFilmovi = rezultat.data.map(film => ({
                naslov: film.Naslov,
                zanr: film.Zanr,
                godina: parseInt(film.Godina),
                trajanje: film.Trajanje_min,
                ocjena: parseFloat(film.Ocjena)
            }));

            // Inicijalni prikaz svih filmova
            prikaziTablicu(sviFilmovi);
        });
}

function postaviEventListenere() {
    // Ažuriranje prikaza vrijednosti slidera dok se pomiče
    const slider = document.getElementById('filter-rating');
    const display = document.getElementById('rating-value');
    slider.addEventListener('input', () => {
        display.textContent = slider.value;
    });

    // Gumb za filtriranje
    document.getElementById('btn-filtriraj').addEventListener('click', filtrirajPodatke);
}

function filtrirajPodatke() {
    // Dohvaćanje vrijednosti iz elemenata
    const unosNaslov = document.getElementById('filter-title').value.toLowerCase();
    const minOcjena = parseFloat(document.getElementById('filter-rating').value);
    const odabranaEra = document.querySelector('input[name="era"]:checked').value;

    const filtrirani = sviFilmovi.filter(film => {
        // 1. Filter po naslovu
        const naslovMatch = film.naslov.toLowerCase().includes(unosNaslov);
        
        // 2. Filter po ocjeni
        const ocjenaMatch = film.ocjena >= minOcjena;
        
        // 3. Filter po eri (Radio gumbi)
        let eraMatch = true;
        if (odabranaEra === 'classic') eraMatch = film.godina < 1980;
        else if (odabranaEra === 'modern') eraMatch = film.godina >= 1980;

        return naslovMatch && ocjenaMatch && eraMatch;
    });

    prikaziTablicu(filtrirani);
}

function prikaziTablicu(podaci) {
    const tbody = document.getElementById('movies-body');
    tbody.innerHTML = '';

    if (podaci.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Nema rezultata za odabrane filtre.</td></tr>';
        return;
    }

    podaci.forEach(film => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${film.naslov}</td>
            <td>${film.zanr}</td>
            <td>${film.godina}</td>
            <td>${film.trajanje} min</td>
            <td style="font-weight: bold; color: #ffd700;">${film.ocjena}</td>
        `;
        tbody.appendChild(row);
    });
}


// --- Postojeće funkcije (dohvat, filtriranje) ostaju, ali ažuriramo prikaziTablicu ---

function prikaziTablicu(podaci) {
    const tbody = document.getElementById('movies-body');
    tbody.innerHTML = '';

    if (podaci.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Nema rezultata.</td></tr>';
        return;
    }

    podaci.forEach(film => {
        const row = document.createElement('tr');
        
        // Generiramo sadržaj retka
        row.innerHTML = `
            <td>${film.naslov}</td>
            <td>${film.zanr}</td>
            <td>${film.godina}</td>
            <td>${film.trajanje} min</td>
            <td style="font-weight: bold; color: #ffd700;">${film.ocjena}</td>
            <td></td> 
        `;

        // Kreiramo gumb "Dodaj" ručno kako bismo mu dodali event listener
        const btnDodaj = document.createElement('button');
        btnDodaj.textContent = 'DODAJ';
        btnDodaj.className = 'btn-dodaj';
        btnDodaj.onclick = () => dodajUKosaricu(film);
        
        // Ubacujemo gumb u zadnju ćeliju (td)
        row.cells[5].appendChild(btnDodaj);
        tbody.appendChild(row);
    });
}

// --- Logika košarice ---

function dodajUKosaricu(film) {
    // Provjera je li film već dodan (koristimo naslov kao ključ)
    const postoji = kosarica.find(f => f.naslov === film.naslov);
    
    if (!postoji) {
        kosarica.push(film);
        osvjeziPrikazKosarice();
    } else {
        alert("Film '" + film.naslov + "' je već u košarici!");
    }
}

function ukloniIzKosarice(index) {
    kosarica.splice(index, 1);
    osvjeziPrikazKosarice();
}

function osvjeziPrikazKosarice() {
    const lista = document.getElementById('lista-kosarice');
    const brojac = document.getElementById('brojac-kosarice');
    
    lista.innerHTML = '';
    brojac.textContent = kosarica.length;

    kosarica.forEach((film, index) => {
        const li = document.createElement('li');
        li.className = 'kosarica-item';
        li.innerHTML = `
            <div>
                <strong>${film.naslov}</strong><br>
                <small>${film.godina} | ${film.zanr}</small>
            </div>
        `;

        const btnUkloni = document.createElement('button');
        btnUkloni.textContent = '✖';
        btnUkloni.className = 'btn-ukloni';
        btnUkloni.onclick = () => ukloniIzKosarice(index);

        li.appendChild(btnUkloni);
        lista.appendChild(li);
    });
}

// Potvrda posudbe
document.getElementById('potvrdi-kosaricu').addEventListener('click', () => {
    if (kosarica.length === 0) {
        alert("Vaša košarica je prazna!");
        return;
    }

    const poruka = `Uspješno ste posudili ${kosarica.length} filma za vikend maraton!`;
    alert(poruka);

    // Isprazni košaricu nakon potvrde
    kosarica = [];
    osvjeziPrikazKosarice();
});