import { InMemoryDbService } from 'angular-in-memory-web-api';

export class OrderData implements InMemoryDbService { 
    
    createDb(){
        let orders = [{
            id:1,
            firstName:"AA"
        }];

        return {orders}
    } 


}  