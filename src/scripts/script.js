/* */
const monthEnum = {
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11,
};

const ApiContributorsUrl =
  "https://api.github.com/repos/cpcs-compiler/cpcsc/contributors";

/* DOM */
const createLinkElement = (url, child) => {
  let linkElement = document.createElement("a");
  linkElement.href = url;
  linkElement.target = "_blank";
  linkElement.appendChild(child);
  return linkElement;
};

const createImageElement = (url, alt, className = "") => {
  let retromojiElement = document.createElement("img");
  retromojiElement.src = url;
  retromojiElement.alt = alt;
  retromojiElement.className = className;
  return retromojiElement;
};

const createErrorElement = (text) => {
  let errElement = document.createElement("div");
  errElement.className = "error";
  errElement.appendChild(
    createImageElement(
      "https://d0p1s4m4.github.io/retromoji/img/warning.png",
      "Warning",
      "retromoji mini"
    )
  );
  let textElement = document.createTextNode(text);
  errElement.appendChild(textElement);
  return errElement;
};

/* error helper */
const showError = (err, elem) => elem.appendChild(createErrorElement(err));

/* pride month */
const isPrideMonth = (month) => month == monthEnum.JUNE;
const showPride = (month) => {
  if (isPrideMonth(month)) {
    document.getElementById("pride").style.display = "block";
  }
};

/* display contributors */
const showContributor = (contributor) =>
  document
    .getElementById("contrib")
    .appendChild(
      createLinkElement(
        contributor.html_url,
        createImageElement(
          contributor.avatar_url,
          contributor.login,
          "contributor"
        )
      )
    );

/* get contributors */
const fetchContributors = () => {
  const contribElem = document.getElementById("contrib");
  fetch(ApiContributorsUrl)
    .then((val) => {
      val
        .json()
        .then((val) => {
          val.forEach((element) => showContributor(element));
        })
        .catch((err) => showError(err.message, contribElem));
    })
    .catch((err) => showError(err.message, contribElem));
};

/* init all */
const init = () => {
  const date = new Date();

  fetchContributors();
  showPride(date.getMonth());
};
