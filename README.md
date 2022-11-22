# React Movie App

Stack : React.js, SCSS, Redux <br>
Description : <br>
- React,  React Redux ToolKit을 사용한 영화검색 웹 페이지
- React Redux ToolKit 연습, 공부용 프로젝트

<br>

## 📝 Note

### Install

````
npm install redux react-redux @reduxjs/toolkit
npm install axios
npm install react-router-dom
npm install sass --save
npm install react-slick //for carousel
````
### TODO 

영화 API 받아와서 화면에 그려주기 ✅ <br>
Redux toolkit, createSlice, <br>createAsyncThunk 사용하여 state 관리 ✅ <br>
검색 기능 구현 ✅ <br>
Carousel ✅ <br>
검색 결과 없을 때 화면 구현 ✅ <br>
어떤 제목으로 검색했는지 화면에 그려주기 <br> 
이미지 예외처리 

## Trouble Shooting

### 1. search results term 
- 검색 인풋창에 입력하고 submit 했을 때 헤더 아래에 
'Search Results {input}' 을 해주고 싶음 
- input 에 입력하는 결과값이 필요한 부분 : Header, MovieListing.jsx

[문제점] 
- term (input)을 movieSlice에 저장하고 useSelector과 dispatch로 불러오게끔 함.
필요한 컴포넌트인 movieListing에도 useSelector로 term을 불러왔더니 
input에 입력할 때 마다 렌더링이 되어서 input창에 치는게 
그대로 전달이 되어서 화면에 출력되는 문제 발생

[시도] <br>
- header에서 submit 을 눌렀을 때 'Search Results {term}' 이 보였으면 하니깐 header에 이 컴포넌트를 삽입? 
- -> submit을 했을 때 input 창에 입력했던 완전한 term을 출력하는 것에는 성공
- -> Header에 넣어줘서 movieDetail 에서도 보이는 문제 발생 
````jsx
     {search ? (
        <div className="wrapper-search-text">
          <p className="search-text">
            Search Results
            <strong className="search-result"> {term}</strong>
          </p>
        </div>
      ) : null} 
````
### 2. Detail 페이지에서 검색했을 때 검색결과 화면 보여지지 않는 문제 
예상 문제 원인 : 메인 페이지로 이동을 해줘야 할 것 같은데 메인 페이지에는 harry, freinds가 default 이다

[시도]
디폴트로 있는 값을 제거, 검색창 submit 할 떼 `navigate('/)` 해줌으로써 문제는 해결해보려 하였으나 디폴트값을 없애주면 메인 페이지에는 아무 정보도 뜨지 않는 문제 + 이전 검색 결과 남아있다가 리패칭 되는 문제 발생

[해결]
- 디폴트값을 없애주면 메인 페이지에는 아무 정보도 뜨지 않는 문제
Home과 MovieList 라우트 분리 
검색 시 navigate('/:${input값'}) 으로 가게끔 구현하여 해결
- 기존 페이지 데이터 남아있던 문제 
slice 에 
```js
removeMovieOrShow: (state) => {
      state.movies = {};
      state.shows = {};
    },
```
추가생성하여 
movieListing.jsx 에서 useEffect로 `dispatch(removeMovieOrShow());` 해주어 기존 정보 없어지게끔 구현하여 해결



