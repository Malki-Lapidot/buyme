
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

        sessionStorage.setItem('cardCode', cardCode);

        const currentCard = findCurrentCode(store.cards, cardCode);

        if (currentCard) {
            getDesign(currentCard);
        }
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

const getDesign = (currentCard) => {
    const { image, category, name, logo, history, address, addressLink, phone, phoneLink, site, facebook, instegram } = currentCard;
    const inShop = document.getElementById('inShop');

    const backgroundShop = document.getElementById('backgroundShop');
    backgroundShop.src = `./image/${image}`;


    const imageShop = document.getElementById('imageShop');
    imageShop.src = `./image/${image}`;

    const linkShopCategory = document.getElementById('linkShopCategory');
    const linkShopCard = document.getElementById('linkShopCard');
    linkShopCategory.href = "./index.html";
    linkShopCard.href = "./index.html";
    linkShopCategory.innerHTML = category;
    linkShopCard.innerHTML = name;

    const logoShop = document.getElementById('logoShop');
    logoShop.src = `./image/${logo}`;

    const nameShop = document.getElementById('nameShop');
    nameShop.innerHTML = name;

    const historyShop = document.getElementById('historyShop');
    historyShop.innerHTML = history;

    const addressShop = document.getElementById('addressShop');
    const phoneShop = document.getElementById('phoneShop');
    const siteShop = document.getElementById('siteShop');
    const facebookShop = document.getElementById('facebookShop');
    const instegramShop = document.getElementById('instegramShop');

    addressShop.innerHTML = address;
    addressShop.href = addressLink;
    phoneShop.innerHTML = phone;
    phoneShop.href = phoneLink;
    siteShop.href = site;
    facebookShop.href = facebook;
    instegramShop.href = instegram;

}

//מעבר לתשלום
const selectShop = document.getElementById('selectShop');
const priceShop = document.getElementById('priceShop');



selectShop.onclick = () => {
    if (!priceShop.value) {
        priceShop.value = 0;
    }
    const cardCode = sessionStorage.getItem('cardCode');

    location.href = `./pay.html?price=${priceShop.value}&cardCode=${cardCode}`;
    priceShop.value = "";

}

//   שקופצת מהגלילה -חלונית החיפוש 

const searchPopup1 = document.getElementById('searchPopup');
const SearchBtn = document.getElementById('search-button');

SearchBtn.addEventListener('click', function () {
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
//--------------------------חלונית אחרי טיימר--------------------------------------
const modalAfterTimer = document.getElementById('modalAfterTimer');
const closeAfterTimer = document.getElementById('closeAfterTimer');
const timerBtn = document.getElementById('timerBtn');

closeAfterTimer.addEventListener('click', function () {
    modalAfterTimer.style.display = 'none';
});

const noneBTN = document.getElementById('noneBTN');
const eemail = document.getElementById('eemail');

noneBTN.addEventListener('click', function () {
    if (eemail.value !== '') {
        modalAfterTimer.style.display = 'block';
    }
});