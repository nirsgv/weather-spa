import React, { useState } from 'react';
import { connect } from "react-redux";
import { toggleFavCity } from "../actions";
import { bindActionCreators } from "redux";
import CurrentWeather from "../components/currentWeather";
import List from "../components/list";
import FavToggle from "../components/favToggle";


function Favorites({ favCities }) {

    return (
        <List baseClassName={'favorites'}>
            {favCities.map(item => <>
                <FavToggle cityKey={item} favCities={favCities} toggleFavCity={toggleFavCity} />
                {/*<button onClick={toggleFavCity}*/}
                <CurrentWeather cityKey={item} />
            </>)}
        </List>
    );
}


const mapStateToProps = state => ({
    favCities: state.appData.favCities,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleFavCity
}, dispatch);



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favorites);
