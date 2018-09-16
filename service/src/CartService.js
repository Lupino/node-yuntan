import Gateway from 'yuntan-gateway';
import dayjs from 'dayjs';


/**
 * CartService
 * @class CartService
 * @param {Object} config Service config
 * @param {String} [config.host=https://gw.huabot.com] Service host
 * @param {String} config.key Service key
 * @param {String} [config.secret] Service secret
 * @param {signSecret} [config.signSecret] dynamic secret sign function
 */
export default class CartService extends Gateway {
  /* eslint-disable require-jsdoc */
  constructor(options) {
    super({...options, secure: true});
  }
  /* eslint-enable require-jsdoc */

  /* eslint-disable camelcase */
  addProduct(username, {product_id, num=1}) {
    const pathname = `/api/cart/${username}/`;
    return this.requestJSON({pathname, method: 'POST', form: {product_id, num}});
  }
  /* eslint-enable camelcase */

  getCart(username) {
    const pathname = `/api/cart/${username}/`;
    return this.requestJSON({pathname});
  }

  /* eslint-disable camelcase */
  removeProduct(username, product_id) {
    const pathname = `/api/cart/${username}/`;
    return this.requestJSON({pathname, method: 'DELETE', form: {product_id}});
  }
  /* eslint-enable camelcase */

  /* eslint-disable camelcase */
  createOrder({username, amount, body={},
    order_sn=`D${dayjs().format('YYYYMMDDHHmmss')}`,
    status='created'}) {
    const pathname = '/api/orders/';
    body = JSON.stringify(body);
    return this.requestJSON({pathname, method: 'POST',
      form: {username, amount, body, order_sn, status}});
  }
  /* eslint-enable camelcase */

  updateOrderStatus(orderIdOrSN, status) {
    const pathname = `/api/orders/${orderIdOrSN}/status/${status}/`;
    return this.requestJSON({pathname, method: 'POST'});
  }

  updateOrderStatusByUserName(username, orderIdOrSN, status) {
    const pathname = `/api/orders_by/user/${username}/${orderIdOrSN}/` +
      `status/${status}/`;
    return this.requestJSON({pathname, method: 'POST'});
  }

  updateOrderBody(orderIdOrSN, body) {
    const pathname = `/api/orders/${orderIdOrSN}/body/`;
    body = JSON.stringify(body);
    return this.requestJSON({pathname, method: 'POST', form: {body}});
  }

  updateOrderAmount(orderIdOrSN, amount) {
    const pathname = `/api/orders/${orderIdOrSN}/amount/`;
    return this.requestJSON({pathname, method: 'POST', form: {amount}});
  }

  getOrderList({from = 0, size = 10} = {}) {
    const pathname = '/api/orders/';
    return this.requestJSON({pathname, query: {from, size}});
  }

  getOrderListByStatus(status, {from = 0, size = 10} = {}) {
    const pathname = `/api/orders_by/status/${status}/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  getOrderListByUserName(username, {from = 0, size = 10} = {}) {
    const pathname = `/api/orders_by/user/${username}/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  getOrderListByUserNameAndStatus(username, status,
    {from = 0, size = 10} = {}) {
    const pathname = `/api/orders_by/user/${username}/status/${status}`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  getOrder(orderIdOrSN) {
    const pathname = `/api/orders/${orderIdOrSN}/`;
    return this.requestJSON({pathname});
  }

  removeOrder(orderIdOrSN) {
    const pathname = `/api/orders/${orderIdOrSN}/`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }
}
