import { types } from 'mobx-state-tree';
import { Cuisine, Category, Establishment, appliedFilters } from './dummy-filters.model';
import {IAppliedFilters} from '../../services/IHttpApiService';
const FiltersModel = types.model('filter', {
    cuisines: types.array(Cuisine),
    categories: types.array(Category),
    establishmentTypes: types.array(Establishment),
    appliedFilters: appliedFilters,
}).actions((self: any) => ({
    setCuisines(cuisineArr: Array<object>) {
        self.cuisines = cuisineArr;
    },
    setCategory(categoryArr: Array<object>) {
        self.categories = categoryArr;
    },
    setEstablishmentTypes(id:  Array<object>) {
        self.establishmentTypeId = id
    },
    setAppliedFilters(filterObject: object ){
        self.appliedFilters = filterObject
    }
})).views((self) => ({
    get filterApplied(){
        const appCuisnies: number[] = self.appliedFilters.cuisines;
        const appCategories: number[] = self.appliedFilters.category;
        const appEstablishmentsTypes: number[] = self.appliedFilters.establishment_type;
        const sortParams: string = self.appliedFilters.sort;
        return appCuisnies.length > 0 || appCategories.length > 0 || appEstablishmentsTypes.length > 0 || sortParams.length > 0;
    }
}))
export default FiltersModel;

