if (JSON.parse(sessionStorage.getItem('name'))) {
    const login = document.getElementById('login');
    login.innerHTML = `היי ${JSON.parse(sessionStorage.getItem('name'))} - מעבר לסל`;
}

const searchResults = document.getElementById('searchResults');

const store = {
    cards: []
};

if (JSON.parse(sessionStorage.getItem('name'))) {
    const login = document.getElementById('login');
    login.innerHTML = `היי ${JSON.parse(sessionStorage.getItem('name'))} - מעבר לסל`;
}


const displayConfig = {
    searchByCategory: '',
    searchByarea: '',
    searchByPrice: '',
    searchByGiftFor: ''
}

$.ajax({
    url: './buyMe.json',
    success: (data) => {
        const { giftCards } = data;
        store.cards = giftCards;

        searchResults.innerHTML = null;

        designPage();


    }

});

const designPage = () => {
    const categoryText = sessionStorage.getItem('categoryText');
    const giftForText = sessionStorage.getItem('giftForText');
    const priceText = sessionStorage.getItem('priceText');
    const areaText = sessionStorage.getItem('areaText');

    displayConfig.searchByCategory = categoryText;
    displayConfig.searchByarea = areaText;
    displayConfig.searchByPrice = priceText;
    displayConfig.searchByGiftFor = giftForText;

    let count = 0;
    count = setCards(count);

    const countResults = document.getElementById('countResults');

    countResults.innerHTML = count;
    if (priceText) {
        const byTypePrice = document.getElementById('byTypePrice');
        byTypePrice.innerHTML = `סכום מ-${priceText}`;
    }
    if (areaText) {
        const byTypearea = document.getElementById('byTypearea');
        byTypearea.innerHTML = `אזור ${areaText}`;
    }
    if (categoryText) {
        const byTypeCategory = document.getElementById('byTypeCategory');
        byTypeCategory.innerHTML = `קטגוריה ${categoryText}`;
    }
    if (giftForText) {
        const ByTypeGiftFor = document.getElementById('ByTypeGiftFor');
        ByTypeGiftFor.innerHTML = `עבור ${giftForText}`;
    }

    if (count === 0) {
        const emptyGiftImg = document.createElement('img');
        emptyGiftImg.src = './image/מתנה ריקה.svg';
        searchResults.append(emptyGiftImg);
    }
}


const setCards = (count) => {
    const filteredCards = filterCards(store.cards, displayConfig.searchByPrice, displayConfig.searchByarea
        , displayConfig.searchByCategory, displayConfig.searchByGiftFor);



    filteredCards.forEach(card => {

        count = count + 1;

        const { name, image, code } = card;

        const p = document.createElement('p');
        p.innerHTML = name;
        const divP = document.createElement('div');
        divP.append(p);
        const btnAddBag = document.createElement('button');
        btnAddBag.type = 'button';
        const imgBag = document.createElement('img');
        imgBag.src = './image/עגלת קניות 2.webp';
        btnAddBag.append(imgBag);
        btnAddBag.className = 'btnAddToBag';

        const divImg = document.createElement('div');
        const img = document.createElement('img');
        img.src = `./image/${image}`;
        divImg.append(img, divP);
        const a = document.createElement('a');


        divP.className = 'overlayText';
        divImg.className = 'picture';
        img.className = 'imageP';

        btnAddBag.onclick = () => {
            let arrUsers = JSON.parse(localStorage.getItem('myUsers'));
            const currentUser = currentUserOfBag();
            const currentBag = funcCurrentBag(currentUser);
            const productFromBag = currentBag.find((p) => p.code === code);
            if (!productFromBag) {
                currentBag.push({ code, image });
            }
            currentUser.bag = currentBag;
            arrUsers = arrUsers.map(user =>
                (user.userName === currentUser.userName && user.password === currentUser.password) ? currentUser : user
            );
            localStorage.setItem('myUsers', JSON.stringify(arrUsers));
            imgBag.style.border = 'solid 3px #ffa126';
            imgBag.style.borderRadius = '50px';
        }


        a.append(divImg);
        a.href = `./card.html?cardCode=${code}`;

        const divAll = document.createElement('div');
        divAll.append(a, btnAddBag);

        searchResults.append(divAll);



    });
    return count;


}

const currentUserOfBag = () => {
    const currentName = JSON.parse(sessionStorage.getItem('name'));
    let arrUsers = JSON.parse(localStorage.getItem('myUsers'));
    const currentUser = arrUsers.find((user) => user.userName === currentName);
    return currentUser;
}
const funcCurrentBag = (user) => {
    return user ? user.bag || [] : [];
}




function filterCards(cards, priceTextVal, areaTextVal, categoryTextVal, giftForTextVal) {
    let matchingShops = [];
    for (let card of cards) {
        for (let shop of card.cardShopes) {
            if (shop.area.includes(areaTextVal)
                && shop.price.includes(priceTextVal)
                && shop.category.includes(categoryTextVal)
                && shop.giftFor.find(str => str.includes(giftForTextVal))) {

                matchingShops.push(shop);
            }
        }
    }
    return matchingShops;
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