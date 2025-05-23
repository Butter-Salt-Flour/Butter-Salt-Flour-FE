// senior.ts
import api from "./instance";

export const fetchAllSeniors = async () => {
  try {
    const response = await api.get("/api/senior");
    return response.data;
  } catch (error) {
    console.error("할머니 목록 조회 실패:", error);
    throw error;
  }
};

export const approveMatching = async (matchId: number) => {
  try {
    const response = await api.patch(`/api/matching/${matchId}/approve`);
    console.log("매칭 승인 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("매칭 승인 실패:", error);
    throw error;
  }
};

interface MatchingRequest {
  seniorId: number;
  youthId: number;
}

export const requestMatching = async (data: MatchingRequest) => {
  try {
    const response = await api.post("/api/matching", data);
    console.log("매칭 신청 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("매칭 신청 실패:", error);
    throw error;
  }
};
