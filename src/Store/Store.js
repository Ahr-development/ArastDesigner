import { createStore } from "redux";
import { applyMiddleware, compose } from "redux";
import { reducers } from "../Reducers/ReducersCombind";
import { LoadCategoriesAction, LoadFontsAction, LoadInitAssetsAction } from "../Actions/AssetsAction";
import { thunk } from 'redux-thunk';
import { SetCurrentUserSignIn, UserUploadsAction } from "../Actions/UserAction";
import { checkAuthenticated } from "../utils/checkAuthenticated";


export const store = createStore(
    reducers,
    applyMiddleware(thunk)
);


async function fetchData() {
    const auth = await checkAuthenticated();
    store.dispatch(SetCurrentUserSignIn(auth));
}


await fetchData()
store.dispatch(LoadFontsAction());
store.dispatch(LoadCategoriesAction())
store.dispatch(LoadInitAssetsAction())