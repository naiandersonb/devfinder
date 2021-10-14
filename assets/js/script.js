const user_form = document.querySelector('.search-user');
const change_theme = document.querySelector('#light-dark-theme');

user_form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userName = user_form.querySelector('input').value;

    axios(`https://api.github.com/users/${userName}`)
        .then(json => createObj(json.data))
        .then(obj => loadPage(obj));
});

function createObj(user) {
    const git_user = {
        avatar: user.avatar_url,
        name: user.name,
        login: user.login,
        joined: user.created_at,
        bio: user.bio,
        repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        location: user.location,
        blog: user.blog,
        twitter: user.twitter_username,
        email: user.email
    };

    return git_user;
}

function loadPage(obj) {
    const user_content = document.querySelector('.user-content');
    
    // avatar 
    const avatar = user_content.querySelector('#avatar');
    avatar.setAttribute('src', obj.avatar);

    // user name 
    const user_name = setValue('#user-name', obj.name);
   
    // login
    const login = setValue('#login',`@${obj.login}`);
    
    // joined 
    //TODO: formatar data exibida
    const joined = setValue('#joined',obj.joined);
    
    // // bio
    const bio = setValue('#bio', obj.bio);

    // repos
    const repos = setValue('#repos', obj.repos);

    // followers
    const followers = setValue('#followers', obj.followers);

    // following
    const following = setValue('#following', obj.following);

    // location
    const location = setValue('#user-location',  `<ion-icon name="location" style="font-size: .8em;"></ion-icon> ${obj.location !== null? obj.location : 'Not Avalilable'}`);

    // blog
    const blog = setValue('#blog', obj.blog !== "" ? obj.blog : 'Not Avalilable');
    blog.setAttribute('href', obj.blog);

    // twitter
    if(obj.twitter !== null) {
        const twitter = setValue('#twitter', `<ion-icon name="logo-twitter"></ion-icon> ${obj.twitter}`);
    } else {
        const value = 'Not Avalilable';
        const twitter = setValue('#twitter', `<ion-icon name="logo-twitter"></ion-icon> ${value}`);

    }
    
    // email
    if(obj.email !== null) {
        const email = setValue('#email', `<ion-icon name="mail-outline"></ion-icon> ${obj.email}`);
    } else {
        const value = 'Not Avalilable';
        const email = setValue('#email', `<ion-icon name="mail-outline"></ion-icon> ${value}`);
    }
}

function setValue(id, value) {

    if(id === '#bio' && value === null) {
        value = 'This profile has no bio';
    }

    const user_content = document.querySelector('.user-content');
    const element = user_content.querySelector(id);
    element.innerHTML = value;
    return element;
}

//TODO: terminar depois

change_theme.addEventListener('click', event => {
   event.preventDefault();
   const body = document.querySelector('body');
   body.classList.add('body-bg');

   const input = document.querySelector('.search');
   input.classList.add('card-bg');

   const card = document.querySelector('.user-content');
   card.classList.add('card-bg');

   const card_user = document.querySelector('.user-content-body');
   card_user.classList.add('body-bg');

   const card_footer = document.querySelector('.user-content-footer');
   const span = card_footer.querySelector('span');
   span.classList.add('text-color');
});