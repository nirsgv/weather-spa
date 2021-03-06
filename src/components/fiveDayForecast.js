import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFiveDayForecast, getAverage, getType } from "../helpers";
import List from "./list";

function ForecastHeadline({ category, content }) {

    return (
        <div className='forecast-headline'>
            <h1 className='forecast-headline__category'>{category}</h1>
            <h2 className='forecast-headline__content'>{content}</h2>
        </div>
    )
}

function DailyForecast({ day, baseClassName, isFahrenheit }) {
    const { date, temp } = day,
          { Maximum, Minimum } = temp,
          dayTitle = new Date(date).toDateString().split(' ')[0],
          tempAverage = getAverage(Maximum.Value, Minimum.Value);

    return (
        <>
            <div className={`${baseClassName}__title`}>{dayTitle}</div>
            <div className={`${baseClassName}__degree-num`}>{`${tempAverage} ${getType(isFahrenheit)}`}</div>
            <div className={`${baseClassName}__degree-num`}>{`${Minimum.Value} - ${Maximum.Value}`}</div>
        </>
    )
}

function FiveDayForecast({ cityKey, baseClassName, isFahrenheit }) {

    const [ forecast, setForecast ] = useState(null);
    const [ headline, setHeadline ] = useState({});

    useEffect(() => {
        cityKey && getFiveDayForecast(cityKey, isFahrenheit)
            .then(data => {
                if (data && data.Code === "400") {

                } else {
                    setHeadline(Object.assign({}, {
                        category: data.Headline.Category,
                        content: data.Headline.Text
                    }));
                    const dailyForecasts = data.DailyForecasts.map(item => Object.assign({}, {
                        temp: item.Temperature,
                        date: item.Date
                    }));
                    setForecast(dailyForecasts);
                }
            });

        return () => {}
    }, [cityKey, isFahrenheit]);

    return (
        <>
            {
                headline
                && <ForecastHeadline category={headline.category} content={headline.content} />
            }
            <List baseClassName={baseClassName}>
                {forecast && forecast.map((item, index) => <DailyForecast day={item} key={index} baseClassName={baseClassName} isFahrenheit={isFahrenheit}/>)}
            </List>
        </>
    )
}

FiveDayForecast.defaultProps = {
    baseClassName: 'list',
};

FiveDayForecast.propTypes = {
    baseClassName: PropTypes.string,
    children: PropTypes.node,
};


export default FiveDayForecast;