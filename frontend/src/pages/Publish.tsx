import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-800">
      <Appbar />

      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white/80 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-10 transition-all duration-300">
          
          {/* Fancy Plus Icon */}
          <div className="absolute left-[-16px] top-3 flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer shadow-md transition">
            <span className="text-2xl text-gray-600 font-bold">+</span>
          </div>

          {/* Title Input */}
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full text-5xl font-bold placeholder-gray-400 bg-transparent border-none focus:outline-none mb-6"
            placeholder="Title"
          />

          {/* Content Editor */}
          <TextEditor onChange={(e) => setDescription(e.target.value)} />

          {/* Publish Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content: description,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      onChange={onChange}
      rows={14}
      className="w-full text-lg leading-relaxed placeholder-gray-400 bg-transparent border-none focus:outline-none resize-none"
      placeholder="Tell your story..."
    />
  );
}
