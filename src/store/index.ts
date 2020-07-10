import * as Redux from "redux";
import * as Action from "./ActionTypes"
// import {logout} from "../actions";

const local = localStorage.getItem('user');

/**
 * 스토어 스텟
 */
export interface storeState {
	login: boolean,
	auth?: {
		name:string,
	}
}



/**
 * 기본 스토어s
 */
const initialState: storeState = local != null ? JSON.parse(local) : {
	login: false,
	auth: {
		name: ''//유저 네임
	}
}
/**
 * 액션 타입
 */
export interface actionType {
	type: string,
	payload?: any
}



function reducer(state = initialState, action: actionType): storeState {
	let res:storeState=state;
	switch (action.type) {
		case Action.LOGIN:
			res={...state, login: true, auth: {name: action.payload.name}};//로그인 됨
			break;
		case Action.LOGOUT:
			res={login: false};//로그인 됨
			break;
	}
	//로컬에 저장
	localStorage.setItem('user',JSON.stringify(res))
	return res;
}
const store=Redux.createStore(reducer);

if(local){
	const j=JSON.parse(local);
	if(j.login)
		fetch('/api/isLogin?name='+j.auth.name,{
			headers:{
				"accept":"application/json",
				"content-type":"application/json",
			}
		})
			.then(res=>res.json())
			.then(res=>{
				if(!res.su)
					store.dispatch({
						type: Action.LOGOUT
					})
			})
}

export default store;
