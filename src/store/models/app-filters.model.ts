import { types } from 'mobx-state-tree';
import { Cuisine, Category, Establishment, appliedFilters } from './dummy-filters.model';

const FiltersModel = types.model('filter', {
    cuisines: types.array(Cuisine),
    categories: types.array(Category),
    establishmentTypes: types.array(Establishment),
    appliedFilters: types.map(appliedFilters),
}).actions((self: any) => ({
    setCuisines(cuisineArr: Array<object>) {
        self.cuisines = cuisineArr;
    },
    setCategory(categoryArr: Array<object>) {
        self.categories = categoryArr
    },
    setEstablishmentTypes(id:  Array<object>) {
        self.establishmentTypeId = id
    }
})).views((self) => ({
    get filterStatus(){
        return self.appliedFilters.get
    }
}))
export default FiltersModel;

