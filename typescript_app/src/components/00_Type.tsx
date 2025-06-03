// TypeScript에서 객체의 타입을 정의할 때 사용하는 두 가지 방법

// 1. interface
// - 객체 타입 정의
interface Animal_1 {
  name: string;
}
// 상속(확장) 방법
// - extends로 상속 가능 (OOP 스타일)
interface Dog_1 extends Animal_1 {
  bark(): void;
}

// - 중복 선언 가능(자동 병합됨)
interface A {
  x: number;
}

interface A {
  y: number;
}
// 결과: interface A { x: number; y: number; }

// ------------------------------------------------------------------

// 2. type
// - 중복 선언 불가능(에러 발생)
type Animal_2 = { name: string };

// 상속(확장) 방법
// - &로 합성(intersection)
type Dog_2 = Animal_2 & { bark(): void };

// - 객체 포함 다양한 타입 정의
//type B = { x: number };
//type B = { y: number }; // 에러발생

// - type은 다양한 타입 표현 가능
// 1. 유니언 리터럴 타입 (Union Literal Type)
type Status = "success" | "error" | "loading";
// 문자열 리터럴 타입으로 success, error, loading 중 하나의 값만 허용

let s: Status;
s = "success"; // 가능
s = "error"; // 가능
s = "loading"; // 가능
//s = "done";   // 에러 : done은 Status 타입에 없음

// 2. 튜플 타입 (Tuple Type)
type Point = [number, number]; // 튜플
// 길이가 2이고, 각 요소가 첫 번째는 number, 두 번째도 number 인 고정된 배열을 의미

const p1: Point = [10, 20]; // 가능
//const p2: Point = [1]; // 에러 : 요소가 부족
//const p3: Point = [1, 2, 3]; // 에러 : 요소가 너무 많음
//const p4: Point = ["a", 2]; // 에러 : 첫 번째는 number여야 함

// 3. 함수 타입 (Function Type)
type Callback = () => void;
// 매개변수 없이 호출되며 아무 것도 반환하지 않는 함수 타입

const message: Callback = () => {
  console.log("Hello!");
};

// const wrong: Callback = (msg: string) => {};  // 에러: 매개변수 없음으로 정의됨

// -> interface는 위와 같은(유니언,튜플,함수타입)표현이 불가능
