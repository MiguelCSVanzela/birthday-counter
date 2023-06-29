AOS.init();
const counterLabel = document.getElementById("niverResult");

const hero = document.querySelector(".hero");
const GuestDateNiver = document.querySelector("#dateGuest");
const GuestHourNiver = document.querySelector("#hourGuest");
const guestResult = document.querySelector("#guestResult");
const button = document.querySelector("#submit");


let birthDateNiver = new Date("Nov 22, 2023 21:00:00");
let timesStampBirth = birthDateNiver.getTime();
const actualDate = new Date();
const timeStampDate = actualDate.getTime();
const Year = actualDate.getFullYear();
const Month = actualDate.getMonth();

function calculateTimeDistance(timeDistanceValue) {
    const dayMs = 1000 * 60 * 60 * 24;
    const hourMs = 1000 * 60 * 60;
    const minuteMs = 1000 * 60;

    const daysForBirth = Math.floor((timeDistanceValue / dayMs));
    const hoursForBith = Math.floor(timeDistanceValue % dayMs / hourMs);
    const minutesForBirth = Math.floor(timeDistanceValue % hourMs / minuteMs)
    const secondsForBirth = Math.floor(timeDistanceValue % minuteMs / 1000);

    return { daysForBirth, hoursForBith, minutesForBirth, secondsForBirth };
}



const birthdayCounter = setInterval(function () {
    const actualDate = new Date();
    const timeStampDate = actualDate.getTime();
    const timeDistance = timesStampBirth - timeStampDate;

    let { daysForBirth, hoursForBith, minutesForBirth, secondsForBirth } = calculateTimeDistance(timeDistance);

    counterLabel.innerHTML = `${daysForBirth} Dias, ${hoursForBith} Horas, ${minutesForBirth} Minutos e ${secondsForBirth} Segundos`;

    if (timeDistance < 0) {
        clearInterval(birthdayCounter);
        counterLabel.innerHTML = `Infelizmente meu aniversário já passou este ano, agora restam ${-(daysForBirth)} dias para a próxima festa`;
    }
}, 1000);







button.onclick = function () {

    const date = GuestDateNiver.value.split("/");
    const hour = GuestHourNiver.value.split(":");

    let dateOk = Number.parseInt((date.toString()).replaceAll(",", ""));
    let hourOk = Number.parseInt((hour.toString()).replaceAll(",", ""));

    const dateFormated = `${Year}-${date[1]}-${date[0]}T${hour[0]}:${hour[1]}:00Z`;
    const niverGuest = new Date(dateFormated);
    const timeStampGuest = niverGuest.getTime();

    const timeDistanceGuest = timeStampGuest - timeStampDate;

    const dateTest = new Date(`${date[2]}-${date[1]}-${date[0]}T${hour[0]}:${hour[1]}:00Z`);
    const timeStampTest = dateTest.getTime();
    const timeDistanceTest = timeStampDate - timeStampTest;

    let { daysForBirth, hoursForBith, minutesForBirth } = calculateTimeDistance(timeDistanceGuest);
    const birthYear = Number.parseInt(String(date[2]).slice(2));
    const lastDigitsYear = Number.parseInt(String(Year).slice(2));
    const age = (lastDigitsYear - birthYear);

    if (timeDistanceTest > 0) {
        if (GuestDateNiver.value.length === 0) {
            guestResult.innerHTML = `Preencha o campo de Data`;
        } else if (GuestHourNiver.value.length === 0) {
            guestResult.innerHTML = "Preencha o campo de Horas";
        } else {
            guestResult.innerHTML = `Restam ${daysForBirth} Dias, ${hoursForBith} Horas e ${minutesForBirth} Minutos P/ seu Niver de ${age} Anos`;
            hero.classList.add('hero--guest-img');
            GuestDateNiver.value = "";
            GuestHourNiver.value = "";
        }
    }

    else if (parseInt(date[2]) > Year) {
        guestResult.innerHTML = "Tu! Não nasceu ainda para comemorar";
    }


    else if (parseInt(date[1]) < (Month + 1)) {
        guestResult.innerHTML = `Infelizmente meu aniversário já passou este ano, agora restam ${-(daysForBirth)} dias para a próxima festa`;
    }

    else if (typeof dateOk != "number" || typeof hourOk != "number") {
        guestResult.innerHTML = `É preciso que contenha apenas números no formato correto`;
    }

    else {
        guestResult.innerHTML = `Um dos formatos não correspondem ao esperado`;
    }


}