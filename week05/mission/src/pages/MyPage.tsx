import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../api/auth";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
    };

    getData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        {data.data?.name}님 환영합니다!
      </h1>
      <p>이메일: {data.data?.email}</p>
    </div>
  );
};

export default MyPage;
