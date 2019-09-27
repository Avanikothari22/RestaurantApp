import { types } from 'mobx-state-tree';

const CuisineModel = types.model('cuisineObject', {
    cuisine_id: types.number,
    cuisine_name: types.string,
}) 

const EstablishmentObject = types.model('EstablishmentObject',{
    id: types.number,
    name: types.string,
})

export const Establishment = types.model('EstablishmentObject', {
    establishment: EstablishmentObject
});

const  CategoryObject = types.model('CategoryObject', {
    id: types.number,
    name: types.string,
})

export const Category = types.model('Category', {
    categories: CategoryObject
});

export const Cuisine = types.model('Cuisine', { 
   cuisine: CuisineModel
  })

export const appliedFilters = types.model('appliedfilters', {
    cuisines: types.array(types.number),
    category: types.array(types.number),
    establishment_type: types.array(types.number),
    sort: types.string
})