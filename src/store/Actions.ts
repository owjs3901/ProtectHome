import {LOGIN, LOGOUT} from './ActionTypes'
import {actionType} from "./index";

export function login(auth:any):actionType {

	return {
		type: LOGIN,
		payload: auth
	};
}
export function logout():actionType {
	fetch('/api/logout',{
		headers:{
			"accept":"application/json",
			"content-type":"application/json",
		}
	}).catch(e=>console.error(e))
	return {
		type: LOGOUT,
	};
}
