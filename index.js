const axios = require('axios');
// accepts an optional object to get repos from git user
const getRepos = async ({
    username = 'mchadds',
    page = 1, 
    per_page = 30
} = {}) => {
    // pass empty object in order to not get an error if no object is passed in and so using default values
    try {
        // making call to github api
        const repos = await axios.get(
            `https://api.github.com/users/${username}/repos?page=${page}&per_page=${per_page}&sort=updated`
        );
        return repos.data
        .map((repo) =>  {
            // selecting required fields of repos
            return {
                name: repo.nameurl,
                url: repo.html_url,
                description: repo.description,
                stars: repo.stargazers_count
            };
        })
        // sorted in descending order based on stars
        .sort((first, second) => second.stars - first.stars);
    }
    catch (error) {
        // return error
        console.log(error);
    }
};

getRepos().then((repositories) => console.log(repositories));