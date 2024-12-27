import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import FormSuccess from "@/modules/send/view/FormSuccess";
import SendForm from "@/modules/send/view/SendForm";
import { useTodaySentMessage } from "@/modules/send/view/useTodaySentMessage";

export default function SendPage() {
  const { data: message } = useTodaySentMessage();

  const hasSentMessage = message !== null;

  return (
    <DefaultLayout>
      {hasSentMessage ? (
        <>
          <FormSuccess messageBody={message.text} />
        </>
      ) : (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title()}>Share your mood!</h1>
            <SendForm />
          </div>
        </section>
      )}
    </DefaultLayout>
  );
}
