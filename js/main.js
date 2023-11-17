const home = document.getElementById("home");
const about = document.getElementById("about");
const projects = document.getElementById("projects");
const typewriter = document.getElementById("typewriter-wrapper");
const form = document.getElementById("contact-me");
const notification_alert = document.getElementById("alert");
const webhook =
  "https://discordapp.com/api/webhooks/1149622876962553937/4mxM9_xNS3XeAw4cOWXVvG7_lx9lKCF0c_HU20vr1VrBqOgG7MFRJ5gUUJKvXcZUAEz4";

// ----------------Event Listners-----------------

window.addEventListener("scroll", function () {
  scrollY();
});

window.addEventListener("load", function () {
  typeWriter();
});

form.addEventListener("submit", myFormSubmit);
// -------------------Functions-------------------

// typing animation
function typeWriter() {
  let a = 0;
  let txt1 =
    "let Experience = [];\nif(mistake){\n   Experience.push(mistake);\n}";
  let txt2 = "while(noSuccess){\n  tryAgain();\n  if(dead)\n    break;\n}";
  let txt3 = "if(sad() === true){\n   sad().stop();\n   beAwesome();\n}";
  let txt = txt1;
  let twIncrease = true;
  let speed = 100;

  function twWrapper() {
    if (twIncrease) {
      typewriter.innerHTML = txt.slice(0, a++);
      if (a == txt.length) {
        setTimeout(() => {
          twIncrease = false;
          speed = 50;
        }, 2000);
      }
    } else {
      typewriter.innerHTML = txt.slice(0, a--);
      if (a == 0) {
        twIncrease = true;
        speed = 100;
        if (txt == txt1) {
          txt = txt2;
        } else if (txt == txt2) {
          txt = txt3;
        } else {
          txt = txt1;
        }
      }
    }
    // repeats the function
    setTimeout(twWrapper, speed);
  }
  twWrapper();
}

function scrollY() {
  // get the anchor tags which link to ids
  let anchors = document.getElementsByTagName("a");
  let hashAnchor = Array.prototype.filter.call(anchors, (anchor) => {
    return anchor.getAttribute("href").startsWith("#");
  });

  hashAnchor.forEach((anchor) => {
    // get the ref ID
    const hash = anchor.getAttribute("href").split("#").slice(1)[0];
    // ref element
    const element = document.getElementById(hash);
    // position of the element
    const position = element.getBoundingClientRect();
    const posT = (position.top / window.innerHeight) * 100;
    const posB = (position.bottom / window.innerHeight) * 100;

    // check the position relative to window
    if (posT < 40 && posB > 40) {
      anchor.classList.add("scroll");
    } else {
      anchor.classList.remove("scroll");
    }
  });
}

// contact submit
async function myFormSubmit(e) {
  e.preventDefault();
  const name = form.elements.name.value;
  const subject = form.elements.subject.value;
  const email = form.elements.email.value;
  const message = form.elements.message.value;

  const payload = {
    username: "Message Bot",
    content: `New message from **${name}** (${email}) about **${subject}**\n\`\`\`${message}\`\`\``,
  };

  const response = await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).catch(() => notification("error", "Connection Error!"));

  if (response.ok) {
    notification("success", "Message sent successfully!");
    form.reset();
  } else {
    notification(
      "error",
      "There was an error when submitting the message. Please try again later."
    );
  }
}

// notification
function notification(scenario, message) {
  notification_alert.innerHTML = message;
  notification_alert.parentElement.classList.add(scenario);
  setTimeout(() => {
    notification_alert.parentElement.classList.remove(scenario);
  }, 5000);
}
