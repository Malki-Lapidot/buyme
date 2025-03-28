
if (JSON.parse(sessionStorage.getItem('name'))) {
    const login = document.getElementById('login');
    login.innerHTML = `היי ${JSON.parse(sessionStorage.getItem('name'))} - מעבר לסל`;
}
//------------------------header------------------------------
const nav = document.querySelector('nav');
const pictureOpen = document.getElementById('pictureOpen');
const headerLogo = document.getElementById('headerLogo');
const login = document.getElementById('login');
const links = document.getElementById('links');
const linkGift = document.getElementById('linkGift');

// יצירת כפתור חיפוש
const addSearchBtn = document.createElement('button');
addSearchBtn.type = "submit";
addSearchBtn.innerHTML = `חיפוש <img src="./image/חיפוש.png">`;
addSearchBtn.classList.add('search-button');

// שמירה על מצב התחלתי של הסטיילים
const originalNavStyles = {
    position: nav.style.position,
    width: nav.style.width,
    boxShadow: nav.style.boxShadow,
    zIndex: nav.style.zIndex
};

const originalHeaderLogoStyles = {
    marginLeft: headerLogo.style.marginLeft,
    marginRight: headerLogo.style.marginRight
};

const originalLinksStyles = {
    display: links.style.display
};

const originalLinkGiftStyles = {
    display: linkGift.style.display
};

const originalLoginStyles = {
    display: login.style.display,
    marginTop: login.style.marginTop,
    marginRight: login.style.marginRight
};

const originalPictureOpenStyles = {
    marginTop: pictureOpen.style.marginTop
};

function addSearchButton() {
    if (!nav.contains(addSearchBtn)) {
        nav.appendChild(addSearchBtn);
    }
}

function removeSearchButton() {
    if (nav.contains(addSearchBtn)) {
        nav.removeChild(addSearchBtn);
    }
}

const minResponsiveWidth = 400;
const maxResponsiveWidth = 750;

function handleScroll() {
    if (window.innerWidth < minResponsiveWidth || window.innerWidth > maxResponsiveWidth) {

        if (window.scrollY > 550) {
            // עדכון הסטיילים
            nav.style.position = "fixed";
            nav.style.zIndex = "999";
            pictureOpen.style.marginTop = "3.5%";
            nav.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.205)";
            links.style.display = "none";
            linkGift.style.display = "none";
            headerLogo.style.marginRight = "8%";
            login.style.display = "block";
            login.style.marginTop = "-1.2%";
            login.style.marginRight = "10%";

            addSearchButton();
        } else {
            // החזרת הסטיילים למצבם המקורי
            nav.style.position = originalNavStyles.position;
            nav.style.width = originalNavStyles.width;
            nav.style.boxShadow = originalNavStyles.boxShadow;
            nav.style.zIndex = originalNavStyles.zIndex;
            links.style.display = originalLinksStyles.display;
            linkGift.style.display = originalLinkGiftStyles.display;
            headerLogo.style.marginLeft = originalHeaderLogoStyles.marginLeft;
            headerLogo.style.marginRight = originalHeaderLogoStyles.marginRight;
            login.style.display = originalLoginStyles.display;
            login.style.marginTop = originalLoginStyles.marginTop;
            login.style.marginRight = originalLoginStyles.marginRight;
            pictureOpen.style.marginTop = originalPictureOpenStyles.marginTop;

            removeSearchButton();
        }
    } else {
        removeSearchButton();
    }
}

window.addEventListener("scroll", handleScroll);


//   שקופצת מהגלילה -חלונית החיפוש 

const searchPopup1 = document.getElementById('searchPopup');

addSearchBtn.addEventListener('click', function () {
    searchPopup1.style.display = 'block';
});

window.addEventListener('click', function (event) {
    if (event.target === searchPopup1) {
        searchPopup1.style.display = 'none';
    }
});
//--------------- טופס חיפוש- של חלונית קופצת------------------------
const searchFormPopup = document.getElementById('searchFormPopup');
searchFormPopup.onsubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem('categoryText', e.target['category'].value);
    sessionStorage.setItem('giftForText', e.target['giftFor'].value);
    sessionStorage.setItem('priceText', e.target['price'].value);
    sessionStorage.setItem('areaText', e.target['area'].value);

    searchFormPopup.reset();
    location.href = './search.html';
}


//---------------טופס חיפוש-------------------------
const formSearch = document.getElementById('search');
formSearch.onsubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem('categoryText', e.target['category'].value);
    sessionStorage.setItem('giftForText', e.target['giftFor'].value);
    sessionStorage.setItem('priceText', e.target['price'].value);
    sessionStorage.setItem('areaText', e.target['area'].value);


    formSearch.reset();
    location.href = './search.html';
}
//---------------------כפתורי חיפוש---------------------------
const btnSearch1 = document.getElementById('btnSearch1');
const btnSearch2 = document.getElementById('btnSearch2');
const btnSearch3 = document.getElementById('btnSearch3');
const btnSearch4 = document.getElementById('btnSearch4');
const btnSearch5 = document.getElementById('btnSearch5');

btnSearch1.addEventListener('click', function () {

    sessionStorage.setItem('categoryText', '');
    sessionStorage.setItem('giftForText', btnSearch1.innerHTML);
    sessionStorage.setItem('priceText', '');
    sessionStorage.setItem('areaText', '');

    location.href = './search.html';
});
btnSearch2.addEventListener('click', function () {

    sessionStorage.setItem('categoryText', '');
    sessionStorage.setItem('giftForText', btnSearch2.innerHTML);
    sessionStorage.setItem('priceText', '');
    sessionStorage.setItem('areaText', '');

    location.href = './search.html';
});
btnSearch3.addEventListener('click', function () {

    sessionStorage.setItem('categoryText', '');
    sessionStorage.setItem('giftForText', btnSearch3.innerHTML);
    sessionStorage.setItem('priceText', '');
    sessionStorage.setItem('areaText', '');

    location.href = './search.html';
});
btnSearch4.addEventListener('click', function () {

    sessionStorage.setItem('categoryText', '');
    sessionStorage.setItem('giftForText', btnSearch4.innerHTML);
    sessionStorage.setItem('priceText', '');
    sessionStorage.setItem('areaText', '');

    location.href = './search.html';
});
btnSearch5.addEventListener('click', function () {

    sessionStorage.setItem('categoryText', '');
    sessionStorage.setItem('giftForText', btnSearch5.innerHTML);
    sessionStorage.setItem('priceText', '');
    sessionStorage.setItem('areaText', '');

    location.href = './search.html';
});



//---------------קישורי הimage--------------------------------
function searchByPicture(categoryTextHome) {

    sessionStorage.setItem('categoryText', categoryTextHome);
    sessionStorage.setItem('giftForText', '');
    sessionStorage.setItem('priceText', '');
    sessionStorage.setItem('areaText', '');


    location.href = './search.html';
}
//---------------קישורים--------------------------------
function searchByLink(giftForTextHome) {

    sessionStorage.setItem('categoryText', '');
    sessionStorage.setItem('giftForText', giftForTextHome);
    sessionStorage.setItem('priceText', '');
    sessionStorage.setItem('areaText', '');


    location.href = './search.html';
}



//-------------------------חלונית כניסה-------------------------------------------------------
const modal = document.getElementById('modal');
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
//------------------------יציאה------------------------------------
const exit = document.getElementById('exit');
exit.onclick = () => {
    sessionStorage.removeItem('name');
    openModalButton.innerHTML = 'כניסה / הרשמה';
}


//---------------------------חלונית טיימר--------------------------------------
const modalTimer = document.getElementById('modalTimer');
const closeTimer = document.getElementById('closeTimer');

closeTimer.addEventListener('click', function () {
    modalTimer.style.display = 'none';
});
setTimeout(function () {
    if (!(sessionStorage.getItem('isOpen'))) {
        sessionStorage.setItem('isOpen', true);
        modalTimer.style.display = 'block';
    }

}, 10000)

//--------------------------חלונית אחרי טיימר--------------------------------------
const modalAfterTimer = document.getElementById('modalAfterTimer');
const closeAfterTimer = document.getElementById('closeAfterTimer');
const timerBtn = document.getElementById('timerBtn');

closeAfterTimer.addEventListener('click', function () {
    modalAfterTimer.style.display = 'none';
});
timerBtn.addEventListener('click', function () {
    modalTimer.style.display = 'none';
    modalAfterTimer.style.display = 'block';
});

const noneBTN = document.getElementById('noneBTN');
const eemail = document.getElementById('eemail');

noneBTN.addEventListener('click', function () {
    if (eemail.value !== '') {
        modalTimer.style.display = 'none';
        modalAfterTimer.style.display = 'block';
    }
});
//----------------------------טיימר כחול התחלתי--------------------------------
const modalTimerBlue = document.getElementById('modalTimerBlue');

setTimeout(function () {
    modalTimerBlue.style.display = 'block';
}, 0);

setInterval(function () {
    modalTimerBlue.style.display = 'none';
}, 2000);

//---------------סופר שובר--------------------
const modalSuperCard = document.getElementById('modalSuperCard');
const closeSuper = document.getElementById('closeSuper');
const noneText = document.getElementById('noneText');
const addSum = document.getElementById('addSum');
const numberCard = document.getElementById('numberCard');



function superBreaker() {
    modalSuperCard.style.display = 'block';
}

closeSuper.addEventListener('click', function () {
    modalSuperCard.style.display = 'none';
    noneText.style.display = 'none';
});

addSum.addEventListener('click', function () {
    if (numberCard.value !== '.251-/A') {
        noneText.style.display = 'block';
        numberCard.value = '';
    }
    else {
        noneText.style.display = 'none';
        numberCard.value = '';
    }
});


//--------------------- בדיקת יתרה ----------------------

const modalCheck = document.getElementById('modalCheck');
const closeCheck = document.getElementById('closeCheck');
const noneText2 = document.getElementById('noneText2');
const moneyCheck = document.getElementById('moneyCheck');
const numberCheck = document.getElementById('numberCheck');

function cheackCode() {
    modalCheck.style.display = 'block';
}

closeCheck.addEventListener('click', function () {
    modalCheck.style.display = 'none';
    noneText2.style.display = 'none';
});

moneyCheck.addEventListener('click', function () {
    if (numberCheck.value !== '.251-/A') {
        noneText2.style.display = 'block';
        numberCheck.value = '';
        modalCheck.style.display = 'block';
    }
    else {
        noneText2.style.display = 'none';
        numberCheck.value = '';
    }

});
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


//BUYMEALL
function allCards() {
    sessionStorage.setItem('categoryText', '');
    sessionStorage.setItem('giftForText', '');
    sessionStorage.setItem('priceText', '');
    sessionStorage.setItem('areaText', '');


    location.href = './search.html';
}



