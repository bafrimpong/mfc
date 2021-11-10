const logger = store => next => action => {
    console.group(action.type);
        // console.log("Action: ", action);
        const value = next(action);
        // console.log("New State: ", store.getState());
    console.groupEnd();

    return value
};

export default logger;