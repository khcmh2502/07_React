// Props 타입 정의
interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  // onClick 이벤트 핸들러 함수 타입 지정(클릭 이벤트를 처리하는 콜백 함수)
  label: string;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default CustomButton;
