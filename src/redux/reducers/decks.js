import {
    ADD_CARD_TO_DECK,
    DELETE_DECK,
    GET_DECKS,
    GET_DECK_BY_ID,
    SAVE_DECK_TITLE
} from "../../utils/generics";

export default function decks(state = {}, action) {
    switch (action.type) {
        case GET_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case GET_DECK_BY_ID:
            const { deckById } = action;
            return {
                ...state,
                [deckById]: {
                    ...state[deckById]
                }
            }
        case SAVE_DECK_TITLE:
            const { deck } = action;
            return {
                ...state,
                [deck.id]: deck
            };
        case ADD_CARD_TO_DECK:
            const { deckId, card } = action;
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    questions: state[deckId].questions.concat([card])
                }
            };
        case DELETE_DECK:
            console.log("Deleting...3", state[action.deckId])
            delete state[action.deckId];
            return {
                ...state
            };
        default:
            return state;
    }
}
