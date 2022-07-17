import React from 'react'
import styles from './Sort.module.scss'

export const Sort = ({ setAssortmentList, activeCategory }) => {
    const [visibility, setVisibility] = React.useState(false)
    const [activeSortType, setActiveSortType] = React.useState(0)

    const sortType = ["названию", "цене по возрастанию", "цене по убыванию", "популярности", "цене за штуку"]

    const sortItemsList = (i) => {
        setActiveSortType(i);
        setVisibility(!visibility)
        if (i === 0) {
            // сортировка по названию
            setAssortmentList((prev) => {
                let arr = []
                for (let category in prev) {
                    prev[category] === prev[activeCategory] ? arr.push(prev[category].sort((a, b) => a["title"].charCodeAt(0) - b["title"].charCodeAt(0))) : arr.push(prev[category]);
                }
                return arr
            })
        } else if (i === 1) {
            // сортировка по цене по возрастанию
            setAssortmentList((prev) => {
                let arr = []
                for (let category in prev) {
                    prev[category] === prev[activeCategory] ? arr.push(prev[category].sort((a, b) => a["price"] - b["price"])) : arr.push(prev[category]);
                }
                return arr
            })
        } else if (i === 2) {
            // сортировка по цене по убыванию
            setAssortmentList((prev) => {
                let arr = []
                for (let category in prev) {
                    prev[category] === prev[activeCategory] ? arr.push(prev[category].sort((a, b) => b["price"] - a["price"])) : arr.push(prev[category]);
                }
                return arr
            })
        } else if (i === 3) {
            // сортировка по популярности
            setAssortmentList((prev) => {
                let arr = []
                for (let category in prev) {
                    prev[category] === prev[activeCategory] ? arr.push(prev[category].sort((a, b) => b["rating"] - a["rating"])) : arr.push(prev[category])
                }
                return arr
            })
        } else if (i === 4) {
            // сортировка по цене за штуку
            setAssortmentList((prev) => {
                let arr = []
                for (let category in prev) {
                    prev[category] === prev[activeCategory] ? arr.push(prev[category].sort((a, b) => (a["price"] / a["portion"]) - (b["price"] / b["portion"]))) : arr.push(prev[category]);
                }
                return arr
            })
        }


    }

    return (
        <div className={styles.sort}>
            Сортировка по <span onClick={() => setVisibility(!visibility)}>{sortType[activeSortType]}</span>
            <svg onClick={() => setVisibility(!visibility)} width="15" height="10" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 19L15 4L27.5 19" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
            {visibility && <div className={styles.optionsList}>
                {sortType.map((type, i) =>
                    <p onClick={() => sortItemsList(i)} className={activeSortType === i ? styles.active : ''} key={i}>{type}</p>)}
            </div>}
        </div>
    )
}
