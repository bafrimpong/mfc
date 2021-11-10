# UdaciCard?

A mobile application (Android or iOS - or both) that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

## Essence of the App:

The App is a 3rd project out of 3 in a path I am following at Udacity titled React Nanodegree. It encompasses the fundamental aspects of building a native application including handling infinite lists, routing, and user input.

## Loading the App

The project uses the Create-React-Native-App in creating the starter template. 
The `create-react-native-app` command can be issued at your favourite command line tool only when Node is installed or you can use yarn.

Clone the app from my GitHub repo using the command 
```git clone https://github.com/bafrimpong/udacicards.git && npm install```

When all the dependencies are installed, launch the app with

```
expo run:android for Android device
```
OR
```
expo run:ios  for iOS device
```

## How to Use the App

- Please follow the inserted video to see how the App works 

# Database

The App uses AsyncStorage to store data.

The `AppDataSource.js` file represents a fake database and methods that let you access the data. The only thing you need to edit in the ` _DATA.js` file is the value of `avatarURL`. Each user should have an avatar, so you’ll need to add the path to each user’s avatar.

Using the provided starter code, you'll build a React/Redux front end for the application. We recommend using the [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

## Data

There are two types of objects stored in our database:

* Users
* Questions


The app code will talk to the database via the following methods:

* `getDecks()`
* `getSaveDeckTitle(title)`
* `addCardToDeck(deckId, card)`

1) `getDecks()` Method

*Description*: Gets all of the existing decks from the database.  
*Return Value*: a deck object with id, title, and questions.

2) `getSaveDeckTitle(title)` Method

*Description*: Saves a deck with its title to the database.  
*Return Value*: A deck obejct with it's title

3) `addCardToDeck(deckId, card)` Method

*Description*: Saves a card to a specified deck with the deck id and the card.  
*Parameters*:  A deck object with the card
*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

## Contributing

This repository is free for *all* especially Udacity students. Therefore, you can clone and use it without any refrence to me.

## Resources and References

I passed through different learning materials from various websites to be able to complete this project which have listed them in a `references.txt` which you can use to learn more.