import { types } from 'mobx-state-tree';
const Loader = types.model('Todo', {
   showLoader: false
}).actions(self =>({
        toggleLoader(){
             self.showLoader = true;
    }
}));
export default Loader;

