import { types } from 'mobx-state-tree';
import Loader from './loader'; 
const RootModel = types.model('Todo', { 
  Todo: types.array(Loader)
}).actions(self =>({
    add(task: any){
     self.Todo.push(task);
       }
  }));
export default RootModel;