

//load
window.onload = function() {setTimeout(function(){document.body.style.display="block";
document.body.style.opacity=1;},500);};
//ripple effect
function ripple_eff(e) {

  let ripple = document.createElement("span");

  ripple.classList.add("ripple");

  this.appendChild(ripple);
  let x = e.clientX - e.target.offsetLeft;
  let y = e.clientY - e.target.offsetTop;

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  setTimeout(() => {

    ripple.remove();

  }, 500);



}

document.querySelectorAll(".ripple-eff").forEach((btn) => {

  btn.onclick = ripple_eff;

});



//Cursor Pointer
(function () {
  var follower, init, mouseX, mouseY, positionElement, printout, timer;

  follower = document.getElementById('follower');

  printout = document.getElementById('printout');

  mouseX = (event) => {
    return event.clientX;
  };

  mouseY = (event) => {
    return event.clientY;
  };

  positionElement = (event) => {
    var mouse;
    mouse = {
      x: mouseX(event),
      y: mouseY(event)
    };
    follower.style.top = mouse.y + 'px';
    return follower.style.left = mouse.x + 'px';
  };

  timer = false;

  window.onmousemove = init = (event) => {
    var _event;
    _event = event;
    return timer = setTimeout(() => {
      return positionElement(_event);
    }, 1);
  };

  document.querySelectorAll('.lnk').forEach((item) => {
    item.addEventListener('mouseenter', () => {

      follower.children[0].style.backgroundColor = "#D9D932";
      follower.children[1].style.backgroundColor = "#262624";
      follower.children[0].style.animationDuration = "1s";
      follower.children[1].style.animationDuration = "2s";
    });
    item.addEventListener('mouseleave', () => {

      follower.children[0].style.backgroundColor = "#262624";
      follower.children[1].style.backgroundColor = "#D9D932";
      follower.children[0].style.animationDuration = "2s";
      follower.children[1].style.animationDuration = "4s";
    });
  });

  document.body.addEventListener('click', () => {

    follower.children[0].style.animation = "pulse-fast 0.5s infinite";
    follower.children[1].style.animation = "pulse-fast 1s infinite";
    setTimeout(() => {

      follower.children[0].style.animation = "pulse 2s infinite";
      follower.children[1].style.animation = "pulse 4s infinite";
    }, 1000);
  })

}).call(this);




//Scroll Reveal
const reveal = (e) => {
  e.classList.add('reveal-start');
  setTimeout(() => {
    e.classList.remove('reveal-start');
  }, 500);
}

const unreveal = (e) => {
  e.classList.add('reveal-end');
  setTimeout(() => {
    e.classList.remove('reveal-end');
  }, 500);
}


const slider_pos = ['1.6rem',
  '7.2rem',
  '12.4rem',
  '18.3rem',
  '25rem']
let navitems = document.querySelectorAll('.nav-item');
let navSlider = document.body.querySelector('.navbar-scroller');
let sections = document.querySelectorAll("section");
let prevIndex = 0;

const transition = (index) => {

  unreveal(sections[prevIndex]);
  setTimeout(() => {
    sections[prevIndex].classList.replace('show', 'hide');
    sections[index].classList.replace('hide', 'show');
    reveal(sections[index]);
    prevIndex = index;
    if (index === 2) setSkills();
  }, 500)
}
navitems.forEach((item, index) => {
  item.addEventListener('click', () => {
    navSlider.style.left = slider_pos[index];
    transition(index);
  });


});
let drawer_btn = document.querySelector('.drawer-btn');
let drawer = document.querySelector('.drawer');

const slider_pos_mob = ['1.7rem',
  '6.4rem',
  '10.6rem',
  '15.4rem',
  '20.9rem']
let navitems_mob = document.querySelectorAll('.nav-item-mob');
let navSlider_mob = document.body.querySelector('.navbar-scroller-mob');
navitems_mob.forEach((item, index) => {
  item.addEventListener('click', () => {
    navSlider_mob.style.left = slider_pos_mob[index];

    transition(index);
    setTimeout(() => {
      drawer.style.top = "-5rem";
    }, 300)
  });
});


let next = document.querySelector('.next');
next.addEventListener('click', () => {
  let index = (prevIndex + 1) % 5;
  navSlider_mob.style.left = slider_pos_mob[index];
  navSlider.style.left = slider_pos[index];
  transition(index);
});


drawer_btn.addEventListener('click', () => {
  drawer.style.top = "0rem";
});
let main = document.querySelector('.main-content');
main.addEventListener('click', () => {
  drawer.style.top = "-5rem";
});


let see_more_btn = document.querySelectorAll('.see-more');
see_more_btn.forEach((btn) => {
  btn.addEventListener('click', () => {
    setTimeout(() => {
      navSlider_mob.style.left = slider_pos_mob[1];
      navSlider.style.left = slider_pos[1];
      transition(1);
    }, 300);
  });
});


//Fetch Github Data
let url = "https://api.github.com/users/xidhu/repos";
let reponames, langRawList = [];
let langs = [{ language: "HTML", count: 30, src: "./assets/png/icons/html.png" }, { language: "CSS", count: 20, src: "./assets/png/icons/css.png" }, { language: "JavaScript", count: 35, src: "./assets/png/icons/js.png" }, { language: "Dart", count: 25, src: "./assets/png/icons/dart.png" }, { language: "C", count: 28, src: "./assets/png/icons/c.png" }, { language: "Java", count: 32, src: "./assets/png/icons/java.png" }, { language: "Kotlin", count: 26, src: "./assets/png/icons/kt.png" }, { language: "Shell", count: 10, src: "./assets/png/icons/shell.png" }];
let isMobile = window.innerWidth < window.innerHeight ? true : false;
let langNames = [].slice.call(document.querySelectorAll('.skill-name > h3')).map((e) => { return e });
let langPrgs = [].slice.call(document.querySelectorAll('.skill-ind')).map((e) => { return e });
let langlogo = [].slice.call(document.querySelectorAll('.skill-logo > img')).map((e) => { return e });

const setSkills = () => {

  langPrgs.forEach((e) => { e.style.transition = "all 0s ease-in-out"; e.style.width = "0rem"; });

  setTimeout(() => {
    for (let i = 0; i < langNames.length; i++) {

      let percentage = langs[i].count > 0 ? langs[i].count * 2 : 10;
      langNames[i].innerHTML = langs[i].language;
      langlogo[i].src = langs[i].src;
      langPrgs[i].style.transition = "all 2s ease-in-out";
      if (isMobile) {
        langPrgs[i].style.width = (18 / 100 * percentage) + "rem";
      }
      else {
        langPrgs[i].style.width = (28 / 100 * percentage) + "rem";
      }
    }
  }, 100);

}




const convertToPercentage = (data) => {
  reponames = data.map((e) => {
    return e.name;
  });
  reponames.forEach((e) => {
    url = "https://api.github.com/repos/xidhu/" + e + "/languages";
    var languageFetch = new XMLHttpRequest();
    languageFetch.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        langRawList.push(data);

      }
    };
    languageFetch.open("GET", url, true);
    languageFetch.send();
  });

  setTimeout(() => {

    let total = 0;
    langs.forEach((lan) => {
      langRawList.forEach((l) => {
        if (l[lan.language] != null) {
          lan.count += l[lan.language];
        }
      })
    })
    langs.forEach((l) => {
      total += l.count;
    })
    langs.forEach((l) => {
      l.count = Math.round(((l.count) / total) * 100);
    })


  }, 1000)
};

const fetchData = () => {
  var repoFetch = new XMLHttpRequest();
  repoFetch.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      convertToPercentage(data);
    }
  };
  repoFetch.open("GET", url, true);
  repoFetch.send();
}

fetchData();

//Projects

const projects = [{
  name: "Gchat",
  desc: "A simple Messaging Web/Android App.",
  img: "./assets/svg/gchat.svg",
  src: "https://github.com/xidhu/Gchat"
}, {
  name: "WeNow",
  desc: "Weather forcasting App+APi.",
  img: "./assets/svg/wenow.svg",
  src: "https://github.com/xidhu/weNow-App"
}, {
  name: "FoodHunt",
  desc: "Food Delivery App.",
  img: "./assets/svg/foodhunt.svg",
  src: "https://github.com/xidhu/FoodHunt"
}];

let proj = document.querySelectorAll(".projects-cont");
let proj_img = document.querySelectorAll(".pi");
let proj_name = document.querySelectorAll(".pn");
let proj_desc = document.querySelectorAll(".pd");

proj.forEach((proj, index) => {
  proj.href = projects[index].src;
  proj_img[index].style.backgroundImage = `url(${projects[index].img})`;
  proj_name[index].textContent = projects[index].name;
  proj_desc[index].textContent = projects[index].desc;

});

const createEmailBody = (nm, email, desc) => {
  return email ? `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>
  </title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width">
  <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
</head>

<body style="font-family: 'Poppins', sans-serif;text-align:center;color:rgb(102, 101, 101);">
  <h3 style="font-size: 1.6rem;
  font-weight: 400;
  margin:  1.2rem 0;"><span style="color: red">${nm}</span> </h3>
  <p>${email}</p>
  <p style="font-size:0.6rem;margin: -1rem 0rem;">${desc}</p>
</body>
</html>
`: `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>
  </title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width">
  <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
</head>

<body style="font-family: 'Poppins', sans-serif;text-align:center;color:rgb(102, 101, 101);">
  <img src="https://xidhu.github.io/xidhu/assets/png/main-image.png" style="width:10rem;" alt="It's Me Xidhu">
  <h3 style="font-size: 1.6rem;
  font-weight: 400;
  margin:  1.2rem 0;">Hi <span style="color: red">${nm}</span> </h3>
  <p>Thanks for Contacting Me</p>
  <p style="font-size:0.6rem;margin: -1rem 0rem;">I will send an update within few days</p>
  <h3 style="color: red; margin: 2rem 0rem;" >Have A Nice Day..!</h3><br>
  <a href="https://xidhu.github.io/xidhu" style="
  background-color:gray;
  color:white;
  text-decoration: none;
  max-width:30rem;
  padding:0.6rem 1rem;
  border-radius:1rem;">Go to Site</a>
  
</body>
</html>
`;
}

//alert
const showAlert = (title,desc) => {
  let overlay = document.querySelector('.overlay');
  let ok = document.querySelector('.a-btn');
  let tit = document.querySelector('.a-title');
  let des = document.querySelector('.a-desc');
  tit.textContent = title;
  des.textContent = desc;
  overlay.style.display = "flex";
  overlay.style.opacity = 0;
  setTimeout(() => {
    overlay.style.opacity = 1;
  } ,100);
  ok.addEventListener("click", ()=>{
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.style.display = "none";
    } ,300);
    
  });
  
}

//Contact
let name_ = document.querySelector(".name_");
let email_ = document.querySelector(".email_");
let description_ = document.querySelector(".description_");

const sendData = (nm, em, desc) => {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "sidhu3612@gmail.com",
    Password: "3BD47ABBCE9BFCCD324B74A35BD48A1A4AC5",
    To: "sidhu3612@gmail.com",
    From: "sidhu3612@gmail.com",
    Subject: "Someone Contacted",
    Body: createEmailBody(nm, em, desc),

  }).then(
    (msg) => {
      Email.send({
        Host: "smtp.elasticemail.com",
        Username: "sidhu3612@gmail.com",
        Password: "3BD47ABBCE9BFCCD324B74A35BD48A1A4AC5",
        To: em,
        From: "sidhu3612@gmail.com",
        Subject: "Xidhu",
        Body: createEmailBody(nm, false, false),
      }).then((message) => showAlert(message == "OK" ?"Message Sent":"Message Not Sent" ,message == "OK" ? "Message Sent.Check Your Mail Spam Folder" : "Message Not Sent.Try Again."));
    }
  );
};

const submitData = () => {
  if (name_.value != "") {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email_.value).toLowerCase()) && email_.value != "") {
      if (description_.value != "") {
        sendData(name_.value, email_.value, description_.value);
        name_.value = "";
        email_.value = "";
        description_.value = "";
      } else {
        showAlert("Description","Please Enter Description");
      }
    } else {
      showAlert("Email","Please Enter Proper Email");
    }
  } else {
    showAlert("Name","Please Enter Your Name");
  }
};

document.querySelector('.submit').addEventListener('click', () => submitData());