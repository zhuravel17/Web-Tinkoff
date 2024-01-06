class Card {
  constructor(name, url, description, id, provider) {
    this.name = name;
    this.url = url;
    this.description = description;
    this.id = id;
    this.provider = provider;
  }
}

function setupCards() {
  const cat = new Card(
    "Кошка",
    "https://cdn.culture.ru/images/a6bc3c04-0167-5030-b94c-e47d9a1fea11",
    "Балдежный кот",
    "1",
    "Противный кот"
  );
  const newYear = new Card(
    "Новогоднее настроение",
    "https://proprikol.ru/wp-content/uploads/2019/11/krasivye-novogodnie-fotografii-63.jpg",
    "Мммм новый год и хорошо украшенная елочка",
    "2",
    "New Year"
  );
  const friends = new Card(
    "Друзяшки",
    "https://formaxfun.com/wp-content/uploads/2023/12/pozdravleniya-s-novym-godom-2024-i-rozhdestvom_6574edf634b26.jpeg",
    "Новый год с друзьями! Что может быть лучше?",
    "3",
    "New Year Friends"
  );
  const getto = new Card(
    "Жизнь в гетто",
    "https://phonoteka.org/uploads/posts/2022-04/1651167126_43-phonoteka-org-p-getto-oboi-krasivo-48.jpg",
    "МММММММММ",
    "4",
    "Гетто"
  );

  const cards = [cat, newYear, friends, getto];

  const jsonString = JSON.stringify(cards);

  try {
    window.localStorage.clear();
    window.localStorage.setItem("cards", jsonString);
    renderCards();

    location.reload();
  } catch {
    alert("problems with start data");
  }
}

function renderCards() {
  const cards = JSON.parse(window.localStorage.getItem("cards"));

  if (cards === null) return;
  for (let i = 0; i < cards.length; ++i) {
    const card = cards[i];

    const divCard = document.createElement("div");
    divCard.id = `card${i}`;
    divCard.setAttribute("class", "card");
    document.getElementsByClassName("list-cards")[0].appendChild(divCard);

    const divCardButtons = document.createElement("div");
    divCardButtons.id = `cardButtons${i}`;
    divCardButtons.setAttribute("class", "card-buttons");
    document.getElementById(`card${i}`).appendChild(divCardButtons);

    const editCardButton = document.createElement("button");
    editCardButton.id = `editCardButton${i}`;
    editCardButton.setAttribute("class", "card-button");
    editCardButton.choose = `${card.id}`;
    editCardButton.textContent = "Редачить";
    editCardButton.addEventListener("click", editCard);
    document.getElementById(`cardButtons${i}`).appendChild(editCardButton);

    const deleteCardButton = document.createElement("button");
    deleteCardButton.id = `deleteCardButton${i}`;
    deleteCardButton.setAttribute("class", "card-button");
    deleteCardButton.choose = `${card.id}`;
    deleteCardButton.addEventListener("click", deleteCard);
    deleteCardButton.textContent = "Удалить";
    document.getElementById(`cardButtons${i}`).appendChild(deleteCardButton);

    const divCardText = document.createElement("div");
    divCardText.id = `cardText${i}`;
    divCardText.setAttribute("class", "card-text");
    document.getElementById(`card${i}`).appendChild(divCardText);

    const divCardInfo = document.createElement("div");
    divCardInfo.id = `cardInfo${i}`;
    divCardInfo.setAttribute("class", "card-info");
    document.getElementById(`cardText${i}`).appendChild(divCardInfo);

    const cardPhoto = document.createElement("img");
    cardPhoto.id = `cardPhoto${i}`;
    cardPhoto.setAttribute("class", "card-photo");
    cardPhoto.src = `${card.url}`;
    document.getElementById(`cardInfo${i}`).appendChild(cardPhoto);

    const divCardTextInfo = document.createElement("div");
    divCardTextInfo.id = `cardTextInfo${i}`;
    divCardTextInfo.setAttribute("class", "card-text-info");
    document.getElementById(`cardInfo${i}`).appendChild(divCardTextInfo);

    const cardName = document.createElement("p");
    cardName.id = `cardName${i}`;
    cardName.textContent = `${card.name}`;
    cardName.setAttribute("class", "card-name");
    document.getElementById(`cardTextInfo${i}`).appendChild(cardName);

    const cardId = document.createElement("p");
    cardId.id = `cardName${i}`;
    cardId.setAttribute("class", "card-info-id-prov");
    cardId.textContent = `${card.id}`;
    document.getElementById(`cardTextInfo${i}`).appendChild(cardId);

    const cardProv = document.createElement("p");
    cardProv.id = `cardProv${i}`;
    cardProv.setAttribute("class", "card-info-id-prov");
    cardProv.textContent = `${card.provider}`;
    document.getElementById(`cardTextInfo${i}`).appendChild(cardProv);

    const divCardDescription = document.createElement("div");
    divCardDescription.id = `cardDescription${i}`;
    divCardDescription.setAttribute("class", "card-description");
    divCardDescription.textContent = `${card.description}`;
    document.getElementById(`cardText${i}`).appendChild(divCardDescription);
  }
}

function addCart(event) {
  const isEditCard =
    document.getElementById("heading").textContent === "Редачить карточку";

  event.preventDefault();
  const formData = document.getElementsByName("form-new-card")[0];
  const newCard = saveFormData(formData, new Card());
  if (!newCard) return;

  const localStorageCards = JSON.parse(window.localStorage.getItem("cards"));
  if (isEditCard) {
    const currentIndex = localStorageCards.findIndex(
      (card) => card.id == newCard.id
    );
    localStorageCards.splice(currentIndex, 1, newCard);

    updateLocalStorage(localStorageCards);
  } else {
    localStorageCards.push(newCard);
    updateLocalStorage(localStorageCards);
  }

  location.reload();
}

function saveFormData(form, data) {
  const formData = Array.from(new FormData(form).entries());
  const card = data;
  const isEditCard = document.getElementById("heading") === "Редачить карточку";
  for (let i = 0; i < formData.length; ++i) {
    let [key, value] = formData[i];
    console.log(key, value);

    if (key == "name") {
      if (card.name == "" || value != "") card.name = value;
    }

    if (key == "urlImg") {
      if (card.url == "" || value != "") card.url = value;
    }

    if (key == "description") {
      if (card.description == "" || value != "") card.description = value;
    }

    if (key == "provider") {
      if (card.provider == "" || value != "") card.provider = value;
    }

    if (isEditCard) {
      card.id = Math.floor(Math.random() * new Date().getTime());
    } else {
      if (key === "id") card.id = value;
    }
  }
  let cards = JSON.parse(window.localStorage.getItem("cards"));
  for (let elem of cards) {
    if (!card.name || !card.description || !card.provider || !card.url) {
      alert("Нужно заполнить обязательные поля");
      return false;
    }
    if (card.id < 0) {
      alert("Исправьте ID на положительное число");
      return false;
    }
  }
  return card;
}

function editCard(event) {
  const label = document.getElementById("heading");
  const buttonEdit = document.getElementById("cart-button");

  label.textContent = "Редачить карточку";
  buttonEdit.textContent = "Сохранить изменения";

  const cards = JSON.parse(window.localStorage.getItem("cards"));
  const currentCard = cards.find((card) => card.id == event.target.choose);

  const nameInput = document.querySelector('[name="name"]');
  const imgInput = document.querySelector('[name="urlImg"]');
  const descriptionInput = document.querySelector('[name="description"]');
  const providerInput = document.querySelector('[name="provider"]');
  const idInput = document.querySelector('[name="id"]');

  nameInput.value = currentCard?.name ?? "";
  imgInput.value = currentCard?.url ?? "";
  descriptionInput.value = currentCard?.description ?? "";
  providerInput.value = currentCard?.provider ?? "";
  idInput.value = currentCard?.id ?? "";
}

function deleteCard(event) {
  const cards = JSON.parse(window.localStorage.getItem("cards"));
  const newCards = cards.filter((card) => card.id !== event.target.choose);
  updateLocalStorage(newCards);
  location.reload();
}

function updateLocalStorage(cards) {
  window.localStorage.clear();
  window.localStorage.setItem("cards", JSON.stringify(cards));
}

const setupButton = document.getElementById("setup-button");
setupButton.addEventListener("click", setupCards);

const addButton = document.getElementById("cart-button");
addButton.addEventListener("click", addCart);

renderCards();
