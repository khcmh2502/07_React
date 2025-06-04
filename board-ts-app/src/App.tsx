import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

// 일반 게시글 데이터 타입
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// 언스플래스 사진 데이터 타입
interface UnsplashPhoto {
  id: string;
  alt_description: string;
  urls: {
    small: string;
  };
  user: {
    name: string;
  };
}

// .env 파일에 작성된 VITE_UNSPLASH_ACCESS_KEY 의 value값 얻어옴
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// 화면 렌더링 용 부모 컴포넌트
function App() {
  return (
    <div className="board-container">
      <header className="board-header">
        <h2>미현님, 안녕하세요</h2>
      </header>

      <nav className="board-nav">
        <NavLink to={"/board/1"}>📄 게시판</NavLink>
        <NavLink to={"/photo"}>🤸‍♀️ 사진첩</NavLink>
      </nav>

      <main className="board-main">
        <Routes>
          <Route path="/board" element={<Navigate to="/board/1" />} />
          {/* /board로 요청 시 /board/1로 강제 라우팅 */}
          <Route path="/board/:pageNo" element={<BoardList />} />
          {/* /board/1, /board/2 와 같은 url은 BoardList컴포넌트 렌더링함
            마치 Spring의 Pathvariable처럼 사용 가능 */}
          <Route path="/photo" element={<PhotoList />} />
        </Routes>
      </main>
    </div>
  );
}

// 일반 게시글 목록(페이지네이션 방식)
// npm install react-paginate (리액트용 페이지네이션 라이브러리)
const BoardList = () => {
  const { pageNo } = useParams(); // url상 작성된 pageNo 얻어옴(Pathvariable와 비슷)
  const limit = 10; // 게시글 10개씩 불러오기
  const currentPage = parseInt(pageNo || "1", 10);
  // page는 문자열로 오므로 숫자로 변환(문자열을 10진수 정수로 변환)
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState<number>(0); // 총 게시글 수 (100개)

  const navigate = useNavigate(); // window.location 대신 사용 (SPA 준수)

  useEffect(() => {
    // 게시글 목록 불러오기
    const fetchPosts = async () => {
      const resp = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          (currentPage - 1) * limit
        }&_limit=${limit}`
      );
      setPosts(resp.data);
    };

    // 총 게시물 수 불러오기
    const fetchTotalCount = async () => {
      const resp = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`
      );
      setTotalPosts(resp.data.length); // 여기선 전체를 가져온 뒤 length 사용
    };

    fetchPosts();
    fetchTotalCount();
  }, [currentPage]);

  // 페이지네이션 클릭 시 url 라우팅 함수
  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected + 1; // selected는 0부터 시작
    navigate(`/board/${selectedPage}`); // 화면이 새로고침 되는것이 아니기때문에 스크롤이 아래에 위치함

    // 페이지가 바뀌면 윗 글부터 사용자가 확인 가능하도록 하기 위해
    // 화면 맨 위로 스크롤을 이동시키는 코드 추가
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  if (totalPosts === 0) return <div>로딩 중...</div>;
  return (
    <div>
      <ul className="board-list">
        {posts.map((post) => (
          <li key={post.id} className="board-item">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={Math.ceil(totalPosts / limit)}
        forcePage={currentPage - 1} // 페이지 번호는 0부터 시작하므로 -1 해줘야 맞음
        // forcePage : ReactPaginate 컴포넌트에서 현재 선택된 페이지를 강제로 지정해주는 props
        // ex) forcePage={2} // -> 3번째 페이지를 현재 선택된 페이지로 표시함 (0부터 시작)
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

// 사진 갤러리 목록(무한스크롤 방식)
const PhotoList = () => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // 화면에 로딩 상태 반영(UI용)
  const loadingRef = useRef(false); // 내부 로직에서 "지금 로딩 중인가?"를 체크
  const loader = useRef<HTMLDivElement | null>(null); // DOM 요소 참조 (IntersectionObserver 대상)

  useEffect(() => {
    loadingRef.current = loading; // useRef의 값을 loading 값으로 변경
  }, [loading]); // loading 상태가 변경되면

  // 페이지별로 10개씩 사진 얻어오는 함수
  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await axios.get<UnsplashPhoto[]>(
        `https://api.unsplash.com/photos?page=${page}&per_page=10`,
        {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );
      setPhotos((prev) => [...prev, ...res.data]);
    } catch (error) {
      console.error("사진 로딩 실패", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  // 초기 렌더링 시 loader 요소가 이미 뷰포트에 보이기 때문에
  // photo 비동기 요청이 2번 호출되는 문제 발생 (page가 1 -> 2로 바로 증가)
  // 즉, 첫 렌더링 시 사진이 10개, 10개 총 20개가 호출됨
  // 해결 방법 : didMountRef가 false인 첫 감지는 무시, 두번째 호출때 true 로 변경하여 그때부터 재요청
  const didMountRef = useRef(false);
  // 왜 useRef ?
  // -> 렌더링 중에도 값을 계속 유지, 값이 바뀌어도 컴포넌트를 리렌더링하지 않는 특징.
  // 일반 변수 : 컴포넌트가 렌더링될 때마다 다시 초기화됨(의미없는 코드 : 조건이 무조건 true가 됨)
  // useState : 가능은 하나 컴포넌트가 리렌더링되기 때문에 불필요한 렌더링이 발생.

  // 스크롤이 loader 요소에 도달했을 때 다음 페이지 데이터를 불러오기 위한 observer를 등록
  useEffect(() => {
    // loader가 DOM에 연결되지 않았다면(읽히지 않았다면) 리턴
    if (!loader.current) return;

    // IntersectionObserver : DOM 요소가 뷰포트 안에 들어오는지 감지하는 API.
    const observer = new IntersectionObserver(
      (entries) => {
        // loader가 화면에 보이고, 로딩 중이 아니라면
        if (entries[0].isIntersecting && !loadingRef.current) {
          // 초기 렌더링 이후에만 observer 동작하도록 조건 추가
          if (didMountRef.current) {
            // 다음 페이지 요청
            setPage((prev) => prev + 1);
          } else {
            // 두 번째부터만 setPage() 동작하도록 제한
            didMountRef.current = true;
          }
        }
      },
      { threshold: 0.1 } // 요소가 10% 이상 보이면 isIntersecting이 true가 됨.
    );

    const current = loader.current;
    // 실제 loader DOM 요소를 관찰하기 시작함.
    observer.observe(current);

    // 정리(clean-up) 함수
    return () => {
      // 컴포넌트가 언마운트되거나 loader가 바뀌면 기존 observer(관찰자) 제거
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div className="photo-gallery">
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div className="photo-item" key={`${photo.id}_${index}`}>
            <img src={photo.urls.small} alt={photo.alt_description} />
            <p>{photo.alt_description}</p>
          </div>
        ))}
      </div>
      {/* 로딩 중일 때만 보이게 */}
      {loading && <div className="loading">로딩 중...</div>}
      {/* 관찰 대상은 항상 있어야 하므로 아래는 그대로 유지 */}
      <div ref={loader} className="loading">
        더 불러오는 중...
      </div>
    </div>
  );
};

export default App;
