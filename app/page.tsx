import { getServerSession } from "next-auth";
import { Message } from "../typings";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Providers from "./Providers";

interface Props {}

const HomePage = async (props: Props) => {
  // server side rendering =>
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000/"}/api/getMessages`
  ).then((res) => res.json());

  const messages: Message[] = data.messages;

  const session = await getServerSession();

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Providers>
  );
};

export default HomePage;
