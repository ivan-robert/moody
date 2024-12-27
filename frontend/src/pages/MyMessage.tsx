import { memo } from "react";

import DefaultLayout from "@/layouts/default";
import { useTodayReceivedMessage } from "@/modules/my-message/hooks/useTodayReceivedMessage";

type Props = {};

const MyMessage: React.FC<Props> = ({}) => {
  const { data } = useTodayReceivedMessage();

  return (
    <DefaultLayout>
      {JSON.stringify(data)}
      <div>MyMessage</div>
    </DefaultLayout>
  );
};

export default memo(MyMessage);
