import { types } from 'mobx-state-tree';
const ActivityLoaderModel = types.model('Todo', {
   showLoader: types.boolean
}).actions((self: any) =>({
        toggleLoader(flag: boolean){
             self.showLoader = flag;
    }
}));
export default ActivityLoaderModel;

