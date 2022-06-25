import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTvShowRequestAction } from "../store/reducers/tvShow"; // tvShow 리듀서에서 만든 액션

const Home = () => {
	const dispatch = useDispatch();
	const { tvShowTitle, tvShowContents } = useSelector((state) => state.tvShow); // tvShow redux의 state들을 불러온다.

	const onClickHero = useCallback(
		(hero) => () => {
			dispatch(loadTvShowRequestAction(hero));
		},
		[]
	); // hero 넣어서 동적으로 data를 변경해주는 action 생성함수를 시행한다.

	return (
		// 고차함수라 한번 실행한 함수를 onClick에 넣어준다.
		<div>
			<button onClick={onClickHero("superman")}>슈퍼맨</button>
			<button onClick={onClickHero("batman")}>배트맨</button>
			{tvShowTitle && <div>{tvShowTitle}</div>}
			<br />
			{tvShowContents && (
				<div>
					{tvShowContents.map((show) => (
						<div key={show.id}>
							<a href={show.url}>{show.name}</a>
							<div>점수 : {show.score}</div>
							<div>타입 : {show.type}</div>
							<div>언어 : {show.language}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Home;
