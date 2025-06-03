import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

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

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

function App() {
  return (
    <div className="board-container">
      <header className="board-header">
        <h2>미현님, 안녕하세요</h2>
      </header>

      <nav className="board-nav">
        <NavLink to={"/board"}>📄 게시판</NavLink>
        <NavLink to={"/photo"}>🤸‍♀️ 사진첩</NavLink>
      </nav>

      <main className="board-main">
        <Routes>
          <Route path="/board" element={<BoardList />} />
          <Route path="/photo" element={<PhotoList />} />
        </Routes>
      </main>
    </div>
  );
}

// 커스텀 훅
// 서버에서 전체 게시글 데이터를 받아와서 페이지당 글 수 기준으로 총 페이지 수를 계산함
function useMaxPage() {
  const [maxPage, setMaxPage] = useState<number | null>(null);

  useEffect(() => {
    async function fetchMaxPage() {
      try {
        const resp = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        // 전체 게시글 수 / 페이지당 글 수 = 총 페이지 수 계산
        const totalPosts = resp.data.length;
        const pageSize = 10;
        setMaxPage(Math.ceil(totalPosts / pageSize));
      } catch (error) {
        console.error(error);
      }
    }

    fetchMaxPage();
  }, []);

  return maxPage;
}

// 일반 게시글 목록(페이지네이션 방식)
// npm install react-paginate (리액트용 페이지네이션 라이브러리)
const BoardList = () => {
  const maxPage = useMaxPage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const limit = 10; // 게시글 10개씩 불러오기

  // 게시글 조회
  const fetchPosts = async () => {
    try {
      // page 상태값 사용하도록 수정
      const resp = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          page * limit
        }&_limit=${limit}`
      );
      setPosts(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  if (maxPage === null) return <div>로딩 중...</div>;
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
        pageCount={maxPage}
        onPageChange={({ selected }) => setPage(selected)}
        // selected : 사용자가 선택한 페이지의 0부터 시작하는 인덱스 번호
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
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

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

  useEffect(() => {
    if (!loader.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const current = loader.current;
    observer.observe(current);

    return () => {
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
      <div ref={loader} className="loading">
        로딩 중...
      </div>
    </div>
  );
};

export default App;
