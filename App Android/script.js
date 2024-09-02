let ricette = JSON.parse(localStorage.getItem('ricette')) || [
    {
        nome: "Spaghetti Aglio e Olio",
        ingredienti: "Spaghetti, aglio, olio d'oliva, peperoncino, sale, prezzemolo",
        procedimento: "Cuocere gli spaghetti. In una padella, scaldare l'olio e aggiungere l'aglio e il peperoncino. Saltare gli spaghetti con il condimento e servire con prezzemolo."
    },
    {
        nome: "Insalata Caprese",
        ingredienti: "Pomodori, mozzarella, basilico, olio d'oliva, sale, pepe",
        procedimento: "Affettare i pomodori e la mozzarella. Disporre le fette su un piatto, aggiungere basilico, olio d'oliva, sale e pepe."
    },
    {
        nome: "Omelette al Formaggio",
        ingredienti: "Uova, formaggio grattugiato, sale, pepe, burro",
        procedimento: "Sbattere le uova con sale e pepe. Versare in una padella con burro fuso, cuocere fino a quando si rapprende e aggiungere formaggio grattugiato. Ripiegare e servire."
    },
    {
        nome: "Bruschetta al Pomodoro",
        ingredienti: "Pane, pomodori, aglio, basilico, olio d'oliva, sale, pepe",
        procedimento: "Tostare il pane. Mescolare pomodori a cubetti con aglio tritato, basilico, olio d'oliva, sale e pepe. Spalmare il composto sul pane tostato."
    },
    {
        nome: "Riso al Limone",
        ingredienti: "Riso, succo di limone, brodo vegetale, burro, parmigiano",
        procedimento: "Cuocere il riso nel brodo vegetale. A fine cottura, aggiungere succo di limone, burro e parmigiano. Mescolare bene e servire."
    },
    {
        nome: "Pollo al Curry",
        ingredienti: "Petto di pollo, curry in polvere, cipolla, latte di cocco, olio, sale",
        procedimento: "Cuocere il pollo con cipolla e olio. Aggiungere curry e latte di cocco e cuocere fino a quando il pollo è cotto e il sugo si addensa."
    },
    {
        nome: "Frittata di Zucchine",
        ingredienti: "Uova, zucchine, cipolla, olio d'oliva, sale, pepe",
        procedimento: "Saltare le zucchine e cipolla in olio. Sbattere le uova con sale e pepe, aggiungere zucchine e cipolla e cuocere in padella fino a doratura."
    }
];

let container = document.querySelector('.container');
let formAggiungi = document.getElementById('formAggiungi');
let aggiungiBtn = document.getElementById('aggiungiRicetta');
let dettagliRicettaDiv = document.getElementById('dettagliRicetta');
let tornaIndietroBtn = document.getElementById('tornaIndietro');

// SALVA RICETTE NEL LOCALSTORGE
function salvaRicette() {
    localStorage.setItem('ricette', JSON.stringify(ricette));
}

// MOSTRA LE RICETTE
function generaRicette() {
    let ricetteElementi = document.querySelectorAll('.ricetta');
    ricetteElementi.forEach((el) => el.remove());

    ricette.forEach((ricetta, index) => {

        let ricettaDiv = document.createElement('div');
        ricettaDiv.classList.add('ricetta');

        let nomeRicettaDiv = document.createElement('div');
        nomeRicettaDiv.classList.add('nomeRicetta');
        nomeRicettaDiv.textContent = ricetta.nome;

        let eliminaBtn = document.createElement('button');
        eliminaBtn.classList.add('eliminaRicetta');
        eliminaBtn.textContent = 'X';
        eliminaBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevenire il trigger del click sulla ricetta
            eliminaRicetta(index);
        })


        ricettaDiv.appendChild(nomeRicettaDiv);
        ricettaDiv.appendChild(eliminaBtn);
        ricettaDiv.addEventListener('click', () => mostraDettagliRicetta(ricetta));

        container.insertBefore(ricettaDiv, aggiungiBtn);
    });
}

// ELIMINA RICETTA
function eliminaRicetta(index) {
    ricette.splice(index, 1);
    salvaRicette();
    generaRicette();
}

// PULSANTE AGGIUNGI RICETTA
aggiungiBtn.addEventListener('click', () => {
    if (formAggiungi.style.display === 'none' || formAggiungi.style.display === '') {
        formAggiungi.style.display = 'block';
        aggiungiBtn.textContent = 'ANNULLA';
    } else {
        formAggiungi.style.display = 'none';
        aggiungiBtn.textContent = 'AGGIUNGI RICETTA';
    }
});

// INVIO MODULO NUOVA RICETTA
formAggiungi.addEventListener('submit', (e) => {
    e.preventDefault();

    let nome = document.getElementById('nomeRicetta').value;
    let ingredienti = document.getElementById('ingredienti').value;
    let procedimento = document.getElementById('procedimento').value;

    ricette.push({ nome, ingredienti, procedimento });
    salvaRicette();
    generaRicette();

    formAggiungi.reset();
    formAggiungi.style.display = 'none';
    aggiungiBtn.textContent = 'AGGIUNGI RICETTA';
});

// DETTAGLI RICETTA
function mostraDettagliRicetta(ricetta) {

    document.querySelectorAll('.ricetta').forEach(el => el.style.display = 'none');
    aggiungiBtn.style.display = 'none';
    formAggiungi.style.display = 'none';

    dettagliRicettaDiv.innerHTML = `
        <h2 style="color:rgb(182, 157, 110)" >${ricetta.nome}</h2>
        <p><strong style="color:rgb(160, 141, 114)" >INGREDIENTI:</strong> ${ricetta.ingredienti}</p>
        <p><strong style="color:rgb(160, 141, 114)" >PROCEDIMENTO:</strong> ${ricetta.procedimento}</p>
    `;

    dettagliRicettaDiv.style.display = 'block';
    tornaIndietroBtn.style.display = 'block';
}

// TORNARE ALLA HOME
tornaIndietroBtn.addEventListener('click', () => {

    document.querySelectorAll('.ricetta').forEach(el => el.style.display = 'flex');
    aggiungiBtn.style.display = 'block';
    dettagliRicettaDiv.style.display = 'none';
    tornaIndietroBtn.style.display = 'none';
});

generaRicette();