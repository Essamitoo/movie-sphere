"use client"

import { useState, useContext } from "react"
import { AuthContext } from "@/contexts/authContext"
import { Pencil } from "lucide-react"

interface UploadImageClientProps {
  image?: string 
}

export default function UploadImageClient({ image }: UploadImageClientProps) {
  const [imageUrl, setImageUrl] = useState(image || "")
  const [deleteToken, setDeleteToken] = useState("")
  const { user, setUser } = useContext(AuthContext)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (deleteToken) {
      await fetch(
        "https://api.cloudinary.com/v1_1/" +
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME +
          "/delete_by_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: deleteToken }),
        }
      )
      console.log("Imagen anterior eliminada")
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    )

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await res.json()
    setImageUrl(data.secure_url)
    setDeleteToken(data.delete_token)

    if (user) {
      const updatedUser = {
        ...user,
        user: {
          ...user.user,
          image: data.secure_url,
        },
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <div className="relative inline-block group">
      <img
        src={imageUrl || user?.user.image}
        alt="Avatar"
        className="w-32 h-32 rounded-full object-cover"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer p-2 bg-white rounded-full shadow hover:bg-gray-100 transition absolute bottom-0 right-0"
      >
        <Pencil className="w-5 h-5 text-gray-700" />
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
