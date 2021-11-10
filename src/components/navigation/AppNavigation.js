import React from 'react';
import { connect } from 'react-redux';
import { createArrayFromDeckListObject } from '../../utils/generics';
import { NavigationContainer } from '@react-navigation/native';
import Nav from './Nav';

const AppNavigation = ({ ...props }) => {
    const _deckListArray = createArrayFromDeckListObject(props.decks.decks)

    return (
        <NavigationContainer>
            <Nav deckList={_deckListArray} />
        </NavigationContainer>
    )
}

function mapStateToProps(decks) {
    return { decks }
}

export default connect(mapStateToProps)(AppNavigation);