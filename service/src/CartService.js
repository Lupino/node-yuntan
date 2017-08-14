import Gateway from 'yuntan-gateway';
import moment from 'moment';


export default class CartService extends Gateway {
  constructor(options) {
    super({...options, secure: true})
  }

  addProduct(username, {product_id, num=1}){
    const pathname = `/api/cart/${username}/`;
    return this.requestJSON({pathname, method: 'POST', form: {product_id, num}},
                            'result');
  }

  getCart(username){
    const pathname = `/api/cart/${username}/`;
    return this.requestJSON({pathname}, 'result');
  }

  removeProduct(username, product_id){
    const pathname = `/api/cart/${username}/`;
    return this.requestJSON({pathname, method: 'DELETE', form: {product_id}},
                             'result');
  }

  createOrder({username, amount, body={},
               order_sn=`D${moment().format('YYYYMMDDHHmmss')}`,
               status="created"}) {
    const pathname = '/api/orders/';
    return this.requestJSON({pathname, method: 'POST',
                             form: {username, amount, body, order_sn, status}});
  }

  updateOrderStatus(orderIdOrSN, status) {
    const pathname = `/api/orders/${orderIdOrSN}/status/${status}/`;
    return this.requestJSON({pathname, method: 'POST'}, 'result');
  }

  updateOrderStatusByUserName(username, orderIdOrSN, status) {
    const pathname = `/api/orders_by/user/${username}/${orderIdOrSN}/status/${status}/`;
    return this.requestJSON({pathname, method: 'POST'}, 'result');
  }

  updateOrderBody(orderIdOrSN, body) {
    const pathname = `/api/orders/${orderIdOrSN}/body/`;
    return this.requestJSON({pathname, method: 'POST', form: {body}}, 'result');
  }

  updateOrderAmount(orderIdOrSN, amount) {
    const pathname = `/api/orders/${orderIdOrSN}/amount/`;
    return this.requestJSON({pathname, method: 'POST', form: {amount}}, 'result');
  }

  getOrderList({from = 0, size = 10} = {}){
    const pathname = '/api/orders/';
    return this.requestJSON({pathname, query: {from, size}});
  }

  getOrderListByStatus(status, {from = 0, size = 10} = {}){
    const pathname = `/api/orders_by/status/${status}/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  getOrderListByUserName(username, {from = 0, size = 10} = {}){
    const pathname = `/api/orders_by/user/${username}/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  getOrderListByUserNameAndStatus(username, status, {from = 0, size = 10} = {}){
    const pathname = `/api/orders_by/user/${username}/status/${status}`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  getOrder(orderIdOrSN){
    const pathname = `/api/orders/${orderIdOrSN}/`;
    return this.requestJSON({pathname});
  }

  removeOrder({orderIdOrSN}){
    const pathname = `/api/orders/${orderIdOrSN}/`;
    return this.requestJSON({pathname, method: 'DELETE'}, 'result');
  }
}
