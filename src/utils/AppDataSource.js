import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values'
import { v4 as uuidv4 } from "uuid";
const DATA_STORAGE_KEY = "udacicards_data_key";

const _defaultDecks = {
    "64cb4a80-3dd9-11ec-9bbc-0242ac130002": {
        id: "64cb4a80-3dd9-11ec-9bbc-0242ac130002",
        title: "Biology",
        questions: [
            {
                question: "Give an example of seedless vascular plants",
                answer: "Fern"
            },
            {
                question: "What is Sporophyll?",
                answer: "Leaves with associated sporangia"
            },
            {
                question: "It is much easier for a small animal to run uphill than for a large animal, because",
                answer: "Smaller animals have a higher metabolic rate"
            }
        ]
    },
    "64cb4ca6-3dd9-11ec-9bbc-0242ac130002": {
        id: "64cb4ca6-3dd9-11ec-9bbc-0242ac130002",
        title: "Physics",
        questions: [
            {
                question: "Who invented the spinning cup anemometer?",
                answer: "Thomas Romney Robinson (1846)"
            },
            {
                question: "Who tried to prove that air is weightless?",
                answer: "Voltaire"
            },
            {
                question: "When does the value of energy become zero for an electron?",
                answer: "Far away from the nucleus"
            },
            {
                question: "A petrol engine used to mix petrol and air in a certain ratio for combustion, is",
                answer: "Carburettor"
            }
        ]
    },
    "64cb4da0-3dd9-11ec-9bbc-0242ac130002": {
        id: "64cb4da0-3dd9-11ec-9bbc-0242ac130002",
        title: "Object Oriented Programming",
        questions: [
            {
                question: "What is a class?",
                answer: "A class defines the template or the definition of an object. It is used for creating objects at run time"
            },
            {
                question: "What do you mean by an object",
                answer: "An object refers to the run time instance created from the class during program execution"
            },
            {
                question: "Is it always necessary to create objects from class",
                answer: "No, it is possible to call a base class method if it is defined as a static method"
            }
        ]
    },
    "64cb503e-3dd9-11ec-9bbc-0242ac130002": {
        id: "64cb503e-3dd9-11ec-9bbc-0242ac130002",
        title: "Ruby",
        questions: [
            {
                question: "What is Ruby programming language?",
                answer: "Ruby is a dynamic, reflective, general purpose, open source programming language that focuses on simplicity and productivity"
            },
            {
                question: "Who is the developer of Ruby?",
                answer: "Ruby is designed and developed by Yukihiro 'martz' Matsumoto in mid 1990 in Japan"
            },
            {
                question: "Write the command to get installed Ruby version in your system",
                answer: "ruby -v"
            }
        ]
    },
    "64cb5110-3dd9-11ec-9bbc-0242ac130002": {
        id: "64cb5110-3dd9-11ec-9bbc-0242ac130002",
        title: "Internation Current Affairs",
        questions: [
            {
                question: "Which international organisation has decided to hold a meeting on December 1, 2020 to commemorate victims of World War II?",
                answer: "UN General Assembly"
            },
            {
                question: "Who has been elected as the Vice President of United States of America?",
                answer: "Kamala Harris"
            },
            {
                question: "World Health Organisation has launched global strategy to eradicate which disease by 2050?",
                answer: "Cervical Cancer"
            }
        ]
    }
}

/**
 * 
 * @returns 
 */
export function getDecks() {
    return AsyncStorage.getItem(DATA_STORAGE_KEY)
        .then((_resolve) => {
            if (_resolve) {
                return JSON.parse(_resolve);
            } else {
                return AsyncStorage.setItem(DATA_STORAGE_KEY,
                    JSON.stringify(_defaultDecks))
            }
        })
}

/**
 * 
 * @param {*} _deckID 
 * @returns 
 */
export function getDeckById(_deckID) {
    return AsyncStorage
        .getItem(DATA_STORAGE_KEY)
        .then((_results) => _results[_deckID]);
}

/**
 * Saves or adds a `Deck` with the title as its name
 * @param {*} _title name or title of the deck
 * @returns a deck object
 */
export function saveDeckTitle(_title) {
    const _deckID = uuidv4();
    console.log("saveDeckTitle ~ _deckID", _deckID)
    return AsyncStorage
        .mergeItem(
            DATA_STORAGE_KEY,
            JSON.stringify({
                [_deckID]: {
                    id: _deckID,
                    title: _title,
                    questions: []
                }
            })
        );
}

/**
 * 
 * @param {*} _deckID 
 * @param {*} _card 
 * @returns 
 */
export function addCardToDeck(_deckID, _card) {
    return AsyncStorage
        .getItem(DATA_STORAGE_KEY)
        .then((_results) => {
            const _oldDecks = JSON.parse(_results);
            console.log("_results", _deckID)
            console.log("~ _oldDecks", _oldDecks)
            const _newDeck = _oldDecks[_deckID];
            _newDeck.questions = _newDeck.questions.concat([_card]);

            AsyncStorage.mergeItem(DATA_STORAGE_KEY, JSON.stringify({
                [_deckID]: _newDeck
            }));
        });
}

/**
 * 
 * @param {*} _title 
 * @returns 
 */
export function deleteDeck(_title) {
    return AsyncStorage
        .getItem(DATA_STORAGE_KEY)
        .then((_resolve) => {
            const _deck = JSON.parse(_resolve);
            _deck[_title] = undefined;
            delete _deck[_title];
            AsyncStorage
                .setItem(DATA_STORAGE_KEY, JSON.stringify(_deck));
        });
}