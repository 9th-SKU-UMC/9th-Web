import useThrottle from "../hooks/useThrottle";

const Dropdown = () => {
  const onScrollDropdown = () => {
    console.log("🔥 스크롤 이벤트 발생!");
  };

  const throttleScroll = useThrottle(onScrollDropdown, 700);

  return (
    <div className="flex justify-center mt-10">
      <div
        onScroll={throttleScroll}
        className="w-[400px] h-[500px] overflow-y-auto border-2 border-gray-500 rounded-xl shadow-lg bg-white"
      >
        <div className="h-[3000px] p-6">
          <div className="text-xl font-bold text-gray-800 mb-2">
            Throttle 스크롤 테스트
          </div>
          <div className="text-gray-600">scroll </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
