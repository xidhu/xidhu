
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

document.querySelectorAll(".ripple-eff").forEach((btn)=>{

    btn.onclick = ripple_eff;
    
});
  
    

//Cursor Pointer
(function() {
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

    document.querySelectorAll('.lnk').forEach((item)=>{
        item.addEventListener('mouseenter',()=>{
            
            follower.children[0].style.backgroundColor = "#D9D932";
            follower.children[1].style.backgroundColor = "#262624";
            follower.children[0].style.animationDuration = "1s";
            follower.children[1].style.animationDuration = "2s";
        } );
        item.addEventListener('mouseleave',()=>{
            
            follower.children[0].style.backgroundColor = "#262624";
            follower.children[1].style.backgroundColor = "#D9D932";
            follower.children[0].style.animationDuration = "2s";
            follower.children[1].style.animationDuration = "4s";
        } );
    });

    document.body.addEventListener('click', ()=>{
       
            follower.children[0].style.animation = "pulse-fast 0.5s infinite";
            follower.children[1].style.animation = "pulse-fast 1s infinite";
        setTimeout(() => {

            follower.children[0].style.animation = "pulse 2s infinite";
            follower.children[1].style.animation = "pulse 4s infinite";
        },1000);
    })
  
  }).call(this);

  


//Scroll Reveal
const reveal = (e) => {
  e.classList.add('reveal-start');
  setTimeout(() => {
    e.classList.remove('reveal-start');
  },500);
}

const unreveal = (e) => {
  e.classList.add('reveal-end');
  setTimeout(() => {
    e.classList.remove('reveal-end');
  },500);
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
        sections[prevIndex].classList.replace('show','hide');
        sections[index].classList.replace('hide','show');
       reveal(sections[index]);
       prevIndex = index;
       if(index === 2)setSkills();
       },500)
}
navitems.forEach((item,index)=>{
    item.addEventListener('click',()=>{
      navSlider.style.left =  slider_pos[index];
       transition(index);
    } );
    
    
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
navitems_mob.forEach((item,index)=>{
  item.addEventListener('click',()=>{
     navSlider_mob.style.left =  slider_pos_mob[index];
     
    transition(index); 
    setTimeout(() => {
      drawer.style.top = "-5rem";
    },300)
  } );});


  let next = document.querySelector('.next');
  next.addEventListener('click',()=>{
    let index = (prevIndex+1)%5;
    navSlider_mob.style.left =  slider_pos_mob[index];
    navSlider.style.left =  slider_pos[index];
    transition(index);
  });


drawer_btn.addEventListener('click',()=>{
    drawer.style.top = "0rem";
});
let main = document.querySelector('.main-content');
main.addEventListener('click',()=>{
    drawer.style.top = "-5rem";
});


let see_more_btn = document.querySelectorAll('.see-more');
see_more_btn.forEach((btn)=>{
  btn.addEventListener('click',()=>{
    setTimeout(() => {
      navSlider_mob.style.left =  slider_pos_mob[1];
    navSlider.style.left =  slider_pos[1];
    transition(1);
    },300);
  });
});


//Fetch Github Data
const apikey = "3b63f4c7fbc3215ca65244085561348bd3b21f62";
let url = "https://api.github.com/users/xidhu/repos?state=closed&access_token="+apikey;
let reponames, langRawList =[];
let langs = [{language:"HTML",count:0,src:"./assets/png/icons/html.png"},{language:"CSS",count:0,src:"./assets/png/icons/css.png"},{language:"JavaScript",count:0,src:"./assets/png/icons/js.png"},{language:"Dart",count:0,src:"./assets/png/icons/dart.png"},{language:"C",count:0,src:"./assets/png/icons/c.png"},{language:"Java",count:0,src:"./assets/png/icons/java.png"},{language:"Kotlin",count:0,src:"./assets/png/icons/kt.png"},{language:"Shell",count:0,src:"./assets/png/icons/shell.png"}];


const setSkills = () => {
    let isMobile =  window.innerWidth < window.innerHeight?true:false;
    let langNames = [].slice.call(document.querySelectorAll('.skill-name > h3')).map((e) => {return e});
    let langPrgs = [].slice.call(document.querySelectorAll('.skill-ind')).map((e) => {return e});
    let langlogo = [].slice.call(document.querySelectorAll('.skill-logo > img')).map((e) => {return e});

    langPrgs.forEach((e) => {e.style.transition = "all 0s ease-in-out";e.style.width = "0rem";});

      setTimeout(() => {
        for(let i = 0 ; i < langNames.length ;i++ ){

          let percentage = langs[i].count > 0 ? langs[i].count * 2 : 10;
          langNames[i].innerHTML = langs[i].language;
          langlogo[i].src = langs[i].src;
          langPrgs[i].style.transition = "all 2s ease-in-out";
          if(isMobile){
              langPrgs[i].style.width = (18/100 * percentage) + "rem";
          }
          else{
              langPrgs[i].style.width = (28/100 * percentage) + "rem";
          }
      }
      }, 100);

}


const convertToPercentage = (data) => {
  reponames = data.map((e) => {
    return e.name;
  });
  reponames.forEach((e) => {
    url = "https://api.github.com/repos/xidhu/"+e+"/languages?state=closed&access_token="+apikey;
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
  
  setTimeout(()=>{

    let total = 0;
    langs.forEach((lan)=>{
        langRawList.forEach((l)=>{
            if(l[lan.language] != null){
                lan.count += l[lan.language];
            }
        })
      })
    langs.forEach((l)=>{
        total += l.count;
    })
    langs.forEach((l)=>{
        l.count = Math.round(((l.count)/total) * 100);
    })
    
      
  },1000)
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


//Contact
