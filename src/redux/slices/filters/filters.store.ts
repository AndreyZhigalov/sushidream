import { filtersSlice } from "./filters.slice";
import { SortItem } from "../../../models";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";

export const useFiltersActions = () => {
    const dispatch = useAppDispatch()
    const { setCategory, setSort, setSearchedItemId, setSubcategory } = filtersSlice.actions
    return {
        setCategory: (item: SortItem) => dispatch(setCategory(item)),
        setSort: (item: SortItem) => dispatch(setSort(item)),
        setSearchedItemId: (id: number) => dispatch(setSearchedItemId(id)),
        setSubcategory: (item: SortItem) => dispatch(setSubcategory(item))
    }
}

export const useFiltersGetters = () => useAppSelector(state => state.filters)