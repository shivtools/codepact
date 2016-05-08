import json
import urllib2

def get_repos(username):
    endpoint = "https://api.github.com/users/" + username + "/repos"
    repos = json.load(urllib2.urlopen(endpoint))
    repo_list = []
    for repo in repos:
        repo_list.append(repo['full_name'])
    return repo_list

def get_num_of_commits(repo):
    endpoint = "https://api.github.com/repos/" + repo + "/stats/contributors"
    repos = json.load(urllib2.urlopen(endpoint))

if __name__ == '__main__':
    username = 'zillwc'
    #repos = get_repos(username)
    num_of_commits = get_num_of_commits("_codepact")