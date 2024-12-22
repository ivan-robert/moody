import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import SendForm from "@/modules/send/view/SendForm";

export default function SendPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Share your mood!</h1>
        </div>
      </section>
      <SendForm />
    </DefaultLayout>
  );
}
