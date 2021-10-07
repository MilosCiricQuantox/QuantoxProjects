const jsButtonMode = document.querySelector('.js-btn-mode');
const container = document.querySelector('.container');
const followers = document.querySelector('.followers')
const moonSun = document.querySelector('.js-moon-sun');
const jsInput = document.querySelector('.js-input')
const devfinder = document.querySelector('.devfinder');
const main = document.querySelector('main');
const jsUserInfo = document.querySelector('.js-user-info');
const jsAbout = document.querySelector('.js-about');
const jsLocation = document.querySelector('.js-location');
const jsBtnSearch = document.querySelector('.js-btn-search');
const avatar = document.querySelector('.avatar');
const jsName = document.querySelector('.js-name p');
const jsUser = document.querySelector('.js-user span');
const jsDate = document.querySelector('.js-date p');
const jsAboutP = document.querySelector('.js-about p');
const repos = document.querySelector('.js-repos');
const jsFollowers = document.querySelector('.js-followers');
const jsFollowing = document.querySelector('.js-following');
const contactLocationFirst = document.querySelector('.contact-location.first span');
const contactLocationSecond = document.querySelector('.contact-location.second span');
const contactLocationThird = document.querySelector('.contact-location.third span');
const contactLocationFourth = document.querySelector('.contact-location.fourth span');
const contactLocationimgs = document.querySelector('.contact-location img');
const jsNoResults = document.querySelector('.js-no-results');
const body = document.querySelector('body');

jsButtonMode.addEventListener('click', function () {
    body.classList.toggle('dark');
    container.classList.toggle('dark');
    followers.classList.toggle('dark');
    jsInput.classList.toggle('dark');
    devfinder.classList.toggle('dark');
    main.classList.toggle('dark');
    jsUserInfo.classList.toggle('dark');
    jsAbout.classList.toggle('dark');
    jsAboutP.classList.toggle('dark');
    jsLocation.classList.toggle('dark');
    contactLocationimgs.classList.toggle('dark');
    
    if(jsButtonMode.textContent === 'Dark'){
        jsButtonMode.textContent = 'LIGHT';
        moonSun.src = './assets/icon-moon.svg';
    } else {
        jsButtonMode.textContent = 'Dark';
        moonSun.src = './assets/icon-sun.svg';
    }
  
    const firstImg = document.querySelector('.first img');
    const secondImg = document.querySelector('.second img');
    const thirdImg = document.querySelector('.third img');
    const fourthImg = document.querySelector('.fourth img');

    if(jsButtonMode.textContent === 'Dark'){
        firstImg.src = './assets/icon-location-white.svg';
        secondImg.src = './assets/icon-website-white.svg';
        thirdImg.src = './assets/icon-twitter-white.svg';
        fourthImg.src = './assets/icon-company-white.svg';
    } else {
        firstImg.src = './assets/icon-location.svg';
        secondImg.src = './assets/icon-website.svg';
        thirdImg.src = './assets/icon-twitter.svg';
        fourthImg.src = './assets/icon-company.svg';
    }

})

const displayError = () => {
    jsNoResults.textContent = 'No results';
}

const getInfo = (username) => {
    fetch(`https://api.github.com/users/${username}`)
    .then(response => {
        return response.json();
    })  
    .then(data => {
        if (data.login) {
            displayUser(data)
        } else {
            displayError();
        }
    })
}

document.addEventListener('onload', getInfo('octocat'));

jsBtnSearch.addEventListener('click', () => {
    getInfo(jsInput.value);
})

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

const displayUser= (obj) => {
    avatar.src = obj.avatar_url;
    jsName.textContent =  obj.name || obj.login;
    jsUser.textContent = '@' + obj.login || 'No login';
    let date = new Date(obj.created_at);
    let fullDate = `Joined ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}` 
    jsDate.textContent = fullDate;
    jsAboutP.textContent = obj.bio || 'This profile has no bio'; 
    jsAboutP.style.opacity = '75%';
    repos.textContent = obj.public_repos;
    jsFollowers.textContent = obj.followers;
    jsFollowing.textContent = obj.following;
    contactLocationFirst.textContent = obj.location || 'Not Available';
    contactLocationSecond.textContent = obj.blog || 'Not Available';
    contactLocationThird.textContent = obj.twitter_username || 'Not Available';
    contactLocationFourth.textContent = obj.company || 'Not Available';
    
    if(contactLocationFirst.textContent === 'Not Available') {
        contactLocationFirst.style.opacity = '50%';
    }
    else {
        contactLocationFirst.style.opacity = '100%';
    }
    if(contactLocationSecond.textContent === 'Not Available') {
        contactLocationSecond.style.opacity = '50%';
    }
    else {
        contactLocationSecond.style.opacity = '100%';
    }
    if(contactLocationThird.textContent === 'Not Available') {
        contactLocationThird.style.opacity = '50%';
    }
    else {
        contactLocationThird.style.opacity = '100%';
    }
    if(contactLocationFourth.textContent === 'Not Available') {
        contactLocationFourth.style.opacity = '50%';
    }
    else {
        contactLocationFourth.style.opacity = '100%';
    }
    
    contactLocationThird.style.textDecoration = 'none';
    contactLocationThird.style.color = 'inherit';
    if(contactLocationThird.textContent !== 'Not Available') {
        contactLocationThird.textContent = '';
        let a = document.createElement('a');
        a.textContent = obj.twitter_username;
        a.setAttribute('href', `https://www.twitter.com/${obj.twitter_username}`);
        a.setAttribute('target', '_blank');
        a.style.textDecoration = 'none'
        a.style.color = 'inherit';
        contactLocationThird.appendChild(a);
    }
    if(contactLocationSecond.textContent !== 'Not Available') {
        contactLocationSecond.textContent = '';
        let a = document.createElement('a');
        a.textContent = obj.blog;
        a.setAttribute('href', `https://${obj.blog}`);
        a.setAttribute('target', '_blank');
        a.style.textDecoration = 'none'
        a.style.color = 'inherit';
        contactLocationSecond.appendChild(a);
    }
    if(contactLocationFourth.textContent !== 'Not Available') {
        contactLocationFourth.textContent = '';
        let a = document.createElement('a');
        a.textContent = 'github';
        a.setAttribute('href', `${obj.html_url}`);
        a.setAttribute('target', '_blank');
        a.style.textDecoration = 'none'
        a.style.color = 'inherit';
        contactLocationFourth.appendChild(a);
    }   
}

jsInput.addEventListener("keyup", function(e) {
    if(e.key === 'Enter') {
    getInfo(jsInput.value);
    }
    clearMessage();
  })

const clearMessage = () => {
    jsNoResults.textContent = '';
}

body.addEventListener('click', clearMessage);