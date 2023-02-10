import React, {useEffect, useReducer} from "react";
import PropTypes from "prop-types";
import {CART_ID_STORAGE_KEY, getLogger} from "../core";
import {MaterialProps} from "./MaterialProps";
import {getMaterials, makeId} from "./materialsAPI";
import { Preferences  } from '@capacitor/preferences';

const log = getLogger('MaterialsProvider');

export interface MaterialsState {
    materials?: MaterialProps[],
    fetching: boolean,
    cartId?: string | null,
    fetchingError?: Error | null,
}

const initialState: MaterialsState = {
    fetching: false,
};

interface ActionProps {
    type: string,
    payload?: any,
}

const FETCH_MATERIALS_STARTED = 'FETCH_MATERIALS_STARTED';
const FETCH_MATERIALS_SUCCEEDED = 'FETCH_MATERIALS_SUCCEEDED';
const FETCH_MATERIALS_FAILED = 'FETCH_MATERIALS_FAILED';

const reducer: (state: MaterialsState, action: ActionProps) => MaterialsState =
    (state, { type, payload }) => {
        switch (type) {
            case FETCH_MATERIALS_STARTED:
                return { ...state, fetching: true, fetchingError: null };
            case FETCH_MATERIALS_SUCCEEDED:
                return { ...state, materials: payload.materials, fetching: false, cartId:payload.cartId };
            case FETCH_MATERIALS_FAILED:
                return { ...state, fetchingError: payload.error, fetching: false };
            default:
                return state;
        }
    };


export const MaterialsContext = React.createContext<MaterialsState>(initialState);

interface MaterialsProviderProps {
    children: PropTypes.ReactNodeLike,
}

export const MaterialsProvider: React.FC<MaterialsProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { materials, fetching, fetchingError, cartId } = state;
    useEffect(getMaterialsEffect, []);
    const value = { materials, fetching, fetchingError, cartId };
    return (
        <MaterialsContext.Provider value={value}>
            {children}
        </MaterialsContext.Provider>
    );

    function getMaterialsEffect() {

        let canceled = false;
        fetchMaterials();
        return () => {
            canceled = true;
        }

        async function fetchMaterials() {
            try {
                log('fetchMaterials started');
                dispatch({ type: FETCH_MATERIALS_STARTED });
                const materials = await getMaterials();
                log('fetchMaterials succeeded');
                if (!canceled) {
                    Preferences.get({key:CART_ID_STORAGE_KEY}).then(({value}) => {
                        if (!value) {
                            Preferences.set({
                                key: CART_ID_STORAGE_KEY,
                                value: makeId(4)
                            }).then(() => {
                                log("Cart key generated")
                            })
                        }
                    })
                    const res = await Preferences.get({ key: CART_ID_STORAGE_KEY });
                    log(res)
                    log(res.value)
                    const cartId = res.value;
                    dispatch({ type: FETCH_MATERIALS_SUCCEEDED, payload: { materials, cartId } });
                }
            } catch (error) {
                log('fetchMaterials failed');
                dispatch({ type: FETCH_MATERIALS_FAILED, payload: { error } });
            }
        }
    }
}
