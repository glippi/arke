<p align="center">
   <img src="https://github.com/glippi/arke/blob/master/img/arke.png" width="700"/>
</p>

# ἀρχή: how everything started
>the initial (starting) point

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/arke.svg)](https://npmjs.org/package/arke)
[![CircleCI](https://circleci.com/gh/glippi/arke.svg?style=svg)](https://circleci.com/gh/glippi/arke)
[![Downloads/week](https://img.shields.io/npm/dw/arke.svg)](https://npmjs.org/package/arke)
[![License](https://img.shields.io/npm/l/arke.svg)](https://github.com/glippi/arke/blob/master/package.json)


# About

Often I found myself looking at a project that I like and thinking: "How does
this thing start in the very beginning?", but then, finding the first commit it's
not so straightforward; so...this how I met the idea of **arke**.


# What is Arke

Arke is a **cli** utility, written in JavaScript, that given an **owner** and a **repository** will give you
the url where you can find the first commit of the repository you are looking
for.


# Installation

```sh-session
$ npm install -g arke
```
or you can immediately using it without the need of installation with:
```sh-session
$ npx arke
```


# Usage

You can use arke in two ways:

1) passing to the **-f** flag the **repositoryOwner** followed by a ***/** and the **repository**, for example:

```sh-session
$ npx arke -fglippi/arke
```

2) answering the questions that cli will prompt to you, in this case you just have to write **arke** and hit enter:
```sh-session
$ npx arke
```
then the cli will ask you for owner and repository name like below:
```sh-session
$ Enter repository name
$ Enter repository author
```


## About the name

*ἀρχή* is a greek word which means *beginning*. More details [here](https://www.biblehub.com/greek/746.htm)


## License

MIT
