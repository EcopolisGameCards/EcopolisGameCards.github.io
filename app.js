// --- Nastavení Hry (ZMĚŇTE JEN ZDE!) ---
const CELKOVY_POCET_KARET = 192; // Aktualizováno na 192
// Základní adresa ve složce 'karty'. 
// Všimněte si, že se končí na 'card (' a ne na číslo!
const ADRESA_KARTY_PRED = './karty/card ('; 
const ADRESA_KARTY_ZA = ').png'; 
// ------------------------------------------

let dostupneKarty = [];
const elKarta = document.getElementById('vybrana-karta');
const elPlaceholder = document.getElementById('placeholder');
const elPocet = document.getElementById('zbyvajici-pocet');


// 1. Funkce pro inicializaci (naplnění balíčku)
function naplnitBalicek() {
    dostupneKarty = [];
    for (let i = 1; i <= CELKOVY_POCET_KARET; i++) {
        dostupneKarty.push(i); // Vložíme čísla 1 až 192 do pole
    }
    // Míchání balíčku (Fisher-Yates algoritmus pro dobrou náhodu)
    for (let i = dostupneKarty.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dostupneKarty[i], dostupneKarty[j]] = [dostupneKarty[j], dostupneKarty[i]];
    }
    console.log("Balíček byl promíchán. Karty v balíčku:", dostupneKarty.length);
    aktualizovatPocet();
}

// 2. Funkce pro tahání karty
function tahnoutKarty() {
    if (dostupneKarty.length === 0) {
        alert("Balíček je prázdný! Klikněte na 'Zamíchat balíček'.");
        return;
    }

    // Vezmeme PRVNÍ kartu z promíchaného pole
    const cisloKarty = dostupneKarty.shift(); 
    
    // Sestavíme URL adresu obrázku s použitím URL kódování pro mezeru a závorky
    // Např.: ./karty/card%20(1).png
    const kartaPath = ADRESA_KARTY_PRED + cisloKarty + ADRESA_KARTY_ZA;

    // Funkce encodeURI() zajistí správné zakódování URL adresy
    const kartaURL = encodeURI(kartaPath);

    // Zobrazíme kartu
    elKarta.src = kartaURL;
    elKarta.style.display = 'block';
    elPlaceholder.style.display = 'none';
    
    aktualizovatPocet();
}

// 3. Funkce pro resetování (tlačítko "Zamíchat balíček")
function zamichatBalicek() {
    naplnitBalicek(); // Znovu naplní a zamíchá
    elKarta.style.display = 'none'; // Skryje obrázek karty
    elKarta.src = '';
    elPlaceholder.style.display = 'block'; // Zobrazí placeholder
    alert("Balíček byl promíchán a je připraven!");
}

// 4. Aktualizace zbývajícího počtu karet
function aktualizovatPocet() {
    elPocet.textContent = dostupneKarty.length;
}


// Spustí se při načtení stránky
naplnitBalicek();