'use client'
import { AddNote } from "@/app/_components/addNote";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "@/app/utils/notesAPI";
import Note from "@/app/_components/Note";
type NoteType={

    title:string,
    content:string,
    tag:string
    ,_id:string
}
export default function Notes() {

  const { data, isLoading, isError } = useQuery({
        queryKey:["notes"],
        queryFn:getNotes
    })
     if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading notes</p>
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className=" flex justify-between">
        <h1 className="text-xl font-bold">Notes</h1>
        <AddNote></AddNote>
      </div>
      <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 w-full lg:w-1/3 focus-within:ring-2 focus-within:ring-green-500">
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>
            {/* Main Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md space-y-6 ">

              <div className="space-y-4 grid gird-cols-3 md:grid-cols-6 lg:grid-cols-9
 gap-4">
                {data.map((note: NoteType) => (
                  <Note 
                    key={note._id}
                    id={note._id}
                    title={note.title}
                    content={note.content}
                    tag={note.tag}
                  />
                ))}
              </div>
            </div>
    </div>
  );
}
