let room = null;
let playerId = "player" + Math.floor(Math.random()*100000);

const COLORS = ["black","yellow","red","green","blue"];
let selectedDecks = [];
let selectedBan = null;

function joinRoom() {
    const code = document.getElementById("roomCode").value;
    room = code;

    const ref = db.ref("rooms/" + room);

    ref.once("value", snap => {
        if (!snap.exists()) {
            ref.set({
                players: {},
                deckSelections: {},
                bans: {}
            });
        }

        ref.child("players/" + playerId).set(true);

        document.getElementById("join-screen").classList.add("hidden");
        loadDeckSelection();
    });
}

function loadDeckSelection() {
    document.getElementById("deck-screen").classList.remove("hidden");

    const list = document.getElementById("color-list");
    list.innerHTML = "";

    COLORS.forEach(color => {
        const div = document.createElement("div");
        div.textContent = color;
        div.classList.add("color-option");
        div.onclick = () => toggleDeck(color, div);
        list.appendChild(div);
    });
}

function toggleDeck(color, div) {
    if (selectedDecks.includes(color)) {
        selectedDecks = selectedDecks.filter(c => c !== color);
        div.classList.remove("selected");
    } else if (selectedDecks.length < 3) {
        selectedDecks.push(color);
        div.classList.add("selected");
    }
}

function lockDecks() {
    if (selectedDecks.length !== 3) {
        alert("Pick exactly 3 decks!");
        return;
    }

    db.ref(`rooms/${room}/deckSelections/${playerId}`).set(selectedDecks);

    listenForDeckPhase();
}

function listenForDeckPhase() {
    db.ref(`rooms/${room}/deckSelections`).on("value", snap => {
        const val = snap.val();
        if (val && Object.keys(val).length === 2) {
            startBanPhase(val);
        }
    });
}

function startBanPhase(allDecks) {
    document.getElementById("deck-screen").classList.add("hidden");
    document.getElementById("ban-screen").classList.remove("hidden");

    const opponentId = Object.keys(allDecks).find(id => id !== playerId);
    const opponentDecks = allDecks[opponentId];

    const list = document.getElementById("ban-list");
    list.innerHTML = "";

    opponentDecks.forEach(color => {
        const div = document.createElement("div");
        div.textContent = color;
        div.classList.add("color-option");
        div.onclick = () => {
            selectedBan = color;
            document.querySelectorAll("#ban-list .selected").forEach(el => el.classList.remove("selected"));
            div.classList.add("selected");
        };
        list.appendChild(div);
    });
}

function lockBan() {
    if (!selectedBan) {
        alert("Select a ban!");
        return;
    }

    db.ref(`rooms/${room}/bans/${playerId}`).set(selectedBan);

    listenForBanReveal();
}

function listenForBanReveal() {
    db.ref(`rooms/${room}/bans`).on("value", snap => {
        const bans = snap.val();
        if (bans && Object.keys(bans).length === 2) {
            revealBans(bans);
        }
    });
}

function revealBans(bans) {
    document.getElementById("ban-screen").classList.add("hidden");
    document.getElementById("results").classList.remove("hidden");

    document.getElementById("banResults").textContent =
        `Player 1 banned: ${Object.values(bans)[0]}
         | Player 2 banned: ${Object.values(bans)[1]}`;
}
