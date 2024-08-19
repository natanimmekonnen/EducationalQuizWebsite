const stickySections = [...document.querySelectorAll(".sticky")];
console.log(stickySections);

window.addEventListener("scroll", (e) => {
  for (let i = 0; i < stickySections.length; i++) {
    transform(stickySections[i]);
  }
});
function transform(section) {
  const offsetTop = section.parentElement.offsetTop;
  const scrollSection = section.querySelector(".scroll-section");

  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
  percentage = percentage < 0 ? 0 : percentage > 400 ? 400 : percentage;

  scrollSection.style.transform = `translate3d(${-percentage}vw, 0 ,0)`;
}

document.getElementById("course").onmousemove = (e) => {
  for (const card of document.getElementsByClassName("courses")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

document.getElementById("contact").onmousemove = (e) => {
  for (const card of document.getElementsByClassName("contacts")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

let i = 0;

function nextNumber() {
  i = (i % 3) + 1;
}

const footer = document.getElementById("footer");
setInterval(() => {
  const names = [
    "../assets/footer1.svg",
    "../assets/footer2.svg",
    "../assets/footer3.svg",
  ];

  footer.style.backgroundImage = `url(${names[i - 1]})`;
  footer.style.transition = "2s ease-in-out";
  nextNumber();
}, 3000);

const login = document.getElementById("login");

// login.addEventListener("click", () => {
//   login.style.display = "none";
// });
