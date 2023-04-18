"use client";

import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { Session } from "next-auth";
import { BsEmojiSmile } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Skin } from "@emoji-mart/data";

interface Props {
  session: Session;
}

const ChatInput = ({ session }: Props) => {
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  const addEmoji = (e: Skin) => {
    const sym: string[] = e.unified.split("-");

    const codesArray: any[] = [];

    sym.forEach((el) => codesArray.push("0x" + el));

    const emoji = String.fromCodePoint(...codesArray);

    setInput(input + emoji);
  };

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !session) return;
    const messageToSend = input;

    setInput("");
    setShowEmojis(false);

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    };

    // push data to upstash
    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 flex w-full px-10 py-5 space-x-2 bg-white border-t border-gray-500"
    >
      <div className="relative flex items-end w-full p-2 rounded-sm">
        <input
          type="text"
          value={input}
          disabled={!session}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowEmojis(false)}
          placeholder="Enter Message Here..."
          className="flex-1 px-5 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div
          className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out ml-2"
          onClick={() => setShowEmojis((prevState) => !prevState)}
        >
          <BsEmojiSmile className="text-[#1d9bf0] text-3xl" />
        </div>
        {showEmojis && (
          <div className="absolute bottom-[100%] sm:right-2">
            <Picker data={data} onEmojiSelect={addEmoji} theme="dark" />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!input} // this mean disabled is true when no input
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
