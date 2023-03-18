import React, {useState, useEffect, createContext} from "react";
import {fetchDataFromApi} from '../utils/api'

export const Context = createContext();

export const AppContext = (props)=>{
    // golbal states managed through context api
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResults] = useState(false)// this state changes based on the fetchSelectedCategoryData function
    const [selectCategories, setSelectCategories] = useState('New')
    const [mobileMenu, setMobileMenu] = useState(false)

    useEffect(()=>{
        fetchSelectedCategoryData(selectCategories)
    },[selectCategories])

    //chnaging the category based on the click of sidebar menu
    const fetchSelectedCategoryData = (query)=>{
        setLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then(({contents})=>{
            // console.log(contents)
            setSearchResults(contents)
            setLoading(false)
        })
    }

    return(
        <Context.Provider
            value={
                {
                    loading, setLoading,
                    searchResults, setSearchResults,
                    selectCategories, setSelectCategories,
                    mobileMenu, setMobileMenu
                }
            }
        >
            {props.children}
        </Context.Provider>
    )
}