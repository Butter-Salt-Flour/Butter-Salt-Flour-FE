import { Title2, Title3, Title1 } from "@/components/Typography";
import { InputField } from "@/components/Input/Index";
import { Button } from "@/components/Button";

interface HomeProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Form({ isShow, setIsShow }: HomeProps) {
  return (
    <div className="bg-prima flex justify-center text-2xl w-full">
      {isShow && (
        <div className="gap-6 flex flex-col">
          <Title1>매칭 정보 입력</Title1>
          <Title2 className="text-gray-400">
            할머니에게 드릴 정보를 입력해주세요!
          </Title2>

          <form className="flex flex-col gap-6 w-full justify-between ">
            <div className="flex justify-between items-center gap-6">
              <Title3 className="whitespace-nowrap">이름</Title3>
              <InputField variant="primary" placeholder="이름을 입력해주새요" />
            </div>

            <div className="flex justify-between items-center gap-6">
              <Title3 className="whitespace-nowrap">나이</Title3>
              <InputField variant="primary" placeholder="나이를 입력해주세요" />
            </div>

            <div className="flex justify-between items-center gap-6">
              <Title3 className="whitespace-nowrap">전화번호</Title3>
              <InputField
                variant="primary"
                placeholder="전화번호를 입력해주세요"
              />
            </div>

            <div className="flex justify-between items-center gap-6">
              <Title3 className="whitespace-nowrap">거주지</Title3>
              <InputField
                variant="primary"
                placeholder="거주지를 입력해주세요"
              />
            </div>
          </form>

          <div className="flex whitespace-nowrap w-full py-2 justify-evenly">
            <Button
              label="취소"
              variant="secondary"
              onClick={() => setIsShow(false)}
              size="sm"
            />
            <Button label="챌린지 시작하기" variant="primary" size="sm" />
          </div>
        </div>
      )}
    </div>
  );
}
