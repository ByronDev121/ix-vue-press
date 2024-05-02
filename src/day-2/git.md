# Git & Github

## Git CLI cheat sheet

Initialize local repository and connect it to github
```git
git init
git remote add origin  <REMOTE_URL> 
```

Alternatively - Copy a repo to your local machine
```git
git clone <url>
```

Find out the status of all your files
```git
git status
```

Bring the code down from your repository
```git
git pull <remote> <branch>

git pull origin master
```

Add all of your changes to be committed
```git
git add .
```

Commit your changes to the version history
```git
git commit -m "My cool new version"
```

Push your changes up to the remote
```git
git push <remote> <branch>

git push origin master
```

Create new local branch and checkout into newly created branch
```git
git brach <branch-name>

get checkout <branch-name>
```

Push changes to remote repository
```git
git push origin <branch-name>
```

Merge changes from master branch into the
```git
git push origin <branch-name>
``` 

Check local branches
```git
git branch -l
``` 

Check remote branches
```git
git remote show origin
``` 
