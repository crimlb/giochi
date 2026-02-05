var carta = "carta";
var sasso = "sasso";
var forbice = "forbice";
var risultato;
var punteggioUtente = 0
var punteggioPc = 0
var setTuo = 0
var setPc = 0
var sottofondo = new Audio("suoni/sottofondoGioco.mp3");
sottofondo.volume = 0.2;
sottofondo.loop = true;

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});


var clickSquillante = new Audio("suoni/clickSquillante.mp3");
clickSquillante.volume = 0.4;
var pareggio = new Audio("suoni/pareggio.mp3");
pareggio.volume = 0.4;
var fail = new Audio("suoni/fail.mp3");
fail.volume = 0.4;
var fanfareVittoria = new Audio("suoni/fanfareVittoria.mp3");
fanfareVittoria.volume = 0.4;
var resetV = new Audio("suoni/reset.wav");
resetV.volume = 0.4;
var perditaSet = new Audio("suoni/perditaSet.wav");
perditaSet.volume = 0.8;
var vittoriaSet = new Audio("suoni/vittoriaSet.mp3");
vittoriaSet.volume = 0.8;
var musicaAttiva = true;

function bloccaTasti() {
    var arrTuttiButton = document.querySelectorAll("button");
    for (let i = 0; i < arrTuttiButton.length; i++) {
        arrTuttiButton[i].disabled = true
    }
}

function sbloccaTasti() {
    var arrTuttiButton = document.querySelectorAll("button");
    for (let i = 0; i < arrTuttiButton.length; i++) {
        arrTuttiButton[i].disabled = false
    }
}


document.addEventListener("click", function primoClick() {
    musicaOnOff()
    document.removeEventListener("click", primoClick);
});


function musicaOnOff() {
    if (musicaAttiva) {
        clickSquillante.volume = 0;
        pareggio.volume = 0;
        fail.volume = 0;
        fanfareVittoria.volume = 0;
        resetV.volume = 0;
        perditaSet.volume = 0;
        vittoriaSet.volume = 0;
        sottofondo.pause();
        document.getElementById("toggleMusic").textContent = "🔇";
        musicaAttiva = false;
    } else {
        sottofondo.play();
        document.getElementById("toggleMusic").textContent = "🔊";
        musicaAttiva = true;
        clickSquillante.volume = 0.4;
        pareggio.volume = 0.4;
        fail.volume = 0.4;
        fanfareVittoria.volume = 0.4;
        resetV.volume = 0.4;
        perditaSet.volume = 0.8;
        vittoriaSet.volume = 0.8;
    }
}


function scelta(sceltaUtente) {
    bloccaTasti()
    clickSquillante.play()
    var sceltaPc = Math.floor(Math.random() * 3 + 1);
    sceltaPc = sceltaPc == 1 ? "carta"
        : sceltaPc == 2 ? "sasso"
            : "forbice";

    document.getElementById("imgUtente").src = `immagini/${sceltaUtente}.jpg`;
    document.getElementById("imgPc").src = `immagini/${sceltaPc}.jpg`;
    document.getElementById("imgUtente").classList.add("immagini1")
    document.getElementById("imgPc").classList.add("immagini2")


    document.getElementById("imgUtente").style.display = "block";
    document.getElementById("imgPc").style.display = "block";


    if (sceltaUtente == sceltaPc) {
        pareggio.play()
        risultato = "Pareggio!"
        document.getElementById("popup-content").style.backgroundColor = "#fffdfdff";
        document.getElementById("popup-content").style.border = "3px solid #070707ff";
    } else if (sceltaUtente == "carta" && sceltaPc == "forbice") {


        document.getElementById("popup-content").style.backgroundColor = "#feda85ff";
        document.getElementById("popup-content").style.border = "3px solid #050505ff";
        risultato = "Peccato, hai perso!";
        fail.play()
        punteggioPc++
    } else if (sceltaUtente == "forbice" && sceltaPc == "carta") {

        document.getElementById("popup-content").style.backgroundColor = "#feda85ff";
        document.getElementById("popup-content").style.border = "3px solid #0b0b0bff";
        risultato = "Complimenti, hai vinto!";
        fanfareVittoria.play()
        punteggioUtente++
    } else if (sceltaUtente == "carta" && sceltaPc == "sasso") {

        document.getElementById("popup-content").style.backgroundColor = "#fb9292ff";
        document.getElementById("popup-content").style.border = "3px solid #080808ff";
        risultato = "Complimenti,hai vinto!";
        fanfareVittoria.play()
        punteggioUtente++
    } else if (sceltaUtente == "sasso" && sceltaPc == "carta") {

        document.getElementById("popup-content").style.backgroundColor = "#fb9292ff";
        document.getElementById("popup-content").style.border = "3px solid #080808ff";
        risultato = "Peccato, hai perso!";
        fail.play()
        punteggioPc++
    } else if (sceltaUtente == "forbice" && sceltaPc == "sasso") {
        document.getElementById("popup-content").style.backgroundColor = "#6dceefff";
        document.getElementById("popup-content").style.border = "3px solid #040404ff";
        risultato = "Peccato, hai perso!";
        fail.play()
        punteggioPc++
    } else {
        document.getElementById("popup-content").style.backgroundColor = "#6dceefff";
        document.getElementById("popup-content").style.border = "3px solid #090909ff";
        risultato = "Complimenti, hai vinto!";
        fanfareVittoria.play()
        punteggioUtente++
    }

    setTimeout(() => {
        document.getElementById("risultatoTuo").innerText = punteggioUtente;
        document.getElementById("risultatoPc").innerText = punteggioPc;
    }, 2000);

    if (punteggioUtente == 5 || punteggioPc == 5) {
        var testo = punteggioUtente > punteggioPc
            ? "vignettaVittoria"
            : "vignettaPerdita1";
        mostraVincitore(testo);

        setTimeout(() => {
            punteggioUtente > punteggioPc ? setTuo++ : setPc++;
            document.getElementById("set1").innerText = setTuo;
            document.getElementById("set2").innerText = setPc;
            if (setTuo != 5 && setPc != 5) sbloccaTasti()
            reset();
            if (setTuo == 5 || setPc == 5) {
                var finaleVinta = setTuo > setPc;
                var messaggioFinale = finaleVinta
                    ? "🏆🎉 COMPLIMENTI, TI SEI AGGIUDICATO IL SET!!! 🎊🥳"
                    : "😢💔 CHE SCONFITTA... RITENTA E SARÀ LA VOLTA BUONA! 💪";
                mostraPopupFinale(messaggioFinale, finaleVinta);
                setTimeout(() => {
                    setTuo = 0;
                    setPc = 0;
                    document.getElementById("set1").innerText = setTuo;
                    document.getElementById("set2").innerText = setPc;
                    sbloccaTasti()
                }, 3000);
            }
        }, 3000);
    } else {
        sceltaPc = sceltaPc.toUpperCase()
        setTimeout(() => {
            mostraPopup(`${risultato}`);
            document.getElementById("imgUtente").classList.remove("immagini1")
            document.getElementById("imgPc").classList.remove("immagini2")
            sbloccaTasti()
        }, 1000);
    }

}

function reset() {
    document.getElementById("risultatoTuo").innerText = 0;
    document.getElementById("risultatoPc").innerText = 0;
    punteggioUtente = 0
    punteggioPc = 0
    document.getElementById("imgUtente").src = ""
    document.getElementById("imgPc").src = ""
    document.getElementById("imgVincitore").src = ""
    document.getElementById("imgVincitore").style.display = "none";
    document.getElementById("imgUtente").style.display = "none";
    document.getElementById("imgPc").style.display = "none";
    document.getElementById("messaggio").innerText = ""
};

function resetTotale() {
    resetV.play();

    document.getElementById("risultatoTuo").innerText = 0;
    document.getElementById("risultatoPc").innerText = 0;
    punteggioUtente = 0
    punteggioPc = 0
    document.getElementById("imgUtente").src = ""
    document.getElementById("imgPc").src = ""
    document.getElementById("imgVincitore").src = ""
    document.getElementById("imgVincitore").style.display = "none";
    document.getElementById("imgUtente").style.display = "none";
    document.getElementById("imgPc").style.display = "none";
    document.getElementById("messaggio").innerText = ""
    setTuo = 0;
    setPc = 0;
    document.getElementById("set1").innerText = 0;
    document.getElementById("set2").innerText = 0;
}

function mostraPopup(testo) {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popupText");
    popupText.innerText = testo;
    popup.style.display = "flex";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}

function mostraVincitore(testo) {
    const popup = document.getElementById("popup");
    const imgVincitore = document.getElementById("imgVincitore");
    document.getElementById("popupText").innerText = ""
    document.getElementById("popup-content").style.background = "none"
    document.getElementById("popup-content").style.border = "none"
    document.getElementById("popup-content").style.animation = "none"
    document.getElementById("popup-content").style.boxShadow = "none"
    popup.style.display = "flex";
    imgVincitore.src = `immagini/${testo}.jpg`;
    imgVincitore.style.display = "block";
    var audioFile = "";
    if (testo === "vignettaVittoria") {
        audioFile = vittoriaSet;
    } else if (testo === "vignettaPerdita1") {
        audioFile = perditaSet;
    }
    if (audioFile) {
        setTimeout(() => {
            const audio = audioFile;
            audio.play().catch(() => { });
        }, 3000);
    }
    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}

function mostraPopupFinale(testo, vittoria) {
    const popup = document.getElementById("popupFinale");
    const popupContent = document.getElementById("popupFinale-content");
    const popupText = document.getElementById("popupFinaleText");
    popup.style.display = "flex";
    popupText.innerText = testo;
    popupText.style.fontSize = "2rem";
    popupText.style.fontWeight = "bold";
    popupText.style.textAlign = "center";
    popupText.style.padding = "20px";
    popupContent.style.background = vittoria
        ? "linear-gradient(135deg, #00ff88, #00c6ff, #fffb00)"
        : "linear-gradient(135deg, #ff6b6b, #ff9a9e, #ffb347)";
    popupContent.style.border = "4px solid black";
    popupContent.style.boxShadow = "0 0 25px rgba(0,0,0,0.4)";
    popupContent.style.animation = "pulse 1s infinite";


    setTimeout(() => {
        popup.style.display = "none";
        popupContent.style.animation = "none";
    }, 3000);
}


function indietro() {
    window.history.back();
}