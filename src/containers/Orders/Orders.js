import React, { Component } from 'react';
import axios from '../../axios-order';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                let fetchOrder = [];
                for (let key in res.data) {
                    fetchOrder.push({
                        ...res.data[key],
                        id: key
                    })
                };

                this.setState({ loading: false, orders: fetchOrder })
            })
            .catch(error => {
                this.setState({ loading: false })
            });
    };

    render() {
        return (
            <div>
                {this.state.orders.map(order=>(
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    />
                ))}
            </div>
        )
    }
};

export default withErrorHandler(Orders, axios);