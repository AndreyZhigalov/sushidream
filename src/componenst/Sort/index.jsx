import React from 'react'
import styles from './Sort.module.scss'

export const Sort = ({ sortItemsList, activeSortType }) => {
    const [visibility, setVisibility] = React.useState(false)


    const sortType = ["названию", "цене по возрастанию", "цене по убыванию", "популярности", "цене за штуку"]



    return (
        <div className={styles.sort}>
            Сортировка по <span onClick={() => setVisibility(!visibility)}>{sortType[activeSortType]}</span>
            <svg onClick={() => setVisibility(!visibility)}
                width="15" height="10" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 19L15 4L27.5 19" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
            {visibility && <div className={styles.optionsList}>
                {sortType.map((type, i) =>
                    <p onClick={() => { sortItemsList(i); setVisibility(!visibility) }}
                        className={activeSortType === i ? styles.active : ''} key={i}>{type}</p>)}
            </div>}
        </div>
    )
}
