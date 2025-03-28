const store = {
    cards: []
};
if (JSON.parse(sessionStorage.getItem('name'))) {
    const login = document.getElementById('login');
    login.innerHTML = `היי ${JSON.parse(sessionStorage.getItem('name'))} - מעבר לסל`;
}

$.ajax({
    url: './buyMe.json',
    success: (data) => {
        const { giftCards } = data;
        store.cards = giftCards;

        const searchParams = new URLSearchParams(location.search);
        const cardCode = searchParams.get('cardCode');
        const price = searchParams.get('price');
        const currentCard = findCurrentCode(store.cards, cardCode);

        setPay(currentCard, price);
    }
});

const findCurrentCode = (cards, codeText) => {

    for (let card of cards) {
        for (let shop of card.cardShopes) {
            if (shop.code === codeText) {
                return shop;
            }

        }
    }
    return null;

}

const setPay = (currentCard, price) => {


    const { image, name } = currentCard;
    const imagePay = document.getElementById('imagePay');
    imagePay.src = `./image/${image}`;

    const sumPay = document.getElementById('sumPay');
    const namePay = document.getElementById('namePay');

    sumPay.innerHTML = price;
    namePay.innerHTML = name;
}

//----------פונקציה לשינוי הסכום--------------
function changeSumFunc() {
    const pricePay = document.getElementById('pricePay');
    const selectPay = document.getElementById('selectPay');
    const changeSumLink = document.getElementById('changeSumLink');
    const sumPay = document.getElementById('sumPay');
    const total = document.getElementById('total');

    pricePay.style.display = 'block';
    selectPay.style.display = 'block';
    changeSumLink.style.display = 'none';

    selectPay.addEventListener('click', function () {
        pricePay.style.display = 'none';
        selectPay.style.display = 'none';
        changeSumLink.style.display = 'block';
        sumPay.innerHTML = pricePay.value;
        total.innerHTML = pricePay.value;
    })


}
//---------------- steps מעבר בין -----------------------------
const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');
const circle3 = document.getElementById('circle3');
const continueStep1 = document.getElementById('continueStep1');
const continueStep2 = document.getElementById('continueStep2');
const continueStep3 = document.getElementById('continueStep3');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const modal = document.getElementById('modal');

continueStep1.addEventListener('click', function () {
    step1.style.display = 'none';
    step2.style.display = 'block';
    circle2.style.color = 'white';
    circle2.style.backgroundColor = '#ffa126';
});
continueStep2.addEventListener('click', function () {
    if (JSON.parse(sessionStorage.getItem('name'))) {
        step2.style.display = 'none';
        step3.style.display = 'block';
        circle3.style.color = 'white';
        circle3.style.backgroundColor = '#ffa126';
    }
    else {
        modal.style.display = 'block';
    }
});
const endPay = document.getElementById('endPay');

//---------------step 2----------------
const date2 = document.getElementById('date2');
const time2 = document.getElementById('time2');
const now = document.getElementById('now');
const latter = document.getElementById('latter');
const insteadGreenWsp = document.getElementById('insteadGreenWsp');
const greenWsp = document.getElementById('greenWsp');
latter.addEventListener('click', function () {
    date2.style.display = 'block';
    time2.style.display = 'block';
    greenWsp.style.display = 'none';
    insteadGreenWsp.style.display = 'block';
})
now.addEventListener('click', function () {
    date2.style.display = 'none';
    time2.style.display = 'none';
    greenWsp.style.display = 'block';
    insteadGreenWsp.style.display = 'none';
})

const buttonSms = document.getElementById('button-sms');
const buttonEmail = document.getElementById('button-email');
const buttonPrint = document.getElementById('button-print');

const inputSms = document.getElementById('input-sms');
const inputEmail2 = document.getElementById('input-email');
const nonePrint = document.getElementById('nonePrint');

const btnx1 = document.getElementById('btnx1');
const btnx2 = document.getElementById('btnx2');
const btnx3 = document.getElementById('btnx3');

buttonSms.addEventListener('click', function () {
    inputSms.style.display = 'block';
    btnx1.style.display = 'block'
});
buttonEmail.addEventListener('click', function () {
    inputEmail2.style.display = 'block';
    btnx2.style.display = 'block'
});
buttonPrint.addEventListener('click', function () {
    nonePrint.style.display = 'block';
    btnx3.style.display = 'block'
});
btnx1.addEventListener('click', function () {
    inputSms.style.display = 'none';
    btnx1.style.display = 'none'
});
btnx2.addEventListener('click', function () {
    inputEmail2.style.display = 'none';
    btnx2.style.display = 'none'
});
btnx3.addEventListener('click', function () {
    nonePrint.style.display = 'none';
    btnx3.style.display = 'none'
});

//----------------step 3----------------
const searchParams = new URLSearchParams(location.search);
const price = searchParams.get('price');
total.innerHTML = price;

//------------step 1---------------------------
//שינוי הברכה לפי הבחירה בSELECT

const messages = {
    "יום הולדת": `המון מזל טוב ליום ההולדת!שיהיה יום מדהים, מלא באושר ובחיוכים :)`,
    "מתנה לגננת לסוף השנה": "סוף שנה זאת הזדמנות טובה להגיד לך תודה רבה על כל ההשקעה, המסירות והאהבה ילדי והורי הגן",
    "מתנות סוף שנה": "סוף השנה זו הזדמנות להגיד לך תודה,על ההשקעה, ההתמדה והאכפתיות.שתהיה חופשה מהנה ❤",
    "לידה": `רצינו לקנות לכם שעות שינה אבל אי אפשר... אז מצאנו אלטרנטיבה שווה :)בשעה טובה! מלא אושר ובריאות :)`,
    "תודה": "תודה רבה על ההשקעה הגדולה! הנה מתנה קטנה במיוחד בשבילך",
    "כניסה לבית חדש": "מברוק נשמות! שהבית שלכם תמיד יהיה מלא אהבה, בירות במקרר ואנרגיה טובה",
    "מתנה למורה לסוף השנה": "סוף שנה זו הזדמנות טובה להגיד לך תודה- על ההשקעה, ההקשבה, הליווי והלמידה, אוהבים ומעריכים",
    "מילואים": "אין כמוך יא אלוף! תודה שבחרת לתת מעצמך כל כך הרבה. אין ספק שכל מי שפגש אותך בדרך זכה",
    "גיוס": `אם לא עכשיו אז מתי? צה"ל צריך אותך! גיוס קל, שמור על עצמך מחכים לך בבית`,
    "אירוסין": "אהובים שלנו, מזל טוב! מאושרים לשמוע שבקרוב אתם מתחתנים קבלו מתנת אירוסין קטנה, פרומו לחגיגות הגדול",
    "יום נישואין": "המון מזל טוב ליום הנישואין, לעוד הרבה שנים של אהבה ואושר תהנו מהמתנה!",
    "הפרשת חלה": "כמה אושר לחגוג איתך את טקס הפרשת החלה. הנה מתנה קטנה ממני מחכה לחגוג איתך בטירוף בחתונה!",
    "שחרור": "מזל טוב לרגל השחרור מהצבא זה הזמן לחגוג, ליהנות, לבלות ולהגשים חלומות",
    "חתונה": "מזל טוב והמון שנים של זוגיות מאושרת! תהנו מהמסע המשותף יחד :)",
    "פרידה": "עכשיו כשנפרדים זה הזמן שלנו לפנק אותך בחזרה מעריכים ואוהבים ♥",
    "חינה": "מתרגשים לחגוג את החיבור הקסום שהוא אתם פינקנו עם מתנה, אבל המתנה האמיתית היא שיש לכם אחד את השניה",
    "בר מצווה": "מזל טוב! ממש עכשיו מתחיל פרק חדש ומרגש בחייך! מאחלים לך שתתחיל אותו עם המון חלומות, שאיפות וחיוך",
    "בת מצווה": "מתנה מיוחדת לילדה מיוחדת שהיא כבר ממש לא ילדה! אוהבים אותך ומאחלים לך את כל האושר שבעולם",
    "החלמה מהירה": "אומרים שתרופת הסבתא הטובה ביותר בעולם היא מתנה. אז החלטתי לנסות! :)",
    "סתם כי בא לי לפנק": "סתם ככה בלי שום סיבה מיוחדת  התחשק לי לשלוח לך מתנה מפנקת באהבה ♥",
    "בהצלחה": "המון בהצלחה בהמשך הדרך! אוהבים ומעריכים",
    "מתנות לעובדים": "זה הזמן שלנו לפנק אותך שיהיה יום קסום מלא בהפתעות! ☺"
};
const reason = document.getElementById('reason');
const bracha = document.getElementById('bracha');

reason.addEventListener('change', function () {
    const selectValue = this.value;
    const message = messages[selectValue];
    bracha.value = message;
});

//--------------טופס step 1-------------------------
const payForm = document.getElementById('payForm');
const btnForOther = document.getElementById('btnForOther');
const btnForMe = document.getElementById('btnForMe');
const forOther = document.getElementById('forOther');
const forMe = document.getElementById('forMe');
const picturePay = document.getElementsByClassName('picturePay');

if (localStorage.getItem('selectedButton') === 'btnForMe') {
    btnForMe.style.backgroundColor = "#ffa126";
    btnForMe.style.color = "white";
    btnForOther.style.backgroundColor = "#f0f0f0";
    btnForOther.style.color = "rgb(52, 51, 51)";
    btnForMe.style.fontWeight = "bold";
    btnForOther.style.fontWeight = "normal";
    forOther.style.display = "none";
    forMe.style.display = 'block';
    picturePay.style.marginTop = '10%';
}

btnForMe.addEventListener('click', function () {
    btnForMe.style.backgroundColor = '#ffa126';
    btnForMe.style.color = 'white';
    btnForOther.style.backgroundColor = '#f0f0f0';
    btnForOther.style.color = 'rgb(52, 51, 51)';
    btnForMe.style.fontWeight = 'bold';
    btnForOther.style.fontWeight = 'normal';
    forOther.style.display = 'none';
    forMe.style.display = 'block';
    picturePay.style.marginTop = '10%';

    localStorage.setItem('selectedButton', 'btnForMe');
})

btnForOther.addEventListener('click', function () {
    btnForMe.style.backgroundColor = '';
    btnForMe.style.color = '';
    btnForOther.style.backgroundColor = '';
    btnForOther.style.color = '';
    btnForMe.style.fontWeight = '';
    btnForOther.style.fontWeight = '';
    forOther.style.display = '';
    forMe.style.display = '';
    picturePay.style.marginTop = '';

    localStorage.removeItem('selectedButton');
})


//הוספת סרטון או תמונה
document.getElementById('fileInputImage').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('previewImage').src = e.target.result;
                document.getElementById('imagePreview').style.display = 'block';
                document.getElementById('mediaPreview').style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('previewVideo').src = e.target.result;
                document.getElementById('mediaPreview').style.display = 'block';
                document.getElementById('imagePreview').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    }
});

document.getElementById('fileLabelVideo').addEventListener('click', function () {
    document.getElementById('videoModal').style.display = 'block';

    fetch('./buyMe.json')
        .then(response => response.json())
        .then(data => {
            const videoListModal = document.getElementById('videoListModal');
            videoListModal.innerHTML = '';
            data.videoes.forEach(video => {
                const div = document.createElement('div');
                div.classList.add('video-item');

                const videoElement = document.createElement('video');
                videoElement.src = `./media/${video}`;
                videoElement.controls = true;
                videoElement.width = 200;

                div.appendChild(videoElement);

                div.addEventListener('click', function () {
                    document.getElementById('previewVideo').src = `./media/${video}`;
                    document.getElementById('mediaPreview').style.display = 'block';
                    document.getElementById('videoModal').style.display = 'none';
                });

                videoListModal.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error loading video list:', error);
        });
});

document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('videoModal').style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === document.getElementById('videoModal')) {
        document.getElementById('videoModal').style.display = 'none';
    }
});

document.getElementById('removeImageBtn').addEventListener('click', function () {
    document.getElementById('fileInputImage').value = '';
    document.getElementById('imagePreview').style.display = 'none';
});

document.getElementById('removeVideoBtn').addEventListener('click', function () {
    document.getElementById('previewVideo').src = '';
    document.getElementById('mediaPreview').style.display = 'none';
});

//-------------------חלונית תשלום------------------
const btnCreditCard = document.getElementById('btnCreditCard');
const btnPayPal = document.getElementById('btnPayPal');
const modalPay = document.getElementById('modalPay');
const closePayForm = document.getElementById('closePayForm');
const addCard = document.getElementById('addCard');
let isCredit = false;
btnCreditCard.onclick = () => {
    modalPay.style.display = 'block';
}
btnPayPal.onclick = () => {
    modalPay.style.display = 'block';
}
closePayForm.onclick = () => {
    modalPay.style.display = 'none';
}
window.addEventListener('click', function (event) {
    if (event.target == modalPay) {
        modalPay.style.display = 'none';
    }
});
addCard.onclick = () => {
    modalPay.style.display = 'none';
    isCredit = true;
}
continueStep3.addEventListener('click', function () {
    if (isCredit) {
        endPay.style.display = 'block';
    }
    else {
        modalPay.style.display = 'block';
    }
})


//-------------------------חלונית כניסה-------------------------------------------------------
const openModalButton = document.getElementById('login');
const closeBtn = document.getElementsByClassName('close')[0];
const enterBtn = document.getElementById('enter');



openModalButton.addEventListener('click', function () {
    if (!(JSON.parse(sessionStorage.getItem('name')))) {
        modal.style.display = 'block';
    }
    else {
        setBag();
    }
});

closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});









//----------------------------------טופס כניסה------------------------------------------------

const enterForm = document.getElementById('enterForm');
const inputName = document.getElementById('userName');
const inputPass = document.getElementById('password');


const inputsToClear = document.querySelectorAll('input[name="userName"], input[name="email"], input[name="password"], input[name="phone"]');
let arrayOfUsers = JSON.parse(localStorage.getItem('myUsers')) || [];


enterForm.onsubmit = (e) => {
    e.preventDefault();

    const notValid = document.getElementById('notValid');
    notValid.style.display = 'none';

    const Name = e.target['userName'].value;
    const pass = e.target['password'].value;
    sessionStorage.setItem('name', JSON.stringify(Name));
    sessionStorage.setItem('pass', JSON.stringify(pass));

    let foundObject = arrayOfUsers.find(obj => obj.userName === e.target['userName'].value);


    if (foundObject) {
        if (foundObject.password === pass) {
            modal.style.display = 'none';
            openModalButton.innerHTML = `היי ${JSON.parse(sessionStorage.getItem('name'))} - מעבר לסל`;
            inputName.value = '';
            inputPass.value = '';
        }
        else {
            notValid.style.display = 'block';
        }
    } else {

        //--------------------------------חלונית הרשמה----------------------------------
        const modalReg = document.getElementById('modalReg');
        const closeBtnReg = document.getElementsByClassName('closeReg')[0];

        modalReg.style.display = 'block';

        closeBtnReg.addEventListener('click', function () {
            modalReg.style.display = 'none';
        });


        window.addEventListener('click', function (event) {
            if (event.target == modalReg) {
                modalReg.style.display = 'none';
            }
        });



        modal.style.display = 'none';
        inputName.value = '';
        inputPass.value = '';
    }



}

const formRegister = document.getElementById('registerForm');
const inputEmail = document.getElementById('emailReg');
const inputPhone = document.getElementById('phoneReg');
formRegister.onsubmit = (e) => {
    e.preventDefault();

    const newUser = {
        userName: JSON.parse(sessionStorage.getItem('name')),
        email: e.target['email'].value,
        password: JSON.parse(sessionStorage.getItem('pass')),
        phone: e.target['phone'].value,
        bag: []
    };

    openModalButton.innerHTML = `היי ${JSON.parse(sessionStorage.getItem('name'))} - מעבר לסל`;


    arrayOfUsers.push(newUser);
    localStorage.setItem('myUsers', JSON.stringify(arrayOfUsers));
    modalReg.style.display = 'none';
    inputEmail.value = '';
    inputPhone.value = '';

}
//-------יציאה-------------
const exit = document.getElementById('exit');
exit.onclick = () => {
    sessionStorage.removeItem('name');
    openModalButton.innerHTML = 'כניסה / הרשמה';
}

//חלונית סל

const myBag = document.getElementById('myBag');

const setBag = () => {
    myBag.innerHTML = '';
    const currentName = JSON.parse(sessionStorage.getItem('name'));
    let arrUsers = JSON.parse(localStorage.getItem('myUsers'));
    const currentUser = arrUsers.find((user) => user.userName === currentName);
    let currentBug = currentUser.bag;
    myBag.style.display = 'block';

    const btnCloseBag = document.createElement('button');
    btnCloseBag.type = 'button';
    btnCloseBag.id = 'btnCloseBag';
    btnCloseBag.innerHTML = ' ✕ הסל שלי ';
    myBag.append(btnCloseBag);

    if (currentBug.length === 0) {
        const emptyBag = document.createElement('img');
        emptyBag.src = "./image/emptyGift.svg";
        emptyBag.id = 'emptyBag';
        myBag.append(emptyBag);
    } else {
        currentBug.forEach((b) => {
            const imgCard = document.createElement('img');
            imgCard.src = `./image/${b.image}`;
            const btnPassToPay = document.createElement('button');
            const btnRemoveCard = document.createElement('button');
            btnPassToPay.type = 'button';
            btnRemoveCard.type = 'button';
            btnPassToPay.innerHTML = 'לתשלום';
            btnRemoveCard.innerHTML = 'להסרה';
            btnPassToPay.className = 'btnPassToPay';
            btnRemoveCard.className = 'btnRemoveCard';

            const divAllCard = document.createElement('div');
            divAllCard.append(imgCard, btnPassToPay, btnRemoveCard);
            divAllCard.className = 'divAllCard';
            myBag.append(divAllCard);
            btnPassToPay.onclick = () => {
                location.href = `./card.html?cardCode=${b.code}`
            }
            btnRemoveCard.onclick = () => {
                currentBug = currentBug.filter(obj => obj.code !== b.code);
                currentUser.bag = currentBug;
                arrUsers = arrUsers.map(user =>
                    user.userName === currentUser.userName ? currentUser : user
                );
                localStorage.setItem('myUsers', JSON.stringify(arrUsers));
                setBag();
            }



        })
    }
    btnCloseBag.onclick = () => {
        myBag.style.display = 'none';
    }
}




