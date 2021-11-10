import { 
    addCardToDeck, 
    deleteDeck, 
    getDeckById, 
    getDecks, 
    saveDeckTitle 
} from "../../utils/AppDataSource";
import {
    ADD_CARD_TO_DECK,
    DELETE_DECK,
    GET_DECKS,
    GET_DECK_BY_ID,
    SAVE_DECK_TITLE
} from "../../utils/generics";

export function _getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    };
}

export function _getDeckById(deckById) {
    return {
        type: GET_DECK_BY_ID,
        deckById
    }
}

export function _saveDeckTitle(deck) {
    return {
        type: SAVE_DECK_TITLE,
        deck
    };
}

export function _addCardToDeck(deckId, card) {
    return {
        type: ADD_CARD_TO_DECK,
        deckId,
        card
    };
}

export function _deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId
    };
}

/**
 * 
 * @returns 
 */
export function handleGetDecks() {
    return dispatch => {
        return getDecks()
            .then((decks) => {
                dispatch(_getDecks(decks));
            });
    };
}

/**
 * 
 * @param {*} title 
 * @returns 
 */
export function handleGetDeck(title) {
    return dispatch => {
        return getDeckById(title)
            .then((deck) => {
                dispatch(_getDeckById(deck));
            });
    };
}

/**
 * 
 * @param {*} deckTitle 
 * @returns 
 */
export function handleSaveDeckTitle(deckTitle) {
    return dispatch => {
        return saveDeckTitle(deckTitle)
            .then((deck) => {
                dispatch(_saveDeckTitle(deck));
            });
    };
}

/**
 * 
 * @param {*} deckId 
 * @param {*} card 
 * @returns 
 */
export function handleAddCardToDeck(deckId, card) {
    return dispatch => {
        return addCardToDeck(deckId, card)
            .then(() => {
                dispatch(_addCardToDeck(deckId, card));
            });
    };
}

/**
 * 
 * @param {*} deckId 
 * @returns 
 */
export function handleDeleteDeck(deckId) {
    console.log("Deleting...2", deckId)
    return dispatch => {
        return deleteDeck(deckId)
            .then(() => {
                dispatch(_deleteDeck(deckId));
            });
    };
}