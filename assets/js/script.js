const user_form = document.querySelector('.search-user');

user_form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userName = user_form.querySelector('input').value;

    axios(`https://api.github.com/users/${userName}`)
        .then(json => createObj(json.data))
        .then(obj => loadPage(obj));
});


// guarda as informações do usuário
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


// carrega as informações na página
function loadPage(obj) {
    const user_content = document.querySelector('.user-content');

    // avatar 
    const avatar = user_content.querySelector('#avatar');
    avatar.setAttribute('src', obj.avatar);

    // user name 
    const user_name = setValue('#user-name', obj.name);

    // login
    const login = setValue('#login', `@${obj.login}`);

    // joined 
    const joined = setValue('#joined', dateFormart(obj.joined));

    // // bio
    const bio = setValue('#bio', obj.bio);
    hasEmpty(obj.bio) ?  bio.classList.add('not-avalilable') :  bio.classList.remove('not-avalilable');

    // repos
    const repos = setValue('#repos', obj.repos);

    // followers
    const followers = setValue('#followers', obj.followers);

    // following
    const following = setValue('#following', obj.following);

    // location
    const location = setValue('#user-location', obj.location);
    hasEmpty(obj.location) ? location.classList.add('not-avalilable') : location.classList.remove('not-avalilable');

    // blog
    const blog = setValue('#blog', obj.blog);
    if(obj.blog === "") {
        blog.classList.add('not-avalilable');
        blog.setAttribute('href', "/");
        // blog.addEventListener('click', (e) => {
        //     e.preventDefault();
        // });
    } else {
        blog.classList.remove('not-avalilable');
        blog.setAttribute('href', obj.blog);
    }

    // twitter
    const twitter = setValue('#twitter', obj.twitter);
    hasEmpty(obj.twitter) ? twitter.classList.add('not-avalilable') : twitter.classList.remove('not-avalilable');

    // email
    const email = setValue('#email', obj.email);
    hasEmpty(obj.email) ? email.classList.add('not-avalilable') : email.classList.remove('not-avalilable');

}

// adiciona o valor recebido no corpo da tag
function setValue(id, value) {

    value = checkValue(value, id);

    const user_content = document.querySelector('.user-content');
    const element = user_content.querySelector(id);
    element.innerHTML = value;
    return element;
}

// seta a mensagem default
function checkValue(value, id) {

    const MSG = ['not-avalilable', 'This profile has no bio'];
    
    if (id === '#bio' && value === null) {
        value = MSG[1];
    }

    if(value === null || value === "") {
        value = MSG[0];
    }
    
    return value;
}


// formata a data
function dateFormart(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const df = new Date(date);

    const day = df.getDay();
    const month = df.getMonth();
    const year = df.getFullYear();

    return `Joined ${day < 10? `0${day}` : day} ${months[month]} ${year}`;
}


// verifica se o campo está vazio
function hasEmpty(value) {
    return !(value !== null);
}
