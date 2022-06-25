import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga"; // redux-saga를 생성하기 위한 라이브러리
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

//import withReduxSaga from 'next-redux-saga'; // next와 redux-saga를 연결하기 위한 라이브러리
//생략 가능 Dependency를 최소화 하기 위해 withReduxSaga 지움.
/*
wrapper(_app.js를 감싸고 있음)로 개별 페이지의 SSR을 적용함. 
기존에 next에서 SSR 렌더링용 메서드를 4가지 정도 지원하고 있는데,
Redux랑 사용할 때는 문제가 있어서 Next-Redux-Wrapper가 제공하는 SSR 렌더링용 메서드와 
같이 사용하려 한다.
*/
import reducer from "./reducers";
import rootSaga from "./sagas"; //사가 가져옴

const makeStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware];
	const enhancer =
		process.env.NODE_ENV === "production"
			? compose(applyMiddleware(...middlewares))
			: composeWithDevTools(applyMiddleware(...middlewares));
	const store = createStore(reducer, enhancer);
	store.sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};

const wrapper = createWrapper(makeStore, {
	debug: process.env.NODE_ENV === "development",
});

export default wrapper;
