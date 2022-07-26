import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categories: [
        {
            "ruTitle": "Новинки",
            "engTitle": "new"
        },
        {
            "ruTitle": "Ланч",
            "engTitle": "lunch"
        },
        {
            "ruTitle": "Сет на одного",
            "engTitle": "one-person-box"
        },
        {
            "ruTitle": "Сет на компанию",
            "engTitle": "company-box"
        },
        {
            "ruTitle": "Жаренные роллы",
            "engTitle": "fried-roll"
        },
        {
            "ruTitle": "Калифорния",
            "engTitle": "california"
        },
        {
            "ruTitle": "Фреш роллы",
            "engTitle": "fresh-roll"
        },
        {
            "ruTitle": "Маки",
            "engTitle": "maki"
        },
        {
            "ruTitle": "Суши",
            "engTitle": "sushi"
        },
        {
            "ruTitle": "Чаши",
            "engTitle": "bowels"
        },
        {
            "ruTitle": "Чираши и Сашими",
            "engTitle": "chirashi-sashimi"
        },
        {
            "ruTitle": "Тартар и Севич",
            "engTitle": "tartar-sevich"
        },
        {
            "ruTitle": "Якитори, Темпура, Рамён и Карри",
            "engTitle": "yakitory-tempura-ramen-curry"
        },
        {
            "ruTitle": "ДЕТСКОЕ МЕНЮ",
            "engTitle": "kids-menu"
        },
        {
            "ruTitle": "Аккомпанемент",
            "engTitle": "accompaniment"
        },
        {
            "ruTitle": "Десерты",
            "engTitle": "dessert"
        },
        {
            "ruTitle": "Напитки",
            "engTitle": "drinkables"
        }
    ],
    sortTypes: [
        {
            "ruTitle": "названию",
            "engTitle": "title"
        },
        {
            "ruTitle": "цене по возрастанию",
            "engTitle": "price+"
        },
        {
            "ruTitle": "цене по убыванию",
            "engTitle": "price"
        },
        {
            "ruTitle": "популярности",
            "engTitle": "rating"
        },
        {
            "ruTitle": "цене за штуку",
            "engTitle": "cheapest"
        }
    ],
    currentSortType: {
        "ruTitle": "популярности",
        "engTitle": "rating"
    },
    currentCategory: {
        "ruTitle": "Новинки",
        "engTitle": "new"
    }
}

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategory(state, action) {
            state.currentCategory = action.payload
        },
        setSort(state, action) {
            state.currentSortType = action.payload
        },
    }
})

export const { setCategory, setSort } = filtersSlice.actions;
export default filtersSlice.reducer