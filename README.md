# how to create the project with the sample
run this command in the terminal gitbash to run it as linux
```
npm init -y // create the package.json by default
npm i --save-dev @wdio/cli // install webdrioverio CLI
./node_modules/.bin/wdio config -y // create a sample and setup the project by default
./node_modules/.bin/wdio run wdio.conf.js // run the project and you can see the test by default
```


# how to setup your local environment
```
1 - install VSCode (from website: https://code.visualstudio.com/download)
2 - install git (from website: https://git-scm.com/downloads)
3 - clone repository -> on console: git clone 
4 - install node.js (from website: https://nodejs.org/en/download/)
5 - verify installation -> on console: 
        node -v            
        npm -v
6 - npm install
7 - npx wdio
