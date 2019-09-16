/*
 * Store: This file act as a top level store to store model dependencies.
 * It is a root store for mobx-state-tree.
 */

import { types } from 'mobx-state-tree';
import ActivityLoaderModel from './models/app-loader.model';

/** 
 * @description App Store Model Initialize
 */
const AppModel = types.model({
    loader: ActivityLoaderModel,
});

/** 
 * @description App Store Creation
 */
export const AppStore = AppModel.create({
    loader: {   
        showLoader: false
    },

});

 