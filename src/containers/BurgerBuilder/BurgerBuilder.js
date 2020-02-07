import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-order';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitgredients();
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const newPrice = this.state.totalPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
    //     this.updatePurchaseSate(updatedIngredient);
    // };

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICE[type];
    //     const newPrice = this.state.totalPrice - priceDeduction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
    //     this.updatePurchaseSate(updatedIngredient);
    // };

    updatePurchaseSate = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);
        return sum > 0
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseCountinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // };
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });

        this.props.history.push('./checkout');
    };

    render() {
        const disableInfo = {
            ...this.props.ings
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        };

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseSate(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseCountinueHandler}
                price={this.props.price}
            />
        };

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error:state.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitgredients:()=>dispatch(burgerBuilderActions.initIngredient())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));