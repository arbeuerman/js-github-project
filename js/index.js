const usersList = document.getElementById('user-list');
//get the search input to send get request
const gitSearchForm = document.getElementById('github-form')
const usersSearchUrl = 'https://api.github.com/search/users';
const usersUrl = 'https://api.github.com/users';

gitSearchForm.addEventListener('submit', getUserInfo);

function getUserInfo(event)
{
    event.preventDefault();
    const userName = event.target.search.value;
    const userUrl = `${usersSearchUrl}?q=${userName}`;
    fetch(userUrl)
    .then(response => response.json())
    .then(displayAllUserData)
    .catch(error => console.log(error));
}

function displayAllUserData(data)
{
    usersList.innerHTML = '';
    data.items.forEach(
        user => displayUserData(user)
    );
}

function displayUserData(user)
{   
    const userElement = document.createElement('div');
    userElement.innerHTML = `
    <p>Username: ${user.login}</p>
    <li><a href=${user.html_url}>Link to profile</a></li>
    <img src = ${user.avatar_url}>
    <br></br>
    `;
    userElement.querySelector('p').addEventListener('click', () => {
        const userRepoUrl = `${usersUrl}/${user.login}/repos`;
        fetch(userRepoUrl)
        .then(res => res.json())
        .then(displayRepos);
    })
    usersList.appendChild(userElement);
}

function displayRepos(repoData)
{
    const reposList = document.getElementById('repos-list');
    repoData.forEach( (repo) => {
        const repoEl = document.createElement('li');
        repoEl.innerHTML = repo.name;
        reposList.append(repoEl);
    })
}