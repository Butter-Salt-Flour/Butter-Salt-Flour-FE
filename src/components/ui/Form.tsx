import { Caption1, Title3, Title1 } from "@/components/Typography";
import { InputField } from "@/components/Input/Index";
import { Button } from "@/components/Button";
import { requestMatching } from "@/lib/apis/main";

interface HomeProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  seniorId: number;
}

export default function Form({ isShow, setIsShow, seniorId }: HomeProps) {
  const handleSubmit = async () => {
    try {
      await requestMatching({ seniorId, youthId: 1 });
    } catch (error) {
      console.error("매칭 신청 실패:", error);
    }
  };

  return (
    <div className="rounded-2xl flex justify-center text-2xl w-full">
      {isShow && (
        <div className="gap-6 flex flex-col p-6 w-full">
          <div className="py-4 flex flex-col gap-2">
            <Title1>매칭 정보 입력</Title1>
            <Caption1 className="text-gray-400">
              할머니에게 드릴 정보를 입력해주세요!
            </Caption1>
          </div>

          <form className="flex flex-col gap-6 px-3 w-full">
            <div className="flex justify-between items-center gap-4">
              <Title3 className="whitespace-nowrap">이름</Title3>
              <InputField variant="primary" placeholder="이름을 입력해주새요" />
            </div>

            <div className="flex justify-between items-center gap-4">
              <Title3 className="whitespace-nowrap">나이</Title3>
              <InputField variant="primary" placeholder="나이를 입력해주세요" />
            </div>

            <div className="flex justify-between items-center gap-4">
              <Title3 className="whitespace-nowrap">전화번호</Title3>
              <InputField
                variant="primary"
                placeholder="전화번호를 입력해주세요"
              />
            </div>

            <div className="flex justify-between items-center gap-4">
              <Title3 className="whitespace-nowrap">거주지</Title3>
              <InputField
                variant="primary"
                placeholder="거주지를 입력해주세요"
              />
            </div>
          </form>

          <div className="flex whitespace-nowrap w-full gap-6 py-3 justify-evenly">
            <Button
              variant="no"
              size="lg"
              className="px-14 font-semibold"
              onClick={() => setIsShow(!isShow)}
            >
              취소
            </Button>
            <Button
              variant="yes"
              size="lg"
              className="px-12 font-semibold"
              onClick={handleSubmit}
            >
              챌린지 시작하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
