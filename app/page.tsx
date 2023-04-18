import { getServerSession } from "next-auth";
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Providers from "./Providers";
import { server } from "../config";

interface Props {}

const HomePage = async (props: Props) => {
  // server side rendering =>
  const data = await fetch(`${server}/api/getMessages`, {
    cache: "no-cache",
  }).then((res) => res.json());

  const messages: Message[] = data.messages;

  const session = await getServerSession();

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput session={session!} />
      </main>
    </Providers>
  );
};

export default HomePage;
