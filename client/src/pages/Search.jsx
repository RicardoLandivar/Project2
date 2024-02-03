import React, { useState } from "react";

import "../css/search.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { HEARTH_API_URL, hearthApiOptions } from "../routes/Api.js";
import CurrentCard from "../components/CurrentCard.jsx";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(
            `${HEARTH_API_URL}/cards/${inputValue}?collectible=1'`,
            hearthApiOptions
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.map((card) => {
                        return {
                            value: `${card.cardId} ${card.dbfID}`,
                            label:`${card.name}, ${card.cardSet}`,

                        }
                    }),
                };
            })
            .catch((err) => {
                console.error(err);
                return { options: [] }; // Return empty options array in case of error
            });
    };

    const handleOnSearchChange = (searchData) => {
      const [name] = searchData.value.split(" ");
      const currentCardFetch = fetch(`${HEARTH_API_URL}/cards/${name}?collectible=1'`, hearthApiOptions )
      
      Promise.all([currentCardFetch])
      .then (async (response) => {
        const cardResponse = await response[0].json();

        setSearch({...cardResponse[0]});
      })
      .catch((err) => console.log(err));
    }

    return (
        <>
            <AsyncPaginate
                placeholder="Search for card"
                debounceTimeout={600}
                value={search}
                onChange={handleOnSearchChange}
                loadOptions={loadOptions}
            />
            <CurrentCard card={search} />
        </>
    )
};



export default Search;