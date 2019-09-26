import { types } from 'mobx-state-tree';
import { Cuisine, Category, Establishment } from './dummy-filters.model';

const FiltersModel = types.model('filter', {
    cuisines: types.array(Cuisine),
    categories: types.array(Category),
    establishmentTypes: types.array(Establishment)
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
}));
export default FiltersModel;

