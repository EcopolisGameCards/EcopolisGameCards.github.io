// --- Game Settings (UPDATE HERE!) ---
const CELKOVY_POCET_KARET = 192; 
const ADRESA_KARTY_PRED = './karty/card ('; 
const ADRESA_KARTY_ZA = ').png'; 
// ------------------------------------------

let dostupneKarty = [];
const elKarta = document.getElementById('vybrana-karta');
const elPlaceholder = document.getElementById('placeholder');
const elPocet = document.getElementById('zbyvajici-pocet');


// 1. Function to initialize (fill the deck)
function naplnitBalicek() {
    dostupneKarty = [];
    for (let i = 1; i <= CELKOVY_POCET_KARET; i++) {
        dostupneKarty.push(i); 
    }
    // Shuffle algorithm
    for (let i = dostupneKarty.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dostupneKarty[i], dostupneKarty[j]] = [dostupneKarty[j], dostupneKarty[i]];
    }
    console.log("The deck has been shuffled. Cards remaining:", dostupneKarty.length);
    aktualizovatPocet();
}

// 2. Function to draw a card
function tahnoutKarty() {
    if (dostupneKarty.length === 0) {
        // ALERT TEXT TRANSLATED
        alert("The deck is empty! Click 'Shuffle Deck (Reset)'."); 
        return;
    }

    const cisloKarty = dostupneKarty.shift(); 
    const kartaPath = ADRESA_KARTY_PRED + cisloKarty + ADRESA_KARTY_ZA;
    const kartaURL = encodeURI(kartaPath);

    elKarta.src = kartaURL;
    elKarta.style.display = 'block';
    elPlaceholder.style.display = 'none';
    
    aktualizovatPocet();
}

// 3. Function to reset (Shuffle Deck button)
function zamichatBalicek() {
    naplnitBalicek(); 
    elKarta.style.display = 'none'; 
    elKarta.src = '';
    elPlaceholder.style.display = 'block'; 
    // ALERT TEXT TRANSLATED
    alert("The deck has been shuffled and is ready!"); 
}

// 4. Update remaining card count
function aktualizovatPocet() {
    elPocet.textContent = dostupneKarty.length;
}


// Runs on page load
naplnitBalicek();